import React from 'react'
import {
    View,
    Text,
    Button,
    FlatList,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { 
    storeRequest,
    deleteAll,
    deleteOne,
    storeTextInput,
    restoreRequest
} from '../realm/realm'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
  
class RealmView extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            endPointText: '',
            tipoTransporteText: '',
            linhaProblemaText: '',
            localProblemaText: '',
            problemaText: '',
        }
    }

    componentDidMount() {
        this.props.restoreRequest()
    }

    _renderItem = ({item}) => {
        return (
            <TouchableOpacity
                onPress={() => this.props.deleteOne(item.idRequest)}
            >
                <View>
                    <Text>ID Realm UUID - {item.idRequest}</Text>
                    <Text>Data CriadoRealm - {item.dataRequest.getHours()}{item.dataRequest.getMinutes()}</Text>
                    <Text>Request Method - {item.method}</Text>
                    <Text>EndPoint - {item.endPoint}</Text>
                    <Text>Tentativas - {item.tentativas}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const { queueRequest, storeTextInput } = this.props
        return(
            <View>
                <Text>Realm</Text>
                <Button title='DeleteAll'
                    onPress={() => {
                        // deleteAll()
                        console.log(this.props)
                    }}
                />
                <TextInput style={{borderWidth: 0.5, height: 35, width: '90%', marginVertical: 7.5, alignSelf: 'center', paddingLeft: 5}}
                    placeholder='EndPoint'
                    onChangeText={t => this.setState({endPointText: t})}
                    value={this.state.endPointText}
                />
                <TextInput style={{borderWidth: 0.5, height: 35, width: '90%', marginVertical: 7.5, alignSelf: 'center', paddingLeft: 5}}
                    placeholder='Tipo Transporte'
                    onChangeText={t => this.setState({tipoTransporteText: t})}
                    value={this.state.tipoTransporteText}
                />
                <TextInput style={{borderWidth: 0.5, height: 35, width: '90%', marginVertical: 7.5, alignSelf: 'center', paddingLeft: 5}}
                    placeholder='Linha Problema'
                    onChangeText={t => this.setState({linhaProblemaText: t})}
                    value={this.state.linhaProblemaText}
                />
                <TextInput style={{borderWidth: 0.5, height: 35, width: '90%', marginVertical: 7.5, alignSelf: 'center', paddingLeft: 5}}
                    placeholder='Local Problema'
                    onChangeText={t => this.setState({localProblemaText: t})}
                    value={this.state.localProblemaText}
                />
                <TextInput style={{borderWidth: 0.5, height: 35, width: '90%', marginVertical: 7.5, alignSelf: 'center', paddingLeft: 5}}
                    placeholder='Problema'
                    onChangeText={t => this.setState({problemaText: t})}
                    value={this.state.problemaText}
                />
                <Button title='Realm'
                    onPress={() => {
                        // storeRequest()
                        const { 
                            endPointText,
                            tipoTransporteText,
                            localProblemaText,
                            linhaProblemaText,
                            problemaText
                        } = this.state
                        const store = {
                            endPoint: endPointText,
                            tipoTransporte: tipoTransporteText,
                            linha_problema: linhaProblemaText,
                            local_problema: localProblemaText,
                            problema: problemaText
                        }
                        storeTextInput(store)
                        console.log(this.state)
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
        queueStart: store.queueReducer.queueStart
    }
}

const mapDispatchToProps = dispatch => 
    bindActionCreators({
        deleteOne,
        storeTextInput,
        restoreRequest
    }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RealmView)