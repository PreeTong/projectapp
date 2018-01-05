//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, PermissionsAndroid  } from 'react-native';

import MapView from 'react-native-maps';

const {width, height} = Dimensions.get('window')

// create a component
class DeltaMapView extends Component {

    constructor(){
        super()
        this.checkPermission_GPS()
        this.state = {
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: null,
                longitudeDelta: null
            }
        }
    }


    checkPermission_GPS(){
        try {
            const checkPermission = PermissionsAndroid.checkPermission(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                if (checkPermission) {
                    console.log('You can use the location');
                  } else {
                                    PermissionsAndroid.requestPermission(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
                  }
        } catch (err) {
          console.warn(err);
        }
    }


    calcDetla(lat, lon, accuracy){
        const oneDegreeOfLongitudInMeters = 111.32;
        const circumference = (40075 / 360)

        const latDelta = 0.01 //accuracy * (1 / (Math.cos(lat) * circumference))
        const lonDelta = 0.01 //(accuracy / oneDegreeOfLongitudInMeters)


        this.setState({
            region: {
                latitude: lat,
                longitude: lon,
                latitudeDelta: latDelta,
                longitudeDelta: lonDelta
            }
        })
    }

    componentWillMount () {
        //this.checkPermission_GPS()
        //this.requestLocationPermission()
        
        navigator.geolocation.getCurrentPosition(
            (position) =>{
                const lat = parseFloat(position.coords.latitude)
                const lon = parseFloat(position.coords.longitude)
                const accuracy = position.coords.accuracy
                this.calcDetla(lat, lon, accuracy)
            },
            (error) => {
                console.log(error)
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
        )
    }

    maker(){
        return{
            latitude: this.state.region.latitude,
            longitude: this.state.region.longitude

        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.region.latitude ? <MapView 
                    style={styles.map}
                    initialRegion={this.state.region}
                >
                <MapView.Marker 
                    coordinate={this.maker()}
                    title = "Im here!"
                    description ="Home"
                />
                </MapView>: null}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    map:{
        flex: 1,
        width: width
    }
});

//make this component available to the app
export default DeltaMapView;
