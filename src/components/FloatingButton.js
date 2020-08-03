import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image } from 'react-native';

const FloatingButton = ({source, onPress}) => {

	return(

	        <TouchableOpacity
	          activeOpacity={0}
	          onPress={onPress}
	          style={styles.TouchableOpacityStyle}>
	          <Image
	             source={source}
	     
	            style={styles.FloatingButtonStyle}
	          />
	        </TouchableOpacity>

	);	
};



const styles = StyleSheet.create({

  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 30,
  },

  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
});


export default FloatingButton;