import type { MDXComponents } from 'mdx/types';
import { Image } from '@/mdx-components/Image';
import { Include } from '@/mdx-components/Include';
import { Reference } from '@/mdx-components/Reference';
import { Admonition } from '@/mdx-components/Admonition';
import { Banner } from '@/mdx-components/Banner';
import { Collapsible } from '@/mdx-components/collapsible';
import { DefinitionListItem } from '@/mdx-components/DefinitionListItem';
import { DefinitionDescription } from '@/mdx-components/DefinitionDescription';
import { Heading } from '@/mdx-components/Heading';
import { HorizontalList } from '@/mdx-components/HorizontalList';
import { Paragraph } from '@/mdx-components/Paragraph';
import { Transition } from '@/mdx-components/Transition';
import { List } from '@/mdx-components/List';
import { ListItem } from '@/mdx-components/ListItem';
import Procedure from '@/mdx-components/procedure';
import Step from '@/mdx-components/procedure/step';
import { Introduction } from '@/mdx-components/Introduction';
import { CommunityPillLink } from '@/mdx-components/CommunityPillLink';
import ComposableTutorial from '@/mdx-components/ComposableTutorial';
import ComposableContent from '@/mdx-components/ComposableTutorial/ComposableContent';
import Button from '@/mdx-components/Button';
import { Highlight } from '@/mdx-components/Highlight';
import Card from '@/mdx-components/Card';
import CardGroup from '@/mdx-components/Card/CardGroup';
import { GUILabel } from '@/mdx-components/GUILabel';
import { Red } from '@/mdx-components/Red';
import { Gold } from '@/mdx-components/Gold';
import { Kbd } from '@/mdx-components/Kbd';
import { Abbr } from '@/mdx-components/Abbr';

type InjectedProps = Record<string, unknown>;

