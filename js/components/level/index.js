
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Image, ListView, ActivityIndicator, Text } from 'react-native';
import { List, Content, FooterTab, Footer, Container, Header, Title, Button, Icon, Right, Left, Body, View } from 'native-base';

class Level extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }

    componentDidMount() {
        fetch('http://iisct.info/api/ticket', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                getSev: '5'
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                const data = responseJson;
                let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
                this.setState({
                    isLoading: false,
                    dataSource: ds.cloneWithRows(responseJson.ticket_severity),
                }, function () {
                    // In this block you can do something with new state.
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    ListViewItemSeparator = () => {
        return (
            <View
                style={{
                    //height: 19,
                    //width: "100%",
                    //backgroundColor: "green"
                    paddingBottom: 20
                }}
            />
        );
    }



    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (

            <Container style={{ backgroundColor: '#FFFFFF' }}>
                <Header hasTabs style={{ backgroundColor: '#009688' }}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ alignSelf: 'center' }}>           LEVEL</Title>
                    </Body>
                    <Right>
                        <Button transparent transparent onPress={() => this.props.navigation.navigate('Notifications')}>
                            <Icon name="md-notifications-outline" />
                        </Button>
                    </Right>
                </Header>
                <Footer>
                    <FooterTab>
                        <Button style={{ backgroundColor: "#EBEBEB" }} button onPress={() => this.props.navigation.navigate('Home')}>
                            <Text style={{ fontSize: 15, color: 'black' }}>Home</Text>
                        </Button>
                        <Button style={{ backgroundColor: "#009688" }}>
                            <Text style={{ fontSize: 15, color: 'white' }}>Level</Text>
                        </Button>
                    </FooterTab>
                </Footer>

                <ScrollView>

                    <View style={{ margin: 10, paddingTop: 20 }} >
                        <View style={{ flex: 1, flexDirection: 'row' }} >
                            <ListView
                                style={{backgroundColor: 'white' }}
                                dataSource={this.state.dataSource}
                                renderSeparator={this.ListViewItemSeparator}
                                renderRow={(rowData) =>
                                    <Text style={styles.circle}>
                                        {rowData.sev}
                                    </Text>}
                            />
                            <ListView
                                style={{ backgroundColor: 'white' }}
                                dataSource={this.state.dataSource}
                                renderSeparator={this.ListViewItemSeparator}
                                renderRow={(rowData) =>
                                    <Text style={{ flex:1, alignSelf:'center',paddingTop: 20, paddingBottom: 11, }}>       
                                        <Icon style={{ color: '#2E9AFE', }} name="ios-arrow-forward-outline" />
                                        <Icon style={{ color: '#2E9AFE', }} name="ios-arrow-forward-outline" />
                                    </Text>} />
                            <ListView
                                style={{ backgroundColor: 'white' }}
                                dataSource={this.state.dataSource}
                                renderSeparator={this.ListViewItemSeparator}
                                renderRow={(rowData) =>
                                    <Text style={styles.circle}  >
                                        {rowData.num} </Text>}
                            />
                        </View>
                    </View>
                </ScrollView>

                <Content padder />
                <View  >
                    <Button full style={{ backgroundColor: "#009688" }} button onPress={() => this.props.navigation.navigate('MainTicket')}>
                        <Text style={{ fontSize: 15, color: 'white' }}>NEXT TO DETAIL OF TICKETS</Text>
                    </Button>
                </View>

            </Container >

        );
    }
}
const styles = StyleSheet.create({
    circle: {
        width: 120,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#81BEF7',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        paddingTop: 17,
        fontSize: 20,
        color: 'white',

    },
});

export default Level;
