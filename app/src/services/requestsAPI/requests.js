import urlBase from './urlBase'
import { relatarProblema, relatarProblemas } from './endPoints'
import moment from 'moment'

import {
    fetchLoading,
    fetchSuccess,
    fetchFailure
} from '../../redux/reducers/mainReducer'

import { finishService } from '../../redux/reducers/queueReducer'

import { deleteOne, updateTentativas } from '../../realm/realm'

export function relatarProblemaAPI() {
    return dispatch => {
        dispatch(fetchLoading())
        urlBase.post(relatarProblema, {
            tipo_transporte: 'onibus',
            linha_problema: 'Azul',
            local_problema: 'Tucuruvi',
            problema: 'Maior tempo de parada',
            id_usuario: '1'
        })
        .then(res => {
            console.log(res)
            dispatch(fetchSuccess('Relatado'))
        })
        .catch(err => {
            console.log(err)
            dispatch(fetchFailure('Falha'))
        })
    }
}
export function relatarProblemasAPI() {
    return dispatch => {
        dispatch(fetchLoading())
        urlBase.post(relatarProblemas, {
            tipo_transporte: 'onibus',
            linha_problema: 'Azul',
            local_problema: 'Tucuruvi',
            problema: 'Maior tempo de parada',
            id_usuario: '1'
        })
        .then(res => {
            console.log(res)
            dispatch(fetchSuccess('Relatado'))
        })
        .catch(err => {
            console.log(err)
            dispatch(fetchFailure('Falha'))
        })
    }
}

export function relatarOffline(queue) {
    console.log('Axios')
        return dispatch => {
            function queueRequest() {
                let count = 0
                console.log(queue)
                for (let q in queue) {
                    console.log({...queue[q].json})
                    urlBase({
                        method: queue[q].method,
                        url: queue[q].endPoint,
                        data: {...queue[q].json}
                    })
                    .then(res => {
                        console.log(res, 'Sucesso Request')
                        queue.splice(q, 1)
                        return 
                    })
                    .catch(err => {
                        console.log('Erro Requisição', err.config)

                    })
                }
            }
            queueRequest()
        // queue.map(item => {
        //     urlBase({
        //         method: item.method,
        //         url: item.endPoint,
        //         data: item.json
        //     })
        //     .then(res => {
        //         console.log(res, 'Sucesso Request')
        //     })
        //     .catch(err => {
        //         console.log('Erro Requisição', err.response)
        //         return
        //     }) 
        // })

    }
}

export function requestProblemaRealm(queue) {
    return dispatch => {
        console.log(queue.length)
        function request(fila) {
            if (fila.length === 0){
                console.log('Acabou')
                dispatch(finishService())
                return 
            }
            //verifica Data fila[0].dataRequest
            let diferenca = moment().diff(fila[0].dataRequest, 'minutes')
            // console.log(diferenca)
            if (diferenca <= 2) {
                urlBase({
                    method: fila[0].method,
                    url: fila[0].endPoint,
                    data: {...fila[0].json}
                })
                .then(res => {
                    console.log(res)
                    dispatch(deleteOne(fila[0].idRequest))
                    fila.splice(0, 1)
                    request(fila)
                })
                .catch(err => {
                    if (fila[0].tentativas <= 3) {
                        console.log(err)
                        //update tentativas
                        let tentativas = fila[0].tentativas + 1
                        updateTentativas(fila[0].idRequest, tentativas)
                    }else{
                        dispatch(deleteOne(fila[0].idRequest))
                    }

                    fila.splice(0, 1)
                    request(fila)
                })
            }else{
                //Log outra requisicao mesma logica de cima
                //Por enquanto delete
                console.log('Maior Tempo')
                dispatch(deleteOne(fila[0].idRequest))
                fila.splice(0, 1)
                request(fila)
            }
            console.log(fila, 'Valor')
        }
        request(queue)
    }
}
