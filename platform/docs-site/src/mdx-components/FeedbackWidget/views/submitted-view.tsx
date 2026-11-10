import { Fragment } from 'react';
import { Button } from '@via-ds/components/button';
import { Link, Text, TextStyle } from '@via-ds/components/typography';
import { useFeedbackContext } from '../context';
import useScreenSize from '@/hooks/use-screen-size';
import { Layout, Subheading } from '../components/view-components';
import StarRating from '../components/star-rating';
import { SUBMITTED_VIEW_RESOURCE_LINKS, SUBMITTED_VIEW_SUPPORT_LINK } from '../constants';
import { getTranslator } from '@/internationalization/get-translator';
import styles from './submitted-view.module.scss';

const SubmittedView = () => {
  const { t } = getTranslator();
  const { abandon } = useFeedbackContext();
  const { isMobile } = useScreenSize();
  const { selectedRating } = useFeedbackContext();
  const shouldShowSupportLink = selectedRating ? selectedRating <= 3 : true;

  return (
    <Layout className={styles.container}>
      <Text elementType="h6" textStyle={TextStyle.heading4} className={styles.heading}>
        {t('feedback.submitted_heading')}
      </Text>
      <StarRating editable={false} />
      <Subheading>{t('feedback.submitted_subheading')}</Subheading>
      <Subheading>
        <span>{t('feedback.resources_cta')}</span>
        {SUBMITTED_VIEW_RESOURCE_LINKS.map(({ textKey, href }, index) => (
          <Fragment key={index}>
            <br />
            <Link href={href}>{t(textKey)}</Link>
          </Fragment>
        ))}
        {shouldShowSupportLink && (
          <div className={styles.supportCase}>
            {`${t('feedback.support_cta')} `}
            <Link href={SUBMITTED_VIEW_SUPPORT_LINK.href}>{t(SUBMITTED_VIEW_SUPPORT_LINK.textKey)}</Link>
          </div>
        )}
      </Subheading>
      {isMobile && <Button onPress={() => abandon()}>{t('feedback.return_to_docs')}</Button>}
    </Layout>
  );
};

export default SubmittedView;
