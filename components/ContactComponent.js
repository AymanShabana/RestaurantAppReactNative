import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component{

    sendMail(){
        MailComposer.composeAsync({
            recipients: ['ayman_shabana@outlook.com'],
            subject: "Mail composer test",
            body: 'This is a test email.'
        });
    }

    static navigationOptions = {
        title: 'Contact Us'
    };

    render(){
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card title="Contact Information">    
                    <Text style={{margin:10}}>
                    121, Clear Water Bay Road{'\n'}{'\n'}
                    Clear Water Bay, Kowloon{'\n'}{'\n'}
                    HONG KONG{'\n'}{'\n'}
                    Tel: +852 1234 5678{'\n'}{'\n'}
                    Fax: +852 8765 4321{'\n'}{'\n'}
                    Email:confusion@food.net
                    </Text>
                    <Button title=" Send Email" buttonStyle={{backgroundColor:"#512da8"}} icon={<Icon name="envelope-o" type="font-awesome" color="white" />}
                    onPress={this.sendMail} />
                </Card>
            </Animatable.View>
        );
    }
}
export default Contact;