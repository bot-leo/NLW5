import React from 'react'

import { StyleSheet,
          Text,
          Image,
          View } from 'react-native'

//importe para lidar com o display de dispositivos apple
// que tem sua camera frontal no meio do celular.
import {getStatusBarHeight} from 'react-native-iphone-x-helper'

import UserImg from '../assets/userIcon.jpg'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header(){
  return(
    <View style={styles.container}>
      <View>
        <Text style={styles.greenting}>Olá,</Text>
        <Text style={styles.userName}>Leonardo</Text>
      </View>
      <Image source={UserImg} style={styles.image}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingVertical:20,
    marginTop: getStatusBarHeight(),
  },
  greenting:{
    fontSize:32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName:{
    fontSize:32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight:40,
  },
  image:{
    width:70,
    height:70,
    borderRadius:40,
  },
})