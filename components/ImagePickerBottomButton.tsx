import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView, Pressable, Image, Text, StyleSheet } from "react-native";

type ImagePickerBottomButtonsProps = {
    onSaveImage: () => void;
    onCameraPress: () => void;
    onImageLibraryPress: () => void;
    onLogout: () => void;
};

export const ImagePickerBottomButtons = (
    props: ImagePickerBottomButtonsProps
) => {
    const { onCameraPress, onImageLibraryPress, onSaveImage, onLogout } = props;
    return (
        <SafeAreaView style={styles.buttons}>
            <Pressable style={styles.button} onPress={onImageLibraryPress}>
                {/* @ts-ignore */}
                <MaterialCommunityIcons
                    name="file-upload"
                    size={30}
                    color="orange"
                />
                <Text style={styles.buttonText}>Upload File</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onCameraPress}>
                {/* @ts-ignore */}
                <MaterialCommunityIcons
                    name="camera"
                    size={30}
                    color="orange"
                />
                <Text style={styles.buttonText}>Take Photo</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onSaveImage}>
                {/* @ts-ignore */}
                <MaterialCommunityIcons
                    name="content-save"
                    size={30}
                    color="orange"
                />
                <Text style={styles.buttonText}>Save Image</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onLogout}>
                {/* @ts-ignore */}
                <MaterialCommunityIcons
                    name="logout"
                    size={30}
                    color="orange"
                />
                <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttons: {
        backgroundColor: "white",
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 5,
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
    },
});
