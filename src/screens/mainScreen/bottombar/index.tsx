import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {HeightSize, WidthSize} from '~/theme/size';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '~/types';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectDirectionBottomBar} from '~/redux/reducers/globalSlice';

const BottomBar = () => {
  const naviation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const [currentTab, setCurrentTab] = useState('Home');
  const direction = useSelector(selectDirectionBottomBar);
  const moveYRef = useRef(new Animated.Value(0));
  const tabs = [
    {
      name: 'Home',
      icon: 'home',
      onPress: () => {
        naviation.navigate('Home');
        setCurrentTab('Home');
      },
    },
    {
      name: 'Category',
      icon: 'category',
      onPress: () => {
        naviation.navigate('Category');
        setCurrentTab('Category');
      },
    },
    {
      name: 'Favorite',
      icon: 'favorite',
      onPress: () => {
        naviation.navigate('Favorite');
        setCurrentTab('Favorite');
      },
    },
    {
      name: 'Profile',
      icon: 'profile',
      onPress: () => {
        naviation.navigate('Profile');
        setCurrentTab('Profile');
      },
    },
  ];

  useEffect(() => {
    Animated.timing(moveYRef.current, {
      toValue: direction === 'down' ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [direction]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        bottom: moveYRef.current.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -HeightSize(120)],
        }),
        left: 0,
        right: 0,
        backgroundColor: 'red',
        height: HeightSize(100),
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        zIndex: 100,
        flexDirection: 'row',
        alignItems: 'center',
        gap: WidthSize(20),
        paddingHorizontal: WidthSize(20),
      }}>
      {tabs.map((tab, index) => {
        return (
          <Pressable
            onPress={tab.onPress}
            key={index}
            style={{
              flex: 1,
              backgroundColor: currentTab === tab.name ? 'blue' : 'white',
              height: HeightSize(50),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>{tab.name}</Text>
          </Pressable>
        );
      })}
    </Animated.View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({});
