import type {
  ASTNode,
  ComponentType,
  Directive,
  LiteralNode,
  NodeName,
  NodeType,
  ParagraphNode,
  ParentNode,
  RoleName,
  Root as RootNode,
  StrongNode,
  SubscriptNode,
  SuperscriptNode,
  TextNode,
  TitleReferenceNode,
  TargetNode,
  ButtonNode,
} from '@/types/ast';
import { isParentNode, isRoleName } from '@/types/ast-utils';

import Admonition, { type AdmonitionProps } from '../admonition';
import { admonitionMap } from '../admonition/constants';
import Text, { type TextProps } from '../text';
import Paragraph, { type ParagraphProps } from '../paragraph';
import Kicker, { type KickerProps } from '../kicker';
import TitleReference, { type TitleReferenceProps } from '../title-reference';
import Time, { type TimeProps } from '../time';
import type { IntroductionProps } from '../introduction';
import Introduction from '../introduction';
import Section, { type SectionProps } from '../section';
import Cond, { type CondProps } from '../cond';
import Strong from '../strong';
import Subscript from '../subscript';
import Superscript from '../superscript';
import type { RubricProps } from '../rubric';
import Rubric from '../rubric';
import type { TargetProps } from '../target';
import Target from '../target';
import type { FormatTextOptions, LiteralProps } from '../literal';
import Literal from '../literal';
import Button, { type ButtonProps } from '../button';

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

const roleMap: Record<RoleName, React.ComponentType<SupportedComponentProps>> = {
  // abbr: RoleAbbr,
  // class: RoleClass,
  // command: RoleCommand,
  // file: RoleFile,
  // guilabel: RoleGUILabel,
  // icon: RoleIcon,
  // 'highlight-blue': RoleHighlight,
  // 'highlight-green': RoleHighlight,
  // 'highlight-red': RoleHighlight,
  // 'highlight-yellow': RoleHighlight,
  // 'icon-fa5': RoleIcon,
  // 'icon-fa5-brands': RoleIcon,
  // 'icon-fa4': RoleIcon,
  // 'icon-mms': RoleIcon,
  // 'icon-charts': RoleIcon,
  // 'icon-lg': RoleIcon,
  // kbd: RoleKbd,
  // red: RoleRed,
  // gold: RoleGold,
  // required: RoleRequired,
  sub: Subscript as React.ComponentType<SupportedComponentProps>,
  subscript: Subscript as React.ComponentType<SupportedComponentProps>,
  sup: Superscript as React.ComponentType<SupportedComponentProps>,
  superscript: Superscript as React.ComponentType<SupportedComponentProps>,
  // 'link-new-tab': RoleLinkNewTab,
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
        // blockquote: BlockQuote,
        button: Button as React.ComponentType<SupportedComponentProps>,
        // card: Card,
        // 'card-group': CardGroup,
        // chapter: Chapter,
        // chapters: Chapters,
        // code: Code,
        // collapsible: Collapsible,
        // 'community-driver': CommunityPillLink,
        // 'composable-tutorial': ComposableTutorial,
        // 'io-code-block': CodeIO,
        cond: Cond as React.ComponentType<SupportedComponentProps>,
        // container: Container,
        // 'cta-banner': CTABanner,
        // definitionList: DefinitionList,
        // definitionListItem: DefinitionListItem,
        // deprecated: VersionModified,
        // 'deprecated-version-selector': DeprecatedVersionSelector,
        // describe: Describe,
        // emphasis: Emphasis,
        // extract: Extract,
        // field: Field,
        // field_list: FieldList,
        // figure: Figure,
        // footnote: Footnote,
        // footnote_reference: FootnoteReference,
        // glossary: Glossary,
        // 'guide-next': GuideNext,
        // heading: Heading,
        // hlist: HorizontalList,
        // image: Image,
        // include: Include,
        introduction: Introduction as React.ComponentType<SupportedComponentProps>,
        kicker: Kicker as React.ComponentType<SupportedComponentProps>,
        // line: Line,
        // line_block: LineBlock,
        // list: List,
        // listItem: ListItem,
        // 'list-table': ListTable,
        literal: Literal as React.ComponentType<SupportedComponentProps>,
        // literal_block: LiteralBlock,
        // literalinclude: LiteralInclude,
        // 'method-selector': MethodSelector,
        only: Cond as React.ComponentType<SupportedComponentProps>,
        // 'openapi-changelog': OpenAPIChangelog,
        paragraph: Paragraph as React.ComponentType<SupportedComponentProps>,
        // procedure: Procedure,
        // ref_role: RefRole,
        // reference: Reference,
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
        // substitution_reference: SubstitutionReference,
        // tabs: Tabs,
        // 'tabs-selector': TabSelectors,
        target: Target as React.ComponentType<SupportedComponentProps>,
        text: Text as React.ComponentType<SupportedComponentProps>,
        time: Time as React.ComponentType<SupportedComponentProps>,
        title_reference: TitleReference as React.ComponentType<SupportedComponentProps>,
        // transition: Transition,
        // versionadded: VersionModified,
        // versionchanged: VersionModified,
        // wayfinding: Wayfinding,
      };
    }
    return componentMap?.[key];
  };
})();

