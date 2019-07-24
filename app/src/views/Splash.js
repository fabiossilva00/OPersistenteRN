import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { restoreRequest } from '../realm/realm'
import { deleteModel } from '../realm/realmLogic?'
import { addListenerInternet } from '../services/microServices/internetListener'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class Splash extends React.Component {

    componentDidMount() {
        this.props.addListenerInternet()
        // this.props.restoreRequest()
        setTimeout(() => {this.props.navigation.navigate('RealmView')}, 2500)
    }

    render() {
        return(
            <View style={{alignItems: 'center', justifyContent: 'center', backgroundColor: 'cornsilk', flex: 1}}>
                <Text style={{fontSize: 55, fontWeight: '600'}}> Splash </Text>
            </View>
        )
    }
}

const mapStateToProps = store => {
    return {

    }
}

const mapDispatchToProps = dispatch => 
    bindActionCreators({
        restoreRequest,
        addListenerInternet
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Splash)