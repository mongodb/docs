import styles from './procedure.module.scss';

type ProcedureProps = {
  children: React.ReactNode;
  structuredData?: string;
};

export const Procedure = ({ children, structuredData }: ProcedureProps) => {
  return (
    <>
      {structuredData && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />}
      <div className={styles.procedure}>{children}</div>
    </>
  );
};
