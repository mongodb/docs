import styles from './ref-target.module.scss';

interface RefTargetProps {
  id: string;
}

export const RefTarget = ({ id }: RefTargetProps) => <span id={id} className={styles.anchor} />;
