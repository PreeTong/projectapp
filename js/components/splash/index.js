import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    AsyncStorage
} from 'react-native';

const logowims = require("../../../img/web-cover1.jpg");

export default class Splash extends Component {
    check() {
        try {
            AsyncStorage.getItem('k_resp_login', (err, result) => {
                let parsed = JSON.parse(result);
                if (parsed !== null) {
                    this.props.navigation.navigate('Drawer');
                }
                else {
                    this.props.navigation.navigate('Login');
                }
            });
        } catch (error) {
            alert(error);
        }
    }

    remove() {
        let k_resp_login = '';
        AsyncStorage.removeItem('k_resp_login');
        alert(k_resp_login);
    }
    render() {
        return (
            <View style={{ backgroundColor: '#464646', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 50, color: 'white', alignItems: 'center' }}>Welcome</Text>
                {this.check()}

            </View>
        );
    }
}

const styles = StyleSheet.create({

});




