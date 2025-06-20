/**
  Base project type used in all project data sources (snooty sites, devcenter, etc.)
 */
export interface ProjectBase {
  /**
    Type of project
    @example "snooty" | "devcenter"
   */
  type: string;
  /**
    Snooty project name
    @example "kotlin"
   */
  name: string;
  /**
    Tags to include in all documents from the site in the embedded_content collection
    @example ["kotlin", "docs", "driver"]
   */
  tags?: string[];

  /**
    Name of the product.
    @example "MongoDB Atlas"
  */
  productName?: string;

  /**
    The version of the project.
    @example "v4.4"
   */
  version?: string;
}
