import React, {Component} from 'react'
import { Button, View, Text } from 'react-native'
import { CalendarList } from 'react-native-calendars';

export default class HomeScreen extends Component {
    render() {
        this.today = getTodayDate()
        var mark = {
            [this.today]: {selected: true, selectedColor: 'blue'}
          }
        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

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

                    this.props.navigation.navigate('TaskList')

                    // this.select_day = day
                    // this.calendar_show = false
                    // this.forceUpdate()
                }}
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
  
    console.log(`${days_of_week[day_of_week]} ${day}.${month}.${year}`)
  
    return `${year}-${month}-${day}`
  }