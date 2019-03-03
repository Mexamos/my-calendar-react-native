// import React, {Component} from 'react';
// // import {Button, StyleSheet, Text, View, Navigator, TouchableHighlight} from 'react-native';

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


// var RNFS = require('react-native-fs');

// var path = RNFS.ExternalStorageDirectoryPath + '/test.txt';


// RNFS.writeFile(path, "It's new File", 'utf8')
//   .then((success) => {
//     console.log('FILE WRITTEN!')
//   })
//   .catch((err) => {
//     console.log(err.message)
//   })

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   }
// })
