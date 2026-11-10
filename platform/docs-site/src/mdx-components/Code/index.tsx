'use client';

import { useCallback, useContext, useMemo } from 'react';
import { Button, ButtonVariant, LinkButton } from '@via-ds/components/button';
import { CodeBlock, CodePanel, CodeSnippet, NONE_LANGUAGE } from '@via-ds/components/code-block';
import { CopyButton } from '@via-ds/components/copyable';
import { Tooltip, TooltipRoot, TooltipTrigger } from '@via-ds/components/tooltip';
import { Text } from '@via-ds/components/typography';
import { ColorScheme, Size } from '@via-ds/components/types';
import CopyIcon from '@via-ds/icons/Copy';
import OpenNewTabIcon from '@via-ds/icons/OpenNewTab';
import { TabContext } from '@/context/tabs-context';
import { reportAnalytics } from '@/utils/report-analytics';
import { usePageContext } from '@/context/page-context';
import { getTranslator } from '@/internationalization/get-translator';
import { DRIVER_ICON_MAP } from '@/mdx-components/Icons/DriverIconMap';
import { Select } from '@/mdx-components/Select';
import { getLanguage } from '@/utils/get-language';
import { STRUCTURED_DATA_CLASSNAME } from '@/utils/structured-data/structured-data';
import { CodeContext } from '@/context/code-context';
import { isOfflineBuild } from '@/utils/isOfflineBuild';
import { SoftwareSourceCodeSd } from '@/utils/structured-data/software-source-code-sd';
import { currentScrollPosition } from '@/utils/current-scroll-position';
import styles from './code.module.scss';

export type CodeProps = {
  caption?: string;
  copyable?: boolean;
  emphasize_lines?: number[];
  lang?: string;
  linenos?: boolean;
  value?: string;
  source?: string;
  lineno_start?: number;
  darkMode?: boolean;
};

export const Code = ({
  caption,
  copyable = true,
  emphasize_lines: emphasizeLines = [],
  lang = '',
  linenos = false,
  value = '',
  source,
  lineno_start,
  darkMode,
}: CodeProps) => {
  const { t } = getTranslator();
  const { setActiveTab } = useContext(TabContext);
  const { languageOptions, codeBlockLanguage } = useContext(CodeContext);
  const { slug } = usePageContext();
  const code = value;
  const blockLanguage = getLanguage(lang);
  // none should take precedence over language switcher
  const showLanguageSelect = languageOptions.length > 0 && blockLanguage !== NONE_LANGUAGE;
  const selectedOption = showLanguageSelect
    ? languageOptions.find((option) => option.displayName === codeBlockLanguage)
    : undefined;
  const language = selectedOption?.language ?? blockLanguage;

  const reportCodeCopied = useCallback(() => {
    reportAnalytics('Click', {
      position: 'codeblock',
      label: 'codeblock copied: ' + code,
      scroll_position: currentScrollPosition(),
      tagbook: 'true',
    });
  }, [code]);

  const softwareSourceCodeSd = useMemo(() => {
    const sd = new SoftwareSourceCodeSd({ code, lang, slug });
    return sd.isValid() ? sd.toString() : undefined;
  }, [code, lang, slug]);

  const hasPanel = !!caption || showLanguageSelect || !!source;

  const copyButton = (copyable || isOfflineBuild) && (
    // CodePanel rejects slots, so only the floating button persists
    <CopyButton slot={hasPanel ? undefined : 'persist'} copyText={code} onCopy={reportCodeCopied}>
      <Button aria-label={t('code.copy')}>
        <CopyIcon role="presentation" />
      </Button>
    </CopyButton>
  );

  return (
    <>
      {softwareSourceCodeSd && (
        <script
          className={STRUCTURED_DATA_CLASSNAME}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: softwareSourceCodeSd,
          }}
        />
      )}
      <CodeBlock
        className={`${styles.codeBlock} intro-code-block`}
        colorScheme={darkMode ? ColorScheme.Dark : undefined}
        highlightLines={emphasizeLines}
        language={language}
        lineNumberStart={lineno_start}
        showLineNumbers={linenos}
        size={Size.Large}
      >
        {hasPanel ? (
          <CodePanel>
            {caption && <Text slot="title">{caption}</Text>}
            {showLanguageSelect && (
              <Select
                className={styles.languageSelect}
                aria-label={t('code.language_picker')}
                choices={languageOptions.map(({ id, displayName }) => ({
                  text: displayName,
                  value: id,
                  tabSelectorIcon: DRIVER_ICON_MAP[id],
                }))}
                value={selectedOption?.id}
                onChange={({ value }) => setActiveTab({ drivers: value })}
              />
            )}
            {source && (
              <TooltipRoot>
                <TooltipTrigger>
                  {/* CodePanel styles Button but not LinkButton */}
                  <LinkButton
                    aria-label={t('code.view_full_source_in_new_tab')}
                    href={source}
                    size={Size.Small}
                    variant={ButtonVariant.Tertiary}
                  >
                    <OpenNewTabIcon role="presentation" />
                  </LinkButton>
                </TooltipTrigger>
                <Tooltip>{t('code.view_full_source')}</Tooltip>
              </TooltipRoot>
            )}
            {copyButton}
          </CodePanel>
        ) : (
          copyButton
        )}
        <CodeSnippet>{code}</CodeSnippet>
      </CodeBlock>
    </>
  );
};
