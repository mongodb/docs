import 'expo-dev-client';
import 'react-native-get-random-values';

import {registerRootComponent} from 'expo';

import AppWrapper from './app/AppWrapper';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(AppWrapper);
