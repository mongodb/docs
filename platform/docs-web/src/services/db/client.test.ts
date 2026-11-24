import type { SnootyEnv } from '@/types/data';

jest.mock('mongodb', () => ({ MongoClient: jest.fn() }));
jest.mock('@/utils/logger', () => ({ log: jest.fn() }));
jest.mock('@/utils/env-config', () => ({
  __esModule: true,
  default: { MONGODB_URI: 'mongodb://localhost:27017/test', DB_ENV: 'dotcomstg' },
}));

import { getFeedbackDbName } from './client';

describe('getFeedbackDbName', () => {
  it.each(['dotcomprd', 'production'])('maps explicit production value %p to feedback_prod', (env) => {
    expect(getFeedbackDbName(env as SnootyEnv)).toBe('feedback_prod');
  });

  it.each(['dotcomstg', 'staging'])('maps explicit staging value %p to feedback_stage', (env) => {
    expect(getFeedbackDbName(env as SnootyEnv)).toBe('feedback_stage');
  });

  it('maps explicit development to feedback_test', () => {
    expect(getFeedbackDbName('development')).toBe('feedback_test');
  });

  it.each([undefined, '', 'garbage', 'prd', 'stg', 'prod', 'dotcomprod', 'DotComPrd', 'production '])(
    'defaults unrecognized value %p to feedback_prod',
    (env) => {
      expect(getFeedbackDbName(env as unknown as SnootyEnv)).toBe('feedback_prod');
    },
  );
});
