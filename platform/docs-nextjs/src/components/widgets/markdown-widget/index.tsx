'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SplitButton } from '@leafygreen-ui/split-button';
import { Size } from '@leafygreen-ui/button';
import { Toast, ToastProvider, Variant } from '@leafygreen-ui/toast';
import { MenuItem } from '@leafygreen-ui/menu';
import Icon from '@leafygreen-ui/icon';
import { css, cx } from '@leafygreen-ui/emotion';
import { theme } from '@/styles/theme';
import { removeTrailingSlash } from '@/utils/remove-trailing-slash';
import { assertLeadingAndTrailingSlash } from '@/utils/assert-trailing-and-leading-slash';
import { removeLeadingSlash } from '@/utils/remove-leading-slash';
import { useVersionContext } from '@/context/version-context';
import { useChatbotModal } from '@/context/chatbot-context';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';

type ToastOpen = {
  open: boolean;
  variant: Variant;
};

export type CopyPageMarkdownButtonProps = {
  className?: string;
  slug: string;
};

// This keeps the copy button text jump to a new line when viewing on smaller screens
// [data-theme] is used to increase the width of the dropdown menu to match designs
const splitButtonStyles = css`
  [data-theme] {
    width: 310px;
    margin-left: -100px;
  }
  min-width: 175px; /* Increase min-width to account for Copy Page in diff langs */
`;

const CopyPageMarkdownButton = ({ className, slug }: CopyPageMarkdownButtonProps) => {
  const [toastOpen, setToastOpen] = useState<ToastOpen>({ open: false, variant: Variant.Success });
  const [markdownText, getMarkdownText] = useState<string | null>(null);
  const href = usePathname();
  const { siteBasePrefixWithVersion } = useVersionContext();

  // First removing the search and then the trailing slash, since we expect the URL to be available in markdown
  // i.e. https://www.mongodb.com/docs/mcp-server/get-started/?client=cursor&deployment-type=atlas ->
  // https://www.mongodb.com/docs/mcp-server/get-started/ ->
  // https://www.mongodb.com/docs/mcp-server/get-started.md
  const markdownPath = href?.split(/[?#]/)[0] || ''; // Looking to spit either at the ? or # to handle query params and fragment identifiers
  const urlWithoutTrailingSlash = removeTrailingSlash(markdownPath);
  const markdownAddress = slug === '/' ? `${urlWithoutTrailingSlash}/index.md` : `${urlWithoutTrailingSlash}.md`;
  const { setChatbotClicked, setText } = useChatbotModal();

  useEffect(() => {
    // Introducing aborting to handling bounce behavior
    // (someone hits a page and immediately hits the back button or leaves the page)
    const controller = new AbortController();
    const signal = controller.signal;

    // prefetch the markdown
    const fetchMarkDown = async () => {
      try {
        const response = await fetch(markdownAddress, { signal });

        // Checks if the request was unsuccessful via status code (404)
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const text = await response.text();
        getMarkdownText(text);
      } catch (error) {
        console.error(`Error while fetching markdown: ${error}`);
        getMarkdownText(null);
      }
    };

    fetchMarkDown();

    return () => {
      // When called sends a signal to the fetch
      // to cancel the request
      controller.abort();
    };
  }, [markdownAddress]);

  const copyMarkdown = async (event?: React.MouseEvent<HTMLButtonElement>) => {
    try {
      reportAnalytics('CTA Click', {
        position: 'body',
        label: 'Copy Page',
        label_text_displayed: event?.currentTarget.textContent?.trim() || 'Copy Page',
        scroll_position: currentScrollPosition(),
        tagbook: 'true',
      });
      if (!markdownText) {
        throw new Error(`Failed to fetch markdown from ${markdownAddress}`);
      }

      await navigator.clipboard.writeText(markdownText);

      setToastOpen({
        open: true,
        variant: Variant.Success,
      });
    } catch (error) {
      console.error(error);
      setToastOpen({
        open: true,
        variant: Variant.Warning,
      });
    }
  };

  const viewMarkdown = () => {
    if (!markdownText) return;
    window.open(markdownAddress);
  };

  const askQuestion = () => {
    const questionText = `I have a question about the page I'm on: www.mongodb.com${assertLeadingAndTrailingSlash(
      siteBasePrefixWithVersion,
    )}${removeLeadingSlash(slug)}`;

    setText(questionText);
    setChatbotClicked(true);
  };

  return (
    <>
      <SplitButton
        label="Copy page"
        className={cx(splitButtonStyles, className)}
        size={Size.Small}
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => copyMarkdown(event)}
        variant="default"
        menuItems={[
          <MenuItem
            key={'copy-page'}
            glyph={<Icon glyph="Copy" />}
            description="Copy this page as Markdown for LLMs"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) => copyMarkdown(event)}
          >
            Copy Page
          </MenuItem>,
          <MenuItem
            key={'ask-question'}
            glyph={<Icon glyph="Sparkle" />}
            description="Ask MongoDB AI about this page"
            onClick={askQuestion}
          >
            Ask a Question
          </MenuItem>,
          <MenuItem
            key={'view-markdown'}
            glyph={<Icon glyph="OpenNewTab" />}
            description="View this page as Markdown"
            onClick={() => viewMarkdown()}
          >
            View in Markdown
          </MenuItem>,
        ]}
        leftGlyph={<Icon glyph="Copy" />}
      />
      <ToastProvider
        portalClassName={css`
          #lg-toast-region {
            margin: 16px;
            z-index: ${theme.zIndexes.popovers};
          }
        `}
      >
        <Toast
          title={toastOpen.variant === Variant.Success ? 'Copied' : 'Error'}
          description={
            toastOpen.variant === Variant.Success ? 'Page copied as markdown successfully.' : 'Failed to copy markdown.'
          }
          open={toastOpen.open}
          variant={toastOpen.variant}
          timeout={4000}
          onClose={() => setToastOpen({ open: false, variant: Variant.Success })}
        />
      </ToastProvider>
    </>
  );
};

export default CopyPageMarkdownButton;
