import React, { Component } from "react";
import { Image } from "react-native";
import { Container, Content, Icon, Text, Footer, FooterTab, Button } from "native-base";
import {
  StyleSheet,
  View,
  Alert,
  AsyncStorage,
  TouchableOpacity
} from "react-native";

class tkdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      s_id: "Loading...",
      ticket: "Loading...",
      site: "Loading...",
      level: "Loading...",
      status: "Loading...",
      zone: "Loading...",
      issued_time: "Loading...",
      expires_time: "Loading...",
      type: "Loading...",
      detail_ticket: "Loading...",
      updated_at: "Loading...",
      name: "",
      team: ""
    };
  }
  static navigationOptions = {
    title: "DETAILS"
  };

  componentDidMount() {
    fetch("http://iisct.info/api/ticket", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        getLog: this.props.navigation.state.params.sent
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.ticket_logs[0]);
        const data = responseJson.ticket_logs[0];
        this.setState({
          //     s_id: data.s_id,
          ticket: data.stat_stt,
          //     site: data.site,
          //     level: data.level,
          status: data.stat_status,
          //     zone: data.zone,
          //     issued_time: data.issued_time,
          updated_at: data.updated_at,
          type: data.stat_type,
          detail_ticket: data.stat_log
        });
      })
      .catch(error => {
        this.setState({ Ticket: "NotFound" });
        console.error(error);
      });
  }

  acceptjob = () => {
    AsyncStorage.getItem("Status_work", (err, result) => {
      if (result == "busy") {
        Alert.alert("Can't accept another ticket", "You are working ", [
          //{text: 'Confirm', onPress: () => this.props.navigation.navigate('Home')},
          { text: "Ok", style: "cancel" }
        ]);
      } else {
        AsyncStorage.getItem("k_resp_login", (err, result) => {
          let information = JSON.parse(result);
          this.setState({
            name: information.login[0].firstname,
            team: information.login[0].team
          });
        }),
          Alert.alert("Accept", "Do you want to accept job?", [
            { text: "Accept", onPress: this.confirm },
            { text: "Cancel", style: "cancel" }
          ]);
      }
    });
  };

  confirm = () => {
    fetch("http://169.254.83.111:3000/ticket/detail/getdetail", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ticket: this.state.ticket,
        name: this.state.name,
        team: this.state.team
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        Alert.alert(responseJson.message);
        let changestatus = "busy";
        AsyncStorage.setItem("Ticket_work", this.state.ticket);
        AsyncStorage.setItem("Status_work", changestatus);
        this.props.navigation.navigate("Mywork");
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    if (this.state.status == "TAKE") {
      return (
        <Container style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#009688"
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("MainTicket")}
            >
              <Icon
                style={{ color: "white", padding: 15 }}
                name="md-arrow-round-back"
              />
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "white",
                padding: 15
              }}
            >
              DETAIL
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Notifications")}
            >
              <Icon
                style={{ color: "white", padding: 15 }}
                name="md-notifications-outline"
              />
            </TouchableOpacity>
          </View>
          <Content>
            <View style={{ margin: 20 }}>
              <View style={{ paddingLeft: 10 }}>
                <Text>TICKET : {this.state.ticket}</Text>
                <Text>Status : {this.state.status}</Text>
                <Text>Type : {this.state.type}</Text>
                <Text>Detail ticket : {this.state.detail_ticket}</Text>
                <Text>Updated Time : {this.state.updated_at}</Text>
              </View>
            </View>
          </Content>

          <Footer>
            <FooterTab>
              <Button style={{ backgroundColor: "#464646" }}>
                <Text style={{ fontSize: 15, color: "white" }}>DETAIL</Text>
              </Button>
              <Button
                style={{ backgroundColor: "#EBEBEB" }}
                button
                onPress={() => this.props.navigation.navigate("Level")}
              >
                <Text style={{ fontSize: 15, color: "black" }}>2</Text>
              </Button>
              <Button
                style={{ backgroundColor: "#EBEBEB" }}
                button
                onPress={() => this.props.navigation.navigate("Level")}
              >
                <Text style={{ fontSize: 15, color: "black" }}>3</Text>
              </Button>
              <Button
                style={{ backgroundColor: "#EBEBEB" }}
                button
                onPress={() => this.props.navigation.navigate("Level")}
              >
                <Text style={{ fontSize: 15, color: "black" }}>4</Text>
              </Button>
              <Button
                style={{ backgroundColor: "#EBEBEB" }}
                button
                onPress={() => this.props.navigation.navigate("Level")}
              >
                <Text style={{ fontSize: 15, color: "black" }}>5</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    } else {
      return (
        <Container style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#009688"
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("MainTicket")}
            >
              <Icon
                style={{ color: "white", padding: 15 }}
                name="md-arrow-round-back"
              />
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                color: "white",
                padding: 15
              }}
            >
              DETAIL
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Notifications")}
            >
              <Icon
                style={{ color: "white", padding: 15 }}
                name="md-notifications-outline"
              />
            </TouchableOpacity>
          </View>

          <View style={{ margin: 20 }}>
            <View style={{ paddingLeft: 10 }}>
              <Text>Ticket : {this.state.ticket}</Text>
              <Text>Status : {this.state.status}</Text>
              <Text>Type : {this.state.type}</Text>
              <Text>Detail ticket : {this.state.detail_ticket}</Text>
              <Text>Updated Time : {this.state.start_time}</Text>
            </View>
          </View>
        </Container>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  text: {
    alignSelf: "center",
    marginBottom: 7
  },
  mb: {
    marginBottom: 15
  }
});

export default tkdetail;
