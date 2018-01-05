import React, { Component } from "react";
import { Image, StyleSheet, Platform, Dimensions } from "react-native";

import {
	Content,
	Text,
	List,
	ListItem,
	Icon,
	Container,
	Left,
	Right,
	Badge,
} from "native-base";

const drawerCover1 = require("../../../img/Picture1.png");
const drawerImage1 = require("../../../img/picturelogo.png");
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const datas = [
	{
		name: "Home",
		route: "Home",
		icon: "home",
	},
	{
		name: "My Work",
		route: "Mywork",
		icon: "md-paper",
	},
	{
		name: "Level",
		route: "Level",
		icon: "podium",
	},
	{
		name: "Notifications",
		route: "Notifications",
		icon: "md-notifications",
	},
	{
		name: "Ticket",
		route: "MainTicket",
		icon: "phone-portrait",
		bg: "#5F9667",
		types: "4",
	},
	{
		name: "Log out",
		route: "Logout",
		icon: "exit",
	},
];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shadowOffsetWidth: 1,
			shadowRadius: 4,
		};
	}



	render() {
		return (
			<Container>
				<Content bounces={false} style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
					<Image source={drawerCover1} style={styles.drawerCover}>
						<Image square style={styles.drawerImage} source={drawerImage1} />
					</Image>
					<List
						dataArray={datas}
						renderRow={data =>
							<ListItem button noBorder onPress={() => this.props.navigation.navigate(data.route)}>
								<Left>
									<Icon active name={data.icon} style={{ color: "#777", fontSize: 26, width: 30 }} />
									<Text style={styles.text}>
										{data.name}
									</Text>
								</Left>
								{data.types &&
									<Right style={{ flex: 1 }}>
										<Badge
											style={{
												borderRadius: 3,
												height: 25,
												width: 72,
												backgroundColor: data.bg,
											}}
										>
											<Text style={styles.badgeText}>{`${data.types} Types`}</Text>
										</Badge>
									</Right>}
							</ListItem>}
					/>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	sidebar: {
		flex: 1,
		backgroundColor: "#fff"
	},
	drawerCover: {
		alignSelf: "stretch",
		// resizeMode: 'cover',
		height: deviceHeight / 3.5,
		width: null,
		position: "relative",
		marginBottom: 10
	},
	drawerImage: {
		position: "absolute",
		left: (Platform.OS === 'android') ? 30 : 40,
		left: Platform.OS === "android" ? deviceWidth / 10 : deviceWidth / 9,
		top: (Platform.OS === 'android') ? 45 : 55,
		alignSelf: 'center',
		top: Platform.OS === "android" ? deviceHeight / 13 : deviceHeight / 12,
		width: 270,
		height: 75,
		resizeMode: "cover"
	},
	listItemContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center"
	},
	iconContainer: {
		width: 37,
		height: 37,
		borderRadius: 18,
		marginRight: 12,
		paddingTop: Platform.OS === "android" ? 7 : 5
	},
	sidebarIcon: {
		fontSize: 21,
		color: "#fff",
		lineHeight: Platform.OS === "android" ? 21 : 25,
		backgroundColor: "transparent",
		alignSelf: "center"
	},
	text: {
		fontWeight: Platform.OS === "ios" ? "500" : "400",
		fontSize: 16,
		marginLeft: 20
	},
	badgeText: {
		fontSize: Platform.OS === "ios" ? 13 : 11,
		fontWeight: "400",
		textAlign: "center",
		marginTop: Platform.OS === "android" ? -3 : undefined
	}
})

export default SideBar;
