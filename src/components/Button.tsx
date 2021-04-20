import React from 'react'
import { TouchableOpacity,
         Text, 
         StyleSheet, 
        //  Propriedades do botão
         TouchableOpacityProps} from 'react-native'

import colors from '../styles/colors'

// Usando interface para renderizar um componente apartir de uma propriedade recebida
interface ButtonProps extends TouchableOpacityProps{
  title: string;
}

export function Button({ title, ...rest } : ButtonProps){
  return(
    <TouchableOpacity style={styles.button} 
                      activeOpacity={0.7}
                      {...rest}
    >
        <Text style={styles.buttonText}> 
          { title }
        </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button:{
    backgroundColor: colors.green,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:16,
    marginBottom:10,
    width:56,
    height:56,
  },
  image:{
    width:292,
    height:284,
  },
  buttonText:{
    color: colors.white,
    fontSize:24,
  },
});