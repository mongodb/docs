import { Commit } from './sourceCommit/parseSourceCommit';

type ErrorContext =
  | {
      code: 'merge-conflict-exception';
      conflictingFiles: string[];
      commitsWithoutBackports: {
        formatted: string;
        commit: Commit;
      }[];
    }
  | {
      code: 'message-only-exception';
      message: string;
    }
  | {
      code: 'invalid-branch-exception';
      branchName: string;
    }
  | {
      code: 'no-branches-exception' | 'abort-conflict-resolution-exception';
    }
  | { code: 'no-directories-exception' };

function getMessage(errorContext: ErrorContext): string {
  switch (errorContext.code) {
    case 'merge-conflict-exception':
      return `Commit could not be cherrypicked due to conflicts in: ${errorContext.conflictingFiles.join(
        ',',
      )}`;
    case 'no-branches-exception':
      return 'There are no branches to backport to. Aborting.';
    case 'no-directories-exception':
      return 'There are no directories to backport to. Aborting.';
    case 'abort-conflict-resolution-exception':
      return 'Conflict resolution was aborted by the user';
    case 'invalid-branch-exception':
      return `The branch "${errorContext.branchName}" does not exist`;
    case 'message-only-exception':
      return errorContext.message;
  }
}

export class BackportError extends Error {
  errorContext: ErrorContext;
  constructor(errorContextOrString: ErrorContext | string) {
    const errorContext: ErrorContext =
      typeof errorContextOrString === 'string'
        ? { code: 'message-only-exception', message: errorContextOrString }
        : errorContextOrString;
    const message = getMessage(errorContext);
    super(message);
    Error.captureStackTrace(this, BackportError);
    this.name = 'BackportError';
    this.message = message;
    this.errorContext = errorContext;
  }
}
