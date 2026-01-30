import { useMemo } from 'react';
import { default as CodeBlock } from '@leafygreen-ui/code';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

import { usePageContext } from '@/context/page-context';
import { getLanguage } from '@/utils/get-language';
import { SoftwareSourceCodeSd } from '@/utils/structured-data/software-source-code-sd';
import { STRUCTURED_DATA_CLASSNAME } from '@/utils/structured-data/structured-data';
import type { IOOutputNode } from '@/types/ast';

const outputContainerStyling = css`
  > div > * {
    display: inline !important;
  }
  style {
    display: none !important;
  }
  * {
    border-top-right-radius: 0px;
    border-top-left-radius: 0px;
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
  }

  /* Fixes border differences with dark mode and normal codeblock */
  > div {
    border: initial;

    .dark-theme & {
      border: none;
    }
  }
  > div > div > pre {
    border: none;
    .dark-theme & {
      border: 1px solid ${palette.gray.dark2};
    }
    border-top: none;
  }
`;

type OutputProps = {
  nodeChildren: IOOutputNode['children'];
};

const Output = ({ nodeChildren }: OutputProps) => {
  const { emphasize_lines, value, linenos, lang, lineno_start } = nodeChildren[0];
  const language = getLanguage(lang);
  const { slug } = usePageContext();
  const softwareSourceCodeSd = useMemo(() => {
    const sd = new SoftwareSourceCodeSd({ code: value, lang, slug });
    return sd.isValid() ? sd.toString() : undefined;
  }, [value, lang, slug]);

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
      <div className={cx(outputContainerStyling)}>
        <CodeBlock
          highlightLines={emphasize_lines}
          language={language}
          showLineNumbers={linenos}
          darkMode={true}
          copyable={false}
          lineNumberStart={lineno_start}
          languageOptions={[]}
          onChange={() => {}}
        >
          {value}
        </CodeBlock>
      </div>
    </>
  );
};

export default Output;
