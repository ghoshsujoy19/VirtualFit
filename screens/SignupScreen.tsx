import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
} from "react-native";
import Loader from "../components/LoaderComponent";
import { RootStackScreenProps } from "../types";

export const SignupScreen = (props: RootStackScreenProps<"SignupScreen">) => {
    const { navigation } = props;
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string | undefined>();

    const userEmail = useRef<string | undefined>();
    const userPassword = useRef<string | undefined>();

    const onLoginButtonClick = () => {
        navigation.replace("LoginScreen");
    };
    const onSignUpButtonClick = async () => {
        if (!userEmail.current) {
            alert("Please fill email");
            return;
        }
        if (!userPassword.current) {
            alert("Please fill password");
            return;
        }
        setIsLoading(true);

        // TODO: Send the email and password
        // encrypted/hashed to server for validations

        // After adding to server DB, we add it to local DB.
        await AsyncStorage.setItem("user_email", userEmail.current);

        setIsLoading(false);
        // signup done, so move to new screen.
        navigation.replace("ImagePickerScreen");
    };

    return (
        <View style={styles.container}>
            <Loader isLoading={isLoading} />
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Name."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => (userEmail.current = email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) =>
                        (userPassword.current = password)
                    }
                />
            </View>

            <TouchableOpacity onPress={onLoginButtonClick}>
                <Text style={styles.forgot_button}>
                    Already have account? Click to login
                </Text>
            </TouchableOpacity>

            {errorText ? (
                <Text style={styles.errorTextStyle}>{errorText}</Text>
            ) : null}

            <TouchableOpacity
                style={styles.loginBtn}
                onPress={onSignUpButtonClick}
            >
                <Text>SIGNUP</Text>
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
