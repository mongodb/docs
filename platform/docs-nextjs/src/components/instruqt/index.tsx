'use client';

import type { InstruqtNode } from '@/types/ast';
import LabDrawer from './lab-drawer';
import InstruqtFrame from './instruqt-frame';
import { useInstruqt } from '@/context/instruqt-context';

export type InstruqtProps = {
  argument: InstruqtNode['argument'];
  options: InstruqtNode['options'];
};

const Instruqt = ({ argument, options }: InstruqtProps) => {
  const embedValue = argument?.[0]?.value;
  const title = options?.title ?? '';
  const isDrawer = options?.drawer ?? false;
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

export default Instruqt;
