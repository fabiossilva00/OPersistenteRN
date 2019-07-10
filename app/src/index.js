import React from 'react'
import Routers from './routers/router'

import { Provider } from 'react-redux'

import store from './redux/store'

const App = () => {
    return (
        <Provider store={store} >
            <Routers />
        </Provider>
    )
}

export default App