import React from 'react';
import {
  APPROVE_STORE_SCREEN_ADMIN_SYSTEM,
  CATEGORY_SCREEN_ADMIN_SYSTEM,
  HOME_SCREEN_ADMIN_SYSTEM,
  REVENUE_SCREEN_ADMIN_SYSTEM,
} from '~/constants/routeNames';
import {AdminSystemStackParamList} from '~/types';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Pressable, Text, View} from 'react-native';
import {images} from '~/assets';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import FastImage from 'react-native-fast-image';
import {IconSvg} from '~/components/global/iconSvg';
import {AppDispatch} from '~/app/store';
import {useDispatch, useSelector} from 'react-redux';
import {AppProvider} from '~/app/appProvider';
import {
  selectUserInfo,
  SetIsAuthorized,
  SetUserInforLogin,
} from '~/redux/reducers/authSlice';
import HomeScreen from './homeScreen';
import Revenue from './revenue';
import ApproveStore from './approveStore';
import Category from './category';

const Drawer = createDrawerNavigator<AdminSystemStackParamList>();
const AdminSystemStack = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentAccount = useSelector(selectUserInfo);
  const handleLogout = () => {
    dispatch(
      SetUserInforLogin({
        id: 0,
        username: '',
        role: '',
      }),
    );
    dispatch(SetIsAuthorized(''));
    AppProvider.setTokenUser('', '');
    AppProvider.setAccountInfo(null as any);
  };

  const CustomDrawer = (props: any) => {
    return (
      <FastImage
        source={images.home.BackgroundHome}
        style={{
          flex: 1,
        }}>
        <DrawerContentScrollView {...props}>
          <View
            style={{
              padding: HeightSize(20),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FastImage
              source={images.home.DropDownMan}
              style={{
                width: WidthSize(80),
                height: WidthSize(80),
              }}
            />
            <View
              style={{
                marginLeft: WidthSize(10),
              }}>
              <Text
                style={{
                  ...TextFont.SMedium,
                  ...TextStyle.XXL,
                  color: '#3B3021',
                }}>
                System Admin
              </Text>
              <Text
                style={{
                  ...TextFont.SLight,
                  ...TextStyle.Base,
                  color: '#836E44',
                }}>
                {currentAccount.username}
              </Text>
            </View>
          </View>
          <View
            style={{
              padding: HeightSize(10),
            }}>
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: WidthSize(20),
          }}>
          <Pressable
            onPress={() => {
              handleLogout();
            }}
            style={{
              width: WidthSize(52),
              height: HeightSize(52),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#836E44',
              borderRadius: WidthSize(16),
              marginEnd: WidthSize(24),
            }}>
            <IconSvg
              icon={'IconSignOut'}
              width={WidthSize(20)}
              height={HeightSize(20)}
            />
          </Pressable>
          <Text
            style={{...TextStyle.Base, ...TextFont.SMedium, color: '#3B3021'}}>
            Sign out
          </Text>
        </View>
      </FastImage>
    );
  };

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#D8D2C4',
        drawerActiveTintColor: '#3B3021',
        drawerInactiveTintColor: '#3B30213D',
        drawerLabelStyle: {
          fontSize: HeightSize(16),
          fontFamily: 'Sebino-Medium',
        },
      }}
      drawerContent={props => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name={HOME_SCREEN_ADMIN_SYSTEM}
        component={HomeScreen}
        options={{
          title: 'Home Screen',
        }}
      />
      <Drawer.Screen
        name={CATEGORY_SCREEN_ADMIN_SYSTEM}
        component={Category}
        options={{
          title: 'Categories Screen',
        }}
      />
      <Drawer.Screen
        name={APPROVE_STORE_SCREEN_ADMIN_SYSTEM}
        component={ApproveStore}
        options={{
          title: 'Approve Store',
        }}
      />
      <Drawer.Screen
        name={REVENUE_SCREEN_ADMIN_SYSTEM}
        component={Revenue}
        options={{
          title: 'Revenue Screen',
        }}
      />
    </Drawer.Navigator>
  );
};

export default AdminSystemStack;
