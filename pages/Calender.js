import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


class Main extends Component {
  constructor(props) {
    super(props);
    this.today = getTodayDate()
    this.calendar_show = true
    this.select_day = 'null'
  }


}

export default class Views extends Main {

  render() {
    var mark = {
      [this.today]: {selected: true, selectedColor: 'blue'}
    }
    if (this.calendar_show) {
      return (
        
        <View style={styles.container}>
          <CalendarList
            // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={50}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={50}
            scrollEnabled={true}
            showScrollIndicator={true}
            firstDay={1}
            markedDates={mark}
            onDayPress={(day) => {
              this.select_day = day
              this.calendar_show = false
              console.log('this.calendar_show', this.calendar_show)
            }}
          />
        </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <Button
            onPress={this.calendar_show = true}
            title="return to calender"
            color="#841584"
          />
        </View>
      )
    }
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

  console.log(`${days_of_week[day_of_week]} ${day}.${month}.${year}`)

  return `${year}-${month}-${day}`
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
    backgroundColor: 'white',
  }
})
