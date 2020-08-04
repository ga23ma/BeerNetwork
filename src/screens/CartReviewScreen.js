import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import ProductCard from '../components/ProductCard';
import { Context } from '../context/BeerContext';
import { StackActions } from 'react-navigation';
import Modal from 'react-native-modal';





const CartReviewScreen = ({navigation}) => {
	const { state } = useContext(Context);
	const [isModalVisible, setModalVisible] = useState(false);
  
  	const toggleModal = () => {
    	setModalVisible(!isModalVisible);
  	};
	
	
	
	return(
		<View style={styles.MainContainer}>
				<Modal isVisible={isModalVisible}>
		          <View style={styles.dialog}>
		            <Text style={styles.dialogText}>Carrinho vazio!</Text>
		            <TouchableOpacity onPress={() => {
		            	navigation.navigate('AlcProducts');
		            	//toggleModal();
		            	
		            }}>
		            	<Text style={styles.okText}>OK</Text>
		            </TouchableOpacity>
		          </View>
		        </Modal>
				<View style={styles.header}>
					<Image 
						style={styles.headImage}
						source={require('../../assets/titulo-carrinho.png')} 

					/>
				</View>
				
				<FlatList
					data = {(state.alcoolicos).concat(state.nalcoolicos)}
					keyExtractor={result => result.url}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={<View style={styles.bottomContainer}></View>}
					renderItem={({ item }) => {
						const url = item.url.split('.')[0];
						for(var x in state.cart){
							
							if(state.cart[x].url === url)
								if(state.cart[x].amount!==0){
									const price = 'R$ '+(state.cart[x].amount * parseFloat(item.preco.split(' ')[1])).toFixed(2);
									return(
										<View>
											<ProductCard init={state.cart[x].amount} name={item.nome} description={item.descricao} total={price} price={item.preco} img= { url } />
											<View style={styles.viewProd}>
											</View>
										</View>
									);
								}
						}
						return null;
					}}
				/>
				<View style={styles.sub}>
					<Text style={styles.price}>Subtotal: R$ {(Math.abs(state.sub)).toFixed(2)}</Text>
					<View style={styles.viewNext}>
						<Text style={styles.textNext}>Escolher metodo de entrega</Text>
						<TouchableOpacity onPress={() => {
							if(state.sub>1){
								navigation.navigate('DeliveryPicker');
							}else{
								toggleModal();
							}

						}}>
							<Image style={styles.next} source={require('../../assets/next-carrinho.png')} />
						</TouchableOpacity>
					</View>
				</View>
	
	    </View>
	);	
};



const styles = StyleSheet.create({
	MainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  dialog:{
		flex:1,
		backgroundColor:'white',
		borderRadius:10,
		marginVertical:240,
		marginHorizontal:20,
	},
	order:{
		flex:12,
		marginBottom:10,

	},
	dialogText:{
		marginTop:20,
		marginLeft:30,
		marginRight:30,
	},
	okText:{
		marginTop:15,
		color:'#b5002b',
		alignSelf:'flex-end',
		marginRight:30,
		fontSize:16,
	},
  bottomContainer:{
  	height:100
  },
  header:{
  	height:40,
  	flexDirection: 'row',
	alignItems:'center',
	justifyContent:'center',
	marginTop:20,
  }, 
  headImage:{
  	height:30,
 	alignSelf:'flex-start',
 	resizeMode:'contain'
 	

  },
  viewProd:{
  	borderBottomWidth: 1.5,
  	borderBottomColor: "#c9d6df",
  	marginRight: 20,
  	marginLeft: 20,
  },
  sub:{
  	borderTopWidth: 2,
  	borderTopColor: "#4f4f4f",
  	alignItems:'flex-end',
  	justifyContent:'center',
  	marginRight:20,
  	marginLeft:20,
  	marginBottom:10,
  },
   price:{
   	marginTop:15,
  	fontWeight:'bold',
  	color:'#4f4f4f',
  	marginBottom:15,
 
  	fontSize:18,
  },
  next:{
  	height:25,
  	width:25,
  	marginLeft:10,
  	marginTop:3,

  },
  viewNext:{
  	flexDirection:'row',
  	alignItems:'center',
  	justifyContent:'center',
  },
  textNext:{
  	fontWeight:'bold',
  	color:'#b5002b',
 
  	fontSize:18,
  }

});

CartReviewScreen.navigationOptions = () => {
	return {
	
		  headerStyle: {
            backgroundColor: '#b5002b',
          },
          headerTintColor: '#fff',
          headerTitle: (props) => ( // App Logo
			    <View style ={{
			    	flexDirection: 'row',
			    	alignItems:'center',
			    	justifyContent:'center',
			    	marginLeft:-40,
			    }}>
			      <Image
			        style={{ width: 200, height: 400 }}
			        source={require('../../assets/logo.png')}
			        resizeMode='contain'
			      />
			     </View>
		    ),

	};
};
export default CartReviewScreen;