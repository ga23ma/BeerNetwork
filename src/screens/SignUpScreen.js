import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, ImageBackground, TouchableOpacity, Image, ScrollView} from 'react-native';
import firebase from 'firebase';
import { YellowBox } from 'react-native';
import _ from 'lodash';

YellowBox.ignoreWarnings(['Setting a timer']);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf('Setting a timer') <= -1) {
    _console.warn(message);
  }
};



const SignUpScreen = ({navigation}) => {
			
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const [name, setName] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setisLoading] = useState(false);
	
	

	firebase.auth().signOut()
			.catch(() => {
				console.log('nao saiu');
			});


	const signUp = async () => {
		setError('');
		setisLoading(true);
		try {
			await firebase.auth().createUserWithEmailAndPassword(email, password);
			try{
				let bd_ref = await firebase.database().ref(); 
				let updates = {};
				updates['/users/' + await firebase.auth().currentUser.uid] = {email: email, nome: name };
				await bd_ref.update(updates);
				navigation.navigate('Test1');
			} catch (err){
					setisLoading(false);
					setError('Dados');
			}
				
				
		}catch(err){
			setisLoading(false);
			setError('E-mail inválido ou já cadastrado');

		}
		


		 
			
	};



	
	return(
		<View style={styles.container}>
			<ImageBackground source={require('../../assets/fundo-signup.png')} style={styles.image}>
				<View style={styles.viewtop}>
				</View>
				<View style={styles.viewbottom}>
					<Text style={styles.label}>Nome completo:</Text>
					<TextInput 
						autoCorrect={false}
						placeholderTextColor="#da8095"
						placeholder="Digite seu nome completo"
						style={styles.input} 
						value={name} 
						onChangeText={(text) => setName(text)} 
					/>
					<Text style={styles.label}>E-mail:</Text>
					<TextInput
						autoCorrect={false}
						autoCapitalize='none'
						placeholderTextColor="#da8095"
						placeholder="Digite seu E-mail"
						autoCompleteType= 'email'
						style={styles.input} 
						value={email} 
						onChangeText={(text) => setEmail(text)} 
					/>
					<Text style={styles.label}>Senha:</Text>
					<TextInput 
						autoCorrect={false}
						autoCapitalize='none'
						placeholderTextColor="#da8095"
						placeholder="Digite sua senha"
						secureTextEntry={true} 
						style={styles.input} 
						value={password} 
						onChangeText={(text) => setPassword(text)} 
					/>
					<Text style={styles.label}>Digite novamente sua senha:</Text>
					<TextInput 
						autoCorrect={false}
						autoCapitalize='none'
						placeholderTextColor="#da8095"
						placeholder="Digite sua senha novamente"
						secureTextEntry={true} 
						style={styles.input} 
						value={rePassword} 
						onChangeText={(text) => setRePassword(text)} 
					/>
					<Text style={styles.labelErr}>{error}</Text>
					<TouchableOpacity style={styles.loginButton} 
						onPress={() => {
							if(name.length<3){
								//signUp();
								setError("Preencha seu nome");
							}else
							if(email.length<3){
								//signUp();
								setError("Preencha seu e-mail");
							}else
							if(password.length<8){
								//signUp();
								setError("Senha inválida minímo 8 caracteres");
							}else
							if(rePassword!=password){
								//signUp();
								setError("Senhas não conferem");
							}else{
								signUp();
							}
							
						}}
					>
						<Image style={{width: 30, height: 30}} source={require('../../assets/botao-entrar.png')} />
					</TouchableOpacity>
					
					<ActivityIndicator color='white' animating={isLoading} />

					<View style={styles.viewSignUp}>
						<Text style={styles.labelSignUp}>Já tem conta?</Text>
						<TouchableOpacity onPress={() => {navigation.navigate('Login');}}>
						<Text style={styles.labelLink} >Entrar</Text>
						</TouchableOpacity>
					</View>
					
				</View>
			</ImageBackground>
		</View>
	);
};

SignUpScreen.navigationOptions = () => {
	return {
		 header: () => (null)
	};
};

const styles = StyleSheet.create({
	input: {
		fontSize: 12,
		borderBottomWidth: 0.7,
		borderColor:'white',
		marginBottom: 12,
		marginLeft: 50,
		marginRight: 50,
		color: 'white'	
	},
	label: {
		fontSize: 14,
		marginBottom: 2,
		marginLeft: 50,
		marginRight: 50,
		color: 'white'
	},
	labelErr: {
		fontSize: 10,
		marginBottom: 5,
		marginLeft: 50,
		marginRight: 50,
		color: 'white'
	},
	labelSignUp: {
		fontSize: 12,
		marginBottom: 5,
		marginLeft: 50,
		marginRight: 50,
		color: 'white'
	},
	labelLink: {
		fontSize: 12,
		marginBottom: 5,
		marginLeft: 50,
		marginRight: 50,
		color: 'white',
		textDecorationLine: 'underline'
	},
	image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    flexDirection: "column"
  },
  viewtop:{
  	flex:10
  },
  viewbottom:{
  	flex:20
  },
  viewSignUp:{
  	alignItems:'center',
  	marginTop:15
  },
  loginButton:{
  	alignItems:'center',
  	marginTop:15
  	
  }
});


export default SignUpScreen;