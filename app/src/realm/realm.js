import Realm from 'realm'
import uuid from 'uuid/v4'
import { 
    relatarSchema, 
    queueRequest
} from './Schemas'

import QueueOfflineRequest from '../model/queueRequest'

import { pegaValoresQueueOffline } from '../redux/reducers/realmViewReducer'

import { relatarOffline, requestProblemaRealm } from '../services/requestsAPI/requests'

import { startService, finishService } from '../redux/reducers/queueReducer'

import store from '../redux/store'

export function storeRequest() {
    Realm.open({schema: [relatarSchema, queueRequest]})
        .then(realm => {
            realm.write(() => {
                realm.create('QueueRequest', {
                    idRequest: uuid(),
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

const defaultText = {
    endPoint: 'default',
    tipoTransporte: 'default',
    linha_problema: 'default',
    local_problema: 'default',
    problema: 'default'
}

export function storeTextInput(dados = defaultText){
    return dispatch => {
        Realm.open({schema: [relatarSchema, queueRequest]})
            .then(realm => {
                realm.write(() => {
                    const {
                        endPoint,
                        tipoTransporte,
                        linha_problema,
                        local_problema,
                        problema,
                    } = dados
                    realm.create('QueueRequest', {
                        method: 'post',
                        endPoint,
                        idRequest: uuid(),
                        jsonRequest: {
                            tipoTransporte,
                            linha_problema,
                            local_problema,
                            problema,
                            id_usuario: '123ABC',
                            latitude: 123.456,
                            longitude: 654.321
                        }
                    })
                    let newModel = _retornaClassQueue(realm.objects('QueueRequest'))
                    dispatch(pegaValoresQueueOffline(newModel))
                })
                realm.close()
            })
    }
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
                console.log(id, 'ID Carinha')
               const oneDelete = realm.objects('QueueRequest').filtered(`idRequest == '${id}'`)
               if (oneDelete.length !== 0) {
                   realm.write(() => {
                       realm.delete(oneDelete)
                       const newQueue = _retornaClassQueue(realm.objects('QueueRequest'))
                       dispatch(pegaValoresQueueOffline(newQueue))
                   })
               }
            //    realm.close()
            }) 
            .catch(err => {
                console.log(err, 'Error DeleteOne')
            })
    }
}

export function requestOffline() {
    console.log('Request')
    // return dispatch => {
    //     console.log('Request')
    //     Realm.open()
    //     .then(realm => {
    //         console.log('Realm')
    //             if (realm.objects('QueueRequest').length !== 0) {
    //                 console.log('!= 0')
    //                 const newQueueModel = _retornaClassQueue(realm.objects('QueueRequest'))
    //                 dispatch(pegaValoresQueueOffline(newQueueModel))
    //                 dispatch(relatarOffline(newQueueModel))
    //                 // dispatch(relatarOffline(newQueueModel, dispatch))
    //             }else{  
    //                 console.log('Nenhuma requisição')
    //                 realm.close()
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err, 'Erro RequestOffline')
    //         })
    // }
}

export function updateTentativas(id, tentativa) {
    console.log(id, tentativa)
    Realm.open()
        .then(realm => {
            realm.write(() => {
                realm.create(('QueueRequest'), {idRequest: id, tentativas: tentativa}, true)
            })
            realm.close()
        })
        .catch(err => { 
            console.log('Error updateTentativas', err)
        })

}

export function requestOffQueue() {
    console.log('requestOffQueue')
    return dispatch => {
        const { queueReducer: { queueStart } } = store.getState()
        if (queueStart === true) {
            console.log('Eba!!!')
        }else{
            console.log('Ahh!!!')
            console.log('Dispatch ?')
            dispatch(startService())
            Realm.open()
                .then(realm => {
                    const queue = realm.objects('QueueRequest')
                    if (queue !== 0) {
                        const modelQueue = _retornaClassQueue(queue)
                        dispatch(pegaValoresQueueOffline(modelQueue))
                        dispatch(requestProblemaRealm(modelQueue))
                    }else{
                        dispatch(finishService())
                    }
                })
                .catch(err => {
                    dispatch(finishService())
                    console.log('Error requestOffQueue', err)
                })
        }
    }
}

export default new Realm({schema: [relatarSchema, queueRequest]})