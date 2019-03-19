import React, {Component} from 'react'
import { Button, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default  class NewTask extends Component {
  render() {
        return (
        <View style={{width: '100%', height: '100%'}}>

            <TouchableOpacity style={{position: 'absolute', left: 15, top: 10, width: 45, height: 45, alignItems: 'center', flexDirection: 'row', backgroundColor: 'black', paddingLeft: 10, borderRadius: 30}}
            onPress={() => this.props.navigation.goBack()}>
              <Image
              style={{width: 20, height: 20}}
              source={require('../images/left-arrow.png')}
              ></Image>
            </TouchableOpacity>

            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>

                <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('TaskList', {
                        "task_type": 'one_way',
                        "dot_color": 'blue'
                    })
                }}
                style={{marginBottom: 10, backgroundColor: 'black', paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12, borderRadius: 3}}>
                    <Text style={{color: 'white'}}>One Way</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('TaskList', {
                        "task_type": 'battle',
                        "dot_color": 'red'
                    })
                }}
                style={{marginBottom: 10, backgroundColor: 'black', paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12, borderRadius: 3}}>
                    <Text style={{color: 'white'}}>Battle</Text>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('TaskList', {
                        "task_type": 'complex_way',
                        "dot_color": 'green'
                    })
                }}
                style={{backgroundColor: 'black', paddingTop: 8, paddingBottom: 8, paddingLeft: 12, paddingRight: 12, borderRadius: 3}}>
                    <Text style={{color: 'white'}}>Complex Way</Text>
                </TouchableOpacity>

            </View>

            

        </View>
        );
    }
}