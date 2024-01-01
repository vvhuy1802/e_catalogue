import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainStackParamList} from '~/types';
import {MAINSTACK} from '~/constants/routeNames';
import MainStack from '~/screens/mainScreen';
import {useGetUserInfo} from '~/components/global/hooks/useGetUserInfo';

const Stack = createNativeStackNavigator<MainStackParamList>();

const AppStack = () => {
  const {} = useGetUserInfo();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={MAINSTACK}
        component={MainStack}
        options={{
          headerShown: false,
          gestureEnabled: false,
          animation: 'fade_from_bottom',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