export const components = (injectedProps?: InjectedProps) =>
  ({
    // basic components required for MDX rendering
    h1: ({ children }) => <Heading headingLevel={1}>{children}</Heading>,
    h2: ({ children }) => <Heading headingLevel={2}>{children}</Heading>,
    h3: ({ children }) => <Heading headingLevel={3}>{children}</Heading>,
    h4: ({ children }) => <Heading headingLevel={4}>{children}</Heading>,
    h5: ({ children }) => <Heading headingLevel={5}>{children}</Heading>,
    h6: ({ children }) => <Heading headingLevel={6}>{children}</Heading>,
    Image: (props) => <Image {...props} {...injectedProps} />,
    Include: (props) => <Include {...props} {...injectedProps} />,
    Reference: (props) => <Reference {...props} {...injectedProps} />,
    // standard markdown elements
    p: ({ children, ...props }) => <Paragraph {...props}>{children}</Paragraph>,
    // dummy mappings for everything else
    Tip: ({ children, ...props }) => (
      <Admonition name="tip" {...props}>
        {children}
      </Admonition>
    ),
    Note: ({ children, ...props }) => (
      <Admonition name="note" {...props}>
        {children}
      </Admonition>
    ),
    Important: ({ children, ...props }) => (
      <Admonition name="important" {...props}>
        {children}
      </Admonition>
    ),
    Abbr: ({ children, ...props }) => <Abbr {...props}>{children}</Abbr>,
    Banner: ({ children, ...props }) => <Banner {...props}>{children}</Banner>,
    Blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    Button: ({ children, ...props }) => <Button {...props}>{children}</Button>,
    Card: ({ children, ...props }) => <Card {...props}>{children}</Card>,
    CardGroup: ({ children, ...props }) => <CardGroup {...props}>{children}</CardGroup>,
    Chapters: ({ children }) => <span>{children}</span>,
    Chapter: ({ children }) => <span>{children}</span>,
    Code: ({ children }) => <span>{children}</span>,
    Contents: ({ children }) => <span>{children}</span>,
    Facet: ({ children }) => <span>{children}</span>,
    Collapsible: ({ children, ...props }) => <Collapsible {...props}>{children}</Collapsible>,
    CommunityDriver: ({ children, ...props }) => <CommunityPillLink {...props}>{children}</CommunityPillLink>,
    ComposableContent: ({ children, selections, ...props }) => (
      <ComposableContent selections={selections} {...props}>
        {children}
      </ComposableContent>
    ),
    ComposableTutorial: ({ children, composableOptions, ...props }) => (
      <ComposableTutorial composableOptions={composableOptions ?? []} {...props}>
        {children}
      </ComposableTutorial>
    ),
    IOCodeBlock: ({ children }) => <span>{children}</span>,
    Cond: ({ children }) => <span>{children}</span>,
    Container: ({ children }) => <span>{children}</span>,
    CtaBanner: ({ children }) => <span>{children}</span>,
    CTABanner: ({ children }) => <span>{children}</span>,
    DefaultDomain: ({ children }) => <span>{children}</span>,
    DefinitionList: ({ children }) => <dl>{children}</dl>,
    DefinitionListItem: ({ children, ...props }) => <DefinitionListItem {...props}>{children}</DefinitionListItem>,
    DefinitionTerm: ({ children }) => <dt>{children}</dt>,
    DefinitionDescription: ({ children }) => <DefinitionDescription>{children}</DefinitionDescription>,
    Deprecated: ({ children }) => <span>{children}</span>,
    DeprecatedVersionSelector: ({ children }) => <span>{children}</span>,
    Describe: ({ children }) => <span>{children}</span>,
    Example: ({ children }) => <span>{children}</span>,
    Extract: ({ children }) => children,
    Field: ({ children }) => <span>{children}</span>,
    FieldList: ({ children }) => <span>{children}</span>,
    Figure: ({ children }) => <span>{children}</span>,
    Footnote: ({ children }) => <span>{children}</span>,
    FootnoteReference: ({ children }) => <span>{children}</span>,
    Glossary: ({ children }) => <span>{children}</span>,
    Gold: ({ children }) => <Gold>{children}</Gold>,
    GuideNext: ({ children }) => <span>{children}</span>,
    Guilabel: ({ children }) => <GUILabel>{children}</GUILabel>,
    Heading: ({ children, ...props }) => <Heading {...props}>{children}</Heading>,
    Highlight: ({ children, ...props }) => <Highlight {...props}>{children}</Highlight>,
    Hlist: ({ children, ...props }) => <HorizontalList {...props}>{children}</HorizontalList>,
    Icon: ({ children }) => <span>{children}</span>,
    IconMms: ({ children }) => <span>{children}</span>,
    IconFa5: ({ children }) => <span>{children}</span>,
    Introduction: ({ children }) => <Introduction>{children}</Introduction>,
    Input: ({ children }) => <span>{children}</span>,
    IoCodeBlock: ({ children }) => <span>{children}</span>,
    Kbd: ({ children }) => <Kbd>{children}</Kbd>,
    Kicker: ({ children }) => <span>{children}</span>,
    // built-in list syntax → List/ListItem (prefer over custom List/ListItem directives)
    ol: ({ children, ...props }) => <List {...props}>{children}</List>,
    ul: ({ children, ...props }) => (
      <List enumtype="unordered" {...props}>
        {children}
      </List>
    ),
    li: ({ children, ...props }) => <ListItem {...props}>{children}</ListItem>,
    ListTable: ({ children }) => <span>{children}</span>,
    Literal: ({ children }) => <span>{children}</span>,
    LiteralBlock: ({ children }) => <span>{children}</span>,
    LiteralInclude: ({ children }) => <span>{children}</span>,
    MethodSelector: ({ children }) => <span>{children}</span>,
    Only: ({ children }) => <span>{children}</span>,
    Output: ({ children }) => <span>{children}</span>,
    OpenAPIChangelog: ({ children }) => <span>{children}</span>,
    Procedure: ({ children, ...props }) => <Procedure {...props}>{children}</Procedure>,
    Step: ({ children, ...props }) => <Step {...props}>{children}</Step>,
    Ref: ({ children }) => <span>{children}</span>,
    Red: ({ children }) => <Red>{children}</Red>,
    ReleaseSpecification: ({ children }) => <span>{children}</span>,
    Root: ({ children }) => <span>{children}</span>,
    Rubric: ({ children }) => <span>{children}</span>,
    Replacement: ({ children }) => <span>{children}</span>,
    SearchResults: ({ children }) => <span>{children}</span>,
    See: ({ children }) => <span>{children}</span>,
    SeeAlso: ({ children, ...props }) => (
      <Admonition name="note" {...props}>
        {children}
      </Admonition>
    ),
    // TODO: Remove duplicate once mapping is fixed in DOP-6577
    Seealso: ({ children, ...props }) => (
      <Admonition name="note" {...props}>
        {children}
      </Admonition>
    ),
    SharedInclude: ({ children }) => <span>{children}</span>,
    Tabs: ({ children }) => <span>{children}</span>,
    Tab: ({ children }) => <span>{children}</span>,
    TabsSelector: ({ children }) => <span>{children}</span>,
    Target: ({ children }) => <span>{children}</span>,
    Time: ({ children }) => <span>{children}</span>,
    TitleReference: ({ children }) => <span>{children}</span>,
    Toctree: ({ children }) => <span>{children}</span>,
    // built-in thematic break (--- / *** / ___) → hr; render with Transition component
    hr: () => <Transition />,
    VersionAdded: ({ children }) => <span>{children}</span>,
    VersionChanged: ({ children }) => <span>{children}</span>,
    Video: ({ children }) => <span>{children}</span>,
    UseSampleData: ({ children }) => <span>{children}</span>,
    Wayfinding: ({ children }) => <span>{children}</span>,
    DismissibleSkillsCard: ({ children }) => <span>{children}</span>,
    Warning: ({ children, ...props }) => (
      <Admonition name="warning" {...props}>
        {children}
      </Admonition>
    ),
    Table: ({ children }) => <span>{children}</span>,
    TableHeaderCell: ({ children }) => <span>{children}</span>,
    TableCell: ({ children }) => <span>{children}</span>,
    TableBody: ({ children }) => <span>{children}</span>,
    TableHead: ({ children }) => <span>{children}</span>,
    TableRow: ({ children }) => <span>{children}</span>,
  } satisfies MDXComponents);
