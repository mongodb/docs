/*
 * This config item configures which version subdirectories
 * the verification script should check.
 * Sites that are unversioned are commented out
 * Some sites have not completed migration, search for "NOT-MIGRATED" to find them in this doc.
 */
export const config: Map<string, string[]> = new Map([
  ["atlas-architecture", 
    [
      "current",
    ]
  ],
  //["charts", []],
  ["atlas-cli", 
    [
      "upcoming", 
      "current", 
      "v1.45", 
      "v1.44", 
      "v1.43", 
      "v1.42",
      "v1.41",
      "v1.40",
      "v1.39",
      "v1.38"
    ]
  ],
  ["atlas-operator", 
    [
      "upcoming",
      "current",
      "v2.8",
      "v2.7",
      "v2.6",
      "v2.5",
      "v2.4",
      "v1.9"
    ]
  ],
  ["bi-connector", 
    [
      "current",
    ]
  ],
  ["c", 
    [
      "upcoming",
      "current",
      "v1.30",
      "v1.29",
      "v1.28",
      "v1.27",
      "v1.26"
    ]
  ],
  //["cloud-docs", []],
  //["cloud-manager", []],
  //["cloudgov", []],
  ["mongosync", 
    [
      "current",
      "v1.15",
      "v1.14",
      "v1.13",
      "v1.12",
      "v1.11",
      "v1.10",
      "v1.9"
    ]
  ],
  //["compass", []],
  ["cpp-driver", 
    [
      "upcoming",
      "current",
      "v4.0",
      "v3.11",
      "v3.10"
    ]
  ],
  ["csharp",
    [
      "upcoming",
      "current",
      "v3.3",
      "v3.2",
      "v3.1",
      "v3.0",
      "v2.30",
      "v2.29" 
    ]
  ],
  //["database-tools", []],
  //["datalake", []],
  ["django", 
    [
      "current",
      "upcoming",
      "v5.1"
    ]
  ],
  //["drivers", []],
  ["entity-framework", 
    [
      "upcoming",
      "current",
      "v8.3",
      "v8.2",
      "v8.1",
      "v8.0"
    ]
  ],
  ["golang",
    [
      "upcoming",
      "current",
      "v2.1",
      "v2.0",
      "v1.17",
      "v1.16",
      "v1.15",
      "v1.14",
      "v1.13",
      "v1.12"
    ]
  ],
  ["java",
    [
      "upcoming",
      "current",
      "v5.4",
      "v5.3",
      "v5.2",
      "v5.1",
      "v5.0"
    ]
  ],
  ["java-rs",
    [
      "upcoming",
      "current",
      "v5.4",
      "v5.3",
      "v5.2",
      "v5.1",
      "v5.0"
    ]
  ],
  ["docs-k8s-operator",
    [
      "upcoming",
      "current",
      "v2.8",
      "v2.7",
      "v2.6",
      "v2.5",
      "v2.4",
      "v1.9"
    ]
  ],
  ["kafka-connector", 
    [
      "upcoming",
      "current",
      "v1.14",
      "v1.13",
      "v1.12"
    ]
  ],
  ["kotlin",
    [
      "upcoming",
      "current",
      "v5.4",
      "v5.3",
      "v5.2",
      "v5.1",
      "v5.0"
    ]
  ],
  ["kotlin-sync",
    [
      "upcoming",
      "current",
      "v5.4",
      "v5.3",
      "v5.2",
      "v5.1",
      "v5.0"
    ]
  ],
  ["laravel",
    [
      "upcoming",
      "current",
      "v4.x"
    ]
  ],
  //["mck", []],
  //["meta", []],
  ["mongocli", 
    [
      "upcoming",
      "current"
    ]
  ],
  //["intellij", []],
  //["mcp-server", []],
  //["mongodb-shell", []],
  ["visual-studio-extension", 
    [
      "upcoming",
      "current",
      "v1.5",
      "v1.4"
    ]
  ],
  ["mongoid",
    [
      "upcoming",
      "current"
    ]
  ],
  ["node", 
    [
      "upcoming",
      "current",
      "v6.16",
      "v6.15",
      "v6.14",
      "v6.13",
      "v6.12",
      "v6.11",
      "v6.10",
      "v6.9"
    ]
  ],
  ["ops-manager", 
    [
      "upcoming",
      "current",
      "v7.0"
    ]
  ],
  ["php-library", 
    [
      "current",
      "upcoming",
      "v1.x",
    ]
  ],
  ["pymongo-arrow",
    [
      "upcoming",
      "current",
      "v1.7",
      "v1.6",
      "v1.5",
      "v1.4",
      "v1.3"
    ]
  ],
  ["pymongo", 
    [
      "upcoming",
      "current",
      "v4.12",
      "v4.11",
      "v4.10",
      "v4.9",
      "v4.8",
      "v4.7"
    ]
  ],
  ["ruby-driver",
    [
      "upcoming",
      "current"
    ]
  ],
  ["rust",
    [
      "upcoming",
      "current",
      "v3.1",
      "v3.0",
      "v2.8",
      "v2.7"
    ]
  ],
  ["scala",
    [
      "upcoming",
      "current",
      "v5.4",
      "v5.3",
      "v5.2",
      "v5.1",
      "v5.0"
    ]
  ],
  ["docs", 
    [
      "upcoming",
      "rapid",
      "manual",
      "v7.0",
    ]
  ],
  //["guides", []],
  //["visual-studio-extension", []],
  ["spark-connector",
    [
      "upcoming",
      "current",
      "v10.4",
      "v10.3"
    ]
  ]
]);

// some contentSite values need remapped to their monorepo folder name
export const remapSite: Map<string, string> = new Map([
  ["c", "c-driver"],
  ["cloud-docs", "atlas"],
  ["cloudgov", "atlas-government"],
  ["django", "django-mongodb"],
  ["intellij", "mongodb-intellij"],
  ["laravel", "laravel-mongodb"],
  ["docs", "manual"],
  ["visual-studio-extension", "mongodb-analyzer"],
  ["pymongo", "pymongo-driver"],
  ["pymongo-arrow", "pymongo-arrow-driver"],
  ["scala", "scala-driver"],
  ["docs-relational-migrator", "relational-migrator"]
])

// maps a site name to the required url prefix
export const urlPrefixes: Map<string, string> = new Map([
  ["atlas-architecture", "/atlas"],
  ["atlas-cli", "/atlas"],
  ["atlas-operator", "/atlas"],
  ["c", "/languages/c"],
  ["cpp-driver", "/languages/cpp"],
  ["csharp", "/drivers"],
  ["golang", "/drivers"],
  ["node", "/drivers"],
  ["java", "/drivers"],
  ["java-rs", "/languages"],
  ["kotlin", "/drivers"],
  ["kotlin-sync", "/languages"],
  ["laravel", "/drivers"],
  ["django", "/languages"],
  ["rust", "/drivers"],
  ["pymongo", "/languages/python"],
  ["pymongo-arrow", "/languages/python"],
  ["scala", "/languages/scala"]
])
