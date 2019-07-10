import { 
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator
} from 'react-navigation'

import Main from '../views/Main'

const MainStack = createStackNavigator({
    Main
})

const appSwitch = createSwitchNavigator(
    {
        MainStack
    },
    {
        initialRouteName: 'MainStack',
        defaultnavigationOptions: {}
    }
)

export default createAppContainer(appSwitch)