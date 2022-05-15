import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import useInternetService from "./hooks/useInternetService";
import Navigation from "./navigation";
import { NoInternetModalScreen } from "./components/NoInternetModalScreen";

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();
    const isInternetConnected = useInternetService();

    if (!isInternetConnected) {
        return <NoInternetModalScreen />;
    }
    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
            </SafeAreaProvider>
        );
    }
}
