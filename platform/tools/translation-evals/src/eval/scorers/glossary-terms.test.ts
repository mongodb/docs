import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import { termMatches, DEFAULT_GLOSSARY, type Glossary } from '@mongodb-docs/translation-service';
import {
  countMatches,
  maskMatches,
  wordStem,
  hasOptionHit,
  wordMatches,
  hasStemExtension,
  matchKind,
  tokensIn,
  scoreGlossaryTerms,
} from './glossary-terms.js';
import type { SegmentPair } from '../../types.js';

const seg = (en: string, es: string, key = 'paragraph[0]'): SegmentPair => ({ key, en, es });

function glossaryOf(terms: Record<string, string>, nonTranslatableTerms: string[] = []): Glossary {
  return {
    nonTranslatableTerms,
    translatableTerms: Object.fromEntries(
      Object.entries(terms).map(([term, option]) => [
        term,
        [{ definition: 'd', translations: { es: option } }],
      ]),
    ),
  };
}

describe('countMatches / maskMatches', () => {
  it('matches whole tokens only', () => {
    expect(countMatches('C and C++', 'C')).toBe(1);
    expect(countMatches('drivers and driver', 'drivers')).toBe(1);
  });

  it('ignores case', () => {
    expect(countMatches('Drivers drive.', 'drivers')).toBe(1);
  });

  it('masks a match so a shorter term cannot count it again', () => {
    const masked = maskMatches('replica sets are here', 'replica sets');
    expect(countMatches(masked, 'replica')).toBe(0);
  });
});

describe('wordStem', () => {
  it('keeps score.py suffix order — ciones before es', () => {
    // score.py checks 'ciones' first, so this is 'parti', not 'particion'.
    // Do NOT reorder SUFFIXES to make this read nicer: it changes matching for
    // 12 of 734 option words.
    expect(wordStem('particiones')).toBe('parti');
  });

  it('is order-pinned', () => {
    expect(wordStem('operaciones')).toBe('opera');
    expect(wordStem('versiones')).toBe('version'); // the 4-letter guard rejects 'siones'
  });
});

describe('hasOptionHit — D2 trailing boundary', () => {
  it('accepts adapted forms across the stem rules', () => {
    expect(hasOptionHit('los pipelines', ['pipeline'])).toBe(true);
    expect(hasOptionHit('las particiones', ['partición'])).toBe(true);
    expect(hasOptionHit('los documentos', ['documento'])).toBe(true);
    expect(hasOptionHit('los roles', ['rol'])).toBe(true);
    expect(hasOptionHit('las expresiones', ['expresión'])).toBe(true);
    expect(hasOptionHit('el map-reduce', ['map-reduce'])).toBe(true);
  });

  it('rejects a derived noun that merely extends the stem', () => {
    expect(hasOptionHit('la documentación', ['documento'])).toBe(false);
    expect(hasOptionHit('el procesamiento', ['proceso'])).toBe(false);
    expect(hasOptionHit('el notificado', ['notificaciones'])).toBe(false);
  });

  it('does not let a one-letter slash variant match prose', () => {
    expect(hasOptionHit('a la colección', ['primario/a'])).toBe(false);
    expect(hasOptionHit('el primario', ['primario/a'])).toBe(true);
  });

  it('misses a different word', () => {
    expect(hasOptionHit('canalizaciones', ['pipeline'])).toBe(false);
  });
});

describe('wordMatches', () => {
  it('is the single-word rule the multiword matcher shares', () => {
    expect(wordMatches('rol', 'roles')).toBe(true);          // prefix, 2 trailing
    expect(wordMatches('documento', 'documentos')).toBe(true); // prefix, 1 trailing
    expect(wordMatches('documento', 'documentación')).toBe(false); // prefix, 5 trailing
    expect(wordMatches('partición', 'particiones')).toBe(true);    // stems equal
  });
});

