import 'react-native';
import React from 'react';
import {render, screen} from '@testing-library/react-native';

import {EncryptMetadata} from './EncryptMetadata';

// Create encryption key for encryption examples.
const encryptionKey = new ArrayBuffer(64);

test('linking an anonymous user with an email/password account', async () => {
  render(<EncryptMetadata encryptionKey={encryptionKey} />);

  const encryptionResultTextNode = await screen.findByTestId('is-realm-app');
  expect(encryptionResultTextNode).toBeInTheDocument;
  expect(encryptionResultTextNode.children[1]).toBe('true');
});
