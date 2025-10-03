import type { ReactNode } from 'react';
import { useMemo } from 'react';
import type { Directive, DirectiveName } from '@/types/ast';
import ComponentFactory from '../component-factory';

export type VersionModifiedProps = {
  argument: Directive['argument'];
  nodeChildren: Directive['children'];
  name: DirectiveName;
};

const VersionModified = ({ argument, nodeChildren, name, ...rest }: VersionModifiedProps) => {
  const { introText, childIndex } = useMemo(() => {
    const version = argument.length > 0 ? <ComponentFactory nodeData={argument[0]} /> : null;
    let childIndex = 0;
    let additionalArg: ReactNode = '.';
    if (argument.length > 1) {
      additionalArg = (
        <>
          :{' '}
          {argument.slice(1).map((arg, i) => (
            <ComponentFactory nodeData={arg} key={i} />
          ))}
        </>
      );
    } else if (nodeChildren.length > 0) {
      childIndex = 1;
      additionalArg = (
        <>
          : <ComponentFactory nodeData={nodeChildren[0]} skipPTag />
        </>
      );
    }
    let text: ReactNode = '';
    if (name === 'deprecated') {
      text = <>Deprecated{version && <> since version {version}</>}</>;
    } else if (name === 'versionadded') {
      text = <>New{version && <> in version {version}</>}</>;
    } else if (name === 'versionchanged') {
      text = <>Changed{version && <> in version {version}</>}</>;
    }

    return {
      childIndex,
      introText: (
        <>
          <em>{text}</em>
          {additionalArg}
        </>
      ),
    };
  }, [argument, nodeChildren, name]);

  return (
    <div>
      <p>{introText}</p>
      {nodeChildren.slice(childIndex).map((child, index) => (
        <ComponentFactory {...rest} nodeData={child} key={index} />
      ))}
    </div>
  );
};

export default VersionModified;
