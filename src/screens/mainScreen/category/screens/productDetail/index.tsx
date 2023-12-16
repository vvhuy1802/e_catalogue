import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ORDERSTACK,
  PRODUCTDETAILSCREEN,
  REVIEWDETAIL,
} from '~/constants/routeNames';
import {ProductDetailStackParamList} from '~/types';
import ProductDetail from './screens/productDetail';
import ReviewDetail from './screens/reviewDetail';

const Stack = createNativeStackNavigator<ProductDetailStackParamList>();
const ProductStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name={PRODUCTDETAILSCREEN}
          component={ProductDetail}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={REVIEWDETAIL}
          component={ReviewDetail}
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

export default ProductStack;
