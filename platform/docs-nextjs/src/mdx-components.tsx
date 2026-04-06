import type { MDXComponents } from 'mdx/types';
import { Include } from '@/mdx-components/Include';
import { Reference } from '@/mdx-components/Reference';
import { RefRole } from '@/mdx-components/RefRole';
import { RefTarget } from '@/mdx-components/RefTarget';
import { Admonition } from '@/mdx-components/Admonition';
import { Banner } from '@/mdx-components/Banner';
import { Collapsible } from '@/mdx-components/Collapsible';
import { CTABanner } from '@/mdx-components/Banner/CTABanner';
import { DefinitionListItem } from '@/mdx-components/DefinitionListItem';
import { DefinitionDescription } from '@/mdx-components/DefinitionDescription';
import { Heading } from '@/mdx-components/Heading';
import { HorizontalList } from '@/mdx-components/HorizontalList';
import { Paragraph } from '@/mdx-components/Paragraph';
import { Transition } from '@/mdx-components/Transition';
import { List } from '@/mdx-components/List';
import { ListItem } from '@/mdx-components/ListItem';
import Procedure from '@/mdx-components/Procedure';
import Step from '@/mdx-components/Procedure/Step';
import { Introduction } from '@/mdx-components/Introduction';
import { CommunityPillLink } from '@/mdx-components/CommunityPillLink';
import ComposableTutorial from '@/mdx-components/ComposableTutorial';
import ComposableContent from '@/mdx-components/ComposableTutorial/ComposableContent';
import Button from '@/mdx-components/Button';
import { Literal } from '@/mdx-components/Literal';
import { Describe } from '@/mdx-components/Describe';
import { Highlight } from '@/mdx-components/Highlight';
import Card from '@/mdx-components/Card';
import CardGroup from '@/mdx-components/Card/CardGroup';
import { GUILabel } from '@/mdx-components/GUILabel';
import { Red } from '@/mdx-components/Red';
import { Gold } from '@/mdx-components/Gold';
import { Kbd } from '@/mdx-components/Kbd';
import { Tabs, Tab } from '@/mdx-components/Tabs';
import { Icon } from '@/mdx-components/Icon';
import { Abbr } from '@/mdx-components/Abbr';
import { Time } from '@/mdx-components/Time';
import { Image } from '@/mdx-components/Image';
import { Link } from '@/mdx-components/Link';
import { Video } from '@/mdx-components/Video/Video';
import { Kicker } from '@/mdx-components/Kicker';
import { TabsSelector } from '@/mdx-components/TabsSelector';
import { Version } from '@/mdx-components/Version';
import { Code } from '@/mdx-components/Code';
import { Replacement } from '@/mdx-components/Include/Replacement';
import { Table, TableHead, TableBody, TableRow, TableHeaderCell, TableCell } from '@/mdx-components/Table';

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
    RefRole: (props) => <RefRole {...props} {...injectedProps} />,
    // standard markdown elements
    p: ({ children, ...props }) => <Paragraph {...props}>{children}</Paragraph>,
    pre: ({ children, ...props }) => {
      const lang =
        (children as React.ReactElement<{ className?: string; children?: string }>)?.props?.className?.replace(
          /^language-/,
          '',
        ) ?? '';
      const value = (children as React.ReactElement<{ className?: string; children?: string }>)?.props?.children ?? '';
      return <Code {...props} lang={lang} value={value} />;
    },
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
    // Destructure onClick because it is not valid to pass a regular HTML onClick event handler to LinkComponent.
    a: ({ children, onClick, href, ...props }) => (
      <Link to={href} {...props}>
        {children}
      </Link>
    ),
    Abbr: ({ children, ...props }) => <Abbr {...props}>{children}</Abbr>,
    Banner: ({ children, ...props }) => <Banner {...props}>{children}</Banner>,
    Button: ({ children, ...props }) => <Button {...props}>{children}</Button>,
    Card: ({ children, ...props }) => <Card {...props}>{children}</Card>,
    CardGroup: ({ children, ...props }) => <CardGroup {...props}>{children}</CardGroup>,
    Contents: () => null,
    Facet: ({ children }) => children,
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
    Container: ({ children }) => <span>{children}</span>,
    CtaBanner: ({ children, ...props }) => <CTABanner {...props}>{children}</CTABanner>,
    DefaultDomain: () => null,
    DefinitionList: ({ children }) => <dl>{children}</dl>,
    DefinitionListItem: ({ children, ...props }) => <DefinitionListItem {...props}>{children}</DefinitionListItem>,
    DefinitionTerm: ({ children }) => <dt>{children}</dt>,
    DefinitionDescription: ({ children }) => <DefinitionDescription>{children}</DefinitionDescription>,
    Deprecated: ({ children, ...props }) => (
      <Version changeType="deprecated" {...props}>
        {children}
      </Version>
    ),
    Describe: ({ children, ...props }) => <Describe {...props}>{children}</Describe>,
    Example: ({ children, ...props }) => (
      <Admonition name="example" {...props}>
        {children}
      </Admonition>
    ),
    Extract: ({ children }) => children,
    Field: ({ children }) => <span>{children}</span>,
    FieldList: ({ children }) => <span>{children}</span>,
    Footnote: ({ children }) => <span>{children}</span>,
    FootnoteReference: ({ children }) => <span>{children}</span>,
    Glossary: ({ children }) => <span>{children}</span>,
    Gold: ({ children }) => <Gold>{children}</Gold>,
    Guilabel: ({ children }) => <GUILabel>{children}</GUILabel>,
    Heading: ({ children, ...props }) => <Heading {...props}>{children}</Heading>,
    Highlight: ({ children, ...props }) => <Highlight {...props}>{children}</Highlight>,
    Hlist: ({ children, ...props }) => <HorizontalList {...props}>{children}</HorizontalList>,
    Icon: ({ children, ...props }) => <Icon {...props}>{children}</Icon>,
    Introduction: ({ children }) => <Introduction>{children}</Introduction>,
    Input: ({ children }) => <span>{children}</span>,
    IoCodeBlock: ({ children }) => <span>{children}</span>,
    Kbd: ({ children }) => <Kbd>{children}</Kbd>,
    Kicker: ({ children }) => <Kicker>{children}</Kicker>,
    // built-in list syntax → List/ListItem (prefer over custom List/ListItem directives)
    ol: ({ children, ...props }) => <List {...props}>{children}</List>,
    ul: ({ children, ...props }) => (
      <List enumtype="unordered" {...props}>
        {children}
      </List>
    ),
    li: ({ children, ...props }) => <ListItem {...props}>{children}</ListItem>,
    code: ({ children }) => <Literal>{children}</Literal>,
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
    Replacement: ({ children, ...props }) => <Replacement {...props}>{children}</Replacement>,
    SearchResults: ({ children }) => <span>{children}</span>,
    See: ({ children, title, ...props }) => (
      <Admonition name="tip" title={title ? `See: ${title}` : undefined} {...props}>
        {children}
      </Admonition>
    ),
    Tabs: ({ children, ...props }) => <Tabs {...props}>{children}</Tabs>,
    Tab: ({ children, ...props }) => <Tab {...props}>{children}</Tab>,
    TabsSelector: () => <TabsSelector />,
    RefTarget: (props) => <RefTarget {...props} />,
    Time: (props) => <Time {...props} />,
    // built-in thematic break (--- / *** / ___) → hr; render with Transition component
    hr: () => <Transition />,
    VersionAdded: ({ children, ...props }) => (
      <Version changeType="versionadded" {...props}>
        {children}
      </Version>
    ),
    VersionChanged: ({ children, ...props }) => (
      <Version changeType="versionchanged" {...props}>
        {children}
      </Version>
    ),
    Video: (props) => <Video {...props} />,
    Wayfinding: ({ children }) => <span>{children}</span>,
    DismissibleSkillsCard: ({ children }) => <span>{children}</span>,
    Warning: ({ children, ...props }) => (
      <Admonition name="warning" {...props}>
        {children}
      </Admonition>
    ),
    Table: ({ children, ...props }) => <Table {...props}>{children}</Table>,
    TableHead: ({ children }) => <TableHead>{children}</TableHead>,
    TableBody: ({ children }) => <TableBody>{children}</TableBody>,
    TableRow: ({ children }) => <TableRow>{children}</TableRow>,
    TableHeaderCell: ({ children }) => <TableHeaderCell>{children}</TableHeaderCell>,
    TableCell: ({ children }) => <TableCell>{children}</TableCell>,
  } satisfies MDXComponents);
