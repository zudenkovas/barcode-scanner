import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import CameraScreen from "./CameraScreen";
import HomeScreen from "./HomeScreen";

const StackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Camera: CameraScreen
  },
  { headerMode: "none" }
);

export default createAppContainer(StackNavigator);
