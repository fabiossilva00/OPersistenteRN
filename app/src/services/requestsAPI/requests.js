import urlBase from './urlBase'
import { relatarProblema, relatarProblemas } from './endPoints'

import {
    fetchLoading,
    fetchSuccess,
    fetchFailure
} from '../../redux/reducers/mainReducer'

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