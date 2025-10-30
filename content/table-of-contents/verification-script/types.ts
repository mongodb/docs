export interface VerificationResult {
  matched: boolean;
  filePath: string;
  tocUrl: string | null;
  targetUrl: string;
}

export interface ComparisonResult {
  matchedFiles: Map<string, VerificationResult[]>;
  missedFiles: Map<string, VerificationResult[]>;
}
