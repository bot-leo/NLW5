import React, { useState } from 'react'

import {StyleSheet,
        SafeAreaView,
        StatusBar,
        View,
        Text,
        TextInput,
        KeyboardAvoidingView,
        TouchableWithoutFeedback,
        Platform,
        Keyboard} from 'react-native'

import { useNavigation } from '@react-navigation/core'

import { Button } from '../components/Button'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function UserIdentification(){
  // Hooks de Navegação
  const navigation = useNavigation()

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  // acrescentando tipagem para o estado para obter o nome do usuario
  const [name, setName] = useState<string>();

  function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!name);
  }
  function handleInputFocus(){
    setIsFocused(true);
  }

  function handleInputChange( value: string){
    setIsFilled(!!value);
    setName(value);
  }

  function handleSubmit(){
    navigation.navigate('Confirmation')
  }

  return(
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}
                            // Nesse caso verificado o comportaamento do Keyboard
                            //se ele estiver em um io o comportamento dele sera de padding
                            //caso for android ele tera um 'height'
                            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        <StatusBar/>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              {/* Para que o Keyboard tenha melhor efeito sempre é indicado envolver elementos 'soltos' */}
              <View style={styles.header}>
                <Text style={styles.emoji}>
                  { isFilled ? '😄' : '😃' }
                </Text>
                <Text style={styles.title}>
                        Como podemos 
                  {'\n'} chamar você?
                </Text>
              </View>

              <TextInput style={[
                          styles.input,
                          // é feito uma verificação pra ve se o input esta clicado
                          // e se tem algo escrito
                          //caso tenha ou o focus ou o nome ele ficara verde
                          //Dica UX
                          (isFocused || isFilled) && 
                          { borderColor: colors.green}
                        ]}
                          placeholder='Digite um nome'
                          onBlur={handleInputBlur}
                          onFocus={handleInputFocus}
                          onChangeText={handleInputChange} 
              />
            <View style={styles.footer}>
              <Button title='Confirmar' 
                      onPress={handleSubmit}
              />
            </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    width:'100%',
    alignItems:'center',
    justifyContent:'space-around',
  },
  content:{
    flex:1,
    width:'100%',
  },
  form:{
    flex:1,
    paddingHorizontal:54,
    alignItems:'center',
    justifyContent:'center',
  },
  header:{
    alignItems:'center',
  },
  emoji:{
    fontSize:44,
  },
  input:{
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width:'100%',
    fontSize:18,
    marginTop:50,
    padding:10,
    textAlign:'center',
  },
  title:{
    fontSize:24,
    lineHeight:32,
    textAlign:'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop:20,
  },
 
  footer:{
    marginTop:40,
    width:'100%',
    paddingHorizontal:20,
  },
});