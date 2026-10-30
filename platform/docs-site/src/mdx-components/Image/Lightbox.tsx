'use client';

import { Caption } from '@/mdx-components/Image/Caption';
import { Dialog, DialogRoot } from '@via-ds/components/dialog';
import { Content, Header } from '@via-ds/components/structure';
import { Text } from '@via-ds/components/typography';
import { clsx } from 'clsx';
import { useState, useCallback, type CSSProperties, type ReactNode } from 'react';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import { reportAnalytics } from '@/utils/report-analytics';
import type { ImageAlign } from './types';
import styles from './lightbox.module.scss';

const CAPTION_TEXT = 'click to enlarge';

interface LightboxProps {
  figure: ReactNode;
  dialogFigure: ReactNode;
  alt: string;
  caption?: string;
  figwidth?: string;
  align?: ImageAlign;
}

export const Lightbox = ({ figure, dialogFigure, alt, caption, figwidth = 'auto', align = 'left' }: LightboxProps) => {
  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => {
    reportAnalytics('Click', {
      position: 'body',
      position_context: 'image enlarged',
      label: name,
      scroll_position: currentScrollPosition(),
      tagbook: 'true',
    });
    setOpen(true);
  }, []);

  return (
    <>
      <div
        className={clsx(styles.wrapper, align !== 'left' && styles[align])}
        style={{ '--lightbox-width': figwidth } as CSSProperties}
      >
        <div onClick={openModal} role="button" tabIndex={-1}>
          {figure}
          <Caption caption={caption} align={align} />
          <div className={styles.hint}>{CAPTION_TEXT}</div>
        </div>
      </div>
      <DialogRoot isOpen={open} onOpenChange={setOpen}>
        <Dialog className={styles.dialog}>
          {alt && (
            <Header>
              <Text slot="title">{alt}</Text>
            </Header>
          )}
          <Content className={clsx(styles.content, !alt && styles.untitled)}>
            {dialogFigure}
            <Caption caption={caption} />
          </Content>
        </Dialog>
      </DialogRoot>
    </>
  );
};
