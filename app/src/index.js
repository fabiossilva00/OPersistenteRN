import React from 'react'
// import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import Routers from './routers/router'

// import storePersist from './redux/store'

// const { store, persistor } = storePersist()
import store from './redux/store'

const App = () => {
    return (
        <Provider store={store} >
            {/* <PersistGate loading={null} persistor={persistor}> */}
                <Routers />
            {/* </PersistGate> */}
        </Provider>
    )
}

export default App