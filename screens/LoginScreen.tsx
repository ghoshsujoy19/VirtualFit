import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
    StyleSheet,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
import Loader from "../components/LoaderComponent";
import { View, Text } from "../components/Themed";
import { RootStackScreenProps } from "../types";

export const LoginScreen = (props: RootStackScreenProps<"LoginScreen">) => {
    const { navigation } = props;
    const currentEmail = useRef<string | undefined>();
    const currentPassword = useRef<string | undefined>();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string | undefined>();

    const onSignUpButtonClick = () => {
        navigation.replace("SignupScreen");
    };
    const onLoginButtonClick = () => {
        // TODO: Send the email and password
        // encrypted/hashed to server for validations

        setErrorText("Implement backend first");

        // replace it only when login data is verified;
        // navigation.replace("ImagePickerScreen");
    };

    return (
        <View style={styles.container}>
            <Loader isLoading={isLoading} />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => (currentEmail.current = email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) =>
                        (currentPassword.current = password)
                    }
                />
            </View>

            <TouchableOpacity>
                <Text
                    style={styles.forgot_button}
                    onPress={onSignUpButtonClick}
                >
                    New here? Click to signup
                </Text>
            </TouchableOpacity>

            {errorText ? (
                <Text style={styles.errorTextStyle}>{errorText}</Text>
            ) : null}

            <TouchableOpacity
                style={styles.loginBtn}
                onPress={onLoginButtonClick}
            >
                <Text>LOGIN</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },

    inputView: {
        backgroundColor: "#FFC0CB",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },

    errorTextStyle: {
        color: "red",
        textAlign: "center",
        fontSize: 14,
    },
});
