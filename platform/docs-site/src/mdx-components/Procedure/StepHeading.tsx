'use client';

import { css } from '@leafygreen-ui/emotion';
import { Heading } from '@/mdx-components/Heading';
import { SkipPTagContext } from '@/mdx-components/Paragraph';

// Fallback for MDX generated before StepHeading carried a headingLevel prop.
// Matches Snooty for the common case (a procedure under an H2), where the
// step title's section resolves to depth 3, i.e. a LeafyGreen Subtitle
const DEFAULT_STEP_HEADING_LEVEL = 3;

// Fallback for when SkipPTagContext doesn't prevent the inner Paragraph's Body
// from rendering (e.g. server-rendered MDX where the client context Provider
// isn't applied). Without this, that Body resets the title to Body typography
// (16px / regular), so step headings render smaller and lighter than the
// heading component's Subtitle styling. Forcing descendants to inherit keeps
// the fallback in sync with whatever the heading level resolves to.
const stepHeadingFallbackStyle = css`
  * {
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
  }

  p {
    margin: 0;
  }
`;

type StepHeadingProps = {
  children: React.ReactNode;
  headingLevel?: number;
};

export const StepHeading = ({ children, headingLevel = DEFAULT_STEP_HEADING_LEVEL }: StepHeadingProps) => {
  return (
    <SkipPTagContext.Provider value={true}>
      <Heading headingLevel={headingLevel} className={stepHeadingFallbackStyle}>
        {/* Step titles are a single MDX paragraph; skip inner Body on Paragraph so we do not nest <p> inside the heading. */}
        {children}
      </Heading>
    </SkipPTagContext.Provider>
  );
};
