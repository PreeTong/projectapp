import React, { Component } from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Body, Button, Container, Header, Icon, Left, Title } from 'native-base';

export default class Notifications extends Component {
    render() {
        return (
            <Container style={{ backgroundColor: '#FFFFFF' }}>
                <Header hasTabs style={{ backgroundColor: '#009688' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="md-arrow-round-back" />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ alignItems: 'center' }}>Notifications</Title>
                    </Body>
                </Header>

                <View style={{ flex:1,alignItems: 'center' ,justifyContent:'center'}} >
                    <Text style={{ fontSize: 50,color:'#e6e6e6' }}  >In the future</Text>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});
