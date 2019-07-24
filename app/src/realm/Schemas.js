import Realm from 'realm'
import uuid from 'uuid'

export const relatarSchema = {
    name: 'Relatar',
    properties: {
        tipoTransporte: 'string',
        linha_problema: 'string',
        local_problema: 'string',
        problema: 'string',
        id_usuario: 'string',
        latitude: 'int',
        longitude: 'int',
    }
}

export const queueRequest = {
    name: 'QueueRequest',
    primaryKey: 'idRequest',
    properties: {
        idRequest: {type: 'string', default: uuid(), indexed: true},
        dataRequest: {type: 'date', default: new Date()},
        method: {type: 'string'},
        endPoint: {type: 'string'},
        jsonRequest: {type: 'Relatar'}
    }
}
