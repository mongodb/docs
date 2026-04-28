'use client';

import { LabDrawer } from './LabDrawer';
import { InstruqtFrame } from './InstruqtFrame';
import { useInstruqt } from '@/context/instruqt-context';

type InstruqtProps = {
  embedValue?: string;
  title?: string;
  drawer?: boolean;
};

export const Instruqt = ({ embedValue: embedValueProp, title: titleProp, drawer: drawerProp }: InstruqtProps) => {
  const embedValue =
    embedValueProp != null && embedValueProp !== '' ? String(embedValueProp).trim() || undefined : undefined;
  const title = titleProp || '';
  const isDrawer = typeof drawerProp === 'string' ? drawerProp === 'true' : Boolean(drawerProp);
  const { isOpen } = useInstruqt();

  if (!embedValue) {
    return null;
  }

  return (
    <>
      {isDrawer ? (
        isOpen && (
          <>
            <LabDrawer embedValue={embedValue} title={title} />
          </>
        )
      ) : (
        <InstruqtFrame title={title} embedValue={embedValue} />
      )}
    </>
  );
};
