import { 
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation'

import Main from '../views/Main'
import RealmView from '../views/RealmView'
import Splash from '../views/Splash'

const MainStack = createStackNavigator({
    Main
})

const appSwitch = createSwitchNavigator(
    {
        MainStack,
        RealmView,
        Splash
    },
    {
        initialRouteName: 'Splash',
        defaultnavigationOptions: {}
    }
)

export default createAppContainer(appSwitch)