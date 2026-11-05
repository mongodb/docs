import { Fragment } from 'react';
import { Button } from '@via-ds/components/button';
import { Link, Text, TextStyle } from '@via-ds/components/typography';
import { useFeedbackContext } from '../context';
import useScreenSize from '@/hooks/use-screen-size';
import { Layout, Subheading } from '../components/view-components';
import StarRating from '../components/star-rating';
import { SUBMITTED_VIEW_RESOURCE_LINKS, SUBMITTED_VIEW_SUPPORT_LINK, SUBMITTED_VIEW_TEXT } from '../constants';
import styles from './submitted-view.module.scss';

const SubmittedView = () => {
  const { abandon } = useFeedbackContext();
  const { isMobile } = useScreenSize();
  const { selectedRating } = useFeedbackContext();
  const shouldShowSupportLink = selectedRating ? selectedRating <= 3 : true;

  return (
    <Layout className={styles.container}>
      <Text elementType="h6" textStyle={TextStyle.heading4} className={styles.heading}>
        {SUBMITTED_VIEW_TEXT.HEADING}
      </Text>
      <StarRating editable={false} />
      <Subheading>{SUBMITTED_VIEW_TEXT.SUB_HEADING}</Subheading>
      <Subheading>
        <span>{SUBMITTED_VIEW_TEXT.RESOURCES_CTA}</span>
        {SUBMITTED_VIEW_RESOURCE_LINKS.map(({ text, href }, index) => (
          <Fragment key={index}>
            <br />
            <Link href={href}>{text}</Link>
          </Fragment>
        ))}
        {shouldShowSupportLink && (
          <div className={styles.supportCase}>
            {`${SUBMITTED_VIEW_TEXT.SUPPORT_CTA} `}
            <Link href={SUBMITTED_VIEW_SUPPORT_LINK.href}>{SUBMITTED_VIEW_SUPPORT_LINK.text}</Link>
          </div>
        )}
      </Subheading>
      {isMobile && <Button onPress={() => abandon()}>Return to the Documentation</Button>}
    </Layout>
  );
};

export default SubmittedView;
