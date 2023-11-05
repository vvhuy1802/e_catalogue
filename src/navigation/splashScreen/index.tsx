import React, {useEffect, useRef} from 'react';
import ContainerView from '~/components/global/containerView';
import LottieView from 'lottie-react-native';
import {animations} from '~/assets';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Animated, SafeAreaView, Text, View} from 'react-native';
import {HeightSize, WidthSize, height, width} from '~/theme/size';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetIsShowSplash} from '~/redux/reducers/authSlice';

const SplashScreen = () => {
  const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
  const animationRef = useRef<LottieView>(null);
  const changeSizeRef = useRef(new Animated.Value(0));
  const moveTopRef = useRef(new Animated.Value(0));
  const [isFetchSuccess, setIsFetchSuccess] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const onAnimationFinish = () => {
    if (isFetchSuccess) {
      animationRef.current?.pause();
      Animated.timing(changeSizeRef.current, {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(moveTopRef.current, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
        }).start(() => {
          setTimeout(() => {
            dispatch(SetIsShowSplash(false));
          }, 300);
        });
      });
    } else {
      animationRef.current?.play();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFetchSuccess(true);
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [isFetchSuccess]);

  return (
    <ContainerView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: HeightSize(56),
            position: 'absolute',
            top: moveTopRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: [height / 2 - HeightSize(56), 0],
            }),
            left: moveTopRef.current.interpolate({
              inputRange: [0, 1],
              outputRange: [width / 2 - WidthSize(50), WidthSize(48)],
            }),
          }}>
          <Animated.View
            style={{
              width: changeSizeRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: [WidthSize(125), WidthSize(50)],
              }),
              height: changeSizeRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: [WidthSize(125), WidthSize(50)],
              }),
              transform: [
                {
                  translateX: changeSizeRef.current.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, WidthSize(-30)],
                  }),
                },
              ],
              backgroundColor: 'white',
              zIndex: 2,
            }}>
            <AnimatedLottieView
              ref={animationRef}
              source={animations.Splash}
              autoPlay
              loop={false}
              style={{
                width: '100%',
                height: '100%',
              }}
              onAnimationFinish={onAnimationFinish}
            />
          </Animated.View>
          <Animated.Text
            style={{
              fontSize: changeSizeRef.current.interpolate({
                inputRange: [0, 0.75, 1],
                outputRange: [WidthSize(30), WidthSize(20), WidthSize(15)],
              }),
              opacity: changeSizeRef.current.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
              transform: [
                {
                  translateX: changeSizeRef.current.interpolate({
                    inputRange: [0, 0.75, 1],
                    outputRange: [0, WidthSize(30), WidthSize(32)],
                  }),
                },
              ],
              color: 'blue',
              fontWeight: 'bold',
              position: 'absolute',
              zIndex: 1,
            }}>
            E-Catalogue
          </Animated.Text>
        </Animated.View>
      </SafeAreaView>
    </ContainerView>
  );
};

export default SplashScreen;