function getComponentType(type: NodeType, name?: NodeName): React.ComponentType<SupportedComponentProps> | undefined {
  const lookup = (type === 'directive' ? name : type) as validComponentKey;
  let ComponentType: React.ComponentType<SupportedComponentProps> | undefined = lookup
    ? getComponent(lookup)
    : undefined;

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
};

type SupportedComponentProps =
  | ComponentFactoryProps
  | CondProps
  | SectionProps
  | TextProps
  | ParagraphProps
  | IntroductionProps
  | KickerProps
  | TimeProps
  | TitleReferenceProps
  | RubricProps
  | AdmonitionProps
  | TargetProps
  | LiteralProps
  | ButtonProps;

const renderComponentWithProps = (
  ComponentType: React.ComponentType<SupportedComponentProps>,
  nodeData: ASTNode,
  props: ComponentFactoryProps,
): React.ReactElement => {
  // Add all props that are needed at unknown depths
  const propsToDrill = {
    sectionDepth: props.sectionDepth,
    skipPTag: props.skipPTag,
  };

  if (ComponentType === getComponent('text')) {
    const textNode = nodeData as TextNode;
    return <ComponentType value={textNode.value} />;
  } else if (ComponentType === getComponent('strong') || ComponentType === getComponent('title_reference')) {
    // All nodes that pass on first child's text value
    const node = nodeData as StrongNode | TitleReferenceNode;
    return <ComponentType value={node.children[0].value} />;
  } else if (ComponentType === getComponent('paragraph')) {
    const paragraphNode = nodeData as ParagraphNode;
    return <ComponentType nodeChildren={paragraphNode.children} parentNode={props.parentNode} {...propsToDrill} />;
  } else if (ComponentType === getComponent('introduction')) {
    const introductionNode = nodeData as ParentNode;
    return <ComponentType nodeChildren={introductionNode.children} {...propsToDrill} />;
  } else if (ComponentType === roleMap.subscript) {
    const subscriptNode = nodeData as SubscriptNode;
    return <ComponentType nodeChildren={subscriptNode.children} {...propsToDrill} />;
  } else if (ComponentType === roleMap.superscript) {
    const superscriptNode = nodeData as SuperscriptNode;
    return <ComponentType nodeChildren={superscriptNode.children} {...propsToDrill} />;
  } else if (ComponentType === getComponent('literal')) {
    const literalNode = nodeData as LiteralNode;
    return <ComponentType nodeChildren={literalNode.children} formatTextOptions={props.formatTextOptions} />;
  } else if (ComponentType === getComponent('kicker')) {
    const kickerNode = nodeData as Directive;
    return <ComponentType argument={kickerNode.argument} {...propsToDrill} />;
  } else if (ComponentType === getComponent('time')) {
    const timeNode = nodeData as Directive;
    return <ComponentType argument={timeNode.argument} />;
  } else if (ComponentType === getComponent('rubric')) {
    const rubricNode = nodeData as Directive;
    return <ComponentType argument={rubricNode.argument} />;
  } else if (ComponentType === getComponent('section')) {
    const sectionNode = nodeData as ParentNode;
    return <ComponentType nodeChildren={sectionNode.children} {...propsToDrill} />;
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
  } else if (ComponentType === getComponent('button')) {
    const buttonNode = nodeData as ButtonNode;
    return <ComponentType argument={buttonNode.argument} options={buttonNode.options} {...propsToDrill} />;
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

    return renderComponentWithProps(ComponentType, nodeData, props);
  };

  if (!nodeData) return null;
  return selectComponent();
};

export default ComponentFactory;
