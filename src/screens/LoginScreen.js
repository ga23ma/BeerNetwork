import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, Button, ActivityIndicator, ImageBackground, Image, TouchableOpacity} from 'react-native';
import firebase from 'firebase';





const LoginScreen = ({navigation}) => {

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setisLoading] = useState(false);


	firebase.auth().signOut()
			.catch(() => {
				console.log('nao saiu');
			});

	const login = async () => {
		setError('');
		setisLoading(true);
		try {
			await firebase.auth().signInWithEmailAndPassword(title, content);
			navigation.navigate('Test1');
		}catch(err){
			setisLoading(false);
			setError('Senha ou Usuario Incorreto');

		}


		 
			
	};



	
	return(
		<View style={styles.container}>
			<ImageBackground source={require('../../assets/fundo-login.png')} style={styles.image}>
				<View style={styles.viewtop}>
				</View>
				<View style={styles.viewbottom}>
					<Text style={styles.label}>E-mail:</Text>
					<TextInput
						autoCorrect={false}
						placeholder="Digite seu email"
						autoCapitalize='none'
						autoCompleteType= 'email'
						style={styles.input} 
						value={title} 
						placeholderTextColor="#da8095"
						onChangeText={(text) => setTitle(text)} 
					/>
					<Text style={styles.label}>Senha:</Text>
					<TextInput 
						autoCorrect={false}
						placeholder="Digite sua senha"
						autoCapitalize='none'
						secureTextEntry={true} 
						style={styles.input} 
						value={content} 
						placeholderTextColor="#da8095"
						onChangeText={(text) => setContent(text)} 
					/>
					<Text style={styles.labelErr}>{error}</Text>
					
					<TouchableOpacity style={styles.loginButton} onPress={() => {login();}}>
						<Image style={{width: 30, height: 30}} source={require('../../assets/botao-entrar.png')} />
					</TouchableOpacity>
					<ActivityIndicator color='white' animating={isLoading} />
					
					<View style={styles.viewSignUp}>
						<Text style={styles.labelSignUp}>Não tem conta?</Text>
						<TouchableOpacity onPress={() => {navigation.navigate('SignUp');}}>
						<Text style={styles.labelLink} >Cadastre-se</Text>
						</TouchableOpacity>
					</View>
					
				</View>
			</ImageBackground>
		</View>
	);
};

LoginScreen.navigationOptions = () => {
	return {
		 header: () => (null)
	};
};

const styles = StyleSheet.create({
	input: {
		fontSize: 12,
		borderBottomWidth: 0.7,
		borderColor:'white',
		marginBottom: 15,
		marginLeft: 50,
		marginRight: 50,
		color: 'white'	
	},
	label: {
		fontSize: 14,
		marginBottom: 5,
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
  	flex:4
  },
  viewbottom:{
  	flex:5
  },
  viewSignUp:{
  	alignItems:'center',
  	marginTop:70
  },
  loginButton:{
  	alignItems:'center',
  	marginTop:0
  	
  }
});

export default LoginScreen;