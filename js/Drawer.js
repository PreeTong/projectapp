import React from "react";
import { DrawerNavigator } from "react-navigation";

import Home from "./components/home";
import Level from "./components/level";
import Logout from "./components/logout";
import MainTicket from "./components/Ticket";
import tkdetail from "./components/Ticket/tkdetail";
import Mywork from "./components/mywork";
import Notifications from "./components/notifications";
import SideBar from "./components/sidebar";
//import MapView from './components/map';

const DrawerExample = DrawerNavigator(
    {
        //MapView: { screen: MapView },
        Home: { screen: Home },
        Level: { screen: Level },
        Logout: { screen: Logout },
        MainTicket: { screen: MainTicket },
        tkdetail: { screen: tkdetail },
        Mywork: { screen: Mywork },
        Notifications: { screen: Notifications },
    },
    {
        initialRouteName: "Home",
        contentComponent: props => <SideBar {...props} />
    }
);

export default DrawerExample;