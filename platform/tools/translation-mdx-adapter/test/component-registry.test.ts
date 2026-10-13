import { describe, it, expect } from 'vitest';
import { ruleFor, DEFAULT_RULE, isTranslatableProp } from '../src/component-registry.js';

describe('ruleFor — grounded entries', () => {
  it('admonitions are containers with a translatable title', () => {
    for (const name of ['Note', 'Tip', 'Important', 'Warning', 'Banner']) {
      const rule = ruleFor(name);
      expect(rule.kind).toBe('container');
      expect(isTranslatableProp(name, 'title')).toBe(true);
    }
  });

  it('Image is opaque with translatable alt (not src)', () => {
    const rule = ruleFor('Image');
    expect(rule.kind).toBe('opaque');
    expect(isTranslatableProp('Image', 'alt')).toBe(true);
    expect(isTranslatableProp('Image', 'src')).toBe(false);
  });

  it('Include is a container so its Replacement children are reached', () => {
    const rule = ruleFor('Include');
    expect(rule.kind).toBe('container');
    expect(rule.translatableProps).toEqual([]);
    expect(isTranslatableProp('Include', 'src')).toBe(false);
  });

  it('Replacement is a container — its body is substituted visible text', () => {
    const rule = ruleFor('Replacement');
    expect(rule.kind).toBe('container');
    expect(isTranslatableProp('Replacement', 'name')).toBe(false);
  });

  it('cross-reference roles are references', () => {
    for (const name of ['Reference', 'RefRole', 'RefTarget', 'Target']) {
      expect(ruleFor(name).kind).toBe('reference');
    }
  });
});

describe('ruleFor — safe default', () => {
  it('unknown components default to container with no translatable props', () => {
    const rule = ruleFor('SomeFutureComponent');
    expect(rule).toEqual(DEFAULT_RULE);
    expect(rule.kind).toBe('container');
    expect(rule.translatableProps).toEqual([]);
  });
});

describe('isTranslatableProp', () => {
  it('treats globally visible/audible props as translatable on any component', () => {
    expect(isTranslatableProp('Note', 'title')).toBe(true);
    expect(isTranslatableProp('Reference', 'title')).toBe(true); // visible cross-ref label
    expect(isTranslatableProp('Image', 'alt')).toBe(true);
    expect(isTranslatableProp('Whatever', 'caption')).toBe(true);
    expect(isTranslatableProp('Icon', 'icon-alt')).toBe(true);
    expect(isTranslatableProp('Tab', 'name')).toBe(true);
  });

  it('does not treat code/identifier/layout props as translatable', () => {
    expect(isTranslatableProp('Image', 'src')).toBe(false);
    expect(isTranslatableProp('Reference', 'name')).toBe(false);
    expect(isTranslatableProp('Anything', 'id')).toBe(false);
    expect(isTranslatableProp('Anything', 'refKey')).toBe(false);
  });
});
