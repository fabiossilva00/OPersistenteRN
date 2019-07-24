import Realm from 'realm'
import { 
    relatarSchema, 
    queueRequest
} from './Schemas'

import QueueOfflineRequest from '../model/queueRequest'

import { pegaValoresQueueOffline } from '../redux/reducers/realmViewReducer'

import { relatarOffline } from '../services/requestsAPI/requests'

export function storeRequest() {
    Realm.open({schema: [relatarSchema, queueRequest]})
        .then(realm => {
            realm.write(() => {
                realm.create('QueueRequest', {
                    method: 'post',
                    endPoint: '/relatar/problema',
                    jsonRequest: {
                        tipoTransporte: 'Onibus',
                        linha_problema: '1720',
                        local_problema: 'Local',
                        problema: 'Velocidade',
                        id_usuario: '123ABC',
                        latitude: 123.456,
                        longitude: 654.321
                    }
                })
            })
            realm.close()
        })
        .catch(err => {
            console.log(err, 'Erro Realm')
        })
}

export function restoreRequest() {
    return dispatch => {
        Realm.open()
            .then(realm => {
                const requestOff = realm.objects('QueueRequest').map(item => {
                    return item
                })
                if (requestOff.length !== 0) {
                    console.log(requestOff)
                    
                    const newModelQueue = _retornaClassQueue(requestOff)
                    dispatch(pegaValoresQueueOffline(newModelQueue))
                                        
                }else{
                    console.log(requestOff, 'Sem')
                }
            })
            .catch(err => {
                console.log(err, 'Erro Restore')
            })
    }
}

function _retornaClassQueue(realm) {
    return realm.map(item => {
        return new QueueOfflineRequest(item)
    })
}

export function deleteAll() {
    Realm.open()
        .then(realm => {
            realm.write(() => {
                let deleteAll = realm.objects('QueueRequest')
                realm.delete(deleteAll)
            })
            realm.close()
        })
        .catch(err => {
            console.log(err, 'Erro DeleteAll')
        })
}

export function deleteOne(id) {
    return dispatch => {
        Realm.open()
            .then(realm => {
               const oneDelete = realm.objects('QueueRequest').filtered(`idRequest == '${id}'`)
               if (oneDelete.length !== 0) {
                   realm.write(() => {
                       realm.delete(oneDelete)
                       const newQueue = _retornaClassQueue(realm.objects('QueueRequest'))
                       dispatch(pegaValoresQueueOffline(newQueue))
                   })
               }
               realm.close()
            }) 
            .catch(err => {
                console.log(err, 'Error DeleteOne')
            })
    }
}

export function requestOffline() {
    console.log('Request')
    return dispatch => {
        console.log('Request')
        Realm.open()
        .then(realm => {
            console.log('Realm')
                if (realm.objects('QueueRequest').length !== 0) {
                    console.log('!= 0')
                    const newQueueModel = _retornaClassQueue(realm.objects('QueueRequest'))
                    dispatch(pegaValoresQueueOffline(newQueueModel))
                    dispatch(relatarOffline(newQueueModel))
                    // dispatch(relatarOffline(newQueueModel, dispatch))
                }else{  
                    console.log('Nenhuma requisição')
                    realm.close()
                }
            })
            .catch(err => {
                console.log(err, 'Erro RequestOffline')
            })
    }
}

export default new Realm({schema: [relatarSchema, queueRequest]})