import React, {Component} from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'

import Calendar from './Calendar'
import TaskList from './TaskList'
import NewTask from './NewTask';

const RootStack = createStackNavigator(
  {
    Calendar: {
      screen: Calendar,
    },
    TaskList: {
      screen: TaskList,
    },
    NewTask: {
      screen: NewTask,
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
