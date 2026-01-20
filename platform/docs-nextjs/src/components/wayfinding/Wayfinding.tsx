'use client';
import { useMemo, useState } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { Body } from '@leafygreen-ui/typography';
import Icon from '@leafygreen-ui/icon';
import { theme } from '@/styles/theme';
import ComponentFactory from '@/components/component-factory';
import { getPlaintext } from '@/utils/get-plaintext';
import { NOTRANSLATE_CLASS } from '@/utils/locale';
import type { ASTNode, ReferenceNode } from '@/types/ast';
import { isWayfindingOptionNode, isWayfindingDescriptionNode } from '@/types/ast-utils';
import WayfindingOption from '@/components/wayfinding/WayfindingOption';

export const MAX_INIT_OPTIONS = 4;

const containerStyle = css`
  width: 100%;
  border-radius: ${theme.size.medium};
  border: 1px solid var(--wayfinding-border-color);
  background-color: var(--wayfinding-bg-color);
  padding: ${theme.size.medium} ${theme.size.large};
`;

const titleStyle = css`
  margin-bottom: 2px;
  font-weight: 600;
  color: var(--font-color-primary);
`;

// Style attempts to overwrite child nodes to get them to conform to wayfinding styling
const descriptionStyle = css`
  * {
    font-size: ${theme.fontSize.small} !important;
    line-height: 20px !important;
  }

  *:last-child {
    margin-bottom: 0 !important;
  }
`;

const optionsContainerStyle = css`
  margin: ${theme.size.default} 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(133px, 1fr));
  gap: 6px ${theme.size.small};

  @media ${theme.screenSize.mediumAndUp} {
    grid-template-columns: repeat(auto-fill, 164px);
  }
`;

const showAllButtonStyle = css`
  background-color: inherit;
  border: none;
  padding: 0;
  display: flex;
  align-items: center;
  gap: ${theme.size.small};
  color: var(--link-color-primary);
  font-size: ${theme.fontSize.small};
  line-height: 20px;
  font-weight: 500;
`;

const getWayfindingComponents = (children: ASTNode[]) => {
  const descriptionNodeIdx = children.findIndex(isWayfindingDescriptionNode);
  const [foundDescriptionNode] = descriptionNodeIdx >= 0 ? children.splice(descriptionNodeIdx, 1) : [];

  const descriptionNode = isWayfindingDescriptionNode(foundDescriptionNode) ? foundDescriptionNode : null;
  const optionNodes = children.filter(isWayfindingOptionNode);

  return {
    descriptionNode,
    optionNodes,
  };
};

export type WayfindingProps = {
  nodeChildren: ASTNode[];
  argument: ReferenceNode[];
};

export const Wayfinding = ({ nodeChildren, argument }: WayfindingProps) => {
  const [showAll, setShowAll] = useState(false);
  const { descriptionNode, optionNodes } = useMemo(() => {
    // Create copy of nodeChildren to avoid issues with hot reload
    return getWayfindingComponents([...nodeChildren]);
  }, [nodeChildren]);
  const titleText = getPlaintext(argument);

  const { showButtonText, showButtonGlyph } = showAll
    ? {
        showButtonText: 'Collapse',
        showButtonGlyph: 'ChevronUp',
      }
    : {
        showButtonText: 'Show all',
        showButtonGlyph: 'ChevronDown',
      };

  return (
    <div className={cx(containerStyle)}>
      <Body className={cx(titleStyle)}>{titleText}</Body>
      <div className={cx(descriptionStyle)}>
        {descriptionNode?.children?.map((child, index) => {
          return <ComponentFactory key={index} nodeData={child} />;
        })}
      </div>
      <div className={cx(optionsContainerStyle, NOTRANSLATE_CLASS)}>
        {optionNodes.map((option, index) => {
          const shouldHideOption = !showAll && index > MAX_INIT_OPTIONS - 1;
          return (
            <WayfindingOption
              key={index}
              hideOption={shouldHideOption}
              options={option.options}
              argument={option.argument}
            />
          );
        })}
      </div>
      {optionNodes.length > MAX_INIT_OPTIONS && (
        <button className={cx(showAllButtonStyle)} onClick={() => setShowAll((prev) => !prev)}>
          {showButtonText}
          <Icon glyph={showButtonGlyph} />
        </button>
      )}
    </div>
  );
};
