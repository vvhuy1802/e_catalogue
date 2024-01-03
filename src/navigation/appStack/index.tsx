import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {MainStackParamList} from '~/types';
import {MAINSTACK} from '~/constants/routeNames';
import MainStack from '~/screens/mainScreen';
import {useGetUserInfo} from '~/components/global/hooks/useGetUserInfo';
import {useDispatch} from 'react-redux';
import {getAllCollection} from '~/redux/actions/userInfoAction';
import {AppDispatch} from '~/app/store';

const Stack = createNativeStackNavigator<MainStackParamList>();

const AppStack = () => {
  const {} = useGetUserInfo();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getData = async () => {
      await dispatch(getAllCollection());
    };
    getData();
  }, []);
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
