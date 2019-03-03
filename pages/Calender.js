// import React, {Component} from 'react';
// // import {Button, StyleSheet, Text, View, Navigator, TouchableHighlight} from 'react-native';

// // import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import React, {Component} from 'react';
import { Button, View, Text } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation'; // Version can be specified in package.json

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Button
          title="Go to Details... again"
          onPress={() => this.props.navigation.push('Details')}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Details: {
      screen: DetailsScreen,
    },
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
































// class Main extends Component {
//   constructor(props) {
//     super(props);
//     this.today = getTodayDate()
//     this.calendar_show = true
//     this.select_day = 'null'
//   }
// }







// export default class Views extends Main {


//   toggleRenderElement() {
//     var mark = {
//       [this.today]: {selected: true, selectedColor: 'blue'}
//     }
//     if (this.calendar_show) {
//       return (
//         <CalendarList
//           // Max amount of months allowed to scroll to the past. Default = 50
//           pastScrollRange={50}
//           // Max amount of months allowed to scroll to the future. Default = 50
//           futureScrollRange={50}
//           scrollEnabled={true}
//           showScrollIndicator={true}
//           firstDay={1}
//           markedDates={mark}
//           onDayPress={(day) => {
//             this.select_day = day
//             this.calendar_show = false
//             this.forceUpdate()
//           }}
//         />
//       )          
//     }
//     else {
//       return (
//         <Button
//           onPress={function() {
//             this.calendar_show = true
//             this.forceUpdate()
//           }.bind(this)}
//           title="return to calender"
//           color="#841584"
//         />
//       )
//     }
//   }

  

//   render() {
//     return (
//       <View style={styles.container}>
//       {this.toggleRenderElement()}
//       </View>
//     )
//   }
// }

// function getTodayDate() {
//   let days_of_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',]        
//   let date = new Date()
//   let day = `${(date.getDate())}`.length === 1 ? `0${date.getDate()}` : date.getDate()
//   let month = date.getMonth() + 1
//   month = `${month}`.length === 1 ? `0${month}` : month
//   let year = date.getFullYear()
//   let day_of_week = date.getDay() - 1

//   console.log(`${days_of_week[day_of_week]} ${day}.${month}.${year}`)

//   return `${year}-${month}-${day}`
// }

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
