/**
 * A layout is UI that is shared all pages prepended by /docs/<path>.
 * On navigation, layouts preserve state, remain interactive, and do not rerender.
 */

import ActionBar from '@/components/action-bar';
import layoutStyles from '../../layout.module.scss';
import Analytics from '@/components/head-scripts/anayltics';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Analytics />
      {/* TODO: return a sidenav here */}
      <div
        className={layoutStyles['sidenav-container']}
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
    </>
  );
}
