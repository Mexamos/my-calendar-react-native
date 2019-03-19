import React, {Component} from 'react'
import { Button, View, Text } from 'react-native'
import { CalendarList } from 'react-native-calendars';
var RNFS = require('react-native-fs')
var path = RNFS.ExternalStorageDirectoryPath + '/Tenshi.json';

function checkJSONFile () {
    RNFS.exists(path)
        .then((exist) => {
            this.exist_JSON = exist
            console.log('this.exist_JSON', this.exist_JSON)
            this.state.check_JSON = true
            if(this.exist_JSON) {
                readJSON.apply(this)
            }
            else {
                setCalendarComponent.apply(this)
                this.forceUpdate()
            }
        })
        .catch((err) => {
            console.log(err)
        })
}

function readJSON () {
    RNFS.readFile(path)
        .then((json_text) => {

            this.state.task_list = JSON.parse(json_text)
            console.log('readJSON this.state.task_list', this.state.task_list)
            this.state.marked_dates = {}

            if(this.state.task_list.length > 0) {
                this.state.task_list.forEach(function(task, index) {
                    this.state.marked_dates[task.date_for_calendar] = { 
                        dots: 
                        [
                            { 
                                color: task.dot_color,
                                key: index
                            }
                        ], selected: false
                    }
                }.bind(this))
            }

            setCalendarComponent.apply(this)

            this.forceUpdate()

        })
        .catch((err) => {
            console.log(err)
        })
}

function refreshTaskList () {

    this.state.task_list.forEach(function(task, index) {

        this.state.marked_dates[task.date_for_calendar] = { 
            dots: 
            [
                { 
                    color: task.dot_color,
                    key: index
                }
            ], selected: false
        }

    }.bind(this))

    setCalendarComponent.apply(this)

    this.forceUpdate()

}

function setCalendarComponent () {
    console.log('this.state.marked_dates', this.state.marked_dates)
    this.state.calendar_component = <CalendarList
        pastScrollRange={50}
        markedDates={this.state.marked_dates}
        markingType={'multi-dot'}
        futureScrollRange={50}
        scrollEnabled={true}
        showScrollIndicator={true}
        firstDay={1}
        onDayPress={(day) => {

            let selected_day_tasks = this.state.task_list.filter(function(task){
                if(task.date_for_calendar === day.dateString){
                    return true
                }
            })

            this.props.navigation.navigate('TaskList', {
                "select_day": day,
                "selected_day_tasks": selected_day_tasks,
                "all_tasks": this.state.task_list
            })

        }}
        />

        
}

class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            task_list: [],
            marked_dates: {},
            calendar_component: <View></View>,
            check_JSON: false
        }
    }

    render() {

        const { navigation } = this.props
        if(navigation.getParam('refresh') === 'true') {
            navigation.state.params.refresh = 'false'
            this.state.calendar_component = <View></View>
            this.state.task_list = navigation.getParam('all_tasks')
            console.log('this.state.task_list', this.state.task_list)
            checkJSONFile.apply(this)
        }

        this.today = getTodayDate()
        this.state.marked_dates[this.today] = {selected: true, selectedColor: 'blue'}

        if(this.state.task_list.length === 0 && !this.state.check_JSON) {
            checkJSONFile.apply(this)
        }

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                {
                    this.state.calendar_component
                }
            </View>
        )
    }
}

function getTodayDate() {   
    let date = new Date()
    let day = `${(date.getDate())}`.length === 1 ? `0${date.getDate()}` : date.getDate()
    let month = date.getMonth() + 1
    month = `${month}`.length === 1 ? `0${month}` : month
    let year = date.getFullYear()

    return `${year}-${month}-${day}`
}


export default HomeScreen