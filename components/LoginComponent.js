import React, {Component,useState} from 'react';
import {View,StyleSheet, Text, ScrollView, Image} from 'react-native';
import { Icon, Input, CheckBox, Button} from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import {baseUrl} from '../shared/baseUrl';

class LoginTab extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount(){
        SecureStore.getItemAsync('userinfo')
        .then((userdata) => {
            let userinfo = JSON.parse(userdata);
            if(userinfo){
                this.setState({username: userinfo.username});
                this.setState({password: userinfo.password});
                this.setState({remember: true});
            }
        })
    }
    static navigationOptions = {
        title: 'Login'
        
    };

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if(this.state.remember){
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
            .catch((error) => console.log("Could not save user info ", error));
        }
        else{
            SecureStore.deleteItemAsync('userinfo')
            .catch((error) => console.log("Could not delete user info ", error));
        }
    }

    render() {
        return(
            <View style={styles.container}>
                <Input placeholder="Username" leftIcon={{type: 'font-awesome', name:"user-o"}} onChangeText={(username) => this.setState({username})} 
                value={this.state.username} style={styles.formInput} />
                <Input placeholder="Password" leftIcon={{type: 'font-awesome', name:"key"}} onChangeText={(password) => this.setState({password})} 
                value={this.state.password} style={styles.formInput} />
                <CheckBox title="Remember Me" checked={this.state.remember} center onPress={()=>this.setState({remember:!this.state.remember})} 
                containerStyle={styles.formCheckbox} />
                <View style={styles.formButton}>
                    <Button onPress={() => this.handleLogin()} title="Login" buttonStyle={{backgroundColor:"#512da8"}} 
                        icon={<Icon name="sign-in" type="font-awesome" color="white" size={24} />}/>
                </View>
                <View style={styles.formButton}>
                    <Button onPress={() => this.props.navigation.navigate('Register')} title="Register" type="clear" titleStyle={{color:'blue'}} 
                            icon={<Icon name="user-plus" type="font-awesome" color="blue" size={24} />}/>
                </View>
            </View>
        );
    }

}

class RegisterTab extends Component{
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl+'images/logo.png'

        }
    }
    getImageFromCamers = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if(cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted'){
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing:true,
                aspect: [4,3]
            });
            if(!capturedImage.cancelled){
                this.setState({imageUrl: capturedImage.uri})
            }
        }
    }
    static navigationOptions = {
        title: 'Register'
    };
    handleRegister(){
        console.log(JSON.stringify(this.state));
        if(this.state.remember)
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))
            .catch((error) => console.log("Could not save user info ", error));
    }
    render() {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image source={{uri:this.state.imageUrl}} loadingIndicatorSource={require('./images/logo.png')} style={styles.image} />
                        <Button title='Camera' onPress={this.getImageFromCamers}/>
                    </View>
                    <Input placeholder="Username" leftIcon={{type: 'font-awesome', name:"user-o"}} onChangeText={(username) => this.setState({username})} 
                    value={this.state.username} style={styles.formInput} />
                    <Input placeholder="Password" leftIcon={{type: 'font-awesome', name:"key"}} onChangeText={(password) => this.setState({password})} 
                    value={this.state.password} style={styles.formInput} />
                    <Input placeholder="Firstname" leftIcon={{type: 'font-awesome', name:"user-o"}} onChangeText={(firstname) => this.setState({firstname})} 
                    value={this.state.firstname} style={styles.formInput} />
                    <Input placeholder="Lastname" leftIcon={{type: 'font-awesome', name:"user-o"}} onChangeText={(lastname) => this.setState({lastname})} 
                    value={this.state.lastname} style={styles.formInput} />
                    <Input placeholder="Email" leftIcon={{type: 'font-awesome', name:"envelope-o"}} onChangeText={(email) => this.setState({email})} 
                    value={this.state.email} style={styles.formInput} />
                    <CheckBox title="Remember Me" checked={this.state.remember} center onPress={()=>this.setState({remember:!this.state.remember})} 
                    containerStyle={styles.formCheckbox} />
                    <View style={styles.formButton}>
                        <Button onPress={() => this.handleRegister()} title="Register" buttonStyle={{backgroundColor:"#512da8"}} 
                        icon={<Icon name="user-plus" type="font-awesome" color="white" size={24} />}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const Tab = createBottomTabNavigator();
function MyTabs(){
    return(
        <Tab.Navigator tabBarOptions={{
            activeBackgroundColor: '#9575CD',
            inactiveBackgroundColor: '#D1C4E9',
            activeTintColor: '#ffffff',
            inactiveTintColor: 'gray'
        }}>
            <Tab.Screen options={{
                tabBarLabel:"Login", 
                tabBarIcon: ({tintColor}) => (
                    <Icon name="sign-in" 
                    type="font-awesome" 
                    size={24} 
                    iconStyle={{color:tintColor}} />
                )}} 
                name="Login" component={LoginTab}/>
            <Tab.Screen options={{
                tabBarLabel:"Register", 
                tabBarIcon: ({tintColor}) => (
                    <Icon name="user-plus" 
                    type="font-awesome" 
                    size={24} 
                    iconStyle={{color:tintColor}} />
                )}} name="Register" component={RegisterTab}/>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    imageContainer:{
        flex:1,
        flexDirection: 'row',
        margin:20
    },
    image: {
        margin:10,
        width:80,
        height:60
    },
    formInput: {
        margin:20
    },
    formCheckbox: {
        margin:20,
        backgroundColor: null
    },
    formButton: {
        margin:60
    }
});

export default function Login(){
    return(
        <NavigationContainer>
            <MyTabs/>
        </NavigationContainer>
    );
};