import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';

import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ExploreScreen from "./screens/ExploreScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const MainStackNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Registration" component={RegistrationScreen} />
                <Stack.Screen name="Tab" component={MainTabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const MainTabNavigator = () => {
    return(
        <Tab.Navigator
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen name="Feed" component={FeedScreen} />
            <Tab.Screen name="Explore" component={ExploreScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default MainStackNavigator;