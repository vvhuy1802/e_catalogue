import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {ADMIN_SYSTEM_STACK} from '~/constants/routeNames';
import AdminSystemStack from '~/screens/adminSystemScreen';
import {AdminSystemStackScreen} from '~/types';

const Stack = createNativeStackNavigator<AdminSystemStackScreen>();

const AdminSystem = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ADMIN_SYSTEM_STACK}
        component={AdminSystemStack}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'fade_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};

export default AdminSystem;
