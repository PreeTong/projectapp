import React from "react";
import { Platform } from "react-native";
import { Root } from "native-base";
import { StackNavigator } from "react-navigation";

import Drawer from "./Drawer";
import Login from "./components/login/";
import Splash from "./components/splash/";

const AppNavigator = StackNavigator(
    {
        Drawer: { screen: Drawer },
        Login: { screen: Login },
        Splash: { screen: Splash },
    },
    {
        initialRouteName: "Splash",
        headerMode: "none",
    }
);

export default () =>
    <Root>
        <AppNavigator />
    </Root>;
