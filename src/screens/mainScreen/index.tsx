import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CATEGORY,
  FAVORITE,
  HOME,
  PROFILE,
  ROOMIDEA,
  SEARCHSTACK,
  SEARCHSCREEN,
} from '~/constants/routeNames';
import HomeScrren from './home';
import {HomeStackParamList} from '~/types';
import BottomBar from './bottombar';
import Category from './category';
import Favorite from './favorite';
import Profile from './profile';
import RoomIdea from './styleIdea';
import SearchStack from './searchScreen';

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
          component={Category}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={ROOMIDEA}
          component={RoomIdea}
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
      </Stack.Navigator>
      <BottomBar />
    </>
  );
};

export default MainStack;
