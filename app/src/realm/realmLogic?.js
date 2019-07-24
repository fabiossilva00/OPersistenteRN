import Realm from './realm'

export function deleteModel() {
    Realm.deleteModel('QueueRequest')
}