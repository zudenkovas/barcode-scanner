import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CameraScreen from "./CameraScreen";
import HomeScreen from "./HomeScreen";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import React from "react";

const StackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Camera: CameraScreen
  },
  { headerMode: "none" }
);
const AppContainer = createAppContainer(StackNavigator);
const store = configureStore();

export default () => (
  <Provider store={store}>
    <AppContainer></AppContainer>
  </Provider>
);
