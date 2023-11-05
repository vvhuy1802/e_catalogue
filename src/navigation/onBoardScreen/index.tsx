import {Animated, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Header from '~/components/global/header';
import CardOnBoard from './components/cardOnBoard';
import ContainerView from '~/components/global/containerView';
import {HeightSize, WidthSize} from '~/theme/size';

const OnBoard = () => {
  const opacityRef = useRef(new Animated.Value(0));
  useEffect(() => {
    Animated.timing(opacityRef.current, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <ContainerView
      style={{
        flex: 1,
      }}>
      <SafeAreaView style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: WidthSize(20),
          }}>
          <Header />
          <Animated.Text
            style={{
              opacity: opacityRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              fontSize: WidthSize(15),
              color: 'gray',
              fontWeight: 'bold',
            }}>
            Skip
          </Animated.Text>
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
              marginTop: HeightSize(50),
            }}>
            <CardOnBoard />
          </View>
        </Animated.View>
      </SafeAreaView>
    </ContainerView>
  );
};

export default OnBoard;

const styles = StyleSheet.create({});
