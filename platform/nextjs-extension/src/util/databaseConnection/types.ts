export const FRONTEND_SITE_NAME = 'snooty';

const environments = ['stg', 'prd', 'dotcomstg', 'dotcomprd'];

export type Environments = 'stg' | 'prd' | 'dotcomstg' | 'dotcomprd';

export function isBuildEnvironment(obj: unknown): obj is Environments {
  if (!obj || typeof obj !== 'string') return false;
  return environments.indexOf(obj) !== -1;
}

export type SnootyDBName =
  | 'test'
  | 'snooty_dev'
  | 'snooty_prod'
  | 'snooty_dotcomstg'
  | 'snooty_dotcomprd';
