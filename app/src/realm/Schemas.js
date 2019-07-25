import Realm from 'realm'

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
        idRequest: {type: 'string', indexed: true},
        dataRequest: {type: 'date', default: new Date()},
        tentativas: {type: 'int', default: 1}, //tentativas de evnio
        method: {type: 'string'},
        endPoint: {type: 'string'},
        jsonRequest: {type: 'Relatar'}
    }
}
