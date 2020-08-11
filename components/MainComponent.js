import React, {Component} from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator} from 'react-navigation-drawer';
import { createAppContainer} from 'react-navigation';
import Home from './HomeComponent';

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
const MenuContainer = createAppContainer(MenuNavigator);

const HomeNavigator =createStackNavigator({
    Home: {screen: Home},
},{
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

const MainNavigator = createDrawerNavigator({
    Home:{
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home'
        }
    },
    Menu:{
        screen: MenuContainer,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu'
        }

    }
},{
    drawerBackgroundColor: '#d1c4e9'
})

const MainContainer = createAppContainer(MainNavigator);


class Main extends Component {

    render() {
        return(
            <View style={{flex:1,paddinTop: Platform.OS === 'ios'?0:Expo.Constants.statusBarHeight}}>
                <MainContainer/> 
            </View>
        );
    }
}

export default Main;