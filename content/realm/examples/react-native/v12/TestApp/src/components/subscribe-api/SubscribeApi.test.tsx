import 'react-native';
import React from 'react';
import {SubscribeApiExamples} from './RealmWrapper';
import {render, screen, userEvent} from '@testing-library/react-native';

// The first time these tests run on a device, they may fail. This is
// because sync may take too long. Run the tests again and they should
// pass.

describe('Subscribe API behavior tests', () => {
  test('Basic subscription with a name', async () => {
    // This test consistently fails in CI. For whatever reason, the
    // initial sync takes more than 10 seconds, which is the max
    // allowed time by Jest config.
    render(<SubscribeApiExamples />);

    // Get the subscription name node. If the `.subscribe()`
    // method works, its name will be written to this node.
    const subNameNode = await screen.findByTestId('basic-subscription', {
      // Timeout set to 2000 ms to account for variability in the time it takes
      // the sub sync behavior to work out.
      timeout: 2000,
    });
    expect(subNameNode).toBeInTheDocument;

    const renderedSubName = subNameNode.children[1];
    // Ensure the subscription name matches what we expect.
    // This tells us the subscription was successfully created.
    expect(renderedSubName).toBe('Birds I have seen');
  });

  test('`FirstTime` wait subscription behavior', async () => {
    render(<SubscribeApiExamples />);

    // Get the seenBird subscription name node. If the `.subscribe()`
    // method works, its name will be written to this node.
    const seenBirdNode = await screen.findByTestId('seenbird-subscription', {
      // Timeout set to 2000 ms to account for variability in the time it takes
      // the sub sync behavior to work out.
      timeout: 2000,
    });
    expect(seenBirdNode).toBeInTheDocument;

    const renderedSeenBirdSubName = seenBirdNode.children[1];
    // Ensure the subscription name matches what we expect.
    // This tells us the subscription was successfully created.
    expect(renderedSeenBirdSubName).toBe('First time sync only');
  });

  test('`Always` wait subscription behavior', async () => {
    render(<SubscribeApiExamples />);

    // Need to set a different timeout because the sub's sync
    // behavior has a timeout of 500 ms. This test is set to
    // 2500 ms just to be on the safe side.
    const unSeenBirdNode = await screen.findByTestId(
      'unseenbird-subscription',
      {timeout: 2500},
    );
    expect(unSeenBirdNode).toBeInTheDocument;

    const renderedUnseenBirdSubName = unSeenBirdNode.children[1];
    // Ensure the subscription name matches what we expect.
    // This tells us the subscription was successfully created.
    expect(renderedUnseenBirdSubName).toBe('Always wait');
  });

  test('Unsubscribe from a qeury', async () => {
    render(<SubscribeApiExamples />);

    // Set up a User Event object.
    // https://callstack.github.io/react-native-testing-library/docs/user-event#setup
    const user = userEvent.setup();

    const birdNode = await screen.findByTestId('bird-subscription');
    expect(birdNode).toBeInTheDocument;

    const renderedBirdSubName = birdNode.children[1];
    expect(renderedBirdSubName).toBe('Initial birds');

    // Get the unsubscribe button.
    const unsubscribeButton = await screen.findByTestId('unsubscribe');

    // Mimic user pressing the unsubscribe button.
    await user.press(unsubscribeButton);

    // Get the bird node again to get the latest rendered value.
    const updatedBirdNode = await screen.findByTestId('bird-subscription');
    const updatedRenderedBirdSubName = updatedBirdNode.children[1];

    expect(updatedRenderedBirdSubName).toBe(undefined);
  });
});
