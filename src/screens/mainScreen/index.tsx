import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CATEGORY, FAVORITE, HOME, PROFILE} from '~/constants/routeNames';
import HomeScrren from './home';
import {HomeStackParamList} from '~/types';
import BottomBar from './bottombar';
import Category from './category';
import Favorite from './favorite';
import Profile from './profile';

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
      </Stack.Navigator>
      <BottomBar />
    </>
  );
};

export default MainStack;
