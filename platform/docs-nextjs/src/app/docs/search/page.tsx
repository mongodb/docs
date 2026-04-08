import { cookies as nextCookies } from 'next/headers';
import envConfig from '@/utils/env-config';
import { SearchPageContent } from './SearchPageContent';

export default function SearchPage() {
  const cookieStore = nextCookies();
  const cookieValues = cookieStore.getAll().reduce((acc, cookie) => {
    acc[cookie.name] = cookie.value;
    return acc;
  }, {} as Record<string, string>);

  // TODO: Fetch real docsets so the version switcher works on the search page
  return <SearchPageContent docsets={[]} env={envConfig.DB_ENV} cookies={cookieValues} />;
}
