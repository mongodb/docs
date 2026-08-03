'use client';

import { css } from '@leafygreen-ui/emotion';
import { Heading } from '@/mdx-components/Heading';
import { SkipPTagContext } from '@/mdx-components/Paragraph';

// Match Snooty: step titles render at section depth 3, i.e. a LeafyGreen
// Subtitle (18px / 600). Snooty wraps each step's title in a section that
// bumps the heading one level below the procedure's section, which for the
// common case (a procedure under an H2) resolves to depth 3.
const STEP_HEADING_LEVEL = 3;

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
};

export const StepHeading = ({ children }: StepHeadingProps) => {
  return (
    <SkipPTagContext.Provider value={true}>
      <Heading headingLevel={STEP_HEADING_LEVEL} className={stepHeadingFallbackStyle}>
        {/* Step titles are a single MDX paragraph; skip inner Body on Paragraph so we do not nest <p> inside the heading. */}
        {children}
      </Heading>
    </SkipPTagContext.Provider>
  );
};
