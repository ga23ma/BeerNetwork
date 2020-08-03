import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import { Context } from '../context/BeerContext';
import firebase from 'firebase';
import { FontAwesome } from '@expo/vector-icons';
import OrderCard from '../components/OrderCard';






const IndexScreen = ({navigation}) => {

	
	
	const [ord, setOrd] =useState([]);
	const getData = async () => {
		try {
			 var userId = await firebase.auth().currentUser.uid;

			const a = JSON.parse(JSON.stringify(await firebase.database().ref('/users/' + userId + '/pedidos').once('value')));
			
			var orders = [];
			for(var x in a){
				
				var cart = [];
				for(var y in a[x].carrinho ){
					cart.push(JSON.parse(JSON.stringify(a[x].carrinho[y])));
				}

				a[x].carrinho = cart;
				a[x].key = x;
				orders.push(a[x]);
			}
			setOrd(orders);
			
		}catch(err){
			
			console.log("problema ao carreagar dados");
		}


		 
			
	};


	
	const unsubscribe = navigation.addListener('didFocus', () => {

	    getData();
	});


	
	return(
		<View>
			<FlatList
	          data = {ord}
	          showsVerticalScrollIndicator={false}
	          keyExtractor={result => (result.key)}
	          renderItem={({ item }) => {
	            return(
	            	<View style={styles.order}>	
						<Text style={styles.title}>Pedido</Text>
						<Text style={styles.code}>(Codigo do Pedido: {item.key})</Text>
						<OrderCard order={item} />
					</View>
	                
	              );
	          }}
	        />
		</View>
	);	
};

IndexScreen.navigationOptions = () => {
	return {
		 

	};
};

const styles = StyleSheet.create({
	title:{
  	color:'#4f4f4f',
  	fontWeight:'bold',
  	fontSize:16,
  	alignSelf:'center',
  	marginTop:30,
  },
  code:{
  	color:'#4f4f4f',
  	fontSize:10,
  	alignSelf:'center',
  },
  order:{
		flex:12,
		marginBottom:10,

	},
});

export default IndexScreen;