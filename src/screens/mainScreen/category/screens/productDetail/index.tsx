import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ORDERSTACK,
  PRODUCTDETAILSCREEN,
  REVIEWDETAIL,
  STORESCREEN,
} from '~/constants/routeNames';
import {ProductDetailStackParamList} from '~/types';
import ProductDetail from './screens/productDetail';
import ReviewDetail from './screens/reviewDetail';
import StoreScreen from './screens/storeScreen';
import {ProductStackContext} from '~/utils/context';
import {StoreResponse} from '../../components/productDetail/Seller';

const Stack = createNativeStackNavigator<ProductDetailStackParamList>();
const ProductStack = () => {
  const [store, setStore] = React.useState<StoreResponse>({} as StoreResponse);
  return (
    <ProductStackContext.Provider
      value={{
        store,
        setStore,
      }}>
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
        <Stack.Screen
          name={STORESCREEN}
          component={StoreScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </ProductStackContext.Provider>
  );
};

export default ProductStack;
