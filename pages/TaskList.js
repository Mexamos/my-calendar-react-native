import React, {Component} from 'react'
import { Button, View, Text } from 'react-native'

export default  class TaskList extends Component {
    render() {
        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>TaskList</Text>
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