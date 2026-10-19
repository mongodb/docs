type ToCOptions = {
  drawer?: boolean;
  project?: string;
  versions?: string[];
  osiris_parent?: boolean;
  tocicon?: string;
  version?: string;
  urls?: Record<string, string>;
};
export interface ToC {
  title: string;
  slug?: string;
  url?: string;
  children: ToC[];
  options?: ToCOptions;
}
