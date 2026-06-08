import { cookies as nextCookies } from 'next/headers';
import envConfig from '@/utils/env-config';
import { getAllDocsetsWithVersionsCached } from '@/services/db/docsets';
import { SearchPageContent } from './SearchPageContent';

export default async function SearchPage() {
  const cookieStore = nextCookies();
  const cookieValues = cookieStore.getAll().reduce((acc, cookie) => {
    acc[cookie.name] = cookie.value;
    return acc;
  }, {} as Record<string, string>);

  const docsets = await getAllDocsetsWithVersionsCached();

  return <SearchPageContent docsets={docsets} env={envConfig.DB_ENV} cookies={cookieValues} />;
}
