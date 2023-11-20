import {
  Animated,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import ContainerImage from '~/components/global/containerImage';
import {images} from '~/assets';
import {TextStyle} from '~/theme/textStyle';
import {HeightSize, WidthSize, height, width} from '~/theme/size';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import PrimaryButton from '~/components/global/primaryButton';
import ToggleSwitch from 'toggle-switch-react-native';
import {useLogin} from './useLogin';
const Login = () => {
  const {
    toggle,
    setToggle,
    isSignIn,
    changeLayoutRef,
    handleChangeLayout,
    handleLogin,
    handleRegister,
  } = useLogin();

  return (
    <ContainerImage
      isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.login.BackgroundLogin}>
      <Pressable
        onPress={() => {
          Keyboard.dismiss();
        }}
        style={{
          flex: 1,
          height: '100%',
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            top: WidthSize(70),
            left: changeLayoutRef.interpolate({
              inputRange: [0, 1],
              outputRange: isSignIn
                ? [width, WidthSize(30)]
                : [-width, WidthSize(30)],
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
              ...TextStyle.XS,
              fontWeight: '500',
              color: 'white',
              marginTop: HeightSize(17),
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
              outputRange: isSignIn
                ? [WidthSize(30), -width]
                : [WidthSize(30), width],
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
              ...TextStyle.XS,
              fontWeight: '500',
              color: 'white',
              marginTop: HeightSize(17),
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
              opacity: changeLayoutRef.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            }}>
            <View>
              <Text style={styles.title}>Email</Text>
              <TextInput
                style={styles.txtInput}
                placeholderTextColor={'#A5ABB9'}
                placeholder="Enter your registered email"
              />
            </View>
            <View style={{marginTop: HeightSize(24)}}>
              <Text style={styles.title}>Password</Text>
              <TextInput
                style={styles.txtInput}
                placeholderTextColor={'#A5ABB9'}
                placeholder="Enter password"
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: HeightSize(30),
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <ToggleSwitch
                  isOn={toggle}
                  onColor="green"
                  offColor="#A0A5B7"
                  size="medium"
                  onToggle={isOn => setToggle(isOn)}
                />
                <Text
                  style={{
                    ...TextStyle.SM,
                    fontWeight: 'bold',
                    marginLeft: WidthSize(10),
                    color: '#525A7F',
                  }}>
                  Remember me
                </Text>
              </View>
              <Text
                style={{
                  ...TextStyle.SM,
                  fontWeight: 'bold',
                  color: '#2B60E9',
                }}>
                Forgot password?
              </Text>
            </View>
            <PrimaryButton
              title="Sign in"
              handlePress={handleLogin}
              style={{
                marginTop: HeightSize(40),
                height: HeightSize(64),
              }}
            />
            <Text
              style={{
                marginTop: HeightSize(20),
                textAlign: 'center',
                width: '100%',
                color: '#C1C1CB',
                ...TextStyle.XS,
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
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#2B60E9',
                    ...TextStyle.SM,
                  }}>
                  {' '}
                  {'Sign up'}
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
              opacity: changeLayoutRef.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0],
              }),
            }}>
            <View>
              <Text style={styles.title}>Full name</Text>
              <TextInput
                style={styles.txtInput}
                placeholderTextColor={'#A5ABB9'}
                placeholder="Enter your full name"
              />
            </View>
            <View style={{marginTop: HeightSize(24)}}>
              <Text style={styles.title}>Email</Text>
              <TextInput
                style={styles.txtInput}
                placeholderTextColor={'#A5ABB9'}
                placeholder="Enter your registered email"
              />
            </View>
            <View style={{marginTop: HeightSize(24)}}>
              <Text style={styles.title}>Password</Text>
              <TextInput
                style={styles.txtInput}
                placeholderTextColor={'#A5ABB9'}
                placeholder="Enter password"
              />
            </View>
            <PrimaryButton
              title={'Create account'}
              handlePress={handleRegister}
              style={{
                marginTop: HeightSize(40),
                height: HeightSize(64),
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
                  ...TextStyle.XS,
                }}>
                Don't have an account?{' '}
              </Text>
              <TouchableOpacity onPress={handleChangeLayout}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: '#2B60E9',
                    ...TextStyle.SM,
                  }}>
                  {' '}
                  {'Sign in'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Pressable>
    </ContainerImage>
  );
};

export default Login;

const styles = StyleSheet.create({
  title: {
    ...TextStyle.SM,
    fontWeight: 'bold',
    marginBottom: HeightSize(5),
    color: '#525A7F',
  },
  txtInput: {
    borderRadius: 16,
    paddingHorizontal: WidthSize(20),
    backgroundColor: '#F2F2F4',
    color: 'black',
  },
});
