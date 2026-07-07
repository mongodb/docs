import { palette } from '@leafygreen-ui/palette';

export const WAVE_COLORS = {
  1: {
    dot: palette.green.dark1,
    bg: palette.green.light3,
    border: palette.green.dark1,
    textDark: palette.green.dark2,
    label: 'Wave 1',
  },
  2: {
    dot: '#007CAD',
    bg: '#E3F8F8',
    border: '#007CAD',
    textDark: '#005A82',
    label: 'Wave 2',
  },
  3: {
    dot: palette.blue.dark2,
    bg: palette.blue.light3,
    border: palette.blue.dark2,
    textDark: palette.blue.dark3,
    label: 'Wave 3',
  },
} as const;

export const RELEASE_COLORS = {
  bg: palette.yellow.light3,
  border: palette.yellow.base,
  text: palette.yellow.dark2,
  dot: palette.yellow.dark2,
};
