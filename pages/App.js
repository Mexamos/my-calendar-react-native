import React, {Component} from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Calendar from './Calendar'
import TaskList from './TaskList';

const RootStack = createStackNavigator(
  {
    Calendar: {
      screen: Calendar,
    },
    TaskList: {
      screen: TaskList,
    },
  },
  {
    initialRouteName: 'Calendar',
    headerMode: 'none'
  },
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
