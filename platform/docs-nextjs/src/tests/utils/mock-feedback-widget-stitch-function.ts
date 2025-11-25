import * as feedbackWidget from '@/components/widgets/feedback-widget/upsert-feedback';

export const stitchFunctionMocks: Record<string, jest.SpyInstance> = {};
export function mockStitchFunctions() {
  stitchFunctionMocks['upsertFeedback'] = jest
    .spyOn(feedbackWidget, 'upsertFeedback')
    .mockImplementation(({ page, user, ...rest }) => {
      return Promise.resolve(rest.feedback_id || 'mock-feedback-id');
    });

  stitchFunctionMocks['useBrowserUser'] = jest.spyOn(feedbackWidget, 'useBrowserUser').mockImplementation(() => {
    return {
      user: {
        id: 'test-user-id',
      },
      // Most of this logic is dependent on Realm app working
      reassignCurrentUser: () => Promise.resolve({ id: 'another-test-user-id' }),
    };
  });
}
export const clearMockStitchFunctions = () => {
  Object.keys(stitchFunctionMocks).forEach((mockedFunctionName) => {
    stitchFunctionMocks[mockedFunctionName].mockClear();
  });
};
