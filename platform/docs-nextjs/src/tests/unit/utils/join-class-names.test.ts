import { joinClassNames } from '@/utils/join-class-names';

describe('joinClassNames', () => {
  it('returns a string of all class names joined together', () => {
    const className = joinClassNames('class1', 'class2', 'class3');
    expect(className).toEqual('class1 class2 class3');
  });

  it('returns a string even when a class is undefined', () => {
    const className = joinClassNames(undefined, undefined, 'class3');
    expect(className).toEqual('class3');
  });

  it('returns undefined when no classes are defined', () => {
    const className = joinClassNames(undefined, undefined);
    expect(className).toEqual(undefined);
  });
});
