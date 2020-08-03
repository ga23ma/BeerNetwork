import React, { useReducer } from 'react';
import createDataContext from './createDataContext'


const blogReducer = (state, action) => {
	switch(action.type){
		case 'add_product_al':
			return {...state, alcoolicos:action.payload};
		case 'add_product_nal':
			return {...state, nalcoolicos:action.payload};
		case 'clear_cart':{
			var rest = [];
			
			for (var x in state.alcoolicos) {
				rest.push({url: state.alcoolicos[x].url.split('.')[0], amount: 0});
			}
			for (var x in state.nalcoolicos) {
				rest.push({url: state.nalcoolicos[x].url.split('.')[0], amount: 0});
			}
			
			return {...state, cart: rest, sub:0};
		}
		case 'add_product_al_cart':{
			
		
			var rest = state.cart;
			
			for (var x in rest) {
				if(rest[x].url=== action.payload.url){
					rest[x].amount = action.payload.amount;
				}
			}
			
			return {...state, cart: rest, sub:(state.sub+action.payload.sub) };
		}
		default:
			return state;
	}

};

const addProductAl = (dispatch) => {
	return (productList, callback) =>{
		dispatch({ type: 'add_product_al', payload:productList});
		callback();
	};
};
const clearCart = (dispatch) => {
	return () =>{
		dispatch({ type: 'clear_cart', payload:{}});
	};
};
const addProductNal = (dispatch) => {
	return (productList, callback) =>{
		dispatch({ type: 'add_product_nal', payload:productList});
		callback();
	};
};
const addProductAlCart = (dispatch) => {
	return (url, amount, sub, callback) =>{
		dispatch({ type: 'add_product_al_cart', payload:{url:url, amount:amount, sub:sub}});
		callback();
	};
};

const deleteBlogPost = (dispatch) => {
	return (id) =>{
		dispatch({ type: 'delete_blogpost', payload: id});
	};
};
const editBlogPost = (dispatch) => {
	return (id ,title, content, callback) =>{
		dispatch({ type: 'edit_blogpost', payload:{id: id, title: title, content: content}});
		callback();
	};
};



export const { Context, Provider } = createDataContext(
	blogReducer, 
	{addProductAl, addProductNal, addProductAlCart, clearCart},
	[]

);