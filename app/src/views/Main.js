import React from 'react'
import {
    View,
    StyleSheet,
    Button
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { relatarProblemaAPI } from '../services/requestsAPI/requests'

class Main extends React.Component {

    static navigationOptions = {
        header: null
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.botoes}>
                <Button title='Relatar Problemas'
                    onPress={() => {
                        this.props.relatarProblemaAPI()
                    }}
                />
                <Button title='Props'
                    onPress={() => {
                        console.log(this.props)
                        
                    }}
                />
                </View>
            </View>
        )
    }
}

const mapStateToProps = store => ({
    isLoading: store.mainReducer.isLoading,
    relatarProblema: store.mainReducer.relatarProblema,
    errorMessage: store.mainReducer.errorMessage,
})

const mapDispatchToProps = dispatch => 
    bindActionCreators({
        relatarProblemaAPI
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Main)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    botoes: {
        height: '50%',
        justifyContent: 'space-around'
    }
})