import type {
  ASTNode,
  ComponentType,
  CommunityDriverPill,
  FootnoteNode,
  FootnoteReferenceNode,
  Directive,
  LiteralNode,
  NodeName,
  NodeType,
  ParagraphNode,
  ParentNode,
  ProcedureNode,
  RoleName,
  Root as RootNode,
  StrongNode,
  SubscriptNode,
  SuperscriptNode,
  TextNode,
  TitleReferenceNode,
  TargetNode,
  CodeNode,
  ButtonNode,
  HighlightNode,
  AbbrRoleNode,
  ClassRoleNode,
  RoleIconNode,
  RoleManualNode,
  LinkNewTabNode,
  ListNode,
  ListItemNode,
  BlockQuoteNode,
  EmphasisNode,
  SubstitutionReferenceNode,
  BannerNode,
  CTABannerNode,
  TabsNode,
  HorizontalListNode,
  AdmonitionNode,
  CardNode,
  CardGroupNode,
  ReferenceNode,
  FieldNode,
  FieldListNode,
  DefinitionListNode,
  DefinitionListItemNode,
  HeadingNode,
  ImageNode,
  RefRoleNode,
  CollapsibleNode,
  ListTableNode,
  FigureNode,
  ComposableNode,
  ComposableTutorialNode,
  IOCodeBlockNode,
  WayfindingNode,
} from '@/types/ast';
import type { LazyComponentMap } from '@/components/component-factory/lazy';
import { LAZY_COMPONENTS } from '@/components/component-factory/lazy';
import { isRoleName } from '@/types/ast-utils';
import Admonition, { type AdmonitionProps } from '@/components/admonition';
import { admonitionMap } from '@/components/admonition/constants';
import Text, { type TextProps } from '@/components/text';
import Paragraph, { type ParagraphProps } from '@/components/paragraph';
import Kicker, { type KickerProps } from '@/components/kicker';
import TitleReference, { type TitleReferenceProps } from '@/components/title-reference';
import Time, { type TimeProps } from '@/components/time';
import Introduction, { type IntroductionProps } from '@/components/introduction';
import Section, { type SectionProps } from '@/components/section';
import Cond, { type CondProps } from '@/components/cond';
import Strong from '@/components/strong';
import Subscript from '@/components/subscript';
import Superscript from '@/components/superscript';
import Rubric, { type RubricProps } from '@/components/rubric';
import Footnote, { type FootnoteNodeProps } from '@/components/footnote';
import FootnoteReference, { type FootnoteReferenceProps } from '@/components/footnote/footnote-reference';
import Target, { type TargetProps } from '@/components/target';
import Literal, { type LiteralProps, type FormatTextOptions } from '@/components/literal';
import Button, { type ButtonProps } from '@/components/button';
import Procedure, { type ProcedureProps } from '@/components/procedure';
import CommunityPillLink, { type CommunityPillLinkProps } from '@/components/community-pill-link';
import ListItem, { type ListItemProps } from '@/components/list/listItem';
import List, { type ListProps } from '@/components/list';
import {
  RoleAbbr,
  RoleClass,
  RoleCommand,
  RoleFile,
  RoleGUILabel,
  RoleIcon,
  RoleHighlight,
  RoleKbd,
  RoleLinkNewTab,
  RoleRed,
  RoleRequired,
  RoleGold,
} from '@/components/roles';
import type {
  AbbrProps,
  RoleClassProps,
  RoleCommandProps,
  RoleFileProps,
  GoldProps,
  RoleGUILabelProps,
  RoleIconProps,
  HighlightProps,
  KbdProps,
  LinkNewTabProps,
  RedProps,
  RoleManualProps,
} from '@/components/roles';

