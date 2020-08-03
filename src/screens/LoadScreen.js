import React, { useContext } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Dimensions } from 'react-native';
import firebase from 'firebase';
import LottieView from 'lottie-react-native'


const LoadScreen = ({navigation}) => {

	setTimeout(()=>{navigation.navigate('Login')}, 6000);
	return(
		<View style={styles.container}>
			<LottieView 
				
				style={styles.animation} 
				source={require('../../assets/animation.json')}
				resizeMode='cover' 
				autoPlay 
				loop 
			/>
		</View>
	);	
};

LoadScreen.navigationOptions = () => {
	return {
		 header:() => (null)
	};
};


const styles = StyleSheet.create({
	container:{
		borderWidth: 0,
		borderColor: 'red',
		flex:1
	},
	animation:{
	
	}
});



export default LoadScreen;