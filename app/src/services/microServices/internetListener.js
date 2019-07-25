import NetInfo from '@react-native-community/netinfo'

import { statusInternet } from '../../redux/reducers/mobileReducer'

import { requestOffline, requestOffQueue } from '../../realm/realm'

export function addListenerInternet() {
    return async dispatch => {
        await NetInfo.addEventListener(state => {
            dispatch(statusInternet(state.isConnected))
            if (state.isConnected === true) {
                console.log('Internet', state.isConnected)
                // dispatch(requestOffline())
                // requestOffline(dispatch)
                dispatch(requestOffQueue())
            }
        })
    }
}