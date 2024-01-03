import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {ADMIN_STORE_STACK} from '~/constants/routeNames';
import AdminStoreStack from '~/screens/adminStoreScreen';
import {AdminStoreStackScreen} from '~/types';

const Stack = createNativeStackNavigator<AdminStoreStackScreen>();

const AdminStore = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ADMIN_STORE_STACK}
        component={AdminStoreStack}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'fade_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};

export default AdminStore;
