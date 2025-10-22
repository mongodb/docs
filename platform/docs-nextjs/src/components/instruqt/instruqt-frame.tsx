import { palette } from '@leafygreen-ui/palette';
import { css, cx } from '@leafygreen-ui/emotion';

const iframeStyle = css`
  border: var(--border);
  border-radius: var(--border-radius);

  border: 'none';
  border-radius: 0;

  .dark-theme & {
    border: 1px solid ${palette.gray.dark2};
    border-radius: 5px;
  }
`;

export type InstruqtFrameProps = {
  title: string;
  height?: number;
  embedValue: string;
};

const InstruqtFrame = ({ title, height, embedValue }: InstruqtFrameProps) => {
  const labTitle = title || 'MongoDB Interactive Lab';
  const frameTitle = `Instruqt - ${labTitle}`;
  // Allow frameHeight to be 0 when drawer is closed to avoid iframe overflowing
  const frameHeight = height ?? '640';
  const frameSrc = `https://play.instruqt.com/embed${embedValue}`;

  return (
    <iframe
      className={cx(iframeStyle)}
      allowFullScreen
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
      title={frameTitle}
      height={frameHeight}
      width="100%"
      src={frameSrc}
    />
  );
};

export default InstruqtFrame;
