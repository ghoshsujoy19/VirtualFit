import React from "react";
import { SafeAreaView, Pressable, Image, Text, StyleSheet } from "react-native";

type ImagePickerBottomButtonsProps = {
    onImageLibraryPress: () => void;
    onCameraPress: () => void;
};

export const ImagePickerBottomButtons = (
    props: ImagePickerBottomButtonsProps
) => {
    const { onCameraPress, onImageLibraryPress } = props;
    return (
        <SafeAreaView style={styles.buttons}>
            <Pressable style={styles.button} onPress={onImageLibraryPress}>
                <Image
                    style={styles.buttonIcon}
                    source={require("../assets/images/gallary.jpg")}
                />
                <Text style={styles.buttonText}>Gallery</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={onCameraPress}>
                <Image
                    style={styles.buttonIcon}
                    source={require("../assets/images/camera.png")}
                />
                <Text style={styles.buttonText}>Camera</Text>
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    buttonIcon: {
        width: 30,
        height: 30,
        margin: 10,
    },
    buttons: {
        backgroundColor: "white",
        flexDirection: "row",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
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
