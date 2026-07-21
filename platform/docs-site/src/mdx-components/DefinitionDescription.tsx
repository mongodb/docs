import { css } from '@leafygreen-ui/emotion';

type DefinitionDescriptionProps = {
  children: React.ReactNode;
};

export const DefinitionDescription = ({ children }: DefinitionDescriptionProps) => {
  return (
    <dd
      className={css`
        p:first-of-type {
          margin-top: 0 !important;
        }
      `}
    >
      {children}
    </dd>
  );
};
