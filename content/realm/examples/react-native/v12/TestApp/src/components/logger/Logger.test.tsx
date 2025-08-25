import 'react-native';
import React from 'react';
import {Logger} from './Logger';
import {render, screen, userEvent, within} from '@testing-library/react-native';

test('Realm logger', async () => {
  render(<Logger />);

  const user = userEvent.setup();

  // Get the log list container node by looking for its testID
  const logListContainerNode = await screen.findByTestId('list-container');

  // Search within the logListContainerNode to find all
  // `log-level` nodes.
  const logItems = await within(logListContainerNode).findAllByTestId(
    'log-level',
  );

  expect(logItems.length).not.toEqual(0);

  const addTurtleButton = await screen.findByTestId('add-turtle');

  // Simulate user adding a new turtle by pressing a button.
  await user.press(addTurtleButton);

  // Search within the logListContainerNode to find all
  // `log-level` nodes again.
  const secondLogItems = await within(logListContainerNode).findAllByTestId(
    'log-level',
  );

  expect(secondLogItems.length).not.toEqual(0);
  // Check to see if new log items exist after creating a new
  // Turtle object.
  expect(secondLogItems.length).toBeGreaterThan(logItems.length);
});
