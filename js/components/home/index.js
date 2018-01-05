import React, { Component } from 'react';
import { AsyncStorage, Dimensions, Image, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Body, Button, Container, Footer, FooterTab, Header, Icon, Left, Right, Title, View } from 'native-base';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import DismissKeyboard from 'dismissKeyboard';

const face = require("../../../img/face.png");


const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = 0.0422;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;


class Home extends Component {

    constructor() {
        super();
        this.geolocation_gps()
        this.state = {
            isLoading: true,
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            markerPosition: {
                latitude: 0,
                longitude: 0
            },
            name: 'Loadind...',
            namef: 'Loadind...',
            team: 'Loadind...',
            position: 'Loadind...',
            statusme: 'available',
            statuscolor: 'gray'
        };
    }

    geolocation_gps(){
        navigator.geolocation.getCurrentPosition(
            position => {

                this.setState({
                    region: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                });
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        ),

            this.watchID = navigator.geolocation.watchPosition(
                position => {
                    this.setState({
                        region: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        },
                        markerPosition: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        }
                    });
                }
            )
    }


    componentDidMount() {
        

            AsyncStorage.getItem('k_resp_login', (err, result) => {
                let information = JSON.parse(result);
                    this.setState({
                    isLoading: false,
                    name: information.User.email,
                    namef:information.User.first_name,
                    // team: information.User.team,
                    // position: information.User.position
                });
            })//,
            // let Status_work = '';
            // AsyncStorage.setItem('Status_work', Status_work);
            // AsyncStorage.getItem('Status_work', (err, status) => {
            //     this.setState({ statusme: status })
            //     if (status == null) {
            //         this.setState({ statusme: 'available' })
            //     }
            //     if (this.state.statusme == 'available') {
            //         this.setState({ statuscolor: 'gray' })
            //     }
            //     else if (this.state.statusme == 'busy') {
            //         this.setState({ statuscolor: '#009688' })
            //     }
            // });
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
                <Header
                    style={{ backgroundColor: '#009688' }}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body >
                        <Title style={{ alignSelf: 'center' }}>            HOME</Title>
                    </Body>
                    <Right>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('Notifications')}>
                            <Icon name="md-notifications-outline" />
                        </Button>
                    </Right>
                </Header>

                <Footer>
                    <FooterTab>
                        <Button
                            style={{ backgroundColor: "#009688" }}>
                            <Text style={{ fontSize: 15, color: 'white' }}>Home</Text>
                        </Button>
                        <Button
                            style={{ backgroundColor: "#EBEBEB" }}
                            button
                            onPress={() => this.props.navigation.navigate('Level')}>
                            <Text style={{ fontSize: 15, color: 'black' }}>Level</Text>
                        </Button>
                    </FooterTab>
                </Footer>

                <View style={styles.bordersh}>
                    <View style={styles.bordershcolor}>
                        <View style={{ flex: 3, flexDirection: 'row' }} >
                            <View style={{ flex: 1 }} >
                                <Image source={face} style={styles.image} />
                            </View>
                            <View style={styles.detail} >
                                <Text>Name : {this.state.namef}</Text>
                                <Text>Position : {this.state.position}</Text>
                                <Text>Team : {this.state.team}</Text>
                            </View>
                        </View>
                        <View style={styles.status} >
                            <View style={{ flex: 1, alignSelf: 'center' }} >
                                <Text style={{ paddingLeft: 10 }} >
                                    STATUS : {this.state.statusme}
                                </Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <TouchableOpacity
                                    style={{
                                        width: 100,
                                        height: 30,
                                        margin: 5,
                                        backgroundColor: this.state.statuscolor,
                                        alignItems: 'center'
                                    }}
                                    onPress={() => this.props.navigation.navigate('Mywork')}>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ flex: (deviceHeight * 6) / 11 }}>
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        showsUserLocation={true}
                        region={this.state.region}
                    >
                        {/* <MapView.Marker
                            coordinate={this.state.region}
                            title='Your Location'
                        /> */}
                    </MapView>
                </View>

                <Text style={{ alignSelf: 'center', fontSize: 12 }}>
                    Lat : {this.state.region.latitude}   Long : {this.state.region.longitude}
                </Text>
            </Container >
        );
    }
}

const styles = StyleSheet.create({
    bordersh: {
        margin: 20,
        paddingHorizontal: 10,
        flex: (deviceHeight * 6) / 11
    },
    bordershcolor: {
        flex: 1,
        borderWidth: 2.5,
        borderColor: 'gray',
    },
    image: {
        marginTop: 30,
        alignSelf: 'center',
        width: 120,
        height: 120,
        borderRadius: 120 / 2,
        borderWidth: 2,
        borderColor: 'gray'
    },
    detail: {
        flex: 1,
        marginTop: 30,
        alignContent: 'center'
    },
    status: {
        flex: 1,
        borderTopWidth: 1.5,
        borderTopColor: 'gray',
        flexDirection: 'row'
    },
    map: {
        left: 20,
        right: 20,
        top: 0,
        bottom: 0,
        position: 'absolute'
    },
})

export default Home;