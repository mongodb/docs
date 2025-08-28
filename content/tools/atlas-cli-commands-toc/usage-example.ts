// Example of how to use the generated commands in atlas-cli.ts

import { atlasCliCommands } from '../../table-of-contents/docset-data/atlas-cli-commands.js';

// In your atlas-cli.ts file, replace the Commands section items array with:
// items: atlasCliCommands

// Full example:
const tocData = [
  {
    label: "Atlas CLI",
    contentSite: "atlas-cli",
    collapsible: true,
    items: [
      {
        label: "Overview",
        contentSite: "atlas-cli",
        url: "/docs/atlas/cli/:version/",
      },
      // ... other sections ...
      {
        label: "Commands",
        contentSite: "atlas-cli",
        url: "/docs/atlas/cli/:version/command/atlas",
        collapsible: true,
        items: atlasCliCommands  // <-- Use the imported commands here
      },
      // ... other sections ...
    ]
  }
];

export default tocData;