'use client';

import { Children, isValidElement, type ReactNode } from 'react';
import styles from './version.module.scss';

const getVersionChangeText = (changeType: string) => {
  switch (changeType) {
    case 'deprecated':
      return 'Deprecated since';
    case 'versionadded':
      return 'New in';
    case 'versionchanged':
      return 'Changed in';
  }
};
/**
 * Argument text following the version number, such as the "(*Also available in
 * 7.0.5*)" in `.. versionadded:: 7.2 (*Also available in 7.0.5*)`. The conversion
 * script emits it as the first child so its inline markup survives; Version hoists
 * it back into the label, so this renders nothing on its own.
 */
export const VersionArgument = ({ children }: { children?: ReactNode }) => <>{children}</>;

export type VersionProps = {
  changeType: string;
  version: string;
  /** Set by the conversion script to ':' when the directive introduces content. */
  endPunctuation?: string;
  children?: ReactNode;
};

export const Version = ({ changeType, version, endPunctuation = '.', children }: VersionProps) => {
  const { argument, body } = partitionVersionChildren(children);

  return (
    <div>
      <p className={styles.version}>
        <em>
          {getVersionChangeText(changeType)} version {version}
          {argument ? <> {argument}</> : null}
          {endPunctuation}
        </em>
        {body.length > 0 ? <> {body}</> : null}
      </p>
    </div>
  );
};

/** Split a leading <VersionArgument> off the directive body, if one is present. */
const partitionVersionChildren = (children: ReactNode) => {
  const all = Children.toArray(children);
  const isArgument = (node: ReactNode) => isValidElement(node) && node.type === VersionArgument;

  return {
    argument: all.find(isArgument) ?? null,
    body: all.filter((node) => !isArgument(node)),
  };
};
