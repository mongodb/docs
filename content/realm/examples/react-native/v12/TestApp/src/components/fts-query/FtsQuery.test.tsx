import React from 'react';
import {render, screen, userEvent} from '@testing-library/react-native';
import {FtsQuery} from './FtsQuery';

describe('Full text search query', () => {
  test('FTS query', async () => {
    // render the query component
    render(<FtsQuery />);

    const user = userEvent.setup();
    const bookNameNode = await screen.findByTestId('bookNameInput'); // get book name input box
    const addButton = await screen.findByTestId('addBookButton'); // get button
    const removeButton = await screen.findByTestId('removeButton');

    await user.press(removeButton);

    // add The Hunger Games example
    await user.type(bookNameNode, 'The Hunger Games');
    await user.press(addButton);
    await user.clear(bookNameNode);

    // add the Black Swan example
    await user.type(bookNameNode, 'Black Swan');
    await user.press(addButton);
    await user.clear(bookNameNode);

    await user.type(bookNameNode, 'Swan Lake');
    await user.press(addButton);
    await user.clear(bookNameNode);

    // check the screen for results of query for 'hunger' and 'swan' without 'lake'
    const checkForHunger = await screen.findByTestId('hungerQueryResults');
    expect(checkForHunger.children[1]).toBe('1');

    const checkForSwan = await screen.findByTestId('swanQueryResults');
    expect(checkForSwan.children[1]).toBe('1');
  });
});
