import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import ProductCard from '../components/ProductCard';
import { Context } from '../context/BeerContext';
import { StackActions } from 'react-navigation';
import OrderCard from '../components/OrderCard';
import firebase from 'firebase';
import Modal from 'react-native-modal';





const SendOrderScreen = ({navigation}) => {
	const { state, clearCart } = useContext(Context);
	const disc = navigation.getParam('discount');
	const tot = (state.sub*(100+disc)/100).toFixed(2);
	var items = [];
	var cartEnd = [];
	const [isModalVisible, setModalVisible] = useState(false);
  
  	const toggleModal = () => {
    	setModalVisible(!isModalVisible);
  	};

	const sendFirebase = async () => {
		try {

				let bd_ref = await firebase.database().ref(); 
				let key = bd_ref.child('pedidos').push().key
	
				let updates = {};
				updates['/users/' + await firebase.auth().currentUser.uid+'/pedidos/'+key] = order;
				await bd_ref.update(updates);
		
				
				
		}catch(err){
			console.log('erro pedido');

		}
		


		 
			
	};

	for(var x in state.cart ){
		if(state.cart[x].amount > 0){
			items.push(state.cart[x]);
		}
	}

	for(var x in items ){
		for(var y in state.alcoolicos){
			if(items[x].url === state.alcoolicos[y].url.split('.')[0] ){
				cartEnd.push({ nome:state.alcoolicos[y].nome, descricao:state.alcoolicos[y].descricao, quantidade:items[x].amount ,preco: state.alcoolicos[y].preco.split(' ')[1] });
			}
		}
		for(var y in state.nalcoolicos){
			if(items[x].url === state.nalcoolicos[y].url.split('.')[0] ){
				cartEnd.push({ nome:state.nalcoolicos[y].nome, descricao:state.nalcoolicos[y].descricao, quantidade:items[x].amount ,preco: state.nalcoolicos[y].preco.split(' ')[1] });
			}
		}
	}
	const order = {total:tot, carrinho: cartEnd};
	
	return(
		<View style={styles.MainContainer}>
			
			<Modal isVisible={isModalVisible}>
	          <View style={styles.dialog}>
	            <Text style={styles.dialogText}>Seu pedido foi concluido com sucesso!!</Text>
	            <TouchableOpacity onPress={() => {
	            	navigation.navigate('Index');
	            	//toggleModal();
	            	
	            }}>
	            	<Text style={styles.okText}>OK</Text>
	            </TouchableOpacity>
	          </View>
	        </Modal>
			
			<View style={styles.order}>	
				<Text style={styles.title}>Meu Pedido</Text>
				<OrderCard order={order} />
			</View>
			<View style={styles.sub}>
					<View style={styles.viewNext}>
						<Text style={styles.textNext}>Finalizar Pedido</Text>
						<TouchableOpacity onPress={() => {
							sendFirebase();
							clearCart();
							toggleModal();
						

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
	
  textNext:{
  	fontWeight:'bold',
  	color:'#b5002b',
 
  	fontSize:18,
  },
  title:{
  	color:'#4f4f4f',
  	fontWeight:'bold',
  	fontSize:16,
  	alignSelf:'center',
  	marginTop:30,
  },
  sub:{
  	flex:1,
  	borderTopWidth: 2,
  	borderTopColor: "#4f4f4f",
  	alignItems:'flex-end',
  	justifyContent:'flex-end',
  	marginRight:20,
  	marginLeft:20,
  	marginBottom:10,
  },
  next:{
  	height:25,
  	width:25,
  	marginLeft:10,
  	marginTop:3,

  },
  viewNext:{
  	flex:1,
  	flexDirection:'row',
  	alignItems:'flex-end',
  	justifyContent:'flex-end',
  },
});

SendOrderScreen.navigationOptions = () => {
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
export default SendOrderScreen;