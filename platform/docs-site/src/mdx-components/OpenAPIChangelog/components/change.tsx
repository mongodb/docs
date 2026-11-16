import { Tooltip, TooltipRoot, TooltipTrigger } from '@via-ds/components/tooltip';
import { Size } from '@via-ds/components/types';
import { Text } from '@via-ds/components/typography';
import ImportantWithCircleIcon from '@via-ds/icons/ImportantWithCircle';
import { getTranslator } from '@/internationalization/get-translator';
import styles from '../openapi-changelog.module.scss';

type ChangeProps = {
  change: string;
  backwardCompatible: boolean;
};

const Change = ({ change, backwardCompatible }: ChangeProps) => {
  const { t } = getTranslator();
  const changeStatement = change[0].toUpperCase() + change.slice(1);

  return (
    <li className={styles.change}>
      {!backwardCompatible && (
        <TooltipRoot>
          <TooltipTrigger>
            <span className={styles.breakingIcon} tabIndex={0} role="img" aria-label={t('changelog.breaking_change')}>
              <ImportantWithCircleIcon role="presentation" />
            </span>
          </TooltipTrigger>
          <Tooltip>
            <Text size={Size.Large} elementType="span" className={styles.tooltipText}>
              {t('changelog.breaking_change')}
            </Text>
          </Tooltip>
        </TooltipRoot>
      )}
      <Text size={Size.Large} elementType="span">
        {changeStatement}
      </Text>
    </li>
  );
};

export default Change;
