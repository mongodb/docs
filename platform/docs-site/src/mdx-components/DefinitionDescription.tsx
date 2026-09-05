import styles from './definition-description.module.scss';

type DefinitionDescriptionProps = {
  children: React.ReactNode;
};

export const DefinitionDescription = ({ children }: DefinitionDescriptionProps) => {
  return <dd className={styles.definitionDescription}>{children}</dd>;
};
