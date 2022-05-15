import { useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";

export default function useInternetService() {
    const [isInternetConnected, setInternetConnected] = useState<
        boolean | null
    >(false);
    useEffect(() => {
        const subscription = NetInfo.addEventListener((networkState) => {
            console.log("Network state - ", networkState);
            setInternetConnected(networkState.isInternetReachable);
        });

        return subscription;
    }, []);

    return isInternetConnected;
}
