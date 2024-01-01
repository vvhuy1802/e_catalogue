import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  EDIT_ACCOUNT,
  ADDRESS_BOOK,
  CATEGORYSCREEN,
  DETAILCATEGORYSCREEN,
  MY_PURCHASES,
  MY_WALLET,
  PRODUCTSTACK,
  PROFILE,
  EDIT_PROFILE,
} from '~/constants/routeNames';
import {CategoryStackParamList, ProfileStackParamList} from '~/types';
import EditAccount from './screens/editAccount';
import MyPurchases from './screens/myPurchases';
import AddressBook from './screens/addressBook';
import MyWallet from './screens/myWallet';
import Profile from './screens/profile';
import EditProfile from './screens/editProfile';

const Stack = createNativeStackNavigator<ProfileStackParamList>();
const ProfileStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name={PROFILE}
          component={Profile}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={EDIT_ACCOUNT}
          component={EditAccount}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={EDIT_PROFILE}
          component={EditProfile}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'fade',
          }}
        />
        <Stack.Screen
          name={MY_PURCHASES}
          component={MyPurchases}
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'slide_from_left',
          }}
        />
        <Stack.Screen
          name={ADDRESS_BOOK}
          component={AddressBook}
          options={{
            headerShown: false,
            gestureEnabled: false,
            // animation: 'fade',
          }}
        />
        <Stack.Screen
          name={MY_WALLET}
          component={MyWallet}
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

export default ProfileStack;
