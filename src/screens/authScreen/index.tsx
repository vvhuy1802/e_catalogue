import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LOGIN, SURVEY} from '~/constants/routeNames';
import Login from './login';
import {AuthenticationStackParamList} from '~/types';
import Survey from './survey';

const Stack = createNativeStackNavigator<AuthenticationStackParamList>();

const AuthenticationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={LOGIN}
        component={Login}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name={SURVEY}
        component={Survey}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
