import type { MDXComponents } from 'mdx/types';
import { Image } from '@/mdx-components/Image';
import { Include } from '@/mdx-components/Include';
import { Reference } from '@/mdx-components/Reference';
import Admonition from '@/components/admonition';
import Heading from '@/components/heading';
import Section from '@/components/section';
import Banner from '@/components/banner/banner';
import Paragraph from '@/components/paragraph';
import Transition from '@/components/transition';
import Literal from '@/components/literal';
import List from '@/components/list';
import ListItem from '@/components/list/listItem';
import Line from '@/components/line';
import LineBlock from '@/components/line-block';

type InjectedProps = Record<string, unknown>;

export const components = (injectedProps?: InjectedProps) =>
  ({
    // basic components required for MDX rendering
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
    Banner: ({ children, ...props }) => <Banner {...props}>{children}</Banner>,
    Blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    Button: ({ children }) => <span>{children}</span>,
    Card: ({ children }) => <span>{children}</span>,
    CardGroup: ({ children }) => <span>{children}</span>,
    Chapter: ({ children }) => <span>{children}</span>,
    Chapters: ({ children }) => <span>{children}</span>,
    Code: ({ children }) => <span>{children}</span>,
    Contents: ({ children }) => <span>{children}</span>,
    Facet: ({ children }) => <span>{children}</span>,
    Collapsible: ({ children }) => <span>{children}</span>,
    CommunityDriver: ({ children }) => <span>{children}</span>,
    ComposableTutorial: ({ children }) => <span>{children}</span>,
    IOCodeBlock: ({ children }) => <span>{children}</span>,
    Cond: ({ children }) => <span>{children}</span>,
    Container: ({ children }) => <span>{children}</span>,
    CTABanner: ({ children }) => <span>{children}</span>,
    DefaultDomain: ({ children }) => <span>{children}</span>,
    DefinitionList: ({ children }) => <span>{children}</span>,
    DefinitionListItem: ({ children }) => <span>{children}</span>,
    Deprecated: ({ children }) => <span>{children}</span>,
    DeprecatedVersionSelector: ({ children }) => <span>{children}</span>,
    Describe: ({ children }) => <span>{children}</span>,
    Emphasis: ({ children }) => <em>{children}</em>,
    Extract: ({ children }) => <span>{children}</span>,
    Field: ({ children }) => <span>{children}</span>,
    FieldList: ({ children }) => <span>{children}</span>,
    Figure: ({ children }) => <span>{children}</span>,
    Footnote: ({ children }) => <span>{children}</span>,
    FootnoteReference: ({ children }) => <span>{children}</span>,
    Glossary: ({ children }) => <span>{children}</span>,
    GuideNext: ({ children }) => <span>{children}</span>,
    Guilabel: ({ children }) => <span>{children}</span>,
    Heading: ({ children, ...props }) => <Heading {...props}>{children}</Heading>,
    HList: ({ children }) => <span>{children}</span>,
    Introduction: ({ children }) => <span>{children}</span>,
    Input: ({ children }) => <span>{children}</span>,
    IoCodeBlock: ({ children }) => <span>{children}</span>,
    Kicker: ({ children }) => <span>{children}</span>,
    Line: ({ children, ...props }) => <Line {...props}>{children}</Line>,
    LineBlock: ({ children, ...props }) => <LineBlock {...props}>{children}</LineBlock>,
    List: ({ children, ...props }) => <List {...props}>{children}</List>,
    ListItem: ({ children, ...props }) => <ListItem {...props}>{children}</ListItem>,
    ListTable: ({ children }) => <span>{children}</span>,
    Literal: ({ children, ...props }) => <Literal {...props}>{children}</Literal>,
    LiteralBlock: ({ children }) => <span>{children}</span>,
    LiteralInclude: ({ children }) => <span>{children}</span>,
    MethodSelector: ({ children }) => <span>{children}</span>,
    Only: ({ children }) => <span>{children}</span>,
    Output: ({ children }) => <span>{children}</span>,
    OpenAPIChangelog: ({ children }) => <span>{children}</span>,
    Procedure: ({ children }) => <span>{children}</span>,
    Ref: ({ children }) => <span>{children}</span>,
    ReleaseSpecification: ({ children }) => <span>{children}</span>,
    Root: ({ children }) => <span>{children}</span>,
    Rubric: ({ children }) => <span>{children}</span>,
    Replacement: ({ children }) => <span>{children}</span>,
    SearchResults: ({ children }) => <span>{children}</span>,
    Section: ({ children }) => <Section>{children}</Section>,
    See: ({ children }) => <span>{children}</span>,
    SeeAlso: ({ children }) => <span>{children}</span>,
    SharedInclude: ({ children }) => <span>{children}</span>,
    Strong: ({ children }) => <strong>{children}</strong>,
    Superscript: ({ children }) => <sup>{children}</sup>,
    Subscript: ({ children }) => <sub>{children}</sub>,
    Tabs: ({ children }) => <span>{children}</span>,
    Tab: ({ children }) => <span>{children}</span>,
    TabsSelector: ({ children }) => <span>{children}</span>,
    Target: ({ children }) => <span>{children}</span>,
    Text: ({ children }) => <>{children}</>,
    Time: ({ children }) => <span>{children}</span>,
    TitleReference: ({ children }) => <span>{children}</span>,
    Toctree: ({ children }) => <span>{children}</span>,
    Transition: () => <Transition />,
    VersionAdded: ({ children }) => <span>{children}</span>,
    VersionChanged: ({ children }) => <span>{children}</span>,
    UseSampleData: ({ children }) => <span>{children}</span>,
    Wayfinding: ({ children }) => <span>{children}</span>,
  } satisfies MDXComponents);
