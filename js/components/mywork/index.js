import React, { Component } from 'react';
import { Alert, AsyncStorage, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Body, Button, CheckBox, Container, Header, Icon, Left, ListItem, Right, Text, Title, View } from 'native-base';

class Mywork extends Component {

    constructor() {
        super();
        this.state = {
            work: 0,
            TICKET: 'Loading...',
            SITE: 'Loading...',
            LEVEL: 'Loading...',
            ZONE: 'Loading...',
            TYPE: 'Loading...',
            ISSUED_TIME: 'Loading...',
            EXPIRES_TIME: 'Loading...',
            START_TIME: 'Loading...',
            PROBLEM: 'Loading...',
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false,
            checkbox5: false,
            checkbox6: false,
            checkbox7: false,
            checkbox8: false,
            checkbox9: false,
            cb1: 'no',
            cb2: 'no',
            cb3: 'no',
            cb4: 'no',
            cb5: 'no',
            cb6: 'no',
            cb7: 'no',
            cb8: 'no',
            cb9: 'no',
            comment: ''
        };
    }

    componentDidMount() {
        const { TICKET } = this.state;
        const { SITE } = this.state;
        const { LEVEL } = this.state;
        const { ZONE } = this.state;
        const { TYPE } = this.state;
        const { ISSUED_TIME } = this.state;
        const { EXPIRES_TIME } = this.state;
        const { START_TIME } = this.state;
        const { PROBLEM } = this.state;

        AsyncStorage.getItem('Status_work', (err, result) => {
            if (result == 'busy') {
                this.setState({ work: '1' });
                if (this.state.work == 1) {
                    AsyncStorage.getItem('Ticket_work', (err, ticketwork) => {
                        // const { TICKET } = this.state;
                        // const { SITE } = this.state;
                        // const { LEVEL } = this.state;
                        // const { ZONE } = this.state;
                        // const { TYPE } = this.state;
                        // const { ISSUED_TIME } = this.state;
                        // const { EXPIRES_TIME } = this.state;
                        // const { START_TIME } = this.state;
                        // const { PROBLEM } = this.state;
                        fetch('http://169.254.83.111:3000/ticket/detail', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                ticket: ticketwork
                            })
                        }).then((response) => response.json())
                            .then((responseJson) => {
                                const data = responseJson;
                                this.setState({
                                    TICKET: data.detail[0].ticket,
                                    SITE: data.detail[0].site,
                                    LEVEL: data.detail[0].level,
                                    ZONE: data.detail[0].zone,
                                    TYPE: data.detail[0].type,
                                    ISSUED_TIME: data.detail[0].issued_time,
                                    EXPIRES_TIME: data.detail[0].expires_time,
                                    START_TIME: data.detail[0].start_time,
                                    PROBLEM: data.detail[0].detail_ticket
                                })
                                // this.setState({ TICKET: data.detail[0].ticket })
                                // this.setState({ SITE: data.detail[0].site })
                                // this.setState({ LEVEL: data.detail[0].level })
                                // this.setState({ ZONE: data.detail[0].zone })
                                // this.setState({ TYPE: data.detail[0].type })
                                // this.setState({ ISSUED_TIME: data.detail[0].issued_time })
                                // this.setState({ EXPIRES_TIME: data.detail[0].expires_time })
                                // this.setState({ START_TIME: data.detail[0].start_time })
                                // this.setState({ PROBLEM: data.detail[0].detail_ticket })
                            }).catch((error) => {
                                console.error(error);
                            });
                    })
                }
            } else if (result == 'available') {
                this.setState({ work: '0' });
            }
        });
    }

    closejob = () => {
        Alert.alert(
            'Confirm',
            'Do you want close job?',
            [
                { text: 'Confirm', onPress: this.confirm },
                { text: 'Cancel', style: 'cancel' },
            ],
        );
    }

    confirm = () => {
        fetch('http://169.254.83.111:3000/close', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ticket: this.state.TICKET,
                // comment: {
                //     poweroff: this.state.cb1,
                //     battery: this.state.cb2,
                //     noisepower: this.state.cb3,
                //     lowersignal: this.state.cb4,
                //     motor: this.state.cb5,
                //     cablebreak: this.state.cb6,
                //     thunder: this.state.cb7,
                //     storm: this.state.cb8,
                //     building: this.state.cb9,
                //     comment: this.state.comment                    
                // },
                comment:
                'poweroff : ' + this.state.cb1 +
                ' battery : ' + this.state.cb2 +
                ' noisepower : ' + this.state.cb3 +
                ' lowersignal : ' + this.state.cb4 +
                ' motor  : ' + this.state.cb5 +
                ' cablebreak : ' + this.state.cb6 +
                ' thunder : ' + this.state.cb7 +
                ' storm : ' + this.state.cb8 +
                ' building : ' + this.state.cb9 +
                ' comment : ' + this.state.comment
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson.Close_Ticket);
                let changestatus = 'available';
                AsyncStorage.setItem('Status_work', changestatus);
                this.props.navigation.navigate('Home');
            }).catch((error) => {
                console.error(error);
            });
    }

    toggleSwitch1() {
        this.setState({
            checkbox1: !this.state.checkbox1,
        });
        if (this.state.cb1 == 'no') {
            this.setState({ cb1: 'yes' })
        } else {
            this.setState({ cb1: 'no' });
        }
    }
    toggleSwitch2() {
        this.setState({
            checkbox2: !this.state.checkbox2,
        });
        if (this.state.cb2 == 'no') {
            this.setState({ cb2: 'yes' })
        } else {
            this.setState({ cb2: 'no' });
        }
    }
    toggleSwitch3() {
        this.setState({
            checkbox3: !this.state.checkbox3,
        });
        if (this.state.cb3 == 'no') {
            this.setState({ cb3: 'yes' })
        } else {
            this.setState({ cb3: 'no' });
        }
    }
    toggleSwitch4() {
        this.setState({
            checkbox4: !this.state.checkbox4,
        });
        if (this.state.cb4 == 'no') {
            this.setState({ cb4: 'yes' })
        } else {
            this.setState({ cb4: 'no' });
        }
    }
    toggleSwitch5() {
        this.setState({
            checkbox5: !this.state.checkbox5,
        });
        if (this.state.cb5 == 'no') {
            this.setState({ cb5: 'yes' })
        } else {
            this.setState({ cb5: 'no' });
        }
    }
    toggleSwitch6() {
        this.setState({
            checkbox6: !this.state.checkbox6,
        });
        if (this.state.cb6 == 'no') {
            this.setState({ cb6: 'yes' })
        } else {
            this.setState({ cb6: 'no' });
        }
    }
    toggleSwitch7() {
        this.setState({
            checkbox7: !this.state.checkbox7,
        });
        if (this.state.cb7 == 'no') {
            this.setState({ cb7: 'yes' })
        } else {
            this.setState({ cb7: 'no' });
        }
    }
    toggleSwitch8() {
        this.setState({
            checkbox8: !this.state.checkbox8,
        });
        if (this.state.cb8 == 'no') {
            this.setState({ cb8: 'yes' })
        } else {
            this.setState({ cb8: 'no' });
        }
    }
    toggleSwitch9() {
        this.setState({
            checkbox9: !this.state.checkbox9,
        });
        if (this.state.cb9 == 'no') {
            this.setState({ cb9: 'yes' })
        } else {
            this.setState({ cb9: 'no' });
        }
    }

    render() {
        if (this.state.work == 0) {
            return (
                <Container style={{ backgroundColor: '#FFFFFF' }}>
                    <Header hasTabs style={{ backgroundColor: '#009688' }}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                <Icon name="menu" />
                            </Button>
                        </Left>
                        <Body >
                            <Title style={{ alignSelf: 'center' }}>            My Work</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.navigate("Notifications")}>
                                <Icon name="md-notifications-outline" />
                            </Button>
                        </Right>
                    </Header>

                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                        <Text style={{ fontSize: 30, color: '#c2d6d6' }} >You don't have TICKET</Text>
                    </View>
                </Container>
            );
        }
        else {
            return (
                <Container style={{ backgroundColor: '#FFFFFF' }}>
                    <Header hasTabs style={{ backgroundColor: '#009688' }}>
                        <Left>
                            <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                                <Icon name="menu" />
                            </Button>
                        </Left>
                        <Body >
                            <Title style={{ alignSelf: 'center' }}>            My Work</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this.props.navigation.navigate("Notifications")}>
                                <Icon name="md-notifications-outline" />
                            </Button>
                        </Right>
                    </Header>


                    <ScrollView>
                        <View style={{ alignSelf: 'center', justifyContent: 'center', marginTop: 15, marginBottom: 15 }} >
                            <Text>TICKET : {this.state.TICKET}</Text>
                            <Text>SITE : {this.state.SITE}</Text>
                            <Text>LEVEL :{this.state.LEVEL} </Text>
                            <Text>ZONE : {this.state.ZONE}</Text>
                            <Text>TYPE : {this.state.TYPE}</Text>
                            <Text>ISSUED_TIME : {this.state.ISSUED_TIME}</Text>
                            <Text>EXPIRES_TIME : {this.state.EXPIRES_TIME}</Text>
                            <Text>START_TIME : {this.state.START_TIME}</Text>
                            <Text>PROBLEM : {this.state.PROBLEM}</Text>
                        </View>

                        <Text style={{ alignSelf: 'center', fontSize: 20, color: '#142952', fontWeight: 'bold', marginBottom: 10 }} >WORK SOLVING</Text>
                        <View style={{ flexDirection: 'row' }} >
                            <View style={{ flex: 1 }} >
                                <ListItem button onPress={() => this.toggleSwitch1()}>
                                    <CheckBox checked={this.state.checkbox1} onPress={() => this.toggleSwitch1()} />
                                    <Body>
                                        <Text>Power Off</Text>
                                    </Body>
                                </ListItem>
                            </View>
                            <View style={{ flex: 1 }} >
                                <ListItem button onPress={() => this.toggleSwitch2()}>
                                    <CheckBox checked={this.state.checkbox2} onPress={() => this.toggleSwitch2()} />
                                    <Body>
                                        <Text>Battery</Text>
                                    </Body>
                                </ListItem>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }} >
                            <View style={{ flex: 1 }} >
                                <ListItem button onPress={() => this.toggleSwitch3()}>
                                    <CheckBox checked={this.state.checkbox3} onPress={() => this.toggleSwitch3()} />
                                    <Body>
                                        <Text>Noise Power</Text>
                                    </Body>
                                </ListItem>
                            </View>
                            <View style={{ flex: 1 }} >
                                <ListItem button onPress={() => this.toggleSwitch4()}>
                                    <CheckBox checked={this.state.checkbox4} onPress={() => this.toggleSwitch4()} />
                                    <Body>
                                        <Text>Lower Signal</Text>
                                    </Body>
                                </ListItem>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }} >
                            <View style={{ flex: 1 }} >
                                <ListItem button onPress={() => this.toggleSwitch5()}>
                                    <CheckBox checked={this.state.checkbox5} onPress={() => this.toggleSwitch5()} />
                                    <Body>
                                        <Text>Motor</Text>
                                    </Body>
                                </ListItem>
                            </View>
                            <View style={{ flex: 1 }} >
                                <ListItem button onPress={() => this.toggleSwitch6()}>
                                    <CheckBox checked={this.state.checkbox6} onPress={() => this.toggleSwitch6()} />
                                    <Body>
                                        <Text>Cable Break</Text>
                                    </Body>
                                </ListItem>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }} >
                            <View style={{ flex: 1 }} >
                                <ListItem button onPress={() => this.toggleSwitch7()}>
                                    <CheckBox checked={this.state.checkbox7} onPress={() => this.toggleSwitch7()} />
                                    <Body>
                                        <Text>Thunder</Text>
                                    </Body>
                                </ListItem>
                            </View>
                            <View style={{ flex: 1 }} >
                                <ListItem button onPress={() => this.toggleSwitch8()}>
                                    <CheckBox checked={this.state.checkbox8} onPress={() => this.toggleSwitch8()} />
                                    <Body>
                                        <Text>Storm</Text>
                                    </Body>
                                </ListItem>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }} >
                            <View style={{ flex: 1 }} >
                                <ListItem button onPress={() => this.toggleSwitch9()}>
                                    <CheckBox checked={this.state.checkbox9} onPress={() => this.toggleSwitch9()} />
                                    <Body>
                                        <Text>Building</Text>
                                    </Body>
                                </ListItem>
                            </View>
                            <View style={{ flex: 1 }} />
                        </View>

                        <View style={{ marginHorizontal: 15, marginBottom: 20, marginTop: 15 }}>
                            <Text style={{ marginBottom: 10 }} >Other</Text>
                            <TextInput
                                placeholderTextColor="gray"
                                placeholder="Please specify if there are additional issues"
                                onChangeText={comment => this.setState({ comment })}
                                underlineColorAndroid='transparent'
                                style={styles.TextInputStyleClass}
                            />
                        </View>

                        <View style={{ paddingHorizontal: 40, marginBottom: 20 }}>
                            <TouchableOpacity
                                style={{ borderRadius: 20, backgroundColor: '#00332E', paddingVertical: 10 }}
                                onPress={this.closejob}
                            >
                                <Text style={{ textAlign: 'center', color: 'white' }}  >Close Job</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                </Container>
            );
        }
    }
}

const styles = StyleSheet.create({
    TextInputStyleClass: {
        textAlign: 'center',
        height: 50,
        width: null,
        borderWidth: 2,
        borderColor: 'gray',
        color: '#00332E',
    },
})


export default Mywork;