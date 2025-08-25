import {jest, beforeEach} from '@jest/globals';

// Needed to clear the test state.
import Realm, {flags} from 'realm';
flags.ALLOW_CLEAR_TEST_STATE = true;

// avoid error: Cannot find module 'NativeAnimatedHelper'
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Suppress noisy warnings. Should probably investigate
// all warnings at some point.
global.console.warn = jest.fn();
global.console.error = jest.fn();

beforeEach(async () => {
  // Close and remove all realms in the default directory.
  Realm.clearTestState();

  // Use promise hack to wait realm to clear
  await new Promise(r => setTimeout(r, 100));
});
