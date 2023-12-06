import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DETAILSEARCHSCREEN, SEARCHSCREEN} from '~/constants/routeNames';
import {SearchStackParamList} from '~/types';
import SearchScreen from './screens/searchScreen';
import DetailScreen from './screens/detailScreen';

const Stack = createNativeStackNavigator<SearchStackParamList>();
const SearchStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name={SEARCHSCREEN}
          component={SearchScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={DETAILSEARCHSCREEN}
          component={DetailScreen}
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

export default SearchStack;