describe('matchKind', () => {
  it('classifies literal, plural and verb-form matches', () => {
    expect(matchKind('driver', 'driver')).toBe('literal');
    expect(matchKind('driver', 'drivers')).toBe('plural');
    expect(matchKind('block', 'blocked')).toBe('verbForm');
    expect(matchKind('encrypted', 'encrypted')).toBe('literal');
  });
});

describe('tokensIn', () => {
  it('finds adapter tokens and leaves a bare U+E000 alone', () => {
    expect(tokensIn('x \u{E000}O1\u{E001} y')).toEqual(['\u{E000}O1\u{E001}']);
    expect(tokensIn('x \u{E000} y')).toEqual([]); // not followed by [A-Z]\d+
  });
});

describe('the service exports what the scorer needs', () => {
  it('exposes termMatches', () => {
    expect(typeof termMatches).toBe('function');
  });
});

// ---------------------------------------------------------------------------
// The scorer engine
// ---------------------------------------------------------------------------

describe('scoreGlossaryTerms — population', () => {
  it('counts a term that is in BOTH lists as zero', () => {
    const g = glossaryOf({ driver: 'driver' }, ['driver']);
    const r = scoreGlossaryTerms([seg('Use the driver.', 'Usa el driver.')], g, 'es');
    expect(r.metadata.total).toBe(0);
    expect(r.metadata.reason).toBe('no glossary term occurrences');
  });

  it('follows the sheet for a term inside a name that is NOT in the NT list', () => {
    const g = glossaryOf({ driver: 'driver' }, ['MongoDB']);
    const r = scoreGlossaryTerms([seg('MongoDB driver', 'MongoDB driver')], g, 'es');
    expect(r.metadata.total).toBe(1);
    expect(r.metadata.correct).toBe(1);
  });

  it('protects a whole name that IS in the NT list', () => {
    const g = glossaryOf({ driver: 'driver' }, ['Java Sync Driver']);
    const r = scoreGlossaryTerms([seg('The Java Sync Driver ships.', 'El Java Sync Driver llega.')], g, 'es');
    expect(r.metadata.total).toBe(0);
  });

  it('counts each occurrence once when a term nests inside a longer one', () => {
    const g = glossaryOf({ pipeline: 'pipeline', 'aggregation pipeline': 'pipeline de agregación' });
    const r = scoreGlossaryTerms([seg('The aggregation pipeline runs.', 'El pipeline de agregación corre.')], g, 'es');
    expect(r.metadata.total).toBe(1);
    expect(r.metadata.terms.map((t) => t.term)).toEqual(['aggregation pipeline']);
  });

  it('splits literal, plural and verb-form occurrences three ways', () => {
    const g = glossaryOf({ driver: 'driver', remove: 'remover' });
    const r = scoreGlossaryTerms(
      [seg('A driver, drivers, and it removed things.', 'Un driver, drivers y removió cosas.')],
      g,
      'es',
    );
    expect(r.metadata.byKind.literal.occurrences).toBe(1);
    expect(r.metadata.byKind.plural.occurrences).toBe(1);
    expect(r.metadata.byKind.verbForm.occurrences).toBe(1);
  });
});

describe('scoreGlossaryTerms — codeName gate', () => {
  it('reclassifies a product/code-name occurrence instead of removing it', () => {
    const g = glossaryOf({ collection: 'colección' });
    const r = scoreGlossaryTerms([seg('See db.collection.findOneAndUpdate() docs.', 'Vea los documentos.')], g, 'es');
    expect(r.metadata.wrong).toBe(1);
    expect(r.metadata.notApplicable).toBe(0);
    expect(r.metadata.wrongByReason['inside product/code name']).toBe(1);
  });

  it('does not leak regex lastIndex across segments', () => {
    const g = glossaryOf({ pattern: 'patrón' });
    const r = scoreGlossaryTerms(
      [seg('/pattern/ syntax', 'patrón', 'a'), seg('/pattern/ again', 'patrón', 'b')],
      g,
      'es',
    );
    expect(r.metadata.wrong).toBe(2);
  });

  it('gates on index-stable text even when an NT term precedes the name', () => {
    const g = glossaryOf({ collection: 'colección' }, ['MongoDB']);
    const r = scoreGlossaryTerms([seg('MongoDB db.collection.find() here.', 'Texto.')], g, 'es');
    expect(r.metadata.wrong).toBe(1);
    expect(r.metadata.notApplicable).toBe(0);
  });
});

