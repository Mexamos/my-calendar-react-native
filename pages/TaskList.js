import React, {Component} from 'react'
import { Button, View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, Dimensions } from 'react-native'
var RNFS = require('react-native-fs')
var path = RNFS.ExternalStorageDirectoryPath + '/Tenshi.json';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 65,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});

function normalizeDate(date_string) {   
  let date = new Date(date_string)
  let day = `${(date.getDate())}`.length === 1 ? `0${date.getDate()}` : date.getDate()
  let month = date.getMonth() + 1
  month = `${month}`.length === 1 ? `0${month}` : month
  let year = date.getFullYear()

  return date_forms = {
    'normalized': `${day}.${month}.${year}`,
    'for_calendar': `${year}-${month}-${day}`
  }
}

function createNewId (all_tasks) {
  console.log('createNewId', all_tasks)
  if(all_tasks.length > 1) {
    all_tasks.sort(function(a, b) {
      return b.id - a.id
    })
    console.log('createNewId this.state.all_tasks[0]', all_tasks)
    return all_tasks[0].id + 1
  }
  else if(all_tasks.length > 0) {
    return all_tasks[0].id + 1
  }
  else return 1
  
}


class TaskList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      task_list: [],
      footer: <View></View>,
      timer_for_save: null,
      all_tasks: [],
      selected_type: ''
    }
  }

  render() {

    const { navigation } = this.props
    let select_day = navigation.getParam('select_day')
    this.state.select_date = normalizeDate(select_day.timestamp)


    if(navigation.getParam('all_tasks')) {
      this.state.all_tasks = navigation.getParam('all_tasks')
      navigation.state.params.all_tasks = ''
    }

    if(navigation.getParam('selected_day_tasks').length > 0) {
      this.state.task_list = navigation.getParam('selected_day_tasks')
    }


    if(navigation.getParam('task_type') === 'one_way') {

      console.log('push this.state.all_tasks', this.state.all_tasks)
      let new_id = createNewId(this.state.all_tasks)

      this.state.task_list.push({
        'id': new_id,
        'type': navigation.getParam('task_type'),
        'description': 'Введите описание',
        'title': 'Введите название',
        'date_normalized': this.state.select_date.normalized,
        'date_for_calendar': this.state.select_date.for_calendar,
        'dot_color': navigation.getParam('dot_color')
      })

      navigation.state.params.task_type = ''

      saveTaskListToJSON.call(this, 'add')

      console.log('push new task', this.state.task_list)
    }
    else if(navigation.getParam('task_type') === 'battle') {

    }
    else if(navigation.getParam('task_type') === 'complex_way') {

    }

    var {height, width} = Dimensions.get('window')
    this.state.scroll_view_height = height - 150

    if(this.state.task_list.length > 0) {

      this.state.selected_type = this.state.task_list[0].type

      this.state.footer =  <View style={{ width: '100%',
      height: 60,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      bottom: 0,
      borderTopColor: 'black', borderTopWidth: 2, backgroundColor: 'red'}}>
      
      </View>
    }

    return (
    <View style={{flex: 1}}>

      <View style={styles.header}>

        <TouchableOpacity style={{position: 'absolute', left: 15, top: 10, width: 45, height: 45, alignItems: 'center', flexDirection: 'row', backgroundColor: 'black', paddingLeft: 10, borderRadius: 30}}
        onPress={() => this.props.navigation.navigate('Calendar', {
            "refresh": 'true',
            "all_tasks": this.state.all_tasks
          })}>
          <Image
          style={{width: 20, height: 20}}
          source={require('../images/left-arrow.png')}
          ></Image>
        </TouchableOpacity>

        <View>
          <Text style={{width: 100, fontSize: 18, color: 'black', textAlign: 'center'}}>{this.state.select_date.normalized}</Text>
        </View>

        <TouchableOpacity style={{position: 'absolute', right: 0, width: 40, height: 60, alignItems: 'center', flexDirection: 'row',}}
        onPress={() => {
          this.props.navigation.navigate('NewTask')
        }}>
          <Image
          style={{width: 20, height: 20}}
          source={require('../images/add.png')}
          ></Image>
        </TouchableOpacity>

      </View>


      <View style={{height: this.state.scroll_view_height}}>
        <ScrollView >
          {this.state.task_list.map((prop, key) => {

            var margin_top_wrapper = 0
            if(key === 0) margin_top_wrapper = 10

            if(this.state.selected_type === 'one_way') {

              return (
                <View key={key} style={{borderColor: 'black', borderWidth: 1, marginBottom: 10, marginTop: margin_top_wrapper, marginHorizontal: 10, borderRadius: 2, elevation: 2
                }}>

                  <TouchableOpacity style={{position: 'absolute', right: 15, top: 10, width: 45, height: 45, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', backgroundColor: 'white',  borderRadius: 30, borderColor: 'black', borderWidth: 1, zIndex: 2}}
                  onPress={function() {

                    console.log('onPress')
                    this.state.task_list.splice(key, 1)
                    saveTaskListToJSON.call(this, 'delete', prop)
                    setTimeout(function(){

                      
                      this.forceUpdate()

                    }.bind(this), 0)

                  }.bind(this)}>
                    <Text style={{textAlign: 'center'}}
                    >x</Text>
                  </TouchableOpacity>

                  <TextInput style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}
                  onChangeText={(new_text) => {
                    
                    clearTimeout(this.state.timer_for_save)
                    this.state.timer_for_save = setTimeout(function() {

                      this.state.task_list[key].title = new_text
                      saveTaskListToJSON.call(this, 'edit')

                    }.bind(this), 3000)

                  }}>
                    {prop.title + key}
                  </TextInput>

                  <TextInput style={{paddingLeft: 10}}
                  onChangeText={(new_text) => {

                    clearTimeout(this.state.timer_for_save)
                    this.state.timer_for_save = setTimeout(function() {

                      this.state.task_list[key].description = new_text
                      saveTaskListToJSON.call(this, 'edit')

                    }.bind(this), 3000)

                  }}>
                    {prop.description + key}
                  </TextInput>

                </View>
              )
            }
            else if(this.state.selected_type === 'battle') {
              return (
                <View key={key} style={{borderColor: 'black', borderWidth: 1, marginBottom: 10, marginTop: margin_top_wrapper, marginHorizontal: 10, borderRadius: 2, elevation: 2, flexDirection: 'row',    alignItems: 'center', justifyContent: 'center'
                }}>

                  <View style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>

                  </View>

                  <View>

                  </View>

                  <View style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>

                  </View>

                </View>
              )
            }
            else if(this.state.selected_type === 'complex_way') {
        
            }        

          })}
        </ScrollView>
      </View>


      {
        this.state.footer
      }
      


    </View>
    );
  }
}

