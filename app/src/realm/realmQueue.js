import React from 'react'
import Realm from 'realm'
import store from '../redux/store'

export function requestOffQueue() {
    console.log('requestOffQueue')
    return dispatch => {
        console.log('Dispatch ?')
        dispatch(startService())
        Realm.open()
            .then(realm => {
                const queue = realm.objects('QueueRequest')
                if (queue !== 0) {
                    const modelQueue = _retornaClassQueue(queue)
                    dispatch(pegaValoresQueueOffline(modelQueue))

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