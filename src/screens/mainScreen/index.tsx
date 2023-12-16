import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CATEGORY,
  FAVORITE,
  HOME,
  PROFILE,
  SEARCHSTACK,
  SEARCHSCREEN,
  ORDERSTACK,
  STYLEIDEA,
  STYLEIDEASTACK,
} from '~/constants/routeNames';
import HomeScrren from './home';
import {HomeStackParamList} from '~/types';
import BottomBar from './bottombar';
import Favorite from './favorite';
import Profile from './profile';
import SearchStack from './searchScreen';
import CategoryStack from './category';
import OrderStack from './category/screens/order';
import StyleIdea from './styleIdea/screens/styleIdea';
import StyleIdeaStack from './styleIdea';

const Stack = createNativeStackNavigator<HomeStackParamList>();
const MainStack = () => {
  return (
    <>
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
        <Stack.Screen
          name={CATEGORY}
          component={CategoryStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={STYLEIDEASTACK}
          component={StyleIdeaStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={FAVORITE}
          component={Favorite}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={PROFILE}
          component={Profile}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={SEARCHSTACK}
          component={SearchStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade_from_bottom',
          }}
        />
        <Stack.Screen
          name={ORDERSTACK}
          component={OrderStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
          }}
        />
      </Stack.Navigator>
      <BottomBar />
    </>
  );
};

export default MainStack;
