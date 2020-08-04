import React, { useEffect } from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import IndexScreen from './src/screens/IndexScreen';
import LoadScreen from './src/screens/LoadScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import AlcProductsScreen from './src/screens/AlcProductsScreen';
import NalcProductsScreen from './src/screens/NalcProductsScreen';
import CartReviewScreen from './src/screens/CartReviewScreen';
import DeliveryPickerScreen from './src/screens/DeliveryPickerScreen';
import SendOrderScreen from './src/screens/SendOrderScreen';
import { Provider } from './src/context/BeerContext';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialTopTabNavigator  } from 'react-navigation-tabs';
import { FontAwesome5 } from '@expo/vector-icons'; 
import firebase from 'firebase';
import { Entypo } from '@expo/vector-icons'; 


const indexFlow = createStackNavigator({
    Index: IndexScreen
  },{
    initialRouteName: 'Index',
    defaultNavigationOptions: {
    title: 'Beer Network',
    headerTitleStyle: { alignSelf: 'center' },
  }
});

indexFlow.navigationOptions = {
  title:'Meus Pedidos',
  tabBarIcon: <FontAwesome5 name="receipt" size={24} color="#c9d6df" />
};

const internalFlow = createMaterialTopTabNavigator({
        AlcProducts: AlcProductsScreen,
        NalcProducts: NalcProductsScreen
      },{
          tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: '#c2c2c2',
           style: {
              backgroundColor: '#b5002b', //<== remove background color
              //borderColor: 'transparent' // <== remove border
            },
            indicatorStyle:{
              backgroundColor:'#ffffff',
            }
          },
      });

const productFlow = createStackNavigator({
  internalFlow: internalFlow
});


productFlow.navigationOptions = {
  title:'Produtos',
  tabBarIcon: <Entypo name="shop" size={24} color="#c9d6df" />
};

const mainFlow = createBottomTabNavigator({
      productFlow: productFlow,
      indexFlow: indexFlow,
    },{
      tabBarOptions: {
            activeTintColor: '#d49f9f',
            inactiveTintColor: '#c2c2c2',
           style: {
              //backgroundColor: '#white', //<== remove background color
              //borderColor: 'transparent' // <== remove border
            },
            indicatorStyle:{
             // backgroundColor:'#ffffff',
            }
          },
      initialRouteName: 'productFlow',
      defaultNavigationOptions: {
        title: 'Beer Network',
        headerTitleStyle: { alignSelf: 'center' },

      }
    });

const switchNavigator = createSwitchNavigator({
  splashFlow: createStackNavigator({
      Load:LoadScreen
  }),
  loginFlow:createStackNavigator({
      Login:LoginScreen,
      SignUp: SignUpScreen
    },{
      initialRouteName: 'Login',
      defaultNavigationOptions: {
        title: 'Beer Network',
        headerTitleStyle: { alignSelf: 'center' },
      }
    }),
  cartFlow:createStackNavigator({
      mainFlow:mainFlow,
      CartReview: CartReviewScreen,
      DeliveryPicker: DeliveryPickerScreen,
      SendOrder: SendOrderScreen,

    },{
      initialRouteName: 'mainFlow',
      defaultNavigationOptions: {
         title:'beer network',
          headerStyle: {
                backgroundColor: '#b5002b',
              },
              headerTintColor: '#fff',
              headerTitle: (props) => ( // App Logo
              <View style ={{
                flexDirection: 'row',
                alignItems:'center',
                justifyContent:'center',
              }}>
                <Image
                  style={{ width: 200, height: 400 }}
                  source={require('./assets/logo.png')}
                  resizeMode='contain'
                />
               </View>
            ),
      }
    }),
});
const initF = (() => {
  firebase.initializeApp({
      apiKey: "AIzaSyD6N558LSc6GF47z1vmDhan6sHgaaOuWvE",
      authDomain: "beernetwork-44651.firebaseapp.com",
      databaseURL: "https://beernetwork-44651.firebaseio.com",
      projectId: "beernetwork-44651",
      storageBucket: "beernetwork-44651.appspot.com",
      messagingSenderId: "989077258318",
      appId: "1:989077258318:web:775e95186062781e48031f",
      measurementId: "G-5CD55ZV18T"
      });
});

const App = createAppContainer(switchNavigator);

export default () => {
  useEffect(() => {
    initF();
  }, []);

  
  return(
    <Provider>
      <App />
    </Provider>
  );
};