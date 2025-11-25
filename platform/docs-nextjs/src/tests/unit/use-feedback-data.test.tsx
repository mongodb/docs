import { render } from '@testing-library/react';
import type { UseFeedbackDataProps } from '@/components/widgets/feedback-widget/use-feedback-data';
import useFeedbackData from '@/components/widgets/feedback-widget/use-feedback-data';

jest.mock('@/utils/use-snooty-metadata', () => ({
  useSnootyMetadata: jest.fn(() => ({
    project: 'testproject',
  })),
}));

const Test = (props: { data: UseFeedbackDataProps }) => {
  const feedbackData = useFeedbackData(props.data);
  return (
    <>
      <div id="slug"> {feedbackData.slug} </div>
      <div id="url"> {feedbackData.url} </div>
      <div id="title">{feedbackData.title} </div>
      <div id="docs_property"> {feedbackData.docs_property} </div>
    </>
  );
};

describe('useFeedbackData', () => {
  it('returns information on the current project', () => {
    const wrapper = render(
      <Test
        data={{
          slug: '/test',
          title: 'Test Page Please Ignore',
          url: 'https://docs.mongodb.com/test',
        }}
      />,
    );

    expect(wrapper.getByText('/test')).toBeTruthy();
    expect(wrapper.getByText('https://docs.mongodb.com/test')).toBeTruthy();
    expect(wrapper.getByText('Test Page Please Ignore')).toBeTruthy();
    expect(wrapper.getByText('testproject')).toBeTruthy();
  });
});
