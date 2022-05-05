import React, { useCallback, useState } from "react";
import {
    Image,
    StyleSheet,
    ToastAndroid,
    FlatList,
    ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerBottomButtons } from "../components/ImagePickerBottomButton";
import { View } from "../components/Themed";
import { IMAGE_FILTER_DATA } from "../constants/FilterData";
import { ImageFilter } from "../components/ImageFilter";

const filter1 = require("../assets/images/filter1.png");
const ImagePickerComponent = () => {
    const [pickerResponse, setPickerResponse] = useState<string | undefined>();
    const [imageFilter, setImageFilter] = useState<any>(filter1);

    const onImageLibraryPress = async () => {
        let galleryPermissions =
            await ImagePicker.getMediaLibraryPermissionsAsync();
        if (!galleryPermissions.granted) {
            galleryPermissions =
                await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (!galleryPermissions.granted) {
                ToastAndroid.show(
                    "Permission not granted",
                    ToastAndroid.BOTTOM
                );
                return;
            }
        }

        const result: ImagePicker.ImagePickerResult =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });
        if (!result.cancelled) {
            console.log(result);
            setPickerResponse(result.uri);
        }
    };

    const onCameraPress = async () => {
        let cameraPermission = await ImagePicker.getCameraPermissionsAsync();
        if (!cameraPermission.granted) {
            cameraPermission =
                await ImagePicker.requestCameraPermissionsAsync();
            if (!cameraPermission.granted) {
                ToastAndroid.show(
                    "Permission not granted",
                    ToastAndroid.BOTTOM
                );
                return;
            }
        }

        const result: ImagePicker.ImagePickerResult =
            await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                quality: 1,
            });
        if (!result.cancelled) {
            console.log(result);
            setPickerResponse(result.uri);
        }
    };
    return (
        <View style={styles.screen}>
            {pickerResponse ? (
                <View style={styles.imagecanvasinner}>
                    <View style={styles.imagecanvas}>
                        <ImageBackground
                            source={require("../assets/images/blackBackground.jpg")}
                            resizeMode="cover"
                            style={{ height: "100%", width: "100%", zIndex: 2 }}
                        >
                            <ImageBackground
                                source={{ uri: pickerResponse }}
                                resizeMode="cover"
                                style={styles.selectedImage}
                            >
                                <View style={styles.hideExtra} />
                                <Image
                                    style={styles.selectedFilter}
                                    source={imageFilter}
                                    resizeMode="contain"
                                />
                                <View style={styles.hideExtra} />
                            </ImageBackground>
                        </ImageBackground>
                    </View>
                    <FlatList
                        style={styles.filterList}
                        data={IMAGE_FILTER_DATA}
                        keyExtractor={(item) => item.id.toString()}
                        horizontal={true}
                        renderItem={({ item }) => {
                            return (
                                <ImageFilter
                                    {...item}
                                    onPress={(image: any) => {
                                        setImageFilter(image);
                                    }}
                                />
                            );
                        }}
                    />
                </View>
            ) : null}
            {pickerResponse ? null : (
                <Image
                    style={styles.imagecanvas}
                    source={require("../assets/images/dummy.png")}
                />
            )}
            <ImagePickerBottomButtons
                onCameraPress={onCameraPress}
                onImageLibraryPress={onImageLibraryPress}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#f2f2fC",
        alignItems: "center",
        flexDirection: "column",
    },
    title: {
        marginBottom: 10,
        fontSize: 20,
        fontWeight: "bold",
    },
    imagecanvas: {
        flex: 3,
        width: "100%",
        height: "100%",
    },
    selectedImage: {
        width: "100%",
        height: "100%",
        flexDirection: "row",
    },
    hideExtra: {
        backgroundColor: "#FFFFFF",
        flexGrow: 1,
    },
    selectedFilter: {
        width: "100%",
        height: "100%",
        flexGrow: 4,
    },
    imagecanvasinner: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    filterList: {
        height: 10,
    },
});

export default ImagePickerComponent;