describe('scoreGlossaryTerms — A1: nothing is excluded', () => {
  it('scores a known-bad-data term as a plain wrong occurrence, labelled', () => {
    const g = glossaryOf({ write: 'guardar' });
    const r = scoreGlossaryTerms([seg('Write the data.', 'Escribe los datos.')], g, 'es');
    expect(r.metadata.wrong).toBe(1);
    expect(r.metadata.correct).toBe(0);
    expect(r.metadata.notApplicable).toBe(0);
    expect(r.score).toBe(0);
    expect(r.metadata.wrongByReason['glossary option is known-bad data']).toBe(1);
  });

  it('credits a bad-data term when the model used the (bad) option', () => {
    const g = glossaryOf({ write: 'guardar' });
    const r = scoreGlossaryTerms([seg('Write the data.', 'Guarda los datos.')], g, 'es');
    expect(r.metadata.correct).toBe(1);
    expect(r.metadata.wrong).toBe(0);
  });

  it('scores a code-name occurrence as wrong, labelled — not as not-applicable', () => {
    const g = glossaryOf({ collection: 'colección' });
    const r = scoreGlossaryTerms([seg('See db.collection.findOneAndUpdate() docs.', 'Vea los documentos.')], g, 'es');
    expect(r.metadata.wrong).toBe(1);
    expect(r.metadata.notApplicable).toBe(0);
    expect(r.metadata.wrongByReason['inside product/code name']).toBe(1);
  });

  it('marks every occurrence of a drift term in a drift segment wrong', () => {
    // Real glossary: pipeline's drift word is 'canalizaci...'.
    const r = scoreGlossaryTerms(
      [seg('The pipeline reads and the pipeline writes.', 'La canalización lee y el pipeline escribe.')],
      DEFAULT_GLOSSARY,
      'es',
    );
    expect(r.metadata.terms.find((t) => t.term === 'pipeline')!.wrong).toBe(2);
  });

  it('is grouping-invariant: pooled output equals per-segment output summed', () => {
    const g = glossaryOf({ driver: 'driver', collection: 'colección' });
    const a = seg('A driver.', 'Un driver.', 'a');
    const b = seg('A collection.', 'Una colección.', 'b');
    const pooled = scoreGlossaryTerms([a, b], g, 'es');
    const one = scoreGlossaryTerms([a], g, 'es');
    const two = scoreGlossaryTerms([b], g, 'es');
    expect(pooled.metadata.total).toBe(one.metadata.total + two.metadata.total);
    expect(pooled.metadata.correct).toBe(one.metadata.correct + two.metadata.correct);
    expect(pooled.metadata.wrong).toBe(one.metadata.wrong + two.metadata.wrong);
  });
});

describe('scoreGlossaryTerms — the two scores', () => {
  it('reports three disjoint by-kind scores beside the headline', () => {
    const g = glossaryOf({ driver: 'driver', remove: 'remover' });
    const r = scoreGlossaryTerms(
      [seg('A driver, and it removed things.', 'Un driver, y eliminó cosas.')],
      g,
      'es',
    );
    expect(r.metadata.byKind.literal.score).toBe(1);
    expect(r.metadata.byKind.plural.score).toBeNull(); // empty population
    expect(r.metadata.byKind.verbForm.score).toBe(0);  // 'eliminó' is not 'remover'
    expect(r.score).toBe(1); // headline is literal + plural only
  });

  it('reports exactly one score and no adherence/coverage duplicates', () => {
    const g = glossaryOf({ driver: 'driver', write: 'guardar' });
    const r = scoreGlossaryTerms([seg('Use the driver and write data.', 'Usa el driver y escribe datos.')], g, 'es');
    expect(r.metadata.correct).toBe(1);
    expect(r.metadata.wrong).toBe(1);
    expect(r.score).toBeCloseTo(0.5);
    expect('adherence' in r.metadata).toBe(false);
    expect('coverage' in r.metadata).toBe(false);
  });
});

