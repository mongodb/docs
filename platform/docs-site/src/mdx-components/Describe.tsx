import styles from './describe.module.scss';

export type DescribeProps = {
  children: React.ReactNode;
  term: string;
};

export const Describe = ({ term, children }: DescribeProps) => (
  <dl>
    <dt>
      <code className={styles.term}>{term}</code>
    </dt>
    <dd>{children}</dd>
  </dl>
);
