import React, { useRef, useState } from "react";
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
import { ImageFilter, ImageFilterSeparator } from "../components/ImageFilter";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import ViewShot from "react-native-view-shot";
import { RootStackScreenProps } from "../types";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const filter1 = require("../assets/images/filter1.png");
const ImagePickerComponent = (
    props: RootStackScreenProps<"ImagePickerScreen">
) => {
    const { navigation } = props;
    // navigation.
    const [fabricPickerResponse, setFabricPickerResponse] = useState<
        string | undefined
    >();
    const [imageFilter, setImageFilter] = useState<any>(filter1);
    const viewShotRef = useRef<ViewShot | null>(null);

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
            cropFabricToSize(result.uri, result.height, result.width);
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
            cropFabricToSize(result.uri, result.height, result.width);
        }
    };

    const onSaveImage = async () => {
        const uri = await viewShotRef.current?.capture?.();
        if (uri) {
            await MediaLibrary.saveToLibraryAsync(uri);
            ToastAndroid.show("Image saved", ToastAndroid.SHORT);
            return;
        }
        ToastAndroid.show("No image to save", ToastAndroid.SHORT);
    };

    const cropFabricToSize = async (
        imageUri: string,
        height: number,
        width: number
    ) => {
        const result = await ImageManipulator.manipulateAsync(imageUri, [
            { resize: { height: 2560, width: 1440 } },
        ]);
        console.log(result);
        setFabricPickerResponse(result.uri);
    };

    const onLogout = () => {
        AsyncStorage.clear();
        navigation.replace("Auth");
    };

    return (
        <View style={styles.screen}>
            <StatusBar />

            {fabricPickerResponse ? (
                /* @ts-ignore */
                <ViewShot
                    ref={viewShotRef}
                    style={styles.imagecanvas}
                    options={{ format: "png", quality: 1.0 }}
                >
                    {/* @ts-ignore */}
                    <ImageBackground
                        source={{ uri: fabricPickerResponse }}
                        resizeMode="contain"
                        style={styles.selectedImage}
                    >
                        <Image
                            style={styles.selectedFilter}
                            source={imageFilter}
                            resizeMode="contain"
                        />
                    </ImageBackground>
                </ViewShot>
            ) : (
                <Image
                    style={styles.imagecanvas}
                    resizeMode="cover"
                    source={require("../assets/images/dummy.png")}
                />
            )}
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
                ItemSeparatorComponent={ImageFilterSeparator}
            />
            <ImagePickerBottomButtons
                onSaveImage={onSaveImage}
                onCameraPress={onCameraPress}
                onImageLibraryPress={onImageLibraryPress}
                onLogout={onLogout}
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
    imagecanvas: {
        flex: 20,
        width: "100%",
        height: "100%",
    },
    selectedImage: {
        width: "100%",
        height: "100%",
    },
    selectedFilter: {
        width: "100%",
        height: "100%",
        flexGrow: 4,
    },
    filterList: {
        height: 40,
    },
});

export default ImagePickerComponent;
