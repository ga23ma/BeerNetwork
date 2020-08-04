import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image, ScrollView } from 'react-native';
import FloatingButton from '../components/FloatingButton'
import ProductCard from '../components/ProductCard'
import { Context } from '../context/BeerContext';
import firebase from 'firebase';
import Images from '../../assets/prod/images';




const AlcProductsScreen = ({navigation}) => {
	const [next, setNext] = useState(0);
	const { state ,addProductAl, addProductNal, clearCart } = useContext(Context);
	

	const getData = async () => {
		try {
			

			const al = JSON.parse(JSON.stringify(await firebase.database().ref('/produtos/alcoolicos').once('value')));
			const nal = JSON.parse(JSON.stringify(await firebase.database().ref('/produtos/nalcoolicos').once('value')));
			var alIndex = [];
			var nalIndex = [];

			// build the index
			for (var x in al) {
			   alIndex.push(al[x]);
			}
			for (var x in nal) {
			   nalIndex.push(nal[x]);
			}
			
			addProductNal(nalIndex, () => {});
			addProductAl(alIndex, () => {});
			clearCart();
			
			console.log("aaaaaaaaaaaaaaaa");
			
		}catch(err){
			
			console.log("problema ao carreagar dados");
		}
	}
	
	  useEffect(() => {
	  	getData();

	  }, []);
	

	return(
		<View style={styles.MainContainer}>
			
				<FlatList
					data = {state.alcoolicos}
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

AlcProductsScreen.navigationOptions = () => {
	return {
		 title:'Brejas',
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


export default AlcProductsScreen;