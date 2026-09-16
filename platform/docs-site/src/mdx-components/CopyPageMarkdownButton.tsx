'use client';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { Button, ButtonVariant } from '@via-ds/components/button';
import { ButtonGroup } from '@via-ds/components/button-group';
import { Menu, MenuItem, MenuPopover, MenuRoot } from '@via-ds/components/menu';
import { Text } from '@via-ds/components/typography';
import { Size } from '@via-ds/components/types';
import Copy from '@via-ds/icons/Copy';
import Sparkle from '@via-ds/icons/Sparkle';
import OpenNewTab from '@via-ds/icons/OpenNewTab';
import CaretDown from '@via-ds/icons/CaretDown';
import { toast } from '@via-ds/components/toast';
import { removeTrailingSlash } from '@/utils/remove-trailing-slash';
import { assertLeadingAndTrailingSlash } from '@/utils/assert-trailing-and-leading-slash';
import { removeLeadingSlash } from '@/utils/remove-leading-slash';
import { useVersionContext } from '@/context/version-context';
import { useChatbotModal } from '@/context/chatbot-context';
import { reportAnalytics } from '@/utils/report-analytics';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import { getBasePath } from '@/utils/base-path';
import styles from './copy-page-markdown-button.module.scss';

export type CopyPageMarkdownButtonProps = {
  className?: string;
  slug: string;
};

type CopyPageMenuAction = 'copy-page' | 'ask-question' | 'view-markdown';

const CopyPageMarkdownButton = ({ className, slug }: CopyPageMarkdownButtonProps) => {
  const [markdownText, getMarkdownText] = useState<string | null>(null);
  const href = usePathname();
  const { siteBasePrefixWithVersion } = useVersionContext();

  // First removing the search and then the trailing slash, since we expect the URL to be available in markdown
  // i.e. https://www.mongodb.com/docs/mcp-server/get-started/?client=cursor&deployment-type=atlas ->
  // https://www.mongodb.com/docs/mcp-server/get-started/ ->
  // https://www.mongodb.com/docs/mcp-server/get-started.md
  const markdownPath = href?.split(/[?#]/)[0] || ''; // Looking to spit either at the ? or # to handle query params and fragment identifiers
  const urlWithoutTrailingSlash = removeTrailingSlash(markdownPath);
  // usePathname() is basePath-relative; prepend basePath so the `.md` fetch hits
  // `<basePath>/....md` (a next.config rewrite → markdown export route).
  const markdownRelative = slug === '/' ? `${urlWithoutTrailingSlash}/index.md` : `${urlWithoutTrailingSlash}.md`;
  const markdownAddress = `${getBasePath()}${markdownRelative}`;
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

  const copyMarkdown = async (labelTextDisplayed: string = 'Copy Page') => {
    try {
      reportAnalytics('CTA Click', {
        position: 'body',
        label: 'Copy Page',
        label_text_displayed: labelTextDisplayed,
        scroll_position: currentScrollPosition(),
        tagbook: 'true',
      });
      if (!markdownText) {
        throw new Error(`Failed to fetch markdown from ${markdownAddress}`);
      }

      await navigator.clipboard.writeText(markdownText);

      toast.success('Copied', { description: 'Page copied as markdown successfully.', duration: 4000 });
    } catch (error) {
      console.error(error);
      toast.warning('Error', { description: 'Failed to copy markdown.', duration: 4000 });
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

  const onMenuAction = (key: CopyPageMenuAction) => {
    if (key === 'copy-page') copyMarkdown('Copy Page');
    else if (key === 'ask-question') askQuestion();
    else if (key === 'view-markdown') viewMarkdown();
  };

  return (
    <ButtonGroup
      className={clsx(styles.splitButton, className)}
      variant={ButtonVariant.Default}
      aria-label="Copy page options"
    >
      <Button size={Size.Small} onPress={() => copyMarkdown('Copy Page')}>
        <Copy slot="icon" />
        Copy page
      </Button>
      <MenuRoot>
        <Button size={Size.Small} aria-label="More copy page options">
          <CaretDown slot="icon" aria-hidden="true" />
        </Button>
        <MenuPopover>
          <Menu aria-label="Copy page options" onAction={(key) => onMenuAction(key as CopyPageMenuAction)}>
            <MenuItem id="copy-page" textValue="Copy Page">
              <Copy slot="icon" />
              <Text slot="label">Copy Page</Text>
              <Text slot="description">Copy this page as Markdown for LLMs</Text>
            </MenuItem>
            <MenuItem id="ask-question" textValue="Ask a Question">
              <Sparkle slot="icon" />
              <Text slot="label">Ask a Question</Text>
              <Text slot="description">Ask MongoDB AI about this page</Text>
            </MenuItem>
            <MenuItem id="view-markdown" textValue="View in Markdown">
              <OpenNewTab slot="icon" />
              <Text slot="label">View in Markdown</Text>
              <Text slot="description">View this page as Markdown</Text>
            </MenuItem>
          </Menu>
        </MenuPopover>
      </MenuRoot>
    </ButtonGroup>
  );
};

export { CopyPageMarkdownButton };
