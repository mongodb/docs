/**
 * Keeps one AWS custom terminology in step with the bundled glossary.
 * The terminology Description carries the CSV identity hash, so a sync
 * can tell "already uploaded" from "glossary changed" with one
 * GetTerminology call and skip the overwrite (and its 10-minute
 * propagation window) when nothing changed.
 */
import {
  GetTerminologyCommand,
  ImportTerminologyCommand,
  TranslateClient,
} from "@aws-sdk/client-translate";

export interface TerminologyView {
  description?: string | undefined;
  termCount?: number | undefined;
  skippedTermCount?: number | undefined;
  auxiliaryDataLocation?: string | undefined;
}

export interface TerminologyImportInput {
  Name: string;
  Description: string;
  File: Uint8Array;
  Format: "CSV" | "TSV" | "TMX";
  Directionality: "UNI" | "MULTI";
}

export interface TerminologyClient {
  getTerminology(input: { Name: string }): Promise<TerminologyView>;
  importTerminology(input: TerminologyImportInput): Promise<TerminologyView>;
}

interface AwsTerminologyResponse {
  TerminologyProperties?:
    | {
        Description?: string | undefined;
        TermCount?: number | undefined;
        SkippedTermCount?: number | undefined;
      }
    | undefined;
  AuxiliaryDataLocation?: { Location?: string | undefined } | undefined;
}

function toView(response: AwsTerminologyResponse): TerminologyView {
  const properties = response.TerminologyProperties ?? {};
  const location = response.AuxiliaryDataLocation?.Location;
  return {
    ...(properties.Description !== undefined ? { description: properties.Description } : {}),
    ...(properties.TermCount !== undefined ? { termCount: properties.TermCount } : {}),
    ...(properties.SkippedTermCount !== undefined
      ? { skippedTermCount: properties.SkippedTermCount }
      : {}),
    ...(location !== undefined ? { auxiliaryDataLocation: location } : {}),
  };
}

export function createTerminologyClient(region: string): TerminologyClient {
  const client = new TranslateClient({ region });
  return {
    async getTerminology(input) {
      return toView(await client.send(new GetTerminologyCommand(input)));
    },
    async importTerminology(input) {
      return toView(
        await client.send(
          new ImportTerminologyCommand({
            Name: input.Name,
            Description: input.Description,
            MergeStrategy: "OVERWRITE",
            TerminologyData: {
              File: input.File,
              Format: input.Format,
              Directionality: input.Directionality,
            },
          }),
        ),
      );
    },
  };
}

export function terminologyDescription(identity: string, termCount: number): string {
  return `docs glossary terminology; identity ${identity}; terms ${termCount}`;
}

export interface SyncTerminologyOptions {
  name: string;
  csv: string;
  identity: string;
  expectedTermCount: number;
  client: TerminologyClient;
}

export type SyncOutcome =
  | { action: "up-to-date"; name: string }
  | { action: "created"; name: string; termCount: number }
  | {
      action: "overwritten";
      name: string;
      termCount: number;
      propagationWarning: string;
    };

export interface SyncReport {
  outcome: SyncOutcome;
  skippedTermCount: number;
  auxiliaryDataLocation?: string | undefined;
}

async function getExisting(
  client: TerminologyClient,
  name: string
): Promise<TerminologyView | undefined> {
  try {
    return await client.getTerminology({ Name: name });
  } catch (cause) {
    if ((cause as { name?: string }).name === "ResourceNotFoundException") {
      return undefined;
    }
    throw cause;
  }
}

export async function syncTerminology(
  options: SyncTerminologyOptions
): Promise<SyncReport> {
  const description = terminologyDescription(options.identity, options.expectedTermCount);
  const existing = await getExisting(options.client, options.name);
  if (existing !== undefined && existing.description === description) {
    return {
      outcome: { action: "up-to-date", name: options.name },
      skippedTermCount: 0,
    };
  }

  const imported = await options.client.importTerminology({
    Name: options.name,
    Description: description,
    File: new TextEncoder().encode(options.csv),
    Format: "CSV",
    Directionality: "UNI",
  });

  const termCount = imported.termCount ?? 0;
  const skippedTermCount = imported.skippedTermCount ?? 0;
  if (skippedTermCount === 0 && termCount !== options.expectedTermCount) {
    throw new Error(
      `${options.name}: AWS stored ${termCount} terms but the glossary built ${options.expectedTermCount}`
    );
  }
  const outcome: SyncOutcome =
    existing === undefined
      ? { action: "created", name: options.name, termCount }
      : {
          action: "overwritten",
          name: options.name,
          termCount,
          propagationWarning: `${options.name} was overwritten; AWS documents up to 10 minutes before translations see the new terminology`,
        };
  return {
    outcome,
    skippedTermCount,
    ...(imported.auxiliaryDataLocation !== undefined
      ? { auxiliaryDataLocation: imported.auxiliaryDataLocation }
      : {}),
  };
}
