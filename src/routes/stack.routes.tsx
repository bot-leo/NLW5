import React from 'react'

import {createStackNavigator} from '@react-navigation/stack'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { Welcome } from '../views/Welcome'
import { UserIdentification } from '../views/UserIdentification'
import { Confirmation } from '../views/Confirmation'
import { PlantSelect } from '../views/PlantSelect'

const stackRoutes = createStackNavigator();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode='none'
    screenOptions={{
      cardStyle:{
        backgroundColor: colors.white,
      },
    }}
    >
      <stackRoutes.Screen
        name='Welcome'
        component={Welcome}
      />
      <stackRoutes.Screen
        name='UserIdentification'
        component={UserIdentification}
      />
      <stackRoutes.Screen
        name='Confirmation'
        component={Confirmation}
      />
      <stackRoutes.Screen
        name='PlantSelect'
        component={PlantSelect}
      />
     
  </stackRoutes.Navigator>
)

export default AppRoutes