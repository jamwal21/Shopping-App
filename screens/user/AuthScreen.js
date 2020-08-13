import React, { useState, useEffect } from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Text,
  TextInput,
  ActivityIndicator,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Colors from '../../constants/Colors';
import Validators from '../../utils/Validators';
import {Formik} from 'formik'
import If from '../../components/If';
import * as authActions from '../../store/actions/auth'
import { useDispatch } from 'react-redux';

const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [error, setError] = useState();
    const dispatch = useDispatch()

    useEffect(() => {
        if (error) {
          Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
      }, [error]);    

    const authHandler = async(email,password) => {
        let action;
        if(isSignUp){
            action = authActions.signup(email,password)
        }else{
            action = authActions.login(email,password)
        }
        setError(null);
        setIsLoading(true);
        try {
          await dispatch(action);
          props.navigation.navigate('Shop')
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
      };
  return (
    <KeyboardAvoidingView
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>

       <View style={styles.authContainer}>
       <Formik 
          initialValues={{ email: '', password: '' }}
          validateOnMount={true}
          validateOnChange={true}
          onSubmit={(values)=> {
            authHandler(values.email,values.password)
          }}
          validationSchema={Validators} >
            {(props)=>{
               return(
                 <>
                   <TextInput 
                   onSubmitEditing={() => passwordInputRef.focus()}
                   returnKeyType={'next'}
                   onBlur={()=>props.setFieldTouched('email')}
                   onChangeText={props.handleChange("email")} 
                   style={{
                    ...styles.textInput,
                    marginBottom:10,
                    marginTop:10
                   }}
                    placeholder={'Email'}
                   value={props.values.email} />
                   
                    <If show={props.dirty && props.touched.email}>
                      <Text style={{color:'red'}}>
                      {props.errors.email}
                     </Text>
                    </If>

                   <TextInput
                   secureTextEntry
                   returnKeyType={'done'}
                   onBlur={()=>props.setFieldTouched('password')}
                   ref={ref => passwordInputRef = ref}
                   onChangeText={props.handleChange("password")} 
                   style={{
                    ...styles.textInput,
                    marginBottom:5,
                    marginTop:5
                   }}
                   placeholder={'Password'}
                   value={props.values.password} />

                    <If show={props.dirty && props.touched.password}>
                      <Text style={{color:'red'}}>
                      {props.errors.password}
                     </Text>
                    </If>
                <View style={styles.buttonContainer}>
                    {isLoading ? (
                        <ActivityIndicator size={'small'} color={Colors.primary} />
                    ) : (
                        <Button
                        title={isSignUp ? "Sign Up" : "Login"} 
                        color={Colors.primary} 
                        onPress={()=>{
                        if(props.isValid){
                          return props.handleSubmit();
                       }
                       else {
                        console.log('form invalid')
                       }
                      }} />
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                    title={`Switch to ${isSignUp ? "Login" : "Sign Up" }`}
                    color={Colors.accent}
                    onPress={() => {
                        setIsSignUp(prevState => !prevState)
                    }}
                    />
                </View>
                 </>
               )
            }}
          </Formik>
          </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:5,
    elevation:5
  },
  textInput:{
    width: '90%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 10,
    borderBottomWidth:1
  },
  buttonContainer: {
    marginTop: 5,
    marginBottom:5,
    width:'60%'
  }
});

export default AuthScreen;
