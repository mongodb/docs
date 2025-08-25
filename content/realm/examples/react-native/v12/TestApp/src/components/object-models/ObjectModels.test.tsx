import 'react-native';
import React from 'react';
import {ObjectModels} from './ObjectModels';
import {render, screen, within} from '@testing-library/react-native';

test('Object models', async () => {
  render(<ObjectModels />);

  // Get the AgeBot node by looking for its testID
  const ageBotNode = await screen.findByTestId('AgeBot', {
    exact: false,
  });
  // Search within the AgeBot node for our expected age.
  const ageNode = await within(ageBotNode).findByText('2');

  // Ensure the rendered age matches the age we expect.
  const renderedAge = ageNode.children[0];
  expect(renderedAge).toBe('2');

  // Do the same for BirthdayBot
  const birthdayBotNode = await screen.findByTestId('BirthdayBot', {
    exact: false,
  });
  // This is the same Date we construct in the component.
  const birthday = new Date(2023, 8, 1).toString();
  const birthdayNode = await within(birthdayBotNode).findByText(birthday);

  const renderedBirthday = birthdayNode.children[0];
  expect(renderedBirthday).toBe(birthday);
});
