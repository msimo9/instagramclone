import { StyleSheet, Text, View, Image, TouchableOpacity, Modal} from 'react-native'
import React, { useState, useEffect } from 'react'
import profileStyles from './styles/profileStyle';
import Icon from 'react-native-vector-icons/Ionicons';
import {getProfilePhoto, readSocialData} from '../firebase/reads';
import { useSelector } from 'react-redux';
import EditProfile from '../components/Profile/EditProfile';

const Header = ({}) => {
  const [image, setImage] = useState("");
  const [imageReady, setImageReady] = useState(false);
  const handleSetImage = (url) =>  {setImage(url);}
  const toggleImageReady = () => {setImageReady(!imageReady);}
  const userID = useSelector(state => state.userID);
  const [modalVisibility, setModalVisibility] = useState(false);
  const toggleModalVisibility = () => {setModalVisibility(!modalVisibility);}
  const [data, setData] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const toggleDataReady = () => {setDataReady(!dataReady);}

  useEffect(() => {
    getProfilePhoto(userID, handleSetImage, toggleImageReady);
    readSocialData(userID, setData, toggleDataReady);
    }, []);

    useEffect(() => {
    }, [imageReady,image,data,dataReady])

  return(
    <View style={profileStyles.headerWrapper}>
      {modalVisibility && <EditProfile modalVisibility={modalVisibility} toggleModalVisibility={toggleModalVisibility} profilePhoto={image} />}
      <View style={profileStyles.topHeader}>
        <View style={{flexDirection: "row", width: "70%", alignItems: "center"}}>
          <Icon name={"lock-closed-outline"} color={"#ffffff"} size={20} />
          <Text style={profileStyles.username}>username</Text>
        </View>
        <View style={{flexDirection: "row", justifyContent:"space-between", width: "30%", alignItems: "center"}}>
          <View style={{borderWidth: 1, borderColor: "#ffffff", width: 30, height: 30, borderRadius: 8, justifyContent: "center", alignItems: "center"}}>
            <Icon name={"add-outline"} color={"#ffffff"} size={20} />
          </View>
          <Icon name={"menu-outline"} color={"#ffffff"} size={20} />
        </View>
      </View>

      <View style={profileStyles.middleHeader}>
        {image !== "" && <Image source={{uri: image}} style={profileStyles.profilePhoto} /> }
        <View style={profileStyles.metadata}>
          <View style={profileStyles.textWrapper}>
            <Text style={profileStyles.metadataText}>{data.length !== 0 ? data[0] : ""}</Text>
            <Text style={profileStyles.metadataText}>Posts</Text>
          </View>
          <View style={profileStyles.textWrapper}>
            <Text style={profileStyles.metadataText}>{data.length !== 0 ? data[1] : ""}</Text>
            <Text style={profileStyles.metadataText}>Followers</Text>
          </View>
          <View style={profileStyles.textWrapper}>
            <Text style={profileStyles.metadataText}>{data.length !== 0 ? data[2] : ""}</Text>
            <Text style={profileStyles.metadataText}>Following</Text>
          </View>
        </View>
      </View>

      <View style={profileStyles.profileBio}>
        <Text style={{color: "#ffffff", fontSize: 12,}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>

      <View style={profileStyles.bottomHeader}>
        <TouchableOpacity style={profileStyles.editProfile} onPress={() => toggleModalVisibility()}>
          <Text style={profileStyles.editProfileText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={profileStyles.addFriend}>
          <Icon name={"person-add-outline"} size={16} color={"#ffffff"} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ProfileScreen = () => {
  return (
    <View style={profileStyles.container}>
      <Header />
    </View>
  )
}

export default ProfileScreen