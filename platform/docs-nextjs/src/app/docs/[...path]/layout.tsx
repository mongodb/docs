/**
 * A layout is UI that is shared all pages prepended by /docs/<path>.
 * On navigation, layouts preserve state, remain interactive, and do not rerender.
 */

import { getPageDocFromParams } from '@/services/db';
import { DarkModeContextProvider } from '@/context/dark-mode-context';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ActionBar from '@/components/action-bar';
import layoutStyles from '../../layout.module.scss';

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ path?: string[] }>;
}) {
  console.log('docs layout');
  const pageDoc = await getPageDocFromParams(params);

  return (
    <div className="docs-layout" style={{ gridArea: 'contents' }}>
      <DarkModeContextProvider>
        <Header />
        {/* TODO: return a sidenav here */}
        <div
          className={'sidenav-container'}
          style={{
            gridArea: 'sidenav',
            width: '268px',
          }}
        >
          REPLACE WITH SIDENAV
        </div>
        <div className={layoutStyles['content-container']}>
          <ActionBar template="document" sidenav={true} />
          {children}
        </div>
        <Footer />
      </DarkModeContextProvider>
    </div>
  );
}
