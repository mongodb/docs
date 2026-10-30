import { clsx } from 'clsx';
import { useFeedbackContext } from '../context';
import styles from './page-indicators.module.scss';

const ProgressBar = () => {
  const { progress } = useFeedbackContext();
  return (
    <span className={styles.progressBar}>
      {progress.map((isActive, i) => (
        <span className={clsx(styles.dot, isActive && styles.active)} key={i} />
      ))}
    </span>
  );
};

export default ProgressBar;
