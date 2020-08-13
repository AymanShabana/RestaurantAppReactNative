import React, {Component} from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { View, Platform, Image, StyleSheet, ScrollView, Text } from 'react-native';
import { createStackNavigator} from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems} from 'react-navigation-drawer';
import { createAppContainer, SafeAreaView} from 'react-navigation';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import {Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchDishes ,fetchComments, fetchLeaders, fetchPromos} from '../redux/ActionCreators';
import Reservation from './ReservationComponent'
import Favorites from './FavoriteComponent'

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders    
    }
}
const mapDispatchToProps = dispatch =>({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchLeaders: () => dispatch(fetchLeaders()),
    fetchPromos: () => dispatch(fetchPromos())
})
const MenuNavigator = createStackNavigator({
    Menu: {screen: Menu,
    navigationOptions: ({navigation})=> ({
        headerStyle:{
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:() => <Icon name='menu' size={30} color='white' onPress={()=>navigation.toggleDrawer()} />
    })},
    Dishdetail: {screen: Dishdetail,
        navigationOptions:{
            headerStyle:{
                backgroundColor: '#512DA8'
            },
            headerTintColor: '#fff',
            headerTitleStyle:{
                color:'#fff'
            }
        }
    }
},{
    initialRouteName: 'Menu',
});
const MenuContainer = createAppContainer(MenuNavigator);

const ContactNavigator =createStackNavigator({
    Contact: {screen: Contact,
    navigationOptions:({navigation})=>({
        headerStyle:{
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft: () =>(<Icon name='menu' size={30} color='white' onPress={()=>navigation.toggleDrawer()} />)

    })
}});
const AboutNavigator =createStackNavigator({
    About: {screen: About,
    navigationOptions:({navigation})=>({
        headerStyle:{
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:() => <Icon name='menu' size={30} color='white' onPress={()=>navigation.toggleDrawer()} />

    })
}});
const ReservationNavigator =createStackNavigator({
    Reservation: {screen: Reservation,
    navigationOptions:({navigation})=>({
        headerStyle:{
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:() => <Icon name='menu' size={30} color='white' onPress={()=>navigation.toggleDrawer()} />

    })
}});
const FavoritesNavigator =createStackNavigator({
    Favorites: {screen: Favorites,
    navigationOptions:({navigation})=>({
        headerStyle:{
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:() => <Icon name='menu' size={30} color='white' onPress={()=>navigation.toggleDrawer()} />

    })
}});
const HomeNavigator =createStackNavigator({
    Home: {screen: Home,
    navigationOptions:({navigation})=>({
        headerStyle:{
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle:{
            color:'#fff'
        },
        headerLeft:() => <Icon name='menu' size={30} color='white' onPress={()=>navigation.toggleDrawer()} />

    })
}});

const CustomDrawerContentComponent = (props) =>(
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{top:'always',horizontal:'never'}}>
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage}/>
                </View>
                <View style={{flex:2}}>
                    <Text style={styles.drawerHeaderText}>East of West Restaurant</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Home:{
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({tintColor}) =>(
                <Icon name='home' type='font-awsome' size={24} color={tintColor}/>
            )
        }
    },
    About:{
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({tintColor}) =>(
                <Icon name='info' type='font-awsome' size={24} color={tintColor}/>
            )
        }

    },
    Menu:{
        screen: MenuContainer,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({tintColor}) =>(
                <Icon name='list' type='font-awsome' size={24} color={tintColor}/>
            )
        }

    },
    Contact:{
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({tintColor}) =>(
                <Icon name='contacts' type='font-awsome' size={22} color={tintColor}/>
            )
        }

    },
    Favorites:{
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({tintColor}) =>(
                <Icon name='favorite' type='font-awsome' size={24} color={tintColor}/>
            )
        }

    },
    Reservation:{
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({tintColor}) =>(
                <Icon name='local-dining' type='font-awsome' size={24} color={tintColor}/>
            )
        }

    }
},{
    drawerBackgroundColor: '#d1c4e9',
    contentComponent: CustomDrawerContentComponent
})

const MainContainer = createAppContainer(MainNavigator);


class Main extends Component {

    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }
    render() {
        return(
            <View style={{flex:1,paddinTop: Platform.OS === 'ios'?0:Expo.Constants.statusBarHeight}}>
                <MainContainer/> 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    drawerHeader: {
        backgroundColor: '#512da8',
        height:140,
        alignItems: 'center',
        justifyContent: 'center',
        flex:1,
        flexDirection: 'row'
    },
    drawerHeaderText:{
        color:'white',
        fontSize:24,
        fontWeight: 'bold'
    },
    drawerImage:{
        margin:10,
        width:80,
        height:60
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(Main);