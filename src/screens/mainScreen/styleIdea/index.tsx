import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ALLIMAGE, STYLEDETAIL, STYLEIDEA} from '~/constants/routeNames';
import {StyleIdeaStackParamList} from '~/types';
import StyleIdea from './screens/styleIdea';
import DetailStyleIdea from './screens/detailStyleIdea';
import ShowAllImage from './screens/components/showAllImage';

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
        <Stack.Screen
          name={ALLIMAGE}
          component={ShowAllImage}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'slide_from_left',
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default StyleIdeaStack;
