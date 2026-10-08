import styles from './step.module.scss';

type StepProps = {
  children: React.ReactNode;
  stepNumber: number;
};

export const Step = ({ children, stepNumber }: StepProps) => {
  return (
    <div className={styles.step}>
      <div className={styles.stepBlock}>
        <div className={styles.circle}>{stepNumber}</div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
};
