import type { TocItem } from '../../../types';
import rust_upcoming from '../versions/rust-upcoming';
import rust_v2_x from '../versions/rust-v2.x';
import rust_v3_x from '../versions/rust-v3.x';

const tocData: TocItem[] = [
  {
    label: 'Rust Driver',
    contentSite: 'rust',
    group: true,
    versionDropdown: true,
    versions: { includes: ['upcoming'] },
    items: rust_upcoming,
  },
  {
    label: 'Rust Driver',
    contentSite: 'rust',
    group: true,
    versionDropdown: true,
    versions: { includes: ['current'] },
    items: rust_v3_x,
  },
  {
    label: 'Rust Driver',
    contentSite: 'rust',
    group: true,
    versionDropdown: true,
    versions: { includes: ['v2.x'] },
    items: rust_v2_x,
  },
];

export default tocData;
