import React from 'react'
import {
    View,
    StyleSheet
} from 'react-native'

class Main extends React.Component {

    static navigationOptions = {
        header: null
    }

    render() {
        return(
            <View style={styles.container}>
                
            </View>
        )
    }
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})