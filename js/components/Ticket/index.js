import React, { Component } from 'react';

import {
  StyleSheet, ActivityIndicator, ListView, View, 
    Text, TouchableOpacity,   
} from 'react-native';
import { Icon } from 'native-base';


class MainTicket extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      btnSelected: 1,
      status: 'NEW',
    };
  }

  componentDidMount(){
    return this._handlePress('NEW',1);
  }

  _handlePress(val, btn) {
    this.setState({
      btnSelected: btn,
    })

    return fetch('http://iisct.info/api/ticket', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        getTicket : 5,
        stu: val,
        sev: 'SA3,NSA4',
        limit: 20,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
         let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.ticket_fields),
        }, function () {
          // In this block you can do something with new state.
        });
      })
      .catch((error) => {
        console.error(error);
      });

  }

  btnSevColor(sev) {
    let color = "#c1db70";
    if (sev == "SA1" || sev == "SA2") return "#db7070";
    if (sev == "SA3" || sev == "SA4") return "#db8b70";
    if (sev == "NSA1" || sev == "NSA2") return "#dba670";
    if (sev == "NSA3") return "#dbc170";
    if (sev == "NSA4") return "#dbdb70";
    return color;
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
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

      <View style={{ flex: 1 }}>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#009688' }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            <Icon style={{ color: 'white', padding: 15 }} name="menu" />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'white', padding: 15 }}>TICKET</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Notifications')}>
            <Icon style={{ color: 'white', padding: 15 }} name="md-notifications-outline" />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity style={(this.state.btnSelected == 1) ? styles.btnSel : styles.btnTapbar} onPress={() => this._handlePress('NEW', 1)} >
            <Icon name="notifications" /><Text>NEW</Text></TouchableOpacity>
          <TouchableOpacity style={(this.state.btnSelected == 2) ? styles.btnSel : styles.btnTapbar} onPress={() => this._handlePress('NOTCLEAR', 2)} >
            <Icon name="time" /><Text>SLAHold</Text></TouchableOpacity>
          <TouchableOpacity style={(this.state.btnSelected == 3) ? styles.btnSel : styles.btnTapbar} onPress={() => this._handlePress('HOLD', 3)} >
            <Icon name="flash" /><Text>HOLD</Text></TouchableOpacity>
          <TouchableOpacity style={(this.state.btnSelected == 4) ? styles.btnSel : styles.btnTapbar} onPress={() => this._handlePress('WAIT', 4)} >
            <Icon name="bulb" /><Text>WAIT</Text></TouchableOpacity>
        </View>
        <View style={{ flex: 9, justifyContent: 'center' }}>

          <ListView
          enableEmptySections={true}
            dataSource={this.state.dataSource}
            renderSeparator={this.ListViewItemSeparator}
            renderRow={(rowData) =>
            
            <View style={{  flex: 0,flexDirection: "row" }}>
              <View style={{ flex: 0, padding: 5 }}>
                <TouchableOpacity
                      style={{
                            flex: 1,
                            padding: 5,
                            borderWidth: 0.4,
                            borderColor: "rgba(0,0,0,1)",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 50,
                            height: 50,
                            backgroundColor: "#ddd",
                            borderRadius: 100,
                            backgroundColor: `${this.btnSevColor(rowData.sev)}`
                            }}>
                  <Text style={{ color: "#333" }}>{rowData.sev}</Text>
                </TouchableOpacity>

              </View>
              
              <View style={{ flex: 2, padding: 5 }}>
              <Text style={styles.rowViewContainer} onPress={() => this.props.navigation.navigate('tkdetail', { sent: rowData.act })} >No : {rowData.stt}
                <Text style={{ fontSize: 15, color: 'black' }} numberOfLines={3} note>{'\n'}Level : {rowData.sev}</Text>
                <Text style={{ flex: 1, fontSize: 15, textAlign: 'right', color: '#8FA89C' }} >{'\t'}{'\t'}Status : {rowData.stu}</Text>
              </Text>
              </View>
              </View>

              /* <Text style={styles.rowViewContainer} onPress={() => this.props.navigation.navigate('tkdetail', { sent: rowData.stt })} >No : {rowData.stt}
                <Text style={{ fontSize: 15, color: 'black' }} numberOfLines={3} note>Level : {rowData.sev}</Text>
                <Text style={{ flex: 1, fontSize: 15, textAlign: 'right', color: '#8FA89C' }} >{'\t'}{'\t'}Type : {rowData.stu}</Text>
              </Text> */

            }
          />

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    // Setting up View inside content in Vertically center.
    justifyContent: 'center',
    flex: 1,
    margin: 10
  },
  btnTapbar: {
    flex: 1,
    padding: 5,
    borderWidth: .4,
    borderColor: 'rgba(111,111,111,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#ddd',
    borderRadius: 0,
  },
  btnSel: {
    flex: 1,
    padding: 5,
    borderWidth: .4,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#eee',
    borderRadius: 0,
  },
  rowViewContainer: {
    fontSize: 20,
    paddingLeft: 30,
    paddingBottom: 10,
    color: '#148451',
  }

});
export default MainTicket;
