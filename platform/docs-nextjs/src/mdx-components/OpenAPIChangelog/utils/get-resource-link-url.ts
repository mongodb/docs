import type { RemoteMetadata } from '@/types/data';
import { assertLeadingSlash } from '@/utils/assert-leading-slash';
import { normalizePath } from '@/utils/normalize-path';

type GetResourceLinkUrlProps = {
  siteBasePrefix: string;
  tag: string;
  operationId: string;
  openapi_pages: RemoteMetadata['openapi_pages'];
};

const getResourceLinkUrl = ({ siteBasePrefix, tag, operationId, openapi_pages = {} }: GetResourceLinkUrlProps) => {
  const resourceTag = `#tag/${tag.split(' ').join('-')}/operation/${operationId}`;
  const oaSpecPageRoute =
    Object.keys(openapi_pages).find((page) => page.includes('v2')) ||
    Object.keys(openapi_pages).find((page) => !page.includes('v1')) ||
    'reference/api-resources-spec/v2';

  return `${assertLeadingSlash(siteBasePrefix)}${normalizePath(`/${oaSpecPageRoute}/${resourceTag}`)}`;
};

export default getResourceLinkUrl;