import Banner, { type BannerProps } from '../banner/banner';
import CTABanner, { type CTABannerProps } from '../banner/cta-banner';
import Code from '@/components/code';
import Include, { type IncludeProps } from '@/components/include';
import BlockQuote, { type BlockQuoteProps } from '@/components/block-quote';
import Emphasis, { type EmphasisProps } from '@/components/emphasis';
import SubstitutionReference, { type SubstitutionReferenceProps } from '@/components/substitution-reference';
import VersionModified, { type VersionModifiedProps } from '@/components/version-modified';
import Tabs, { type TabsProps } from '@/components/tabs';
import HorizontalList, { type HorizontalListProps } from '@/components/horizontal-list';
import Extract, { type ExtractProps } from '@/components/extract';
import TabSelectors, { type TabSelectorsProps } from '@/components/tabs/tab-selectors';
import Describe, { type DescribeProps } from '@/components/describe';
import Line, { type LineProps } from '@/components/line';
import LineBlock, { type LineBlockProps } from '@/components/line-block';
import Reference, { type ReferenceProps } from '@/components/reference';
import Heading, { type HeadingProps } from '@/components/heading';
import Card, { type CardProps } from '@/components/card';
import CardGroup, { type CardGroupProps } from '@/components/card/card-group';
import Field, { type FieldProps } from '@/components/field-list/field';
import FieldList, { type FieldListProps } from '@/components/field-list';
import Glossary, { type GlossaryProps } from '@/components/glossary';
import DefinitionListItem, { type DefinitionListItemProps } from '@/components/definition-list/definition-list-item';
import DefinitionList, { type DefinitionListProps } from '@/components/definition-list';
import Image, { type ImageProps } from '@/components/image';
import SeeAlso, { type SeeAlsoProps } from '@/components/admonition/see-also';
import RefRole, { type RefRoleProps } from '@/components/ref-role';
import Collapsible, { type CollapsibleProps } from '@/components/collapsible';
import ListTable, { type ListTableProps } from '@/components/list-table';
import Root, { type RootProps } from '@/components/root';
import Figure, { type FigureProps } from '@/components/figure';
import ComposableContent, { type ComposableContentProps } from '@/components/composable-tutorial/composable-content';
import ComposableTutorial, { type ComposableTutorialProps } from '@/components/composable-tutorial';
import DeprecatedVersionSelector from '@/components/deprecated-version-selector';
import SearchResults from '@/components/search-results';
import Transition from '@/components/transition';
import OpenAPIChangelog from '@/components/open-api-changelog';
import CodeIO, { type CodeIOProps } from '@/components/code/code-io';
import { Wayfinding, type WayfindingProps } from '@/components/wayfinding/Wayfinding';

const IGNORED_NAMES = new Set([
  'contents',
  'default-domain',
  'dismissible-skills-card',
  'entry',
  'ia',
  'raw',
  'short-description',
  'tabs-pillstrip',
  'toctree',
  'meta',
  'facet',
]);

const IGNORED_TYPES = new Set(['comment', 'inline_target', 'named_reference', 'substitution_definition']);

const DEPRECATED_ADMONITIONS = new Set(['admonition', 'caution', 'danger']);

// Union type for all role nodes
// For roles without specific interfaces, they will extend ParentNode with optional target
type RoleNode =
  | AbbrRoleNode
  | ClassRoleNode
  | HighlightNode
  | LinkNewTabNode
  | RoleIconNode
  | RoleManualNode
  | (ParentNode & { type: 'role'; target?: string });

const roleMap: Record<RoleName, React.ComponentType<RoleComponentProps>> = {
  abbr: RoleAbbr as React.ComponentType<RoleComponentProps>,
  class: RoleClass as React.ComponentType<RoleComponentProps>,
  command: RoleCommand as React.ComponentType<RoleComponentProps>,
  file: RoleFile as React.ComponentType<RoleComponentProps>,
  guilabel: RoleGUILabel as React.ComponentType<RoleComponentProps>,
  icon: RoleIcon as React.ComponentType<RoleComponentProps>,
  'highlight-blue': RoleHighlight as React.ComponentType<RoleComponentProps>,
  'highlight-green': RoleHighlight as React.ComponentType<RoleComponentProps>,
  'highlight-red': RoleHighlight as React.ComponentType<RoleComponentProps>,
  'highlight-yellow': RoleHighlight as React.ComponentType<RoleComponentProps>,
  'icon-fa5': RoleIcon as React.ComponentType<RoleComponentProps>,
  'icon-fa5-brands': RoleIcon as React.ComponentType<RoleComponentProps>,
  'icon-fa4': RoleIcon as React.ComponentType<RoleComponentProps>,
  'icon-mms': RoleIcon as React.ComponentType<RoleComponentProps>,
  'icon-charts': RoleIcon as React.ComponentType<RoleComponentProps>,
  'icon-lg': RoleIcon as React.ComponentType<RoleComponentProps>,
  kbd: RoleKbd as React.ComponentType<RoleComponentProps>,
  red: RoleRed as React.ComponentType<RoleComponentProps>,
  gold: RoleGold as React.ComponentType<RoleComponentProps>,
  required: RoleRequired as React.ComponentType<RoleComponentProps>,
  sub: Subscript as React.ComponentType<RoleComponentProps>,
  subscript: Subscript as React.ComponentType<RoleComponentProps>,
  sup: Superscript as React.ComponentType<RoleComponentProps>,
  superscript: Superscript as React.ComponentType<RoleComponentProps>,
  'link-new-tab': RoleLinkNewTab as React.ComponentType<RoleComponentProps>,
};

