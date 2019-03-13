import React, {Component} from 'react'
import { Button, View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
var RNFS = require('react-native-fs')

var path = RNFS.ExternalStorageDirectoryPath + '/Tenshi.json';

// RNFS.writeFile(path, "It's new File", 'utf8')
//   .then((success) => {
//     console.log('FILE WRITTEN!')
//   })
//   .catch((err) => {
//     console.log(err.message)
//   })

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
  console.log('date', date)
  let day = `${(date.getDate())}`.length === 1 ? `0${date.getDate()}` : date.getDate()
  let month = date.getMonth() + 1
  month = `${month}`.length === 1 ? `0${month}` : month
  let year = date.getFullYear()

  return `${day}.${month}.${year}`
}


export default  class TaskList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      task_list: [],
      footer: <View></View>
    }
  }

  render() {


      RNFS.exists(path)
        .then((exist) => {
          this.exist_JSON = exist
        })
        .catch((err) => {
          console.log(err)
        })

      const { navigation } = this.props
      let select_day = navigation.getParam('select_day')
      this.state.select_date = normalizeDate(select_day.timestamp)

      if(navigation.getParam('task_type') === 'one_way') {
        this.state.task_list.push({'type': navigation.getParam('task_type'), 'name': '', 'date': this.state.select_date})
      }


      if(this.state.task_list.length > 0) {
        this.state.footer =  <View style={{ width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        borderTopColor: 'black', borderTopWidth: 2, backgroundColor: 'red'}}></View>
      }

        return (
        <View style={{flex: 1}}>

          <View style={styles.header}>

            <TouchableOpacity style={{position: 'absolute', left: 15, top: 10, width: 45, height: 45, alignItems: 'center', flexDirection: 'row', backgroundColor: 'black', paddingLeft: 10, borderRadius: 30}}
            onPress={() => this.props.navigation.goBack()}>
              <Image
              style={{width: 20, height: 20}}
              source={require('../images/left-arrow.png')}
              ></Image>
            </TouchableOpacity>

            <View>
              <Text style={{width: 100, fontSize: 18, color: 'black', textAlign: 'center'}}>{this.state.select_date}</Text>
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

          <ScrollView>

            {this.state.task_list.map((prop, key) => {
              console.log('prop', prop)
              console.log('key', key)
              return (
                <View key={key}>
                  <TextInput
                  onChangeText={(text) => {
                    console.log('text', text)
                  }}>
                    {prop.type + key}
                  </TextInput>
                </View>
              )
            })}

          </ScrollView>


          {
            this.state.footer
          }
          


        </View>
        );
    }
}