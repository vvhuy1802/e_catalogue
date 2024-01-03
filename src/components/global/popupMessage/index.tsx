import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  Linking,
  StyleSheet,
  StyleProp,
  ViewStyle,
  Pressable,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import LottieView from 'lottie-react-native';
import {Shadow} from 'react-native-shadow-2';
import BlurBackground from '../blurBackground';
import {useDispatch, useSelector} from 'react-redux';
import {
  HidePopupMessage,
  selectPopupState,
} from '~/redux/reducers/popupMessageSlice';
import {animations} from '~/assets';
import {WidthSize, HeightSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';

export type PopupMessageProps = {
  message?: string;
  title?: string;
  type: 'success' | 'error' | 'warning';
  size: 'small' | 'large';
  time?: 'long' | 'short';
  hyperlink?: string;
  hyperlinkText?: string;
  onPressLink?: () => void;
  style?: StyleProp<ViewStyle>;
};

const PopupMessage: React.FC<PopupMessageProps> = ({
  message,
  title = '',
  type,
  hyperlink = '',
  hyperlinkText,
  onPressLink,
  time,
  style,
}) => {
  const popupMessageState = useSelector(selectPopupState);
  const dispatch = useDispatch();
  const [timer, setTimer] = useState<
    string | number | NodeJS.Timeout | undefined
  >(undefined);
  useEffect(() => {
    if (popupMessageState.loadingState === 'pending') {
      //onResetAnimation();
      setTimer(
        setTimeout(
          () => {
            dispatch(HidePopupMessage());
            // onResetAnimation();
          },
          time === 'long' ? 3000 : 1200,
        ),
      );
    }
  }, [JSON.stringify(popupMessageState.index)]);

  //reset animation
  const animationRef = useRef<LottieView>(null);
  const onResetAnimation = () => {
    animationRef.current?.play;
    // console.log('Animation replay');
  };

  const {width} = Dimensions.get('window');

  const onPressHyperlink = () => {
    onPressLink && onPressLink();
    Linking.openURL(hyperlink);
  };

  const styles = StyleSheet.create({
    lottie: {width: WidthSize(64), height: WidthSize(64)},
    icon: {width: HeightSize(24), height: HeightSize(24)},
    border: {borderRadius: 16},
    content: {
      backgroundColor: '#836E44',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      borderRadius: 16,
      // borderWidth: 1,
      // borderColor: '#4D466A',
    },
    shadow: {
      width: width * 0.9,
      height: '100%',
    },
    blurBackground: {
      borderRadius: 16,
    },
    wrapper: {
      width: '90%',
      height: HeightSize(96),
      alignSelf: 'center',
      zIndex: 10,
      position: 'absolute',
    },
    title: {
      color: '#FFFFFF',
      ...TextStyle.Base,
      ...TextFont.SBold,
    },
    message: {
      ...TextStyle.SM,
      ...TextFont.SRegular,
      color: '#FFFFFF',
      marginRight: WidthSize(16),
    },
  });

  return (
    popupMessageState.loadingState === 'pending' && (
      <SafeAreaView
        style={[
          styles.wrapper,
          {
            bottom: HeightSize(40),
          },
          style,
        ]}>
        <Pressable
          onPress={() => {
            clearTimeout(timer);
            dispatch(HidePopupMessage());
            onResetAnimation();
          }}>
          <Shadow
            style={[styles.shadow, styles.border]}
            distance={10}
            startColor={'#836E4429'}
            endColor={'#CA12FF05'}
            offset={[0, 0]}>
            <BlurBackground blurAmount={32} style={styles.blurBackground}>
              <View style={styles.content}>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: WidthSize(16),
                    alignItems: 'center',
                  }}>
                  <LottieView
                    ref={animationRef}
                    style={styles.lottie}
                    source={
                      type === 'success'
                        ? animations.Success
                        : animations.Warning
                    }
                    autoPlay
                    loop={type === 'success' ? false : true}
                    // loop
                  />
                  <View style={{flex: 1, marginLeft: WidthSize(12)}}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>
                      <Text>{message + ' '} </Text>
                      <Text
                        className=" text-green-500 underline"
                        onPress={onPressHyperlink}>
                        {hyperlinkText}
                      </Text>
                    </Text>
                  </View>
                </View>
              </View>
            </BlurBackground>
          </Shadow>
        </Pressable>
      </SafeAreaView>
    )
  );
};

export default PopupMessage;
