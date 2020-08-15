import React, {Component,useState} from 'react';
import {Text,View,ScrollView,StyleSheet,Picker,Switch,Button, Modal, Alert} from 'react-native';
import {Card} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import * as Animatable from 'react-native-animatable';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

export const DatePackage = (props) => {
    const [date, setDate] = useState(props.date);
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      props.callback(currentDate);
      setDate(currentDate);
      
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };
  
    return (
      <View style={styles.formItem}>
          <Button color='#512da8' onPress={showDatepicker} title="Date" />
          <Button color='#512da8' onPress={showTimepicker} title="Time" />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    );
  };
  

class Reservation extends Component{


    constructor(props){
        super(props);
        this.state ={
            guests: 1,
            smoking: false,
            date: new Date(),
            showModal: false
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }
    toggleModal(){
        this.setState({ showModal: !this.state.showModal});
    }
    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: new Date()
        });

    }
    async obtainNotificationPermission(){
        let permission = await Notifications.getPermissionsAsync();
        if(permission.status !== 'granted'){
            permission = await Notifications.requestPermissionsAsync({
                ios: {
                  allowAlert: true,
                  allowBadge: true,
                  allowSound: true,
                  allowAnnouncements: true,
                }
              });
            if(permission.status !== 'granted'){
                Alert.alert('Permission not granted to show notifications');
            }

        }

        return permission;
    }

    async presentLocalNotification(date){
        await this.obtainNotificationPermission();
        Notifications.presentNotificationAsync({
            title:'Your Reservation',
            body: 'Reservation for '+date+' requested.',
            ios:{
                sound:true
            },
            android:{
                sound:true,
                vibrate: true,
                color: '#512da8'
            }
        });
    }

    handleChange = event => {
        this.state.date = event;
    }
    handleReservation(){
        console.log(JSON.stringify(this.state));
        //this.toggleModal();
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: '+this.state.guests+'\nSmoking? : '+(this.state.smoking?'Yes':'No')+'\nDate and Time: '
            +moment(this.state.date).format("dddd, MMM DD at HH:mm a"),
            [
                { 
                    text: 'Cancel', 
                    onPress: () => this.resetForm(),
                    style: 'cancel'
                },
                { 
                    text: 'Yes', 
                    onPress: () => {
                        this.presentLocalNotification(this.state.date);
                        this.resetForm();
                    }
                }
            ],
            {
                cancelable:false
            }
        );
    }
    render() {
        return(
            <Animatable.View animation="zoomIn" duration={2000} delay={100}>
            <ScrollView>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Number of Guests</Text>
                    <Picker style={styles.formItem} selectedValue={this.state.guests} onValueChange={(itemValue, itemIndex) => this.setState({guests:itemValue})}>
                        <Picker.Item label='1' value='1'/>
                        <Picker.Item label='2' value='2'/>
                        <Picker.Item label='3' value='3'/>
                        <Picker.Item label='4' value='4'/>
                        <Picker.Item label='5' value='5'/>
                        <Picker.Item label='6' value='6'/>
                    </Picker>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                    <Switch style={styles.formItem} value={this.state.smoking} trackColor='#512da8' onValueChange={(value)=> this.setState({smoking:value})}>
                    </Switch>
                </View>
                <View style={styles.formRow}>
                    <Text style={{
                            fontSize:18,
                            flex: 1
                        }}>Date and Time</Text>
                    <DatePackage date={this.state.date} callback={this.handleChange} />
                </View>
                <View style={styles.formRow}>
                    <Button title='Reserve' color='#512da8' onPress={() => this.handleReservation()} accessibilityLabel='Make Reservation'/>
                </View>
                <Modal animationType={'slide'} transparent={false} visible={this.state.showModal} 
                onDismiss={() => {
                    this.toggleModal(); 
                    this.resetForm()
                    }}
                    onRequestClose={() => {
                        this.toggleModal(); 
                        this.resetForm()
                        }}>
                    <View style={styles.modal}>
                        <Text style={styles.modalTitle}>Your Reservation</Text>
                        <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style={styles.modalText}>Smoking? : {this.state.smoking?'Yes':'No'}</Text>
                        <Text style={styles.modalText}>Date and Time: {moment(this.state.date).format("dddd, MMM DD at HH:mm a")}</Text>
                        <Button color='#512da8' title='Close' onPress={() => {
                        this.toggleModal(); 
                        this.resetForm()
                        }}/>
                    </View>
                </Modal>
            </ScrollView>
            </Animatable.View>
        )
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize:18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin:20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#512da8',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText:{
        fontSize: 18,
        margin: 10
    }
})

export default Reservation;