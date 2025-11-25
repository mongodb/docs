import * as handleScreenshot from '@/components/widgets/feedback-widget/handle-screenshot';

export const screenshotFunctionMocks: Record<string, jest.SpyInstance> = {};
export function mockScreenshotFunctions() {
  screenshotFunctionMocks['addEventListener'] = jest
    .spyOn(document, 'addEventListener')
    .mockImplementation((mousemove, handleElementHighlight) => {
      return { mousemove, handleElementHighlight };
    });

  screenshotFunctionMocks['retrieveDataUri'] = jest
    .spyOn(handleScreenshot, 'retrieveDataUri')
    .mockImplementation(() => {
      return Promise.resolve('dataUri retrieved successfully');
    });
}

export const clearMockScreenshotFunctions = () => {
  Object.keys(screenshotFunctionMocks).forEach((mockedFunctionName) => {
    screenshotFunctionMocks[mockedFunctionName].mockClear();
  });
};
