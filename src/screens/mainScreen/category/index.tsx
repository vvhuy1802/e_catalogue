import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CATEGORYSCREEN,
  DETAILCATEGORYSCREEN,
  PRODUCTSTACK,
} from '~/constants/routeNames';
import {CategoryStackParamList} from '~/types';
import Category from './screens/categoryScreen';
import DetailCategory from './screens/detailCategory';
import ProductStack from './screens/productDetail';

const Stack = createNativeStackNavigator<CategoryStackParamList>();
const CategoryStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name={CATEGORYSCREEN}
          component={Category}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={DETAILCATEGORYSCREEN}
          component={DetailCategory}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'slide_from_left',
          }}
        />
        <Stack.Screen
          name={PRODUCTSTACK}
          component={ProductStack}
          options={{
            headerShown: false,
            gestureEnabled: false,
            // animation: 'fade',
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default CategoryStack;
