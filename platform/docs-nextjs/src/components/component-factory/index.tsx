import {
  ASTNode,
  ComponentType,
  NodeName,
  NodeType,
  ParagraphNode,
  RoleName,
  Root as RootNode,
  TextNode,
} from '@/types/ast';
import { isParentNode, isRoleName } from '@/types/ast-utils';
import Text, { type TextProps } from '@/components/text';
import Paragraph, { ParagraphProps } from '../paragraph';

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

const IGNORED_TYPES = new Set([
  'comment',
  'inline_target',
  'named_reference',
  'substitution_definition',
]);
// TODO: reinsert when developing adomnitions
// const DEPRECATED_ADMONITIONS = new Set(['admonition', 'caution', 'danger']);

const roleMap: Record<
  RoleName,
  React.ComponentType<SupportedComponentProps>
> = {
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
  // sub: Subscript,
  // subscript: Subscript,
  // sup: Superscript,
  // superscript: Superscript,
  // 'link-new-tab': RoleLinkNewTab,
};

type validComponentKey = Exclude<
  ComponentType,
  'toctree' | 'role' | 'tab' | 'selected-content'
>;

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
        // admonition: Admonition,
        // banner: Banner,
        // blockquote: BlockQuote,
        // button: Button,
        // card: Card,
        // 'card-group': CardGroup,
        // chapter: Chapter,
        // chapters: Chapters,
        // code: Code,
        // collapsible: Collapsible,
        // 'community-driver': CommunityPillLink,
        // 'composable-tutorial': ComposableTutorial,
        // 'io-code-block': CodeIO,
        // cond: Cond,
        // container: Container,
        // cta: CTA,
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
        // introduction: Introduction,
        // kicker: Kicker,
        // line: Line,
        // line_block: LineBlock,
        // list: List,
        // listItem: ListItem,
        // 'list-table': ListTable,
        // literal: Literal,
        // literal_block: LiteralBlock,
        // literalinclude: LiteralInclude,
        // 'method-selector': MethodSelector,
        // only: Cond,
        // 'openapi-changelog': OpenAPIChangelog,
        paragraph: Paragraph as React.ComponentType<SupportedComponentProps>,
        // procedure: Procedure,
        // ref_role: RefRole,
        // reference: Reference,
        // release_specification: ReleaseSpecification,
        // root: Root,
        // rubric: Rubric,
        // 'search-results': SearchResults,
        // section: Section,
        // seealso: SeeAlso,
        // sharedinclude: Include,
        // strong: Strong,
        // superscript: Superscript,
        // subscript: Subscript,
        // substitution_reference: SubstitutionReference,
        // tabs: Tabs,
        // 'tabs-selector': TabSelectors,
        // target: Target,
        text: Text as React.ComponentType<SupportedComponentProps>,
        // time: Time,
        // title_reference: TitleReference,
        // transition: Transition,
        // versionadded: VersionModified,
        // versionchanged: VersionModified,
        // wayfinding: Wayfinding,
      };
    }
    return componentMap?.[key];
  };
})();

function getComponentType(
  type: NodeType,
  name?: NodeName
): React.ComponentType<SupportedComponentProps> | undefined {
  const lookup = (type === 'directive' ? name : type) as validComponentKey;
  let ComponentType: React.ComponentType<SupportedComponentProps> | undefined =
    lookup ? getComponent(lookup) : undefined;

  if (name) {
    if (type === 'role' && isRoleName(name)) {
      ComponentType = roleMap[name];
    }

    // Various admonition types are all handled by the Admonition component
    // if (DEPRECATED_ADMONITIONS.has(name) || name in admonitionMap) {
    //   ComponentType = getComponent('admonition');
    // }
  }

  // if (lookup && LAZY_COMPONENTS[lookup]) {
  //   return LAZY_COMPONENTS[lookup];
  // }

  // TODO: return {componentType: ComponentType, props: SpreadComponentProps}
  return ComponentType;
}

export type ComponentFactoryProps = {
  nodeData: ASTNode;
  slug?: string;
  sectionDepth?: string | number;
  page?: RootNode;
  [key: string]: unknown;
};

type SupportedComponentProps = ComponentFactoryProps | TextProps | ParagraphProps;

const renderComponentWithProps = (
  ComponentType: React.ComponentType<SupportedComponentProps>,
  nodeData: ASTNode,
  props: ComponentFactoryProps
): React.ReactElement => {
  // Special handling for Text component
  if (ComponentType === getComponent('text')) {
    const textNode = nodeData as TextNode;
    return <ComponentType value={textNode.value} />;
  } else if (ComponentType === getComponent('paragraph')) {
    const paragraphNode = nodeData as ParagraphNode;
    return <ComponentType nodeChildren={paragraphNode.children} {...props} />
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
      console.warn(
        `Domain '${domain}' not yet implemented ${name ? `for '${name}'` : ''}`
      );
    }

    const ComponentType = getComponentType(type, name);

    // TODO: remove this when we have all components implemented
    if (!ComponentType) {
      return (
        <div className={'component-container'} style={{ paddingTop: '3rem' }}>
          Component for {type} {name ? `"${name}" ` : ''}not yet implemented
          <br />
          <div>
            {isParentNode(nodeData) &&
              nodeData.children.length > 0 &&
              nodeData.children.map((child, index) => (
                <ComponentFactory nodeData={child} key={`${slug}-${index}`} />
              ))}
          </div>
        </div>
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
