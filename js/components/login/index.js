import React, { Component } from "react";
import { Keyboard,Alert, AsyncStorage, Dimensions, Image, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Icon, Text } from "native-base";
import DismissKeyboard from 'dismissKeyboard';

const launchscreenBg = require("../../../img/bg.png");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      UserEmail: '',
      UserPassword: ''
    }
  }

  UserLoginFunction = () => {
    const { UserEmail } = this.state;
    const { UserPassword } = this.state;
    fetch('http://iisct.info/api/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login: UserEmail,
        password: UserPassword
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === 200) {
          if (responseJson.User === 'undefined') {
            DismissKeyboard()
          }
          else {
            AsyncStorage.setItem('k_resp_login', JSON.stringify(responseJson));
            DismissKeyboard()
            this.props.navigation.navigate('Drawer');
          }
        }
        else {
          DismissKeyboard()
          Alert.alert("Incorrect user or password");
        }
      }).catch((error) => {
        console.error(error);
      });
  }
// Api น้อง
  UserLoginFunctionApi = () => {
    const { UserEmail } = this.state;
    const { UserPassword } = this.state;
    fetch('http://169.254.83.111:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: UserEmail,
        password: UserPassword
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        let data = responseJson.login[0];
        if (data.email !== undefined) {
          // alert(data.email)
          AsyncStorage.setItem('k_resp_login', JSON.stringify(responseJson));
          DismissKeyboard()
          this.props.navigation.navigate('Drawer');
        }
        else {
          DismissKeyboard()
          Alert.alert(responseJson.login);
        }
      }).catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (

      <TouchableWithoutFeedback onPress={() => { DismissKeyboard() }}>
        <Image source={launchscreenBg} style={{ flex: 1, width: null, height: null }}>

          <View style={{ alignItems: 'center', justifyContent: 'center', flexGrow: 1 ,flex:1}} >
            <Text style={{ fontSize: 60, color: 'white', opacity: 0.9 }}>ProjectApp</Text>
          </View>

          <View style={{ flex:1, paddingBottom: 160, paddingTop: 50, paddingHorizontal: 70, alignSelf: 'center' }} >

            <View style={{ paddingBottom: 20 }}>
              <View style={{ flexDirection: 'row', paddingRight: 10, alignSelf: 'center', borderWidth: 1, borderColor: 'gray', }}>
                <TextInput
                  placeholderTextColor='gray'
                  placeholder="Enter User Email"
                  onChangeText={UserEmail => this.setState({ UserEmail })}
                  underlineColorAndroid='transparent'
                  returnKeyType="next"
                  onSubmitEditing={() => this.passwordInput.focus()}
                  style={styles.TextInputStyleClass}
                />
                <Icon name="md-mail" style={{ color: 'gray', alignSelf: 'center' }} />
              </View>
            </View>

            <View style={{ paddingBottom: 20 }}>
              <View style={{ flexDirection: 'row', paddingRight: 10, alignSelf: 'center', borderWidth: 1, borderColor: 'gray', }}>
                <TextInput
                  placeholderTextColor="gray"
                  placeholder="Enter User Password"
                  onChangeText={UserPassword => this.setState({ UserPassword })}
                  underlineColorAndroid='transparent'
                  style={styles.TextInputStyleClass}
                  secureTextEntry={true}
                  returnKeyType="go"
                  ref={(input) => this.passwordInput = input}
                />
                <Icon name="md-person" style={{ color: 'gray', alignSelf: 'center' }} />
              </View>
            </View>

            <View style={{ paddingHorizontal: 40 }}>
              <TouchableOpacity
                style={{ borderRadius: 20, backgroundColor: '#00332E', paddingVertical: 10 }}
                onPress={this.UserLoginFunction}
              >
                <Text style={{ textAlign: 'center', color: 'white' }}  >Log in</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Image>
      </TouchableWithoutFeedback>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  TextInputStyleClass: {
    textAlign: 'center',
    height: 50,
    width: 200,
    color: '#00332E',
  },

});
