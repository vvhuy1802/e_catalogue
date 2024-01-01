import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleRoomStackParamList} from '~/types';
import StyleRoom from './screens/styleRoom';
import {
  ADD_STYLE_ROOM_SCREEN_ADMIN_STORE,
  DETAIL_STYLE_ROOM_SCREEN_ADMIN_STORE,
} from '~/constants/routeNames';
import AddStyleRoom from './screens/addStyleRoom';
import DetailStyleRoom from './screens/detailStyleRoom';

const Stack = createNativeStackNavigator<StyleRoomStackParamList>();
const StyleRoomtack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'StyleRoomScreenAdminStore'}
        component={StyleRoom}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name={ADD_STYLE_ROOM_SCREEN_ADMIN_STORE}
        component={AddStyleRoom}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name={DETAIL_STYLE_ROOM_SCREEN_ADMIN_STORE}
        component={DetailStyleRoom}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'slide_from_left',
        }}
      />
    </Stack.Navigator>
  );
};

export default StyleRoomtack;
