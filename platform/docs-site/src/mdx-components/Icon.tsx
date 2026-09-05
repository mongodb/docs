'use client';

import { Icon as ViaIcon, type GlyphName } from '@via-ds/icons';
import styles from './icon.module.scss';

// Content authored against LG's icon-lg glyph vocabulary predates Via and
// used a couple of names Via renamed when it introduced its own glyph set.
const GLYPH_ALIASES: Record<string, GlyphName> = {
  Charts: 'Chart',
  GlobeAmericas: 'Globe',
};

export type RoleIconProps = {
  target: string;
  name: string;
};

export const Icon = ({ target, name }: RoleIconProps) => {
  if (name === 'icon' || name === 'icon-fa5') {
    return <i className={`fa-${target} fas`} />;
  } else if (name === 'icon-fa5-brands') {
    return <i className={`fab fa-${target}`} />;
  } else if (name === 'icon-fa4') {
    return <i className={`fa4-${target} fa4`} />;
  } else if (name === 'icon-charts') {
    return <i className={`charts-icon-${target} charts-icon`} />;
  } else if (name === 'icon-mms') {
    return <i className={`mms-icon-${target} mms-icon`} />;
  } else if (name === 'icon-lg') {
    const glyph = (GLYPH_ALIASES[target] ?? target) as GlyphName;
    return <ViaIcon glyph={glyph} className={styles.viaIcon} />;
  }
};