type validComponentKey = Exclude<ComponentType, 'toctree' | 'role' | 'tab'>;

const getComponent = (() => {
  let componentMap:
    | Record<Exclude<ComponentType, 'toctree' | 'role' | 'tab'>, React.ComponentType<SupportedComponentProps>>
    | Record<string, React.ComponentType<SupportedComponentProps>>
    | undefined = undefined;
  return (key: validComponentKey) => {
    if (componentMap === undefined) {
      componentMap = {
        admonition: Admonition as React.ComponentType<SupportedComponentProps>,
        banner: Banner as React.ComponentType<SupportedComponentProps>,
        blockquote: BlockQuote as React.ComponentType<SupportedComponentProps>,
        button: Button as React.ComponentType<SupportedComponentProps>,
        card: Card as React.ComponentType<SupportedComponentProps>,
        'card-group': CardGroup as React.ComponentType<SupportedComponentProps>,
        code: Code as React.ComponentType<SupportedComponentProps>,
        collapsible: Collapsible as React.ComponentType<SupportedComponentProps>,
        'community-driver': CommunityPillLink as React.ComponentType<SupportedComponentProps>,
        'composable-tutorial': ComposableTutorial as React.ComponentType<SupportedComponentProps>,
        'io-code-block': CodeIO as React.ComponentType<SupportedComponentProps>,
        cond: Cond as React.ComponentType<SupportedComponentProps>,
        'cta-banner': CTABanner as React.ComponentType<SupportedComponentProps>,
        definitionList: DefinitionList as React.ComponentType<SupportedComponentProps>,
        definitionListItem: DefinitionListItem as React.ComponentType<SupportedComponentProps>,
        deprecated: VersionModified as React.ComponentType<SupportedComponentProps>,
        'deprecated-version-selector': DeprecatedVersionSelector as React.ComponentType<SupportedComponentProps>,
        describe: Describe as React.ComponentType<SupportedComponentProps>,
        emphasis: Emphasis as React.ComponentType<SupportedComponentProps>,
        extract: Extract as React.ComponentType<SupportedComponentProps>,
        field: Field as React.ComponentType<SupportedComponentProps>,
        field_list: FieldList as React.ComponentType<SupportedComponentProps>,
        figure: Figure as React.ComponentType<SupportedComponentProps>,
        footnote: Footnote as React.ComponentType<SupportedComponentProps>,
        footnote_reference: FootnoteReference as React.ComponentType<SupportedComponentProps>,
        glossary: Glossary as React.ComponentType<SupportedComponentProps>,
        heading: Heading as React.ComponentType<SupportedComponentProps>,
        hlist: HorizontalList as React.ComponentType<SupportedComponentProps>,
        image: Image as React.ComponentType<SupportedComponentProps>,
        include: Include as React.ComponentType<SupportedComponentProps>,
        introduction: Introduction as React.ComponentType<SupportedComponentProps>,
        kicker: Kicker as React.ComponentType<SupportedComponentProps>,
        line: Line as React.ComponentType<SupportedComponentProps>,
        line_block: LineBlock as React.ComponentType<SupportedComponentProps>,
        list: List as React.ComponentType<SupportedComponentProps>,
        listItem: ListItem as React.ComponentType<SupportedComponentProps>,
        'list-table': ListTable as React.ComponentType<SupportedComponentProps>,
        literal: Literal as React.ComponentType<SupportedComponentProps>,
        literalinclude: Include as React.ComponentType<SupportedComponentProps>,
        only: Cond as React.ComponentType<SupportedComponentProps>,
        'openapi-changelog': OpenAPIChangelog as React.ComponentType<SupportedComponentProps>,
        paragraph: Paragraph as React.ComponentType<SupportedComponentProps>,
        procedure: Procedure as React.ComponentType<SupportedComponentProps>,
        ref_role: RefRole as React.ComponentType<SupportedComponentProps>,
        reference: Reference as React.ComponentType<SupportedComponentProps>,
        root: Root as React.ComponentType<SupportedComponentProps>,
        rubric: Rubric as React.ComponentType<SupportedComponentProps>,
        'search-results': SearchResults as React.ComponentType<SupportedComponentProps>,
        section: Section as React.ComponentType<SupportedComponentProps>,
        see: SeeAlso as React.ComponentType<SupportedComponentProps>,
        seealso: SeeAlso as React.ComponentType<SupportedComponentProps>,
        'selected-content': ComposableContent as React.ComponentType<SupportedComponentProps>,
        sharedinclude: Include as React.ComponentType<SupportedComponentProps>,
        strong: Strong as React.ComponentType<SupportedComponentProps>,
        superscript: Superscript as React.ComponentType<SupportedComponentProps>,
        subscript: Subscript as React.ComponentType<SupportedComponentProps>,
        substitution_reference: SubstitutionReference as React.ComponentType<SupportedComponentProps>,
        tabs: Tabs as React.ComponentType<SupportedComponentProps>,
        'tabs-selector': TabSelectors as React.ComponentType<SupportedComponentProps>,
        target: Target as React.ComponentType<SupportedComponentProps>,
        text: Text as React.ComponentType<SupportedComponentProps>,
        time: Time as React.ComponentType<SupportedComponentProps>,
        title_reference: TitleReference as React.ComponentType<SupportedComponentProps>,
        transition: Transition as React.ComponentType<SupportedComponentProps>,
        versionadded: VersionModified as React.ComponentType<SupportedComponentProps>,
        versionchanged: VersionModified as React.ComponentType<SupportedComponentProps>,
        wayfinding: Wayfinding as React.ComponentType<SupportedComponentProps>,
      };
    }
    return componentMap?.[key];
  };
})();

