import React from "react";
import { Pressable, Image, Text, StyleSheet } from "react-native";
import { View } from "./Themed";

type ImageFilterProps = {
    id: number;
    name: string;
    image: any;
    onPress: (imageName: string) => void;
};

export const ImageFilter = (props: ImageFilterProps) => {
    const { id, name, image, onPress } = props;
    return (
        <View style={styles.buttons}>
            <Pressable
                style={styles.button}
                onPress={() => {
                    onPress(image);
                }}
            >
                <Image style={styles.buttonIcon} source={image} />
                <Text style={styles.buttonText}>{name}</Text>
            </Pressable>
        </View>
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
