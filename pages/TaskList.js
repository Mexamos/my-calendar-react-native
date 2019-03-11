import React, {Component} from 'react'
import { Button, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
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
    height: 60,
    borderBottomColor: 'red',
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
    super(props);
    this.state = {
      titleText: "Bird's Nest",
      bodyText: 'This is not really a bird nest.'
    };
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

      

        return (
        <View>

          <View style={styles.header}>

            <TouchableOpacity style={{position: 'absolute', left: 15, width: 40, height: 40, alignItems: 'center', flexDirection: 'row',}}
            onPress={() => this.props.navigation.goBack()}>
              <Image
              style={{width: 20, height: 20}}
              source={require('../images/left-arrow.png')}
              ></Image>
            </TouchableOpacity>

            <View>
              <Text style={{width: 100, borderColor: 'green', borderWidth: 2, textAlign: 'center'}}>{this.state.select_date}</Text>
            </View>

          </View>


            <Button
            title="Go to TaskList... again"
            onPress={() => this.props.navigation.push('TaskList')}
            />
            <Button
            title="Go to Calendar"
            onPress={() => this.props.navigation.navigate('Calendar')}
            />
            <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
            />
        </View>
        );
    }
}