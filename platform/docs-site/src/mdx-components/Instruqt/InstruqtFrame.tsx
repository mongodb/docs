import styles from './instruqt-frame.module.scss';

export type InstruqtFrameProps = {
  title: string;
  height?: number;
  embedValue: string;
};

export const InstruqtFrame = ({ title, height, embedValue }: InstruqtFrameProps) => {
  const labTitle = title || 'MongoDB Interactive Lab';
  const frameTitle = `Instruqt - ${labTitle}`;
  // Allow frameHeight to be 0 when drawer is closed to avoid iframe overflowing
  const frameHeight = height ?? '640';
  const frameSrc = `https://play.instruqt.com/embed${embedValue}`;

  return (
    <iframe
      className={styles.frame}
      allowFullScreen
      sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
      title={frameTitle}
      height={frameHeight}
      width="100%"
      src={frameSrc}
    />
  );
};
