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
  TabsNode,
  HorizontalListNode,
  CardNode,
  CardGroupNode,
  ReferenceNode,
} from '@/types/ast';
import { isParentNode, isRoleName } from '@/types/ast-utils';
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
import type {} from '@/components/literal';
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
import Card, { type CardProps } from '@/components/card';
import CardGroup, { type CardGroupProps } from '@/components/card/card-group';

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

type validComponentKey = Exclude<ComponentType, 'toctree' | 'role' | 'tab' | 'selected-content'>;

const getComponent = (() => {
  let componentMap:
    | Record<
        Exclude<ComponentType, 'toctree' | 'role' | 'tab' | 'selected-content'>,
        React.ComponentType<SupportedComponentProps>
      >
    | Record<string, React.ComponentType<SupportedComponentProps>>
    | undefined = undefined;
  return (key: validComponentKey) => {
    if (componentMap === undefined) {
      componentMap = {
        admonition: Admonition as React.ComponentType<SupportedComponentProps>,
        // banner: Banner,
        blockquote: BlockQuote as React.ComponentType<SupportedComponentProps>,
        button: Button as React.ComponentType<SupportedComponentProps>,
        card: Card as React.ComponentType<SupportedComponentProps>,
        'card-group': CardGroup as React.ComponentType<SupportedComponentProps>,
        // chapter: Chapter,
        // chapters: Chapters,
        code: Code as React.ComponentType<SupportedComponentProps>,
        // collapsible: Collapsible,
        'community-driver': CommunityPillLink as React.ComponentType<SupportedComponentProps>,
        // 'composable-tutorial': ComposableTutorial,
        // 'io-code-block': CodeIO,
        cond: Cond as React.ComponentType<SupportedComponentProps>,
        // container: Container,
        // 'cta-banner': CTABanner,
        // definitionList: DefinitionList,
        // definitionListItem: DefinitionListItem,
        deprecated: VersionModified as React.ComponentType<SupportedComponentProps>,
        // 'deprecated-version-selector': DeprecatedVersionSelector,
        describe: Describe as React.ComponentType<SupportedComponentProps>,
        emphasis: Emphasis as React.ComponentType<SupportedComponentProps>,
        extract: Extract as React.ComponentType<SupportedComponentProps>,
        // field: Field,
        // field_list: FieldList,
        // figure: Figure,
        footnote: Footnote as React.ComponentType<SupportedComponentProps>,
        footnote_reference: FootnoteReference as React.ComponentType<SupportedComponentProps>,
        // glossary: Glossary,
        // 'guide-next': GuideNext,
        // heading: Heading,
        hlist: HorizontalList as React.ComponentType<SupportedComponentProps>,
        // image: Image,
        include: Include as React.ComponentType<SupportedComponentProps>,
        introduction: Introduction as React.ComponentType<SupportedComponentProps>,
        kicker: Kicker as React.ComponentType<SupportedComponentProps>,
        line: Line as React.ComponentType<SupportedComponentProps>,
        line_block: LineBlock as React.ComponentType<SupportedComponentProps>,
        list: List as React.ComponentType<SupportedComponentProps>,
        listItem: ListItem as React.ComponentType<SupportedComponentProps>,
        // 'list-table': ListTable,
        literal: Literal as React.ComponentType<SupportedComponentProps>,
        // literal_block: LiteralBlock,
        literalinclude: Include as React.ComponentType<SupportedComponentProps>,
        // 'method-selector': MethodSelector,
        only: Cond as React.ComponentType<SupportedComponentProps>,
        // 'openapi-changelog': OpenAPIChangelog,
        paragraph: Paragraph as React.ComponentType<SupportedComponentProps>,
        procedure: Procedure as React.ComponentType<SupportedComponentProps>,
        // ref_role: RefRole,
        reference: Reference as React.ComponentType<SupportedComponentProps>,
        // release_specification: ReleaseSpecification,
        // root: Root,
        rubric: Rubric as React.ComponentType<SupportedComponentProps>,
        // 'search-results': SearchResults,
        section: Section as React.ComponentType<SupportedComponentProps>,
        // seealso: SeeAlso,
        // sharedinclude: Include,
        strong: Strong as React.ComponentType<SupportedComponentProps>,
        // superscript: Superscript,
        // subscript: Subscript,
        substitution_reference: SubstitutionReference as React.ComponentType<SupportedComponentProps>,
        tabs: Tabs as React.ComponentType<SupportedComponentProps>,
        'tabs-selector': TabSelectors as React.ComponentType<SupportedComponentProps>,
        target: Target as React.ComponentType<SupportedComponentProps>,
        text: Text as React.ComponentType<SupportedComponentProps>,
        time: Time as React.ComponentType<SupportedComponentProps>,
        title_reference: TitleReference as React.ComponentType<SupportedComponentProps>,
        // transition: Transition,
        versionadded: VersionModified as React.ComponentType<SupportedComponentProps>,
        versionchanged: VersionModified as React.ComponentType<SupportedComponentProps>,
        // wayfinding: Wayfinding,
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

  // if (lookup && LAZY_COMPONENTS[lookup]) {
  //   return LAZY_COMPONENTS[lookup];
  // }

  // TODO: return {componentType: ComponentType, props: SpreadComponentProps}
  return ComponentType;
}

export type ComponentFactoryProps = {
  nodeData: ASTNode;
  page?: RootNode;
  slug?: string;
  sectionDepth?: string | number;
  skipPTag?: boolean;
  /** Only used in Paragraph */
  parentNode?: string;
  /** Only used in Literal */
  formatTextOptions?: FormatTextOptions;
  /** Only used in Procedure */
};

type SupportedComponentProps =
  | BlockQuoteProps
  | ComponentFactoryProps
  | CommunityPillLinkProps
  | CondProps
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
  | FootnoteNodeProps
  | FootnoteReferenceProps
  | IncludeProps
  | ButtonProps
  | DescribeProps
  | EmphasisProps
  | LineBlockProps
  | LineProps
  | ExtractProps
  | VersionModifiedProps
  | HorizontalListProps
  | SubstitutionReferenceProps
  | TabsProps
  | TabSelectorsProps
  | CardProps
  | CardGroupProps
  | ReferenceProps;

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
    sectionDepth: props.sectionDepth,
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

  if (ComponentType === getComponent('blockquote')) {
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
  } else if (ComponentType == getComponent('community-driver')) {
    const { argument, options } = nodeData as CommunityDriverPill;
    return <ComponentType argument={argument} options={options} {...propsToDrill} />;
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
  } else if (ComponentType === getComponent('paragraph')) {
    const paragraphNode = nodeData as ParagraphNode;
    return <ComponentType nodeChildren={paragraphNode.children} parentNode={props.parentNode} {...propsToDrill} />;
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
  } else if (ComponentType === getComponent('tabs')) {
    const tabsNode = nodeData as TabsNode;
    return <ComponentType nodeChildren={tabsNode.children} options={tabsNode.options} {...propsToDrill} />;
  } else if (ComponentType === getComponent('tabs-selector')) {
    return <ComponentType />;
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

    // TODO: remove this when we have all components implemented
    if (!ComponentType) {
      return (
        <span className={'component-container'}>
          Component for {type} {name ? `"${name}" ` : ''}not yet implemented
          <br />
          <span>
            {isParentNode(nodeData) &&
              nodeData.children.length > 0 &&
              nodeData.children.map((child, index) => <ComponentFactory nodeData={child} key={`${slug}-${index}`} />)}
          </span>
        </span>
      );
      // console.warn(`${type} ${name ? `"${name}" ` : ''}not yet implemented${slug ? ` on page ${slug}` : ''}`);
      // return null;
    }

    return renderComponentWithProps(ComponentType, type, name, nodeData, props);
  };

  if (!nodeData) return null;
  return selectComponent();
};

export default ComponentFactory;
