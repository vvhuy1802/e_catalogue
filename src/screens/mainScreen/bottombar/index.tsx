import {Animated, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {HeightSize, WidthSize} from '~/theme/size';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '~/types';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectDirectionBottomBar} from '~/redux/reducers/globalSlice';
import {IconSvg, IconSvgType} from '~/components/global/iconSvg';
import {BOTTOM_TAB_HEIGHT} from '~/constants/global';

type TabProps = {
  name: string;
  icon: IconSvgType;
  iconFocused: IconSvgType;
  onPress: () => void;
};

const BottomBar = () => {
  const naviation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const [currentTab, setCurrentTab] = useState('Home');
  const direction = useSelector(selectDirectionBottomBar);
  const moveYRef = useRef(new Animated.Value(0));
  const tabs: Array<TabProps> = [
    {
      name: 'Home',
      icon: 'IconHome',
      iconFocused: 'IconHomeFocused',
      onPress: () => {
        naviation.navigate('Home');
        setCurrentTab('Home');
      },
    },
    {
      name: 'Category',
      icon: 'IconCategory',
      iconFocused: 'IconCategoryFocused',
      onPress: () => {
        naviation.navigate('Category', {screen: 'CategoryScreen'});
        setCurrentTab('Category');
      },
    },
    {
      name: 'Room Idea',
      icon: 'IconRoomIdea',
      iconFocused: 'IconRoomIdeaFocused',
      onPress: () => {
        naviation.navigate('StyleIdeaStack', {
          screen: 'StyleIdea',
        });
        setCurrentTab('Room Idea');
      },
    },
    {
      name: 'Favorite',
      icon: 'IconHeartGray',
      iconFocused: 'IconFavoriteFocused',
      onPress: () => {
        naviation.navigate('Favorite');
        setCurrentTab('Favorite');
      },
    },
    {
      name: 'Profile',
      icon: 'IconProfile',
      iconFocused: 'IconProfileFocused',
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
        backgroundColor: '#FBFBFB',
        height: BOTTOM_TAB_HEIGHT,
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
              height: HeightSize(50),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IconSvg
              icon={currentTab === tab.name ? tab.iconFocused : tab.icon}
            />
          </Pressable>
        );
      })}
    </Animated.View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({});
