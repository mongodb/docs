import * as feedbackWidget from '@/mdx-components/FeedbackWidget/submit-feedback';

export const stitchFunctionMocks: Record<string, jest.SpyInstance> = {};
export function mockStitchFunctions() {
  stitchFunctionMocks['submitFeedback'] = jest
    .spyOn(feedbackWidget, 'submitFeedback')
    .mockImplementation(() => Promise.resolve());

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
