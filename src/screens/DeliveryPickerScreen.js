import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import ProductCard from '../components/ProductCard';
import { Context } from '../context/BeerContext';
import { StackActions } from 'react-navigation';





const DeliveryPickerScreen = ({navigation}) => {
	const { state } = useContext(Context);
	const [gBorder, setGBorder ] = useState(1);
	const [eBorder, setEBorder ] = useState(1);
	const [pBorder, setPBorder ] = useState(3);
	const [rBorder, setRBorder ] = useState(1);
	const [discount, setDiscount ] = useState(0);
	
	
	
	return(
		<View style={styles.MainContainer}>
				<View style={styles.header}>
					<Image 
						style={styles.headImage}
						source={require('../../assets/titulo-entrega.png')} 

					/>
				</View>
				<TouchableOpacity style={{flex:1}} 
					onPress={() => {
						setGBorder(3);
						setEBorder(1);
						setPBorder(1);
						setRBorder(1);
						setDiscount(-7);
					}}>
					<View style={{
						borderWidth: gBorder, 
						borderColor:'#c9d6df', 
						borderRadius:20, 
						marginVertical:5, 
						marginHorizontal:20, 
						flex:1, 
						flexDirection: 'row',
						alignItems:'center',
						
					}}>
						<Image 
						style={styles.viewImg}
						source={require('../../assets/guard.png')} 


						/>
						<View style={styles.cont}>
							<View style={styles.title}>
								<Text style={styles.titleText}>Entrega Guardião</Text>
								<Text style={styles.discountText}>-7%</Text>
							</View>
							<View style={styles.descr}>
								<Text style={styles.descrText}>Guarde para Ambev e ganhe desconto.</Text>
								<Text style={styles.descrText}>Prazo: 5 dias.</Text>
							</View>
						</View>
					</View>
				</TouchableOpacity>
				
				<TouchableOpacity style={{flex:1}} 
					onPress={() => {
						setGBorder(1);
						setEBorder(3);
						setPBorder(1);
						setRBorder(1);
						setDiscount(-5);
					}}>
					<View style={{
						borderWidth: eBorder, 
						borderColor:'#c9d6df', 
						borderRadius:20, 
						marginVertical:5, 
						marginHorizontal:20, 
						flex:1, 
						flexDirection: 'row',
						alignItems:'center',
						
					}}>
						<Image 
						style={styles.viewImg}
						source={require('../../assets/eco.png')} 


						/>
						<View style={styles.cont}>
							<View style={styles.title}>
								<Text style={styles.titleText}>Entrega Econômica</Text>
								<Text style={styles.discountText}>-5%</Text>
							</View>
							<View style={styles.descr}>
								<Text style={styles.descrText}>Demora mais e é mais econômica.</Text>
								<Text style={styles.descrText}>Prazo: 5 dias.</Text>
							</View>
						</View>
					</View>
				</TouchableOpacity>
				
				<TouchableOpacity style={{flex:1}} 
					onPress={() => {
						setGBorder(1);
						setEBorder(1);
						setPBorder(3);
						setRBorder(1);
						setDiscount(0);
					}}>
					<View style={{
						borderWidth: pBorder, 
						borderColor:'#c9d6df', 
						borderRadius:20, 
						marginVertical:5, 
						marginHorizontal:20, 
						flex:1, 
						flexDirection: 'row',
						alignItems:'center',
						
					}}>
						<Image 
						style={styles.viewImg}
						source={require('../../assets/pad.png')} 


						/>
						<View style={styles.cont}>
							<View style={styles.title}>
								<Text style={styles.titleText}>Entrega Padrão</Text>
								<Text style={styles.discountText}>0%</Text>
							</View>
							<View style={styles.descr}>
								<Text style={styles.descrText}></Text>
								<Text style={styles.descrText}>Prazo: 2 dias.</Text>
							</View>
						</View>
					</View>
				</TouchableOpacity>
				
				<TouchableOpacity style={{flex:1}} 
					onPress={() => {
						setGBorder(1);
						setEBorder(1);
						setPBorder(1);
						setRBorder(3);
						setDiscount(5);
					}}>
					<View style={{
						borderWidth: rBorder, 
						borderColor:'#c9d6df', 
						borderRadius:20, 
						marginVertical:5, 
						marginHorizontal:20, 
						flex:1, 
						flexDirection: 'row',
						alignItems:'center',
						
					}}>
						<Image 
						style={styles.viewImg}
						source={require('../../assets/rap.png')} 


						/>
						<View style={styles.cont}>
							<View style={styles.title}>
								<Text style={styles.titleText}>Entrega Rápida</Text>
								<Text style={styles.discountText}>5%</Text>
							</View>
							<View style={styles.descr}>
								<Text style={styles.descrText}>Super rápida e um pouquinho mais cara</Text>
								<Text style={styles.descrText}>Prazo: Hoje</Text>
							</View>
						</View>
					</View>
				</TouchableOpacity>
				
				
				<View style={styles.sub}>
					<Text style={styles.price}>Subtotal: R$ {(Math.abs(state.sub)).toFixed(2)}</Text>
					<Text style={styles.fprice}>Frete: R$ {(state.sub/100*discount).toFixed(2)}</Text>
					<Text style={styles.tprice}>Total: R$ {(Math.abs(state.sub*(100+discount)/100)).toFixed(2)}</Text>
					<View style={styles.viewNext}>
						<Text style={styles.textNext}>Ir para o pagamento</Text>
						<TouchableOpacity onPress={() => {
							if(state.sub>1)
								navigation.navigate('SendOrder',{discount:discount});

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
  sub:{
  	borderTopWidth: 2,
  	borderTopColor: "#4f4f4f",
  	alignItems:'flex-end',
  	justifyContent:'center',
  	marginRight:20,
  	marginLeft:20,
  	marginTop:10,
  	marginBottom:10,
  },
   price:{

  	color:'#4f4f4f',
 	marginTop:15,
  	fontSize:14,
  },
  fprice:{

  	color:'#4f4f4f',
 
  	fontSize:14,
  },
  tprice:{
  	marginTop:2,
  	marginBottom:15,
  	fontWeight:'bold',
  	color:'#4f4f4f',
 
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
  },
  header:{
  	height:40,
  	flexDirection: 'row',
	alignItems:'center',
	justifyContent:'center',
	marginTop:20,
	marginLeft:-10,
  }, 
  headImage:{
  	height:30,
 	alignSelf:'flex-start',
 	resizeMode:'contain'
 	

  },
  viewImg:{
  	borderWidth:1,
  	height:30,
  	width:30,
  	marginLeft:20,
  	resizeMode:'center'
  },
  cont:{
  	flex:1,
  	height:60,
  	marginLeft:20,
  	marginRight:20,
  },
  title:{
  	marginTop:5,
  	flexDirection: 'row',
  	flex:4,

  },
  descr:{
  	flex:6,
  },
  titleText:{
  	fontWeight:'bold',
  	color:'#4f4f4f',
  	flex:6,
  },
  discountText:{
  	flex:1,
  	fontWeight:'bold',
  	color:'#b5002b',
  	fontSize:15,
  },
  descrText:{
  	fontSize:10,
  	color:'#4f4f4f',
  }
 
});

DeliveryPickerScreen.navigationOptions = () => {
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
export default DeliveryPickerScreen;