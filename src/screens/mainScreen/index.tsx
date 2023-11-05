import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HOME} from '~/constants/routeNames';
import HomeScrren from './home';
import {HomeStackParamList} from '~/types';

const Stack = createNativeStackNavigator<HomeStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HOME}
        component={HomeScrren}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