function uniqueByObjectKey(arr, key) {
  var unique = {};
  var distinct = [];
  arr.forEach(function (x) {
    console.log('x', x)
    console.log('key', key)
    console.log('x[key]]', x[key])
    if (!unique[x[key]]) {
      distinct.push(x)
      unique[x[key]] = true
    }
  })
  return distinct
}

function saveTaskListToJSON (action, removed_task) {

  if(action === 'add') {
    this.state.all_tasks = this.state.all_tasks.concat(this.state.task_list)
    this.state.all_tasks = uniqueByObjectKey(this.state.all_tasks, 'id')
  }
  else if (action === 'delete') {
    let index = this.state.all_tasks.findIndex(function(task) {
      console.log('saveTaskListToJSON')
      console.log('task.id', task)
      console.log('removed_task.id', removed_task)
      if(task.id === removed_task.id) return true
    }.bind(this))
    this.state.all_tasks.splice(index, 1)
  }
  console.log('saveTaskListToJSON this.state.all_tasks', this.state.all_tasks)

  RNFS.writeFile(path, JSON.stringify(this.state.all_tasks), 'utf8')
    .then(() => {
      console.log('FILE WRITTEN!', this.state.all_tasks)
    })
    .catch((err) => {
      console.log(err.message)
    })
}


export default TaskList