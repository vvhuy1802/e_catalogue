import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ContainerImage from '~/components/global/containerImage';
import {images} from '~/assets';
import {TextStyle} from '~/theme/textStyle';
import {HeightSize, WidthSize, height, width} from '~/theme/size';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import PrimaryButton from '~/components/global/primaryButton';
import ToggleSwitch from 'toggle-switch-react-native';
const Login = () => {
  const [toggle, setToggle] = React.useState(false);
  const [currentLayout, setCurrentLayout] = React.useState<'signin' | 'signup'>(
    'signin',
  );
  const changeLayoutRef = React.useRef(new Animated.Value(1)).current;
  const [positionSignIn, setPositionSignIn] = React.useState([
    width,
    WidthSize(30),
  ]);
  const [positionSignUp, setPositionSignUp] = React.useState([
    WidthSize(30),
    -width,
  ]);
  const handleChangeLayout = () => {
    setCurrentLayout(prev => (prev === 'signin' ? 'signup' : 'signin'));
    Animated.timing(changeLayoutRef, {
      toValue: currentLayout === 'signin' ? 0 : 1,
      duration: 1000,
      useNativeDriver: false,
    }).start(async () => {
      // setCurrentLayout(prev => (prev === 'signin' ? 'signup' : 'signin'));
      setPositionSignIn(
        currentLayout === 'signup'
          ? [width, WidthSize(30)]
          : [-width, WidthSize(30)],
      );
      setPositionSignUp(
        currentLayout === 'signup'
          ? [WidthSize(30), -width]
          : [WidthSize(30), width],
      );
    });
  };

  return (
    <ContainerImage
      isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.login.BackgroundLogin}>
      <View
        style={{
          flex: 1,
          height: '100%',
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: WidthSize(50),
            left: changeLayoutRef.interpolate({
              inputRange: [0, 1],
              outputRange: positionSignIn,
            }),
          }}>
          <Text
            style={{
              ...TextStyle.Title,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Welcome back!
          </Text>
          <Text
            style={{
              ...TextStyle.SM,
              fontWeight: '500',
              color: 'white',
            }}>
            Log back your account!
          </Text>
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            top: WidthSize(50),
            left: changeLayoutRef.interpolate({
              inputRange: [0, 1],
              outputRange: positionSignUp,
            }),
          }}>
          <Text
            style={{
              ...TextStyle.Title,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Create an account
          </Text>
          <Text
            style={{
              ...TextStyle.SM,
              fontWeight: '500',
              color: 'white',
            }}>
            Sign up to get started!
          </Text>
        </Animated.View>

        <View
          style={{
            justifyContent: 'flex-end',
            flex: 1,
          }}>
          <Animated.View
            style={{
              width: '100%',
              backgroundColor: 'white',
              padding: WidthSize(20),
              borderTopLeftRadius: WidthSize(20),
              borderTopRightRadius: WidthSize(20),
              position: 'absolute',
              bottom: changeLayoutRef.interpolate({
                inputRange: [0, 1],
                outputRange: [-height, 0],
              }),
            }}>
            <View>
              <Text style={styles.title}>Email</Text>
              <TextInput
                style={styles.txtInput}
                placeholderTextColor={'gray'}
                placeholder="Enter your registered email"
              />
            </View>
            <View style={{marginTop: HeightSize(20)}}>
              <Text style={styles.title}>Password</Text>
              <TextInput
                style={styles.txtInput}
                placeholderTextColor={'gray'}
                placeholder="Enter password"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: HeightSize(20),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ToggleSwitch
                  isOn={toggle}
                  onColor="green"
                  offColor="gray"
                  size="medium"
                  onToggle={isOn => setToggle(isOn)}
                />
                <Text
                  style={{
                    ...TextStyle.SM,
                    fontWeight: 'bold',
                    marginLeft: WidthSize(10),
                  }}>
                  Remember me
                </Text>
              </View>
              <Text
                style={{
                  ...TextStyle.SM,
                  fontWeight: 'bold',
                  color: 'blue',
                }}>
                Forgot password?
              </Text>
            </View>
            <PrimaryButton
              title="Sign in"
              handlePress={() => {}}
              style={{
                marginTop: HeightSize(30),
                height: HeightSize(50),
              }}
            />
            <Text
              style={{
                marginTop: HeightSize(20),
                textAlign: 'center',
                width: '100%',
                color: 'gray',
                ...TextStyle.SM,
              }}>
              Or continue with
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: HeightSize(20),
                justifyContent: 'center',
                gap: WidthSize(20),
              }}>
              <TouchableOpacity>
                <Image
                  style={{
                    width: HeightSize(40),
                    height: HeightSize(40),
                    borderRadius: 15,
                  }}
                  source={images.login.LogoGoogle}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{
                    width: HeightSize(40),
                    height: HeightSize(40),
                    borderRadius: 15,
                  }}
                  source={images.login.LogoFacebook}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: HeightSize(50),
                width: '100%',
                justifyContent: 'center',
                marginBottom: HeightSize(20),
              }}>
              <Text
                style={{
                  color: 'gray',
                  ...TextStyle.SM,
                }}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={handleChangeLayout}>
                <Text style={{fontWeight: 'bold', color: 'blue'}}>
                  {' '}
                  {currentLayout === 'signin' ? 'Sign up' : 'Sign in'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          <Animated.View
            style={{
              width: '100%',
              backgroundColor: 'white',
              padding: WidthSize(20),
              borderTopLeftRadius: WidthSize(20),
              borderTopRightRadius: WidthSize(20),
              position: 'absolute',
              bottom: changeLayoutRef.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -height],
              }),
            }}>
            <View>
              <Text style={styles.title}>Full name</Text>
              <TextInput
                style={styles.txtInput}
                placeholderTextColor={'gray'}
                placeholder="Enter your full name"
              />
            </View>
            <View style={{marginTop: HeightSize(20)}}>
              <Text style={styles.title}>Email</Text>
              <TextInput
                style={styles.txtInput}
                placeholderTextColor={'gray'}
                placeholder="Enter your registered email"
              />
            </View>
            <View style={{marginTop: HeightSize(20)}}>
              <Text style={styles.title}>Password</Text>
              <TextInput
                style={styles.txtInput}
                placeholderTextColor={'gray'}
                placeholder="Enter password"
              />
            </View>
            <PrimaryButton
              title={currentLayout === 'signin' ? 'Sign in' : 'Create account'}
              handlePress={() => {}}
              style={{
                marginTop: HeightSize(30),
                height: HeightSize(50),
              }}
            />
            <Text
              style={{
                marginTop: HeightSize(20),
                textAlign: 'center',
                width: '100%',
                color: 'gray',
                ...TextStyle.SM,
              }}>
              Or continue with
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: HeightSize(20),
                justifyContent: 'center',
                gap: WidthSize(20),
              }}>
              <TouchableOpacity>
                <Image
                  style={{
                    width: HeightSize(40),
                    height: HeightSize(40),
                    borderRadius: 15,
                  }}
                  source={images.login.LogoGoogle}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  style={{
                    width: HeightSize(40),
                    height: HeightSize(40),
                    borderRadius: 15,
                  }}
                  source={images.login.LogoFacebook}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: HeightSize(50),
                width: '100%',
                justifyContent: 'center',
                marginBottom: HeightSize(20),
              }}>
              <Text
                style={{
                  color: 'gray',
                  ...TextStyle.SM,
                }}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={handleChangeLayout}>
                <Text style={{fontWeight: 'bold', color: 'blue'}}>
                  {' '}
                  {currentLayout === 'signin' ? 'Sign up' : 'Sign in'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </View>
    </ContainerImage>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    ...TextStyle.SM,
    fontWeight: 'bold',
    marginBottom: HeightSize(5),
  },
  txtInput: {
    borderRadius: 10,
    padding: WidthSize(10),
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: 'black',
  },
});