function getComponentType(
  type: NodeType,
  name?: NodeName,
): React.ComponentType<SupportedComponentProps> | React.ComponentType<RoleComponentProps> | undefined {
  const lookup = (type === 'directive' ? name : type) as validComponentKey;
  let ComponentType:
    | React.ComponentType<SupportedComponentProps>
    | React.ComponentType<RoleComponentProps>
    | undefined = lookup ? getComponent(lookup) : undefined;

  if (name) {
    if (type === 'role' && isRoleName(name)) {
      ComponentType = roleMap[name];
    }

    // Various admonition types are all handled by the Admonition component
    if (DEPRECATED_ADMONITIONS.has(name) || (name && name in admonitionMap)) {
      ComponentType = getComponent('admonition');
    }
  }

  if (lookup && LAZY_COMPONENTS[lookup as keyof typeof LazyComponentMap]) {
    return LAZY_COMPONENTS[lookup as keyof typeof LazyComponentMap] as
      | React.ComponentType<SupportedComponentProps>
      | React.ComponentType<RoleComponentProps>
      | undefined;
  }

  return ComponentType;
}

export type ComponentFactoryProps = {
  nodeData: ASTNode;
  page?: RootNode;
  slug?: string;
  /** Only used in RefRole */
  cardRef?: boolean;
  /** Only used in Link and RefRole */
  showLinkArrow?: boolean;
  /** Only used in Paragraph */
  skipPTag?: boolean;
  /** Only used in Literal */
  parentNode?: string;
  /** Only used in Procedure */
  formatTextOptions?: FormatTextOptions;
};

