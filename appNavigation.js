import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import { getProfilePhoto } from './firebase/reads'
import { useSelector } from 'react-redux'

import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import FeedScreen from './screens/FeedScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegistrationScreen from './screens/RegistrationScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import ExploreScreen from "./screens/ExploreScreen";
import CameraScreen from './screens/CameraScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const MainStackNavigator = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Registration" component={RegistrationScreen} />
                <Stack.Screen name="Tab" component={MainTopTabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const MainTopTabNavigator = () => {
    return(
        <TopTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "black",
                tabBarStyle:{
                    height: 0
                }
            }}
        >
            <TopTab.Screen name={"Camera"} component={CameraScreen} />
            <TopTab.Screen name={"Tab"} component={MainTabNavigator} />
        </TopTab.Navigator>
    )
}

const MainTabNavigator = () => {
    const [image, setImage] = useState("");
    const [imageReady, setImageReady] = useState(false);
    const userID = useSelector(state=>state.userID);

    const handleSetImage = (url) => {setImage(url);}
    const toggleImageReady = () => {setImageReady(!imageReady);}

    useEffect(() => {
    getProfilePhoto(userID, handleSetImage, toggleImageReady);
    }, []);

    useEffect(() => {
    }, [imageReady,image])


    return(
        <Tab.Navigator
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                      let iconName;
          
                      if (route.name === 'Feed') {
                        iconName = focused ? 'home' : 'home-outline';
                      } else if (route.name === 'Explore') {
                        iconName = focused ? 'search' : 'search-outline';
                      } else if (route.name === 'Profile') {
                        return <Image source={{uri: image}} 
                            style=
                            {{
                                width: 24,
                                height: 24,
                                borderColor: "#ffffff",
                                borderWidth: 0.5,
                                borderRadius: 12,
                            }}
                        />
                      }
                      return <Icon name={iconName} size={24} color="#ffffff" />;
                    },
                    tabBarStyle: {backgroundColor: "#000000", height: "10%", justifyContent: "center", alignItems: "center"},
                    tabBarShowLabel: false,
                    headerShown: false,
                })
            }
        >
            <Tab.Screen name="Feed" component={FeedScreen} />
            <Tab.Screen name="Explore" component={ExploreScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export default MainStackNavigator;