import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ADDADDRESS,
  CONFIRMORDER,
  EDITADDRESS,
  MYBAG,
} from '~/constants/routeNames';
import {OrderStackParamList} from '~/types';
import MyBag from './screens/myBag';
import ConfirmOrder from './screens/confirmOrder';
import EditAddress from './screens/components/editAddress';
import AddAddress from './screens/components/addAddress';

const Stack = createNativeStackNavigator<OrderStackParamList>();
const OrderStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name={MYBAG}
          component={MyBag}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name={CONFIRMORDER}
          component={ConfirmOrder}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name={EDITADDRESS}
          component={EditAddress}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name={ADDADDRESS}
          component={AddAddress}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default OrderStack;
