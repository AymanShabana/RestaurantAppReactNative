import React, {Component} from 'react';
import Menu from './MenuComponent';
import {DISHES} from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator} from 'react-navigation-stack';
import { createAppContainer} from 'react-navigation';

const MenuNavigator = createStackNavigator({
    Menu: {screen: Menu},
    Dishdetail: {screen: Dishdetail}
},{
    initialRouteName: 'Menu',
    navigationOptions:{
        headerStyle:{
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
            color:'#fff'
        }
    }
});
const App = createAppContainer(MenuNavigator);


class Main extends Component {

    render() {
        return(
            <View style={{flex:1,paddinTop: Platform.OS === 'ios'?0:Expo.Constants.statusBarHeight}}>
                <App/> 
            </View>
        );
    }
}

export default Main;