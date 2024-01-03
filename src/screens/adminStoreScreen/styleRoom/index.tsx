import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleRoomStackParamList} from '~/types';
import StyleRoom from './screens/styleRoom';
import {
  ADD_STYLE_ROOM_SCREEN_ADMIN_STORE,
  ALLIMAGE,
  DETAIL_STYLE_ROOM_SCREEN_ADMIN_STORE,
  EDIT_STYLE_ROOM_SCREEN_ADMIN_STORE,
} from '~/constants/routeNames';
import AddStyleRoom from './screens/addStyleRoom';
import DetailStyleRoom from './screens/detailStyleRoom';
import AllImage from './screens/allImage';
import EditStyleRoom from './screens/editStyleRoom';

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
      <Stack.Screen
        name={ALLIMAGE}
        component={AllImage}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'slide_from_left',
        }}
      />
      <Stack.Screen
        name={EDIT_STYLE_ROOM_SCREEN_ADMIN_STORE}
        component={EditStyleRoom}
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
