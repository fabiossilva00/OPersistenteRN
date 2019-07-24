class QueueOfflineRequest {
    constructor(queue){
        this.idRequest = queue.idRequest
        this.dataRequest = queue.dataRequest
        this.method = queue.method
        this.endPoint = queue.endPoint
        this.json = new RelatarProblema(queue.jsonRequest)
    }

}

class RelatarProblema {
    constructor(relatar) {
        this.id_usuario = relatar.id_usuario
        this.problema = relatar.problema
        this.tipo_transporte = relatar.tipoTransporte
        this.linha_problema = relatar.linha_problema
        this.local_problema = relatar.local_problema
        // this.latitude = relatar.latitude
        // this.longitude = relatar.longitude
    }
}

export default QueueOfflineRequest