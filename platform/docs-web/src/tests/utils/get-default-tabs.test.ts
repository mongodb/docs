import { getDefaultTabs } from '@/utils/get-default-tabs';

describe('getDefaultTabs', () => {
  it('uses the configured default_tabs value for the drivers selector', () => {
    const choices = { drivers: [{ value: 'shell' }, { value: 'nodejs' }, { value: 'python' }] };
    expect(getDefaultTabs(choices, { drivers: 'python' })).toEqual({ drivers: 'python' });
  });

  it('falls back to nodejs for drivers when no default_tabs is set and nodejs exists', () => {
    const choices = { drivers: [{ value: 'shell' }, { value: 'nodejs' }] };
    expect(getDefaultTabs(choices, {})).toEqual({ drivers: 'nodejs' });
  });

  it('falls back to the first choice for drivers when nodejs is absent', () => {
    const choices = { drivers: [{ value: 'shell' }, { value: 'python' }] };
    expect(getDefaultTabs(choices, {})).toEqual({ drivers: 'shell' });
  });

  it('always uses the first choice for non-drivers selectors, ignoring default_tabs', () => {
    const choices = { platforms: [{ value: 'linux' }, { value: 'windows' }] };
    expect(getDefaultTabs(choices, { platforms: 'windows' })).toEqual({ platforms: 'linux' });
  });
});
