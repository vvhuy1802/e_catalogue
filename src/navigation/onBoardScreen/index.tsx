import {Animated, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Header from '~/components/global/header';
import CardOnBoard from './components/cardOnBoard';
import ContainerView from '~/components/global/containerView';
import {HeightSize, WidthSize} from '~/theme/size';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppDispatch} from '~/app/store';
import {useDispatch} from 'react-redux';
import {SetIsShowOnBoard} from '~/redux/reducers/authSlice';
import ContainerImage from '~/components/global/containerImage';
import {images} from '~/assets';
import {TextFont} from '~/theme/textStyle';
import { AppProvider } from '~/app/appProvider';

const OnBoard = () => {
  const opacityRef = useRef(new Animated.Value(0));
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    Animated.timing(opacityRef.current, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  const handleGetStarted = () => {
    AppProvider.setIsShowOnBoard();
    dispatch(SetIsShowOnBoard(false));
  };

  return (
    <ContainerImage
      source={images.onBoard.BackgroundOnboard}
      resizeMode="cover">
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: WidthSize(32),
            marginTop: HeightSize(10),
          }}>
          <Header />
          <TouchableOpacity onPress={handleGetStarted}>
            <Animated.Text
              style={{
                opacity: opacityRef.current.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
                fontSize: WidthSize(15),
                color: '#836E44',
                ...TextFont.SLight,
              }}>
              Skip
            </Animated.Text>
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{
            opacity: opacityRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              marginTop: HeightSize(60),
            }}>
            <CardOnBoard onPress={handleGetStarted} />
          </View>
        </Animated.View>
      </SafeAreaView>
    </ContainerImage>
  );
};

export default OnBoard;

const styles = StyleSheet.create({});
