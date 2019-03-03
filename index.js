/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import containerApp from './pages/Calender';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => containerApp);
