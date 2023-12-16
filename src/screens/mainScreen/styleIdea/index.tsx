import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {STYLEDETAIL, STYLEIDEA} from '~/constants/routeNames';
import {StyleIdeaStackParamList} from '~/types';
import StyleIdea from './screens/styleIdea';
import DetailStyleIdea from './screens/detailStyleIdea';

const Stack = createNativeStackNavigator<StyleIdeaStackParamList>();
const StyleIdeaStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name={STYLEIDEA}
          component={StyleIdea}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={STYLEDETAIL}
          component={DetailStyleIdea}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default StyleIdeaStack;
