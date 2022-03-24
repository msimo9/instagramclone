import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Animated, I18nManager} from 'react-native'
import React, { useEffect, useState, Component } from 'react'
import { getProfilePhoto } from '../firebase/reads'
import { useSelector } from 'react-redux'
import feedStyles from './styles/feedStyle'
import FeedHeader from '../components/Feed/FeedHeader'
import Stories from '../components/Feed/Stories'

const FeedScreen = () => {
  

  return (
    <View style={feedStyles.container}>
      <FeedHeader />
      <ScrollView style={feedStyles.scollViewContainer}>
        <Stories />
      </ScrollView>
    </View>
  )
}

export default FeedScreen

const styles = StyleSheet.create({})