import { validateHTMAttributes, elements } from '@/utils/validate-element-attributes';

describe('Validate Props', () => {
  it('Should filter props based on valid attributes', () => {
    const props = {
      meta: {
        project: 'docs',
      },
      page: {
        type: 'root',
      },
      slug: 'query-api',
      sectionDepth: 1,
      title: 'MongoDB Query API',
      'aria-current': 'false',
      onClick: '[Function onClick]',
    };

    const validateAnchorProps = validateHTMAttributes('anchor', props);
    expect(validateAnchorProps).toMatchObject({
      title: 'MongoDB Query API',
      'aria-current': 'false',
      onClick: '[Function onClick]',
    });
  });

  it('Should provide user with correct element types when incorrect element is used, and return props right back to the user', () => {
    const props = {
      meta: {
        project: 'docs',
      },
      page: {
        type: 'root',
      },
      slug: 'query-api',
      sectionDepth: 1,
      title: 'MongoDB Query API',
      'aria-current': 'false',
    };

    const errorLogSpy = jest.spyOn(console, 'error');

    const validateAnchorProps = validateHTMAttributes('some-element-type', props);
    expect(validateAnchorProps).toMatchObject(props);
    expect(errorLogSpy).toHaveBeenCalledTimes(1);
    expect(errorLogSpy).toHaveBeenCalledWith(
      `Please check that you are using the correct elementType, available types are ${Object.keys(elements)}`,
    );
  });

  it('Should return an empty Object when null is passed as a prop', () => {
    const props = null;

    const validateAnchorProps = validateHTMAttributes('anchor', props);
    expect(validateAnchorProps).toMatchObject({});
  });
});
