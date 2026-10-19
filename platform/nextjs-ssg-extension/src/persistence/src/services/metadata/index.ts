import type AdmZip from 'adm-zip';
import { BSON } from 'mongodb';
import type { ObjectId } from 'mongodb';
import { db, deleteDocuments, insert } from '../connector/index';

import type { ToC } from './ToC/index';

const COLLECTION_NAME = 'metadata';

export interface Metadata {
  _id?: string;
  project: string;
  branch: string;
  toctree: ToC;
  toctreeOrder: string[];
  title: string;
  eol: boolean;
  slugToTitle: Record<string, [TextNode]>;
  slugToBreadcrumbLabel?: Record<string, string>;
  parentPaths: Record<string, BreadcrumbType[]>;
  static_files: Record<string, Buffer>;
  canonical?: string | null;
  iatree?: IAOption;
  openapi_pages?: Record<string, OpenApiPage>;
  multiPageTutorials?: Record<string, MultiPageTutorial>;
  chapters?: MetadataChapters;
  guides?: MetadataGuides;
  is_merged_toc?: boolean;
}

type BreadcrumbType = {
  title: string;
  path: string;
};

type MultiPageTutorial = {
  slugs: string[];
  total_steps: number;
};

type OpenApiPage = {
  source_type: string;
  source: string;
  api_version?: string | null;
  resource_versions?: string[] | null;
};

type MetadataChapters = Record<string, MetadataChapter>;

type MetadataChapter = {
  id: string;
  chapter_number: number;
  description: string;
  guides: string[];
  icon: string;
};

type MetadataGuides = Record<string, MetadataGuide>;

type MetadataGuide = {
  chapter_name?: string;
  completion_time?: number;
  description: string | unknown[];
  title: string | unknown[];
};

interface IAOption {
  title: [TextNode];
  slug?: string;
  url?: string;
  id?: string;
  linked_data?: IALinkedData[];
  children?: IAOption[];
}

interface IALinkedData {
  headline: string;
  url: string;
  icon: string;
  'icon-alt': string;
  'icon-dark'?: string;
  checksum: string;
  width: string;
  height: string;
}

type TextNode = { type: 'text'; value: string };

// Service responsible for memoization of metadata entries.
// Any extraneous logic performed on metadata entries as part of upload should be added here
// or within subfolders of this module
export const metadataFromZip = async (zip: AdmZip) => {
  const zipEntries = zip.getEntries();
  const metadata = zipEntries
    .filter((entry) => entry.entryName === 'site.bson')
    .map((entry) => BSON.deserialize(entry.getData()))[0] as Metadata;
  // await verifyMetadata(metadata);
  return metadata;
};

export const insertMetadata = async (buildId: ObjectId, metadata: Metadata) => {
  try {
    return insert([metadata], COLLECTION_NAME, buildId, true);
  } catch (error) {
    console.error(`Error at insertion time for ${COLLECTION_NAME}: ${error}`);
    throw error;
  }
};

export const deleteStaleMetadata = async (metadata: Metadata) => {
  try {
    const { project, branch } = metadata;
    const LIMIT = 49;
    const snooty = await db();

    // Create a cursor, skip the first 49, and project only _id
    const cursor = snooty
      .collection(COLLECTION_NAME)
      .find({ project, branch })
      .sort({ build_id: -1 })
      .skip(LIMIT)
      .project({ _id: 1 });

    const deleteCandidateIds = [];
    for await (const doc of cursor) {
      deleteCandidateIds.push(doc._id);
    }

    return await deleteDocuments(deleteCandidateIds, COLLECTION_NAME);
  } catch (error) {
    console.error(`Error deleting stale metadata: ${error}`);
    throw error;
  }
};

export const _metadataFromZip = metadataFromZip;
