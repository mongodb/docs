import 'react-native';
import React from 'react';
import {CompensatingWriteErrorHandling} from './CompensatingWriteWrapper';
import {render, screen, within, userEvent} from '@testing-library/react-native';

test('Compensating write error handling', async () => {
  render(<CompensatingWriteErrorHandling />);

  // Set up a User Event object.
  const user = userEvent.setup();

  // The timeout is necessary to give App Services some
  // time for communication and sync.
  const writeWithinSubscriptionsButton = await screen.findByTestId(
    'write-within-subscriptions',
    {timeout: 3000},
  );
  const writeOutsideSubscriptionsButton = await screen.findByTestId(
    'write-outside-subscriptions',
  );

  // Initiate write that is within query subscriptions.
  await user.press(writeWithinSubscriptionsButton);

  const peopleListNode = await screen.findByTestId('people-list-container');
  const peopleNodes = await within(peopleListNode).findAllByTestId('person');
  expect(peopleNodes.length).not.toEqual(0);

  // Initiate write that is outside of query subscriptions.
  await user.press(writeOutsideSubscriptionsButton);

  const errorListNode = await screen.findByTestId('error-list-container');

  // Get all of the write errors rendered to the UI
  const errorNodes = await within(errorListNode).findAllByTestId(
    'compensating-write-error',
  );
  expect(errorNodes.length).toBeGreaterThan(0);

  // Test the second child node, which corresponds
  // with `error.name`.
  expect(errorNodes[0].children[1]).toBe('Person');
  expect(errorNodes[1].children[1]).toBe('Turtle');

  // Test the fourth child node, which corresponds
  // with `error.message`.
  expect(errorNodes[0].children[3]).toContain(
    'object is outside of the current query view',
  );
  expect(errorNodes[1].children[3]).toContain(
    'object is outside of the current query view',
  );

  // Clean up
  const removeAllObjectsButton = await screen.findByTestId(
    'remove-all-objects',
  );

  await user.press(removeAllObjectsButton);
});
