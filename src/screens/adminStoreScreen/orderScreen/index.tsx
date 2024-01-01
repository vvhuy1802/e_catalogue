import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {OrderStackAdminStoreParamList, StyleRoomStackParamList} from '~/types';
import {
  ADD_STYLE_ROOM_SCREEN_ADMIN_STORE,
  DETAIL_STYLE_ROOM_SCREEN_ADMIN_STORE,
} from '~/constants/routeNames';
import OrderScreen from './screens/orderScreen';
import DetailOrderScreen from './screens/detailOrderScreen';

const Stack = createNativeStackNavigator<OrderStackAdminStoreParamList>();
const OrderAdminStoreStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'OrderScreenAdminStore'}
        component={OrderScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name={'DetailOrderScreenAdminStore'}
        component={DetailOrderScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default OrderAdminStoreStack;
