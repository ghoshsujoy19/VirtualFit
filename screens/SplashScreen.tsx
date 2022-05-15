import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, Image } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackScreenProps } from "../types";

export const SplashScreen = (props: RootStackScreenProps<"SplashScreen">) => {
    const { navigation } = props;
    const [animating, setAnimating] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setAnimating(false);
            AsyncStorage.getItem("user_email").then((value) =>
                navigation.replace(
                    value === null ? "Auth" : "ImagePickerScreen"
                )
            );
        }, 4000);
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator
                animating={animating}
                color="#FFFFFF"
                size="large"
                style={styles.activityIndicator}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#307ecc",
    },
    activityIndicator: {
        alignItems: "center",
        height: 80,
    },
});
