import React, { useContext  } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import FloatingButton from '../components/FloatingButton'
import ProductCard from '../components/ProductCard'
import { Context } from '../context/BeerContext';
import firebase from 'firebase';
import Images from '../../assets/prod/images';




const NalcProductsScreen = ({navigation}) => {

	const { state } = useContext(Context);

	

	return(
		<View style={styles.MainContainer}>
			
				<FlatList
					data = {state.nalcoolicos}
					keyExtractor={result => result.url}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={<View style={styles.bottomContainer}></View>}
					renderItem={({ item }) => {
						const url = item.url.split('.')[0];
						for(var x in state.cart){
							if(state.cart[x].url === url)
								return(
									<ProductCard init={state.cart[x].amount} name={item.nome} description={item.descricao} total={item.preco} price={item.preco} img= { url } />

								);
						}
						return(
							<ProductCard init={0} name={item.nome} description={item.descricao} price={item.preco} img= { url } />

						);
					}}
				/>
	    	<FloatingButton
	    		source= {require('../../assets/botao-carrinho.png')}
	    		onPress={() => {
	    							//clearCart();
	    							navigation.navigate('CartReview');


	    					   }}
	    	 />  
	    </View>
	);		
};

NalcProductsScreen.navigationOptions = () => {
	return {
		 title:'Outros',
	};
};

const styles = StyleSheet.create({
	MainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  bottomContainer:{
  	height:100
  }
});


export default NalcProductsScreen;