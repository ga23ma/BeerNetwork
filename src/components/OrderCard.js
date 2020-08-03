import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image } from 'react-native';

const OrderCard = ({order}) => {

	return(

	     <View style={styles.orderCard}>
        <FlatList
          data = {order.carrinho}
          keyExtractor={result => (result.nome + result.descricao)}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return(
                <View style={styles.itemCard}>
                  <Text style={styles.title}>{item.nome}</Text>
                  <Text style={styles.description}>{item.quantidade} X {item.descricao}</Text>
                  <Text style={styles.price}>R$ {(item.preco*item.quantidade).toFixed(2)}</Text>
                </View>
                
              );
          }}
        />
        <View style={styles.totCard}>
            <Text style={styles.ttitle}>Total</Text>
            <Text style={styles.tprice}>R$ {order.total}</Text>
        </View>
      </View>

	);	
};



const styles = StyleSheet.create({

  orderCard:{
    //borderWidth:0.2,
    flex:1,
    marginLeft:20,
    marginRight:20,
    marginTop:10,
    borderRadius:5,
  },
  itemCard:{

    marginBottom:8,
    borderBottomWidth: 0.2,
      borderBottomColor: "#4f4f4f",
  },
  itemTot:{
    justifyContent:'center',
  },
  title:{

  },
  ttitle:{
    fontWeight: 'bold',
  },
  description:{
    marginBottom:5,
    fontSize:10
  },
  price:{
    alignSelf:'flex-end',
    marginTop: -20
  },
  tprice:{
    alignSelf:'flex-end',
    marginTop: -20,
    fontWeight: 'bold',
  },
});


export default OrderCard;