import { useState } from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select, { type SelectOption } from '@/components/select';

const DEFAULT_ATLAS_CHOICE = { text: 'MongoDB Atlas', value: 'atlas' };
const DEFAULT_SERVER_CHOICE = { text: 'MongoDB Server', value: 'server' };
const DEFAULT_CHOICES = [DEFAULT_SERVER_CHOICE, DEFAULT_ATLAS_CHOICE];

type SelectControllerProps = {
  choices?: SelectOption[];
  customOnChange?: ({ value }: { value: string }) => void;
  defaultText?: string;
  disabled?: boolean;
  label?: string;
  value?: string;
};
// Simple wrapper to add state control
const SelectController = ({
  choices = DEFAULT_CHOICES,
  customOnChange,
  defaultText = '',
  disabled = false,
  label,
  value,
}: SelectControllerProps) => {
  const [selectValue, setSelectValue] = useState(value);
  const onChange = ({ value }: { value: string }) => {
    if (customOnChange) customOnChange({ value });
    setSelectValue(value);
  };
  return (
    <Select
      choices={choices}
      onChange={onChange}
      defaultText={defaultText}
      disabled={disabled}
      label={label}
      value={selectValue}
    />
  );
};

describe('Select', () => {
  // Helper to open the dropdown passed a series of simulate args (click, keypress)
  const dropdownOpen = async (props = {}, openWithKeyboard = false) => {
    const user = userEvent.setup();
    const wrapper = render(<SelectController {...props} />);
    // Dropdown should be closed by default
    const dropdown = wrapper.container.querySelector('button');
    expect(dropdown).toHaveAttribute('aria-expanded', 'false');
    if (openWithKeyboard) {
      await user.tab();
      await user.keyboard('{Enter}');
    } else {
      await user.click(dropdown as Element);
    }
    // Now it should be open
    expect(dropdown).toHaveAttribute('aria-expanded', 'true');
    return wrapper;
  };

  it('renders select correctly', () => {
    const wrapper = render(<SelectController />);
    expect(wrapper.asFragment()).toMatchSnapshot();
  });

  it('displays default text', () => {
    const defaultText = 'Some default texts';
    const wrapper = render(<SelectController defaultText={defaultText} />);
    const renderedText = wrapper.getByText(defaultText);
    expect(renderedText).toBeTruthy();
  });

  it('conditionally should render a label', () => {
    const labelText = 'Select Label';
    const wrapperWithLabel = render(<SelectController label={labelText} />);
    expect(wrapperWithLabel.getByText(labelText)).toBeTruthy();
  });

  it('opens a dropdown with options when clicked', async () => {
    await dropdownOpen();
  });

  it('opens a dropdown with options with the enter key for accessibility', async () => {
    await dropdownOpen({ key: 'Enter' }, true);
  });

  it('passes disabled prop through to select implementation when given', () => {
    const wrapper = render(<SelectController disabled />);
    expect(wrapper.container.querySelector('button')).toHaveAttribute('aria-disabled', 'true');
  });

  it('closes the dropdown by clicking again on the toggle parent', async () => {
    const user = userEvent.setup();
    const wrapper = await dropdownOpen();
    const dropdownButton = wrapper.container.querySelector('button');
    await user.click(dropdownButton as Element);
    // Dropdown was previously open, it should now be closed
    expect(dropdownButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('updates the selected text when an item is clicked', async () => {
    const user = userEvent.setup();
    const defaultText = 'Default Text';
    const wrapper = await dropdownOpen({ defaultText });
    let renderedText = wrapper.container.querySelector('button');
    expect(renderedText?.textContent).toBe(defaultText);
    // Implementation stores the 'select' in the first option field, as rendered html
    const firstOption = wrapper.queryAllByRole('option')[0];
    expect(firstOption.textContent).toBe(DEFAULT_CHOICES[0].text);
    await user.click(firstOption);
    //check the button text to make sure it updated
    renderedText = wrapper.container.querySelector('button');
    expect(renderedText?.textContent).toBe(DEFAULT_CHOICES[0].text);
  });

  it('passes the value attribute of original choice to the onChange callback', async () => {
    const user = userEvent.setup();
    const customOnChange = jest.fn();
    const wrapper = await dropdownOpen({ customOnChange });
    const firstOption = wrapper.queryAllByRole('option')[0];
    expect(firstOption.textContent).toBe(DEFAULT_CHOICES[0].text);
    await user.click(firstOption);
    expect(customOnChange.mock.calls.length).toBe(1);
    expect(customOnChange.mock.calls[0][0]).toStrictEqual({ value: DEFAULT_CHOICES[0].value });
  });

  it('should update selected text given a value', () => {
    const wrapper = render(<SelectController value={DEFAULT_CHOICES[0].value} />);
    expect(wrapper.getByText(DEFAULT_CHOICES[0].text)).toBeTruthy();
  });

  it('should reset the form when null/empty string is passed as value', () => {
    const defaultText = 'Reset text';
    // Bypass SelectController so we can directly rerender with equivalent component + state
    const wrapper = render(
      <Select
        defaultText={defaultText}
        choices={DEFAULT_CHOICES}
        onChange={() => {}}
        value={DEFAULT_CHOICES[0].value}
      />,
    );
    expect(wrapper.getByText(DEFAULT_CHOICES[0].text)).toBeTruthy();
    wrapper.rerender(<Select defaultText={defaultText} choices={DEFAULT_CHOICES} onChange={() => {}} value={''} />);
    expect(wrapper.getByText(defaultText)).toBeTruthy();
  });
});
