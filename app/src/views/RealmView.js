import React from 'react'
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity
} from 'react-native'
import { 
    storeRequest,
    deleteAll,
    deleteOne
} from '../realm/realm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
  
class RealmView extends React.Component {

    constructor(props){
        super(props)
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.deleteOne(item.idRequest)}
            >
                <View>
                    <Text>{item.idRequest}</Text>
                    <Text>{item.dataRequest.getMinutes()}</Text>
                    <Text>{item.method}</Text>
                    <Text>{item.endPoint}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { queueRequest } = this.props
        return(
            <View>
                <Text>Realm</Text>
                <Button title='Realm'
                    onPress={() => {
                        storeRequest()
                    }}
                />
                <Button title='DeleteAll'
                    onPress={() => {
                        // deleteAll()
                        console.log(this.props)
                    }}
                />
                <FlatList 
                    data={queueRequest}
                    extraData={this.props}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={this._renderItem}
                />
            </View>
        )
    }
}

const mapStateToProps = store => {
    return {
        queueRequest: store.realViewReducer.queueRequest,
        isConnect: store.mobileReducer.isConnect,
    }
}

const mapDispatchToProps = dispatch => 
    bindActionCreators({
        deleteOne
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RealmView)