type SupportedComponentProps =
  | BannerProps
  | HeadingProps
  | BlockQuoteProps
  | ComponentFactoryProps
  | CommunityPillLinkProps
  | CondProps
  | CTABannerProps
  | RefRoleProps
  | FieldProps
  | FieldListProps
  | DefinitionListItemProps
  | DefinitionListProps
  | CodeIOProps
  | SectionProps
  | TextProps
  | ParagraphProps
  | ProcedureProps
  | IntroductionProps
  | KickerProps
  | TimeProps
  | TitleReferenceProps
  | RubricProps
  | AdmonitionProps
  | TargetProps
  | LiteralProps
  | ListItemProps
  | ListProps
  | CodeNode
  | FigureProps
  | FootnoteNodeProps
  | FootnoteReferenceProps
  | IncludeProps
  | ButtonProps
  | DescribeProps
  | EmphasisProps
  | LineBlockProps
  | LineProps
  | ExtractProps
  | SeeAlsoProps
  | VersionModifiedProps
  | HorizontalListProps
  | RootProps
  | SubstitutionReferenceProps
  | TabsProps
  | TabSelectorsProps
  | CardProps
  | CardGroupProps
  | ReferenceProps
  | ImageProps
  | GlossaryProps
  | ImageProps
  | CollapsibleProps
  | ListTableProps
  | ComposableContentProps
  | ComposableTutorialProps
  | WayfindingProps;

type RoleComponentProps =
  | AbbrProps
  | RoleClassProps
  | RoleCommandProps
  | RoleFileProps
  | GoldProps
  | RoleGUILabelProps
  | RoleIconProps
  | HighlightProps
  | KbdProps
  | LinkNewTabProps
  | RedProps
  | RoleManualProps;

