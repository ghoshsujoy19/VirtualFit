import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    NavigationContainer,
    DefaultTheme,
    DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import ImagePickerComponent from "../screens/ImagePickerScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { SignupScreen } from "../screens/SignupScreen";
import { SplashScreen } from "../screens/SplashScreen";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function Navigation({
    colorScheme,
}: {
    colorScheme: ColorSchemeName;
}) {
    return (
        <NavigationContainer
            theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
            {/* @ts-ignore */}
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Auth"
                    component={LoginAndSignupNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ImagePickerScreen"
                    component={ImagePickerComponent}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const LoginAndSignupNavigator = () => {
    // Stack Navigator for Login and Sign up Screen
    return (
        /* @ts-ignore */
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};
