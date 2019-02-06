import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class Calender extends Component {

  constructor(props) {
    super(props);
    this.state = { isShowingText: true }

    
    alert(getTodayDate())
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Fuck Native!</Text>

        <CalendarList
          // Callback which gets executed when visible months change in scroll view. Default = undefined
          onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
          // Max amount of months allowed to scroll to the past. Default = 50
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
          // Enable or disable scrolling of calendar list
          scrollEnabled={true}
          // Enable or disable vertical scroll indicator. Default = false
          showScrollIndicator={true}
        />
      </View>
    );
  }
}

function getTodayDate() {
  let days_of_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',]        
  let date = new Date()
  let day = `${(date.getDate())}`.length === 1 ? `0${date.getDate()}` : date.getDate()
  let month = date.getMonth() + 1
  month = `${month}`.length === 1 ? `0${month}` : month
  let year = date.getFullYear()
  let day_of_week = date.getDay() - 1

  return `${days_of_week[day_of_week]} ${day}.${month}.${year}`
}

var RNFS = require('react-native-fs');

var path = RNFS.ExternalStorageDirectoryPath + '/test.txt';


// RNFS.writeFile(path, "It's new File", 'utf8')
//   .then((success) => {
//     console.log('FILE WRITTEN!')
//   })
//   .catch((err) => {
//     console.log(err.message)
//   })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
