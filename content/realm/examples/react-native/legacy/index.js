/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// :snippet-start: watch-polyfills
import { polyfill as polyfillReadableStream } from "react-native-polyfill-globals/src/readable-stream";
import { polyfill as polyfillEncoding } from "react-native-polyfill-globals/src/encoding";
import { polyfill as polyfillFetch } from "react-native-polyfill-globals/src/fetch";

polyfillReadableStream();
polyfillEncoding();
polyfillFetch();
// :snippet-end:

AppRegistry.registerComponent(appName, () => App);
