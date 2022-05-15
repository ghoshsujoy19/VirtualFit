import React from "react";
import { Pressable, Image, Text, StyleSheet } from "react-native";
import { View } from "./Themed";

type ImageFilterProps = {
    id: number;
    name: string;
    image: any;
    onPress: (imageName: string) => void;
};

export const ImageFilterSeparator = () => {
    return <View style={styles.separator} />;
};

export const ImageFilter = (props: ImageFilterProps) => {
    const { id, name, image, onPress } = props;
    return (
        <Pressable
            style={styles.button}
            onPress={() => {
                onPress(image);
            }}
        >
            <Image style={styles.buttonIcon} source={image} />
            <Text style={styles.buttonText}>{name}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#000000",
        borderWidth: 1,
    },
    buttonIcon: {
        width: 40,
        height: 40,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "600",
    },
    separator: {
        height: "100%",
        width: 10,
    },
});
