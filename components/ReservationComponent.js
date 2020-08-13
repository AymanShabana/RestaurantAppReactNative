import React, {Component,useState} from 'react';
import {Text,View,ScrollView,StyleSheet,Picker,Switch,Button} from 'react-native';
import {Card} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';

export const DatePackage = () => {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
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
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }
    handleReservation(){
        console.log(JSON.stringify(this.state));
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        })
    }
    render() {
        return(
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
                    <DatePackage />
                </View>
                <View style={styles.formRow}>
                    <Button title='Reserve' color='#512da8' onPress={() => this.handleReservation()} accessibilityLabel='Make Reservation'/>
                </View>
            </ScrollView>
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
    }
})

export default Reservation;