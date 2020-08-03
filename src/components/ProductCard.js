import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import { Context } from '../context/BeerContext';
import { Entypo } from '@expo/vector-icons'; 
import Images from '../../assets/prod/images';

const ProductCard = ({navigation, img, name, description, price, total, init}) => {

	const { addProductAlCart} = useContext(Context);
	return(
			<View style={styles.card}>
				<View style={styles.imageContainer}>
					<Image 
						source= {Images[img]}
						style ={styles.image}
					/>
				</View>
				
				<View style ={styles.infoCard}>
					<Text style={styles.name}>{name}</Text>
					<Text style={styles.description}>{description}</Text>
					<Text style={styles.price}>{total}</Text>
				</View>
					
				<View style ={styles.amountCard}>
					<TouchableOpacity 
						activeOpacity={0}
						onPress={() => {
									addProductAlCart(img, init+1,parseFloat(price.split(' ')[1]) , () => {});
			

								}}

					>
						<Entypo name="plus" size={30} color="#c9d6df" />
					</TouchableOpacity>
					
					<Text style={styles.amount}>{init}</Text>
					
					<TouchableOpacity 
						activeOpacity={0}
						onPress={() => {
							if(init>0){
								addProductAlCart(img, init-1,-1*(parseFloat(price.split(' ')[1])) , () => {});
					
							}
						}}
					>
						<Entypo name="minus" size={30} color="#c9d6df" />
					</TouchableOpacity>
				</View>
			</View>
	);	
};



const styles = StyleSheet.create({
  card:{

  	justifyContent:'center',
  	alignItems: 'center',
  	height:80,
    marginTop: 17,
  	marginBottom: 17,
  	marginRight: 20,
  	marginLeft: 20,
  	flexDirection:'row'
  },
  image:{
  	height: 70,
  	width: 70,

  },
  imageContainer:{
  	backgroundColor:'#c9d6df',
  	height: 80,
  	width: 80,
  	borderRadius:10,
  	alignItems: 'center',
  	justifyContent:'center'
 
  },
  infoCard:{

  	flex:3,
  	height:70,
  	flexDirection:'column',
  	marginLeft:15,
  },
  amountCard:{

  	flex:1,
  	height:70,
  	flexDirection:'column',
  	alignItems:'center',
  	justifyContent:'center'
  },
  name:{
  	fontWeight:'bold',
  	color:'#4f4f4f'
  },
  description:{
  	fontSize:12,
  	color:'#4f4f4f'
  },
  price:{
  	fontWeight:'bold',
  	color:'#b5002b',
  	marginTop: 'auto',
  	fontSize:16,
  },
  plus:{
  	fontWeight:'bold',
  	fontSize:21,
  	color:'#c9d6df'
  },
  minus:{
  	fontWeight:'bold',
  	fontSize:30,
  	color:'#c9d6df'
  },
  amount:{
  	fontWeight:'bold',
  	fontSize:21,
  	color:'#4f4f4f',

  },
});


export default ProductCard;