describe('scoreGlossaryTerms — the null contract', () => {
  it('null-scores a dataset that predates segments', () => {
    const r = scoreGlossaryTerms(undefined, glossaryOf({ driver: 'driver' }), 'es');
    expect(r.score).toBeNull();
    expect(r.metadata.reason).toBe('dataset lacks segments');
  });

  it('null-scores an empty segment list', () => {
    const r = scoreGlossaryTerms([], glossaryOf({ driver: 'driver' }), 'es');
    expect(r.score).toBeNull();
    expect(r.metadata.reason).toBe('no scorable segments');
  });

  it('null-scores a locale with no options', () => {
    const r = scoreGlossaryTerms([seg('Use the driver.', 'ドライバー')], glossaryOf({ driver: 'driver' }), 'ja-jp');
    expect(r.score).toBeNull();
    expect(r.metadata.reason).toBe('no options for locale');
  });

  it('null-scores when every occurrence is not applicable', () => {
    const g = glossaryOf({ driver: 'driver' });
    const r = scoreGlossaryTerms([seg('Use the driver.', '   ')], g, 'es');
    expect(r.score).toBeNull();
    expect(r.metadata.reason).toBe('all occurrences not applicable');
    expect(r.metadata.notApplicable).toBe(1);
  });
});

describe('scoreGlossaryTerms — determinism', () => {
  it('gives byte-identical output regardless of segment order', () => {
    const g = glossaryOf({ driver: 'driver', collection: 'colección' });
    const a = scoreGlossaryTerms([seg('A driver.', 'Un driver.', 'a'), seg('A collection.', 'Una colección.', 'b')], g, 'es');
    const b = scoreGlossaryTerms([seg('A collection.', 'Una colección.', 'b'), seg('A driver.', 'Un driver.', 'a')], g, 'es');
    expect(JSON.stringify(a)).toBe(JSON.stringify(b));
  });

  it('ships no glossary of its own', () => {
    // The repo has exactly ONE glossary, in the service. This package must never
    // carry a copy — it had one once, and it drifted (733 terms in the old shape
    // vs 714 with definitions).
    expect(fs.existsSync(new URL('../../glossary.json', import.meta.url))).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Sheet agreement and the population pin
// ---------------------------------------------------------------------------

const FIXTURE: SegmentPair[] = [
  seg('Use the driver.', 'Usa el driver.', 'a'),
  seg('A collection of documents.', 'Una colección de documentos.', 'b'),
  seg('The pipeline runs.', 'El pipeline corre.', 'c'),
];

describe('scoreGlossaryTerms — sheet agreement', () => {
  it('agrees with the term sheet on which terms are present', () => {
    const r = scoreGlossaryTerms(
      [
        seg('MongoDB driver connects.', 'El driver de MongoDB conecta.', 'a'),
        seg('The Node.js driver.', 'El driver de Node.js.', 'b'),
        seg('A collection of things.', 'Una colección de cosas.', 'c'),
      ],
      DEFAULT_GLOSSARY,
      'es',
    );
    expect(r.metadata.unsheeted).toBe(0);
    expect(r.metadata.unseen).toBe(0);
  });

  it('agrees on the fixture too', () => {
    const r = scoreGlossaryTerms(FIXTURE, DEFAULT_GLOSSARY, 'es');
    expect(r.metadata.unsheeted).toBe(0);
    expect(r.metadata.unseen).toBe(0);
  });
});

describe('scoreGlossaryTerms — a shrinking population raises the score', () => {
  // A glossary that loses entries makes the score go UP, because those
  // occurrences leave the denominator instead of becoming misses. The
  // percentage cannot see its own denominator.
  it('a truncated glossary shrinks the population AND raises the score', () => {
    const full = scoreGlossaryTerms(FIXTURE, DEFAULT_GLOSSARY, 'es');
    const truncated = scoreGlossaryTerms(FIXTURE, glossaryOf({ driver: 'driver' }), 'es');
    expect(truncated.metadata.total).toBeLessThan(full.metadata.total);
    expect(truncated.score!).toBeGreaterThan(full.score!);
  });
});

describe('scoreGlossaryTerms — total vs allOccurrences', () => {
  // `total` is the headline population (literal + plural). `byKind` has three
  // buckets, so summing them gives a different number. Both are reported, and
  // the names say which is which.
  it('separates the headline population from every occurrence scored', () => {
    const g = glossaryOf({ driver: 'driver', remove: 'remover' });
    const r = scoreGlossaryTerms(
      [seg('A driver, drivers, and it removed things.', 'Un driver, drivers y removió cosas.')],
      g,
      'es',
    );
    const kindSum =
      r.metadata.byKind.literal.occurrences +
      r.metadata.byKind.plural.occurrences +
      r.metadata.byKind.verbForm.occurrences;
    expect(r.metadata.total).toBe(2); // literal + plural
    expect(r.metadata.allOccurrences).toBe(3);
    expect(r.metadata.allOccurrences).toBe(kindSum);
  });
});

describe('hasStemExtension — the judgement-call label', () => {
  it('flags a derived noun and an inflection alike, because text matching cannot tell them apart', () => {
    expect(hasStemExtension('la documentación', ['documento'])).toBe(true);
    expect(hasStemExtension('las operaciones procesan datos', ['procesar'])).toBe(true);
  });

  it('does not flag a segment that simply uses a different word', () => {
    expect(hasStemExtension('las canalizaciones', ['pipeline'])).toBe(false);
  });
});

describe('scoreGlossaryTerms — A4: credit per occurrence', () => {
  it('caps credit at the number of option occurrences in the segment', () => {
    const g = glossaryOf({ field: 'campo' });
    const r = scoreGlossaryTerms(
      [seg('The field, the field and the field.', 'El campo y el campo.')],
      g,
      'es',
    );
    expect(r.metadata.correct).toBe(2);
    expect(r.metadata.wrong).toBe(1);
    expect(r.metadata.wrongByReason['option appears fewer times than the term']).toBe(1);
  });

  it('credits every occurrence when the option appears once per occurrence', () => {
    const g = glossaryOf({ field: 'campo' });
    const r = scoreGlossaryTerms([seg('The field and the field.', 'El campo y el campo.')], g, 'es');
    expect(r.metadata.correct).toBe(2);
    expect(r.metadata.wrong).toBe(0);
  });
});

describe('scoreGlossaryTerms — identity and sense-blind terms', () => {
  it('reports identity-option occurrences separately', () => {
    const g = glossaryOf({ query: 'query', driver: 'controlador' });
    const r = scoreGlossaryTerms(
      [seg('The query and the driver.', 'La query y el controlador.')],
      g,
      'es',
    );
    expect(r.metadata.identity).toEqual({ terms: 1, occurrences: 1, correct: 1, wrong: 0 });
  });

  it('flags sense-blind terms', () => {
    const g: Glossary = {
      nonTranslatableTerms: [],
      translatableTerms: {
        block: [
          { definition: 'd1', translations: { es: 'bloque' } },
          { definition: 'd2', translations: { es: 'bloquear' } },
        ],
      },
    };
    const r = scoreGlossaryTerms([seg('Block the field.', 'Bloquea el campo.')], g, 'es');
    expect(r.metadata.senseBlindTerms).toEqual(['block']);
  });
});
