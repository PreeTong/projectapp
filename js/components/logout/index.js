import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, View } from 'react-native';

const logowims = require("../../../img/web-cover1.jpg");


export default class Logout extends Component {

    componentDidMount() {
        { this.remove() }
    }
    
    remove() {
        let k_resp_login = null;
        AsyncStorage.removeItem('k_resp_login');
        { this.props.navigation.navigate('Login') }
    }

    render() {
        return (
            <View style={{ backgroundColor: '#464646', flex: 1, alignItems: 'center', justifyContent: 'center' }}/>
        );
    }



};

const styles = StyleSheet.create({
});