const renderComponentWithProps = (
  AmbiguousComponentType: React.ComponentType<SupportedComponentProps> | React.ComponentType<RoleComponentProps>,
  type: NodeType,
  name: NodeName | undefined,
  nodeData: ASTNode,
  props: ComponentFactoryProps,
): React.ReactElement => {
  // Add all props that are needed at unknown depths
  const propsToDrill = {
    slug: props.slug,
    skipPTag: props.skipPTag,
  };

  let ComponentType: React.ComponentType<SupportedComponentProps> | React.ComponentType<RoleComponentProps>;
  if (type === 'role' && name && isRoleName(name as RoleName)) {
    ComponentType = AmbiguousComponentType as React.ComponentType<RoleComponentProps>;
    const roleNode = nodeData as RoleNode;

    // Some role nodes have a target property, others don't
    const roleProps: RoleComponentProps & { target?: string } = {
      nodeChildren: roleNode.children,
      name: name,
    };

    // Only add target if it exists on the node
    if ('target' in roleNode) {
      roleProps.target = roleNode.target;
    }

    return <ComponentType {...roleProps} />;
  } else {
    ComponentType = AmbiguousComponentType as React.ComponentType<SupportedComponentProps>;
  }

  if (ComponentType === getComponent('admonition')) {
    const admonitionNode = nodeData as AdmonitionNode;
    return (
      <ComponentType
        nodeChildren={admonitionNode.children}
        argument={admonitionNode.argument}
        name={admonitionNode.name}
        {...propsToDrill}
      />
    );
  } else if (ComponentType === getComponent('blockquote')) {
    const blockquoteNode = nodeData as BlockQuoteNode;
    return <ComponentType nodeChildren={blockquoteNode.children} {...propsToDrill} />;
  } else if (ComponentType === getComponent('code')) {
    const codeNode = nodeData as CodeNode;
    return (
      <ComponentType
        value={codeNode.value}
        lang={codeNode.lang}
        linenos={codeNode.linenos}
        emphasize_lines={codeNode.emphasize_lines}
        copyable={codeNode.copyable}
        source={codeNode.source}
        lineno_start={codeNode.lineno_start}
        caption={codeNode.caption}
      />
    );
  } else if (ComponentType === getComponent('io-code-block')) {
    const ioCodeBlockNode = nodeData as IOCodeBlockNode;
    return <ComponentType nodeChildren={ioCodeBlockNode.children} />;
  } else if (ComponentType == getComponent('community-driver')) {
    const { argument, options } = nodeData as CommunityDriverPill;
    return <ComponentType argument={argument} options={options} {...propsToDrill} />;
  } else if (ComponentType === getComponent('deprecated-version-selector')) {
    return <DeprecatedVersionSelector />;
  } else if (ComponentType === getComponent('field')) {
    const fieldNode = nodeData as FieldNode;
    return (
      <ComponentType
        nodeChildren={fieldNode.children}
        label={fieldNode.label}
        name={fieldNode.name}
        {...propsToDrill}
      />
    );
  } else if (ComponentType === getComponent('field_list')) {
    const fieldListNode = nodeData as FieldListNode;
    return <ComponentType nodeChildren={fieldListNode.children} {...propsToDrill} />;
  } else if (ComponentType === getComponent('definitionList')) {
    const definitionListNode = nodeData as DefinitionListNode;
    return <ComponentType nodeChildren={definitionListNode.children} {...propsToDrill} />;
  } else if (ComponentType === getComponent('definitionListItem')) {
    const definitionListItemNode = nodeData as DefinitionListItemNode;
    return (
      <ComponentType
        nodeChildren={definitionListItemNode.children}
        term={definitionListItemNode.term}
        {...propsToDrill}
      />
    );
  } else if (ComponentType === getComponent('heading')) {
    const headingNode = nodeData as HeadingNode;
    return <ComponentType nodeChildren={headingNode.children} id={headingNode.id} {...propsToDrill} />;
  } else if (ComponentType === getComponent('openapi-changelog')) {
    return <OpenAPIChangelog />;
  } else if (ComponentType === getComponent('text')) {
    const textNode = nodeData as TextNode;
    return <ComponentType value={textNode.value} />;
  } else if (
    ComponentType === getComponent('strong') ||
    ComponentType === getComponent('title_reference') ||
    ComponentType === getComponent('emphasis')
  ) {
    // All nodes that pass on first child's text value
    const node = nodeData as StrongNode | TitleReferenceNode | EmphasisNode;
    return <ComponentType value={node.children[0].value} />;
  } else if (ComponentType === getComponent('glossary')) {
    const { children } = nodeData as ParentNode;
    return <ComponentType nodeChildren={children} {...propsToDrill} />;
  } else if (ComponentType === getComponent('paragraph')) {
    const paragraphNode = nodeData as ParagraphNode;
    return <ComponentType nodeChildren={paragraphNode.children} parentNode={props.parentNode} {...propsToDrill} />;
  } else if (ComponentType === getComponent('seealso')) {
    const seeAlsoNode = nodeData as Directive;
    return <ComponentType nodeChildren={seeAlsoNode.children} argument={seeAlsoNode.argument} {...propsToDrill} />;
  } else if (
    ComponentType === getComponent('line') ||
    ComponentType === getComponent('line_block') ||
    ComponentType === getComponent('extract')
  ) {
    const node = nodeData as ParentNode;
    return <ComponentType nodeChildren={node.children} {...propsToDrill} />;
  } else if (ComponentType === getComponent('introduction')) {
    const introductionNode = nodeData as ParentNode;
    return <ComponentType nodeChildren={introductionNode.children} {...propsToDrill} />;
  } else if (ComponentType === roleMap.subscript) {
    const subscriptNode = nodeData as SubscriptNode;
    return <ComponentType nodeChildren={subscriptNode.children} {...propsToDrill} />;
  } else if (ComponentType === roleMap.superscript) {
    const superscriptNode = nodeData as SuperscriptNode;
    return <ComponentType nodeChildren={superscriptNode.children} {...propsToDrill} />;
  } else if (ComponentType === getComponent('figure')) {
    const figureNode = nodeData as FigureNode;
    return (
      <ComponentType
        nodeChildren={figureNode.children}
        argument={figureNode.argument}
        options={figureNode.options}
        name={figureNode.name}
        {...propsToDrill}
      />
    );
  } else if (ComponentType === getComponent('list')) {
    const { children, position, enumtype, startat } = nodeData as ListNode;
    return (
      <ComponentType
        nodeChildren={children}
        position={position}
        enumtype={enumtype}
        startat={startat}
        {...propsToDrill}
      />
    );
  } else if (ComponentType === getComponent('listItem')) {
    const listItemNode = nodeData as ListItemNode;
    return <ComponentType nodeChildren={listItemNode.children} {...propsToDrill} />;
  } else if (ComponentType === getComponent('literal')) {
    const literalNode = nodeData as LiteralNode;
    return <ComponentType nodeChildren={literalNode.children} formatTextOptions={props.formatTextOptions} />;
  } else if (ComponentType === getComponent('describe')) {
    const describeNode = nodeData as Directive;
    return <ComponentType argument={describeNode.argument} nodeChildren={describeNode.children} {...propsToDrill} />;
  } else if (ComponentType === getComponent('kicker')) {
    const kickerNode = nodeData as Directive;
    return <ComponentType argument={kickerNode.argument} {...propsToDrill} />;
  } else if (ComponentType === getComponent('reference')) {
    const referenceNode = nodeData as ReferenceNode;
    return <ComponentType nodeChildren={referenceNode.children} refuri={referenceNode.refuri} {...propsToDrill} />;
  } else if (ComponentType === getComponent('time')) {
    const timeNode = nodeData as Directive;
    return <ComponentType argument={timeNode.argument} />;
  } else if (ComponentType === getComponent('rubric')) {
    const rubricNode = nodeData as Directive;
    return <ComponentType argument={rubricNode.argument} />;
  } else if (ComponentType === getComponent('section')) {
    const sectionNode = nodeData as ParentNode;
    return <ComponentType nodeChildren={sectionNode.children} {...propsToDrill} />;
  } else if (ComponentType === getComponent('include') || ComponentType === getComponent('literalinclude')) {
    const includeNode = nodeData as ParentNode;
    return <ComponentType nodeChildren={includeNode.children} {...propsToDrill} />;
  } else if (ComponentType === getComponent('hlist')) {
    const hlistNode = nodeData as HorizontalListNode;
    return <ComponentType nodeChildren={hlistNode.children} columns={hlistNode.options.columns} {...propsToDrill} />;
  } else if (ComponentType === VersionModified) {
    const versionModifiedNode = nodeData as Directive;
    return (
      <ComponentType
        argument={versionModifiedNode.argument}
        nodeChildren={versionModifiedNode.children}
        name={versionModifiedNode.name}
        {...propsToDrill}
      />
    );
  } else if (ComponentType === getComponent('cond')) {
    const condNode = nodeData as Directive;
    return <ComponentType nodeData={condNode} />;
  } else if (ComponentType === getComponent('target')) {
    const targetNode = nodeData as TargetNode;
    return (
      <ComponentType
        nodeChildren={targetNode.children}
        html_id={targetNode.html_id}
        name={targetNode.name}
        options={targetNode.options}
        {...propsToDrill}
      />
    );
  } else if (ComponentType === getComponent('footnote')) {
    const footnoteNode = nodeData as FootnoteNode;
    return <ComponentType id={footnoteNode.id} name={footnoteNode.name} nodeChildren={footnoteNode.children} />;
  } else if (ComponentType === getComponent('footnote_reference')) {
    const footnoteReferenceNode = nodeData as FootnoteReferenceNode;
    return <ComponentType id={footnoteReferenceNode.id} refname={footnoteReferenceNode.refname} />;
  } else if (ComponentType === getComponent('button')) {
    const buttonNode = nodeData as ButtonNode;
    return <ComponentType argument={buttonNode.argument} options={buttonNode.options} {...propsToDrill} />;
  } else if (ComponentType === getComponent('procedure')) {
    const procedureNode = nodeData as ProcedureNode;
    return <ComponentType nodeChildren={procedureNode.children} options={procedureNode.options} {...propsToDrill} />;
  } else if (ComponentType === getComponent('substitution_reference')) {
    const substitutionReferenceNode = nodeData as SubstitutionReferenceNode;
    return (
      <ComponentType
        nodeChildren={substitutionReferenceNode.children}
        name={substitutionReferenceNode.name}
        {...propsToDrill}
      />
    );
  } else if (ComponentType === getComponent('banner')) {
    const bannerNode = nodeData as BannerNode;
    return <ComponentType nodeChildren={bannerNode.children} options={bannerNode.options} {...propsToDrill} />;
  } else if (ComponentType === getComponent('cta-banner')) {
    const ctaBannerNode = nodeData as CTABannerNode;
    return <ComponentType nodeChildren={ctaBannerNode.children} options={ctaBannerNode.options} {...propsToDrill} />;
  } else if (ComponentType === getComponent('card')) {
    const cardNode = nodeData as CardNode;
    return (
      <ComponentType
        nodeChildren={cardNode.children}
        cta={cardNode.options.cta}
        headline={cardNode.options.headline}
        icon={cardNode.options.icon}
        {...{
          'icon-dark': cardNode.options['icon-dark'],
          'icon-alt': cardNode.options['icon-alt'],
        }}
        tag={cardNode.options.tag}
        url={cardNode.options.url}
        {...propsToDrill}
      />
    );
  } else if (ComponentType === getComponent('card-group')) {
    const cardGroupNode = nodeData as CardGroupNode;
    return (
      <ComponentType
        nodeChildren={cardGroupNode.children}
        columns={cardGroupNode.options.columns}
        layout={cardGroupNode.options.layout}
        style={cardGroupNode.options.style}
        type={cardGroupNode.options.type}
        {...propsToDrill}
      />
    );
  } else if (ComponentType === getComponent('ref_role')) {
    const refRoleNode = nodeData as RefRoleNode;
    return (
      <ComponentType
        nodeChildren={refRoleNode.children}
        fileid={refRoleNode.fileid}
        url={refRoleNode.url}
        cardRef={props.cardRef}
        showLinkArrow={props.showLinkArrow}
      />
    );
  } else if (ComponentType === getComponent('tabs')) {
    const tabsNode = nodeData as TabsNode;
    return <ComponentType nodeChildren={tabsNode.children} options={tabsNode.options} {...propsToDrill} />;
  } else if (ComponentType === getComponent('tabs-selector')) {
    return <ComponentType />;
  } else if (ComponentType === getComponent('image')) {
    const { argument, options } = nodeData as ImageNode;
    return <ComponentType argument={argument} options={options} {...propsToDrill} />;
  } else if (ComponentType === getComponent('collapsible')) {
    const collapsibleNode = nodeData as CollapsibleNode;
    return (
      <ComponentType nodeChildren={collapsibleNode.children} options={collapsibleNode.options} {...propsToDrill} />
    );
  } else if (ComponentType === getComponent('list-table')) {
    const listTableNode = nodeData as ListTableNode;
    return <ListTable nodeChildren={listTableNode.children} options={listTableNode.options} />;
  } else if (ComponentType === getComponent('transition')) {
    return <Transition />;
  } else if (ComponentType === getComponent('root')) {
    const rootNode = nodeData as RootNode;
    return <Root nodeChildren={rootNode.children} {...propsToDrill} />;
  } else if (ComponentType === getComponent('composable-tutorial')) {
    const composableTutorialNode = nodeData as ComposableTutorialNode;
    return (
      <ComposableTutorial
        nodeChildren={composableTutorialNode.children}
        composableOptions={composableTutorialNode.composable_options}
      />
    );
  } else if (ComponentType === getComponent('selected-content')) {
    const selectedContentNode = nodeData as ComposableNode;
    return (
      <ComposableContent nodeChildren={selectedContentNode.children} selections={selectedContentNode.selections} />
    );
  } else if (ComponentType === getComponent('wayfinding')) {
    const wayfindingNode = nodeData as WayfindingNode;
    return <ComponentType nodeChildren={wayfindingNode.children} argument={wayfindingNode.argument} />;
  }

  // Default: spread all props for other components
  return <ComponentType {...props} />;
};

const ComponentFactory = (props: ComponentFactoryProps) => {
  const { nodeData, slug } = props;

  const selectComponent = () => {
    let domain: string | undefined = '';
    let name: NodeName | undefined;
    const { type } = nodeData;

    if ('name' in nodeData) name = nodeData.name as NodeName;
    if ('domain' in nodeData) domain = nodeData.domain as string;

    if (IGNORED_TYPES.has(type) || (name && IGNORED_NAMES.has(name))) {
      return null;
    }

    // Warn on unexpected usage of domains, but don't break
    const validDomains = ['mongodb', 'std', 'landing'];
    if (domain && !validDomains.includes(domain)) {
      console.warn(`Domain '${domain}' not yet implemented ${name ? `for '${name}'` : ''}`);
    }

    const ComponentType = getComponentType(type, name);

    if (!ComponentType) {
      console.warn(`${type} ${name ? `"${name}" ` : ''}not yet implemented${slug ? ` on page ${slug}` : ''}`);
      return null;
    }

    return renderComponentWithProps(ComponentType, type, name, nodeData, props);
  };

  if (!nodeData) return null;
  return selectComponent();
};

export default ComponentFactory;
