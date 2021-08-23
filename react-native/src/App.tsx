import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "./CameraScreen";
import HomeScreen from "./HomeScreen";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

const Stack = createStackNavigator();
const store = configureStore();

export default () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Camera" component={CameraScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  </Provider>
);
