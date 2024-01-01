import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Keyboard,
  Modal,
  Pressable,
  TextInput,
  StatusBar,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {setDemoImage} from '~/redux/reducers/globalSlice';
import {height, HeightSize, width, WidthSize} from '~/theme/size';
import {
  Asset,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import ContainerView from '~/components/global/containerView';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StyleRoomStackParamList} from '~/types';
import {IconSvg} from '~/components/global/iconSvg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {StackNavigationProp} from '@react-navigation/stack';
import {TextFont, TextStyle} from '~/theme/textStyle';
type Retangle = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  info?: any;
};

type actualImageProps = {
  image: ImagePickerResponse | undefined;
  width: number;
  height: number;
  retangles: Array<Retangle>;
};

type AddStyleRoomProps = {
  route: RouteProp<StyleRoomStackParamList, 'AddStyleRoomScreenAdminStore'>;
};
const AddStyleRoom = ({route}: AddStyleRoomProps) => {
  const navigation =
    useNavigation<StackNavigationProp<StyleRoomStackParamList>>();
  const [size, setSize] = useState({
    width: route.params.widthImgage,
    height: route.params.heightImage,
  });
  const [actualImage, setActualImage] = useState<actualImageProps>({
    image: route.params.imageAdding,
    width: route.params.widthImgage,
    height: route.params.heightImage,
    retangles: [],
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const tabs = [
    {
      id: '1',
      title: 'Popular',
    },
    {
      id: '2',
      title: 'Minimal',
    },
    {
      id: '3',
      title: 'Business',
    },
    {
      id: '4',
      title: 'Street',
    },
    {
      id: '5',
      title: 'Performance',
    },
    {
      id: '6',
      title: 'Unique',
    },
    {
      id: '7',
      title: 'Lovely',
    },
    {
      id: '8',
      title: 'Easy Casual',
    },
    {
      id: '9',
      title: 'American',
    },
    {
      id: '10',
      title: 'City Boy',
    },
    {
      id: '11',
      title: 'Sporty',
    },
    {
      id: '12',
      title: 'Retro',
    },
    {
      id: '13',
      title: 'Modern',
    },
  ];
  const [category, setCategory] = useState<{id: string; title: string}>(
    tabs[0],
  );
  const dispatch = useDispatch<AppDispatch>();

  // const [currentPosition, setCurrentPosition] = useState<any>([]);
  const [retangles, setRetangles] = useState<Array<Retangle>>([]);
  const path = useRef('');
  // const pathRetange = useRef({
  //   minX: 0,
  //   minY: 0,
  //   maxX: 0,
  //   maxY: 0,
  // });
  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onPanResponderGrant: () => {
  //       path.current = '';
  //       pathRetange.current = {
  //         minX: 0,
  //         minY: 0,
  //         maxX: 0,
  //         maxY: 0,
  //       };
  //     },
  //     onPanResponderMove: (e, gesture) => {
  //       const newPoint = {
  //         x: e.nativeEvent.locationX,
  //         y:
  //           e.nativeEvent.locationY > size.height
  //             ? size.height
  //             : e.nativeEvent.locationY < 0
  //             ? 0
  //             : e.nativeEvent.locationY,
  //       };
  //       setCurrentPosition([...currentPosition, newPoint]);
  //       if (path.current === '') {
  //         path.current = `M${newPoint.x},${newPoint.y}`;
  //       } else {
  //         path.current += ` L ${newPoint.x},${newPoint.y}`;
  //       }
  //       if (
  //         pathRetange.current.minX === 0 &&
  //         pathRetange.current.minY === 0 &&
  //         pathRetange.current.maxX === 0 &&
  //         pathRetange.current.maxY === 0
  //       ) {
  //         pathRetange.current.minX = newPoint.x;
  //         pathRetange.current.minY = newPoint.y;
  //         pathRetange.current.maxX = newPoint.x;
  //         pathRetange.current.maxY = newPoint.y;
  //       } else {
  //         if (newPoint.x < pathRetange.current.minX) {
  //           pathRetange.current.minX = newPoint.x;
  //         }
  //         if (newPoint.y < pathRetange.current.minY) {
  //           pathRetange.current.minY = newPoint.y;
  //         }
  //         if (newPoint.x > pathRetange.current.maxX) {
  //           pathRetange.current.maxX = newPoint.x;
  //         }
  //         if (newPoint.y > pathRetange.current.maxY) {
  //           pathRetange.current.maxY = newPoint.y;
  //         }
  //       }
  //     },
  //     onPanResponderRelease: (e, gesture) => {
  //       if (
  //         pathRetange.current.maxX - pathRetange.current.minX < 10 ||
  //         pathRetange.current.maxY - pathRetange.current.minY < 10
  //       ) {
  //         pathRetange.current = {
  //           minX: 0,
  //           minY: 0,
  //           maxX: 0,
  //           maxY: 0,
  //         };
  //         return;
  //       }
  //       console.log(pathRetange.current);
  //       setRetangles(retangles => [
  //         ...retangles,
  //         {
  //           minX: pathRetange.current.minX > 0 ? pathRetange.current.minX : 0,
  //           minY: pathRetange.current.minY > 0 ? pathRetange.current.minY : 0,
  //           maxX: pathRetange.current.maxX > 0 ? pathRetange.current.maxX : 0,
  //           maxY: pathRetange.current.maxY > 0 ? pathRetange.current.maxY : 0,
  //         },
  //       ]);
  //       setModalVisible(true);
  //       setCurrentPosition([]);
  //     },
  //   }),
  // ).current;
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
  }, []);

  const insets = useSafeAreaInsets();
  const [isDraw, setIsDraw] = useState(false);
  const [listImageMore, setListImageMore] = useState<Array<Asset>>([]);
  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      selectionLimit: 0,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode == 'camera_unavailable') {
        console.log('Camera not available on device');
      } else if (response.errorCode == 'permission') {
        console.log('Permission not satisfied');
      } else if (response.errorCode == 'others') {
        console.log(response.errorMessage);
      } else if (response.assets) {
        response.assets.map(item => {
          setListImageMore(listImageMore => [...listImageMore, item]);
        });
      } else {
        console.log('error');
      }
    });
  };

  const renderTriangle = (top: number, left: number, rotate: string) => {
    return (
      <View
        style={{
          position: 'absolute',
          top: top,
          left: left,
          width: 0,
          height: 0,
          backgroundColor: 'transparent',
          borderStyle: 'solid',
          borderLeftWidth: 10,
          borderRightWidth: 10,
          borderBottomWidth: 10,
          borderLeftColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: '#ffffffB3',
          transform: [{rotate: rotate}],
        }}
      />
    );
  };

  const renderInfoBox = (retangle: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    info?: string;
  }) => {
    let left = 0;
    let top = 0;
    let topTriangle = 0;
    let leftTriangle = 0;
    let rotate = '0deg';
    if (retangle.minX > size.width / 2) {
      left = WidthSize((retangle.maxX - retangle.minX) / 2 + 15);
      top = WidthSize(-(HeightSize(60) - WidthSize(20)));
      topTriangle = (HeightSize(60) + WidthSize(20)) / 2 - 5;
      leftTriangle = -15;
      rotate = '-90deg';
    } else {
      left = WidthSize(-WidthSize(100) - 15);
      top = WidthSize(-(HeightSize(60) - WidthSize(20)));
      topTriangle = (HeightSize(60) + WidthSize(20)) / 2 - 5;
      leftTriangle = WidthSize(100) - 5;
      rotate = '90deg';
    }

    return retangle.info ? (
      <View
        style={{
          backgroundColor: '#ffffffB3',
          position: 'absolute',
          width: WidthSize(100),
          height: HeightSize(60) + WidthSize(20),
          left: left,
          top: top,
          borderRadius: 8,
        }}>
        {renderTriangle(topTriangle, leftTriangle, rotate)}
        <View
          style={{
            padding: WidthSize(10),
            borderRadius: 8,
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: '#3B3021',
              ...TextFont.SMedium,
              ...TextStyle.SM,
              width: WidthSize(80),
            }}>
            {retangle.info}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#3B3021',
              ...TextFont.SMedium,
              ...TextStyle.SM,
              width: WidthSize(80),
            }}>
            Price
          </Text>
          <Text
            numberOfLines={1}
            style={{
              color: '#3B3021',
              ...TextFont.SMedium,
              ...TextStyle.SM,
              width: WidthSize(80),
            }}>
            Size
          </Text>
        </View>
      </View>
    ) : null;
  };

  const handlePressImage = (e: any) => {
    const {locationX, locationY} = e.nativeEvent;
    setRetangles(retangles => [
      ...retangles,
      {
        minX: locationX,
        minY: locationY,
        maxX: locationX,
        maxY: locationY,
      },
    ]);
    setModalVisible(true);
  };

  const [modalPost, setModalPost] = useState(false);
  const queryText = (text: string) => {
    return text;
  };
  return (
    <ContainerView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: width,
        height: height,
      }}>
      {isDraw ? (
        <>
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              width: width,
              top: 0,
              paddingHorizontal: WidthSize(16),
              paddingVertical: HeightSize(16) + insets.top,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {retangles.length > 0 ? (
              <Text
                onPress={() => {
                  setRetangles(retangles =>
                    retangles.slice(0, retangles.length - 1),
                  );
                  setActualImage({
                    image: actualImage?.image,
                    width: size.width,
                    height: size.height,
                    retangles: retangles,
                  });
                }}
                suppressHighlighting={true}
                style={{
                  ...TextFont.SBold,
                  ...TextStyle.LG,
                  color: 'white',
                }}>
                Undo
              </Text>
            ) : (
              <View />
            )}
            <Text
              onPress={() => {
                setIsDraw(!isDraw);
              }}
              suppressHighlighting={true}
              style={{
                ...TextFont.SBold,
                ...TextStyle.LG,
                color: 'white',
              }}>
              Done
            </Text>
          </View>
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              width: width,
              bottom: HeightSize(16),
              paddingHorizontal: WidthSize(16),
              paddingBottom: HeightSize(16) + insets.top,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: WidthSize(70),
                height: WidthSize(70),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Pressable
                onPress={openImagePicker}
                style={{
                  width: WidthSize(50),
                  height: WidthSize(50),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                  borderStyle: 'dashed',
                  borderWidth: 1,
                  borderColor: 'white',
                }}>
                <IconSvg
                  icon="IconGalleryAddWhite"
                  width={WidthSize(30)}
                  height={WidthSize(30)}
                />
              </Pressable>
            </View>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={listImageMore}
              horizontal={true}
              style={{
                marginLeft: WidthSize(16),
              }}
              contentContainerStyle={{
                gap: WidthSize(16),
              }}
              renderItem={({item, index}) => {
                return (
                  <ImageBackground
                    key={index}
                    style={{
                      width: WidthSize(70),
                      height: WidthSize(70),
                      position: 'relative',
                      zIndex: 0,
                    }}
                    imageStyle={{
                      borderRadius: 10,
                    }}
                    source={{uri: item.uri}}>
                    <IconSvg
                      onPress={() => {
                        const newList = listImageMore.filter(
                          (item, i) => i !== index,
                        );
                        setListImageMore(newList);
                      }}
                      style={{
                        position: 'absolute',
                        top: WidthSize(4),
                        right: WidthSize(4),
                        zIndex: 2,
                        backgroundColor: '#EF6556',
                        borderRadius: 10,
                      }}
                      icon="IconCloseBoldWhite"
                      width={HeightSize(20)}
                      height={HeightSize(20)}
                    />
                  </ImageBackground>
                );
              }}
            />
          </View>
        </>
      ) : (
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            width: width,
            height: height,
            paddingHorizontal: WidthSize(16),
            paddingVertical: HeightSize(16) + insets.top,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <IconSvg
              onPress={() => {
                navigation.goBack();
              }}
              icon="IconArrowLeftWhite"
            />
            <IconSvg
              onPress={() => {
                setIsDraw(!isDraw);
              }}
              icon="IconDrawWhite"
            />
          </View>
          <Pressable
            onPress={() => {
              setModalPost(true);
            }}
            style={{
              position: 'absolute',
              bottom: WidthSize(16),
              right: WidthSize(16),
              paddingHorizontal: WidthSize(16),
              paddingVertical: HeightSize(8),
              backgroundColor: '#836E44',
              borderRadius: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              style={{
                ...TextFont.SRegular,
                ...TextStyle.LG,
                color: 'white',
              }}>
              Post now
            </Text>
            <IconSvg
              style={{
                marginLeft: WidthSize(8),
              }}
              icon="IconSendWhite"
            />
          </Pressable>
        </View>
      )}
      <Pressable
        onPress={handlePressImage}
        style={{
          width: width,
          height: size.height,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {retangles.map(
          (
            retangle: {
              minX: any;
              minY: any;
              maxX: any;
              maxY: any;
              info?: any;
            },
            index: React.Key | null | undefined,
          ) => (
            <Pressable
              key={index}
              onPress={() => {
                console.log(
                  retangle,
                  (retangle.maxX + retangle.minX) / 2,
                  (retangle.maxY + retangle.minY) / 2,
                );
              }}
              style={{
                position: 'absolute',
                zIndex: 1,
                width: WidthSize(retangle.maxX - retangle.minX),
                height: WidthSize(retangle.maxY - retangle.minY),
                left: WidthSize(retangle.minX),
                top: WidthSize(retangle.minY),
              }}>
              {renderInfoBox(retangle)}
            </Pressable>
          ),
        )}
        {/* <Svg
          style={{
            position: 'absolute',
            zIndex: 1,
            width: size.width,
            height: size.height,
          }}>
          {retangles.map(
            (
              retangle: {
                minX: any;
                minY: any;
                maxX: any;
                maxY: any;
                info?: any;
              },
              index: React.Key | null | undefined,
            ) => (
              <Path
                key={index}
                d={`M${retangle.minX},${retangle.minY} L ${retangle.maxX},${retangle.minY} L ${retangle.maxX},${retangle.maxY} L ${retangle.minX},${retangle.maxY} L ${retangle.minX},${retangle.minY}`}
                stroke="#EF6556"
                strokeWidth={4}
                fill={'none'}
              />
            ),
          )}

          {currentPosition.length > 0 && (
            <Path
              d={path.current}
              stroke="black"
              strokeWidth={4}
              fill={'none'}
            />
          )}
        </Svg> */}
        <ImageBackground
          style={{
            width: size.width,
            height: size.height,
          }}
          resizeMode="contain"
          source={{uri: actualImage?.image?.assets[0].uri}}
        />
      </Pressable>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setRetangles(retangles => retangles.slice(0, retangles.length - 1));
          setModalVisible(false);
          setText('');
        }}>
        <Pressable
          onPress={() => {
            setRetangles(retangles => retangles.slice(0, retangles.length - 1));
            setModalVisible(false);
            setText('');
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0000008d',
          }}>
          <Pressable
            onPress={() => {
              Keyboard.dismiss();
            }}
            style={{
              width: '80%',
              height: '80%',
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
            }}>
            <View
              style={{
                alignItems: 'center',
                flex: 1,
              }}>
              <Text>Add Info</Text>
              <TextInput
                style={{
                  width: '100%',
                  height: 50,
                  marginTop: 20,
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 10,
                  paddingHorizontal: 10,
                }}
                onChangeText={text => setText(text)}
                value={text}
              />
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  position: 'absolute',
                  bottom: 20,
                }}>
                <Pressable
                  onPress={() => {
                    const index = retangles.length - 1;
                    retangles[index].info = text;
                    const data = {
                      image: actualImage?.image,
                      width: size.width,
                      height: size.height,
                      retangles: retangles,
                    };
                    console.log('data', JSON.stringify(data));
                    dispatch(setDemoImage(data));
                    setActualImage(data);
                    setModalVisible(false);
                    setText('');
                  }}
                  style={{
                    width: '40%',
                    height: 50,
                    backgroundColor: 'blue',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Text style={{color: 'white'}}>Save</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    //undo previous line
                    setRetangles(retangles =>
                      retangles.slice(0, retangles.length - 1),
                    );
                    setModalVisible(false);
                    setText('');
                  }}
                  style={{
                    width: '40%',
                    height: 50,
                    backgroundColor: 'blue',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Text style={{color: 'white'}}>Cancel</Text>
                </Pressable>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={modalPost}
        // transparent={true}
        presentationStyle="pageSheet"
        animationType="slide"
        onRequestClose={() => {
          setModalPost(false);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: HeightSize(16),
          }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: HeightSize(100),
            }}>
            <Text
              style={{
                ...TextFont.SBold,
                ...TextStyle.Title,
                color: '#3B3021',
                textAlign: 'center',
              }}>
              Review your post
            </Text>
            <View
              style={{
                marginTop: HeightSize(16),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...TextFont.SBold,
                    ...TextStyle.XL,
                    color: '#3B3021',
                  }}>
                  Main image
                </Text>
                <Text
                  style={{
                    ...TextFont.SBold,
                    ...TextStyle.XL,
                    color: '#3B3021',
                    position: 'absolute',
                    left: width - WidthSize(248),
                  }}>
                  {`Variant: ${retangles.length}`}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: HeightSize(16),
                }}>
                <Image
                  style={{
                    width: WidthSize(164),
                    height: WidthSize(164),
                    borderRadius: 10,
                  }}
                  source={{uri: actualImage?.image?.assets[0].uri}}
                />
                <View
                  style={{
                    marginLeft: WidthSize(8),
                    gap: HeightSize(8),
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{
                        width: WidthSize(50),
                        height: WidthSize(50),
                        borderRadius: 10,
                      }}
                      source={{uri: actualImage?.image?.assets[0].uri}}
                    />
                    <View
                      style={{
                        marginLeft: WidthSize(8),
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          ...TextFont.SBold,
                          ...TextStyle.SM,
                          color: '#3B3021',
                          width: width - WidthSize(240),
                        }}>
                        Product name
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          ...TextFont.SBold,
                          ...TextStyle.SM,
                          color: '#3B3021',
                          width: width - WidthSize(240),
                        }}>
                        Price
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          ...TextFont.SBold,
                          ...TextStyle.SM,
                          color: '#3B3021',
                          width: width - WidthSize(240),
                        }}>
                        Size
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{
                        width: WidthSize(50),
                        height: WidthSize(50),
                        borderRadius: 10,
                      }}
                      source={{uri: actualImage?.image?.assets[0].uri}}
                    />
                    <View
                      style={{
                        marginLeft: WidthSize(8),
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          ...TextFont.SBold,
                          ...TextStyle.SM,
                          color: '#3B3021',
                          width: width - WidthSize(256),
                        }}>
                        Product name
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          ...TextFont.SBold,
                          ...TextStyle.SM,
                          color: '#3B3021',
                          width: width - WidthSize(256),
                        }}>
                        Price
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          ...TextFont.SBold,
                          ...TextStyle.SM,
                          color: '#3B3021',
                          width: width - WidthSize(256),
                        }}>
                        Size
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{
                        width: WidthSize(50),
                        height: WidthSize(50),
                        borderRadius: 10,
                      }}
                      source={{uri: actualImage?.image?.assets[0].uri}}
                    />
                    <View
                      style={{
                        marginLeft: WidthSize(8),
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          ...TextFont.SBold,
                          ...TextStyle.SM,
                          color: '#3B3021',
                          width: width - WidthSize(256),
                        }}>
                        Product name
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          ...TextFont.SBold,
                          ...TextStyle.SM,
                          color: '#3B3021',
                          width: width - WidthSize(256),
                        }}>
                        Price
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          ...TextFont.SBold,
                          ...TextStyle.SM,
                          color: '#3B3021',
                          width: width - WidthSize(256),
                        }}>
                        Size
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: HeightSize(16),
              }}>
              <Text
                style={{
                  ...TextFont.SBold,
                  ...TextStyle.XL,
                  color: '#3B3021',
                }}>
                More images
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    width: WidthSize(70),
                    height: WidthSize(70),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#836E44',
                    borderRadius: 10,
                  }}>
                  <Pressable
                    onPress={openImagePicker}
                    style={{
                      width: WidthSize(50),
                      height: WidthSize(50),
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 10,
                      borderStyle: 'dashed',
                      borderWidth: 1,
                      borderColor: 'white',
                    }}>
                    <IconSvg
                      icon="IconGalleryAddWhite"
                      width={WidthSize(30)}
                      height={WidthSize(30)}
                    />
                  </Pressable>
                </View>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  data={listImageMore}
                  horizontal={true}
                  style={{
                    marginLeft: WidthSize(16),
                  }}
                  contentContainerStyle={{
                    gap: WidthSize(16),
                  }}
                  renderItem={({item, index}) => {
                    return (
                      <ImageBackground
                        key={index}
                        style={{
                          width: WidthSize(70),
                          height: WidthSize(70),
                          position: 'relative',
                          zIndex: 0,
                        }}
                        imageStyle={{
                          borderRadius: 10,
                        }}
                        source={{uri: item.uri}}>
                        <IconSvg
                          onPress={() => {
                            const newList = listImageMore.filter(
                              (item, i) => i !== index,
                            );
                            setListImageMore(newList);
                          }}
                          style={{
                            position: 'absolute',
                            top: WidthSize(4),
                            right: WidthSize(4),
                            zIndex: 2,
                            backgroundColor: '#EF6556',
                            borderRadius: 10,
                          }}
                          icon="IconCloseBoldWhite"
                          width={HeightSize(20)}
                          height={HeightSize(20)}
                        />
                      </ImageBackground>
                    );
                  }}
                />
              </View>
            </View>
            <View
              style={{
                marginTop: HeightSize(16),
              }}>
              <Text
                style={{
                  ...TextFont.SBold,
                  ...TextStyle.XL,
                  color: '#3B3021',
                }}>
                Category
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: HeightSize(16),
                  flexWrap: 'wrap',
                  gap: HeightSize(16),
                }}>
                {tabs.map((item, index) => {
                  return (
                    <Pressable
                      key={index}
                      onPress={() => {
                        setCategory(item);
                      }}
                      style={{
                        paddingHorizontal: WidthSize(16),
                        paddingVertical: HeightSize(8),
                        borderRadius: 10,
                        borderWidth: 1,
                        borderColor: '#836E44',
                        backgroundColor:
                          category?.id === item.id ? '#836E44' : 'transparent',
                      }}>
                      <Text
                        style={{
                          ...TextFont.SBold,
                          ...TextStyle.SM,
                          color: category?.id === item.id ? 'white' : '#3B3021',
                        }}>
                        {item.title}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </ScrollView>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginTop: HeightSize(16),
              marginBottom: HeightSize(16),
              backgroundColor: '#836E44',
              borderRadius: 10,
              paddingVertical: HeightSize(16),
              position: 'absolute',
              bottom: 0,
              left: WidthSize(16),
              width: width - WidthSize(32),
            }}>
            <Text
              style={{
                ...TextFont.SBold,
                ...TextStyle.XL,
                color: 'white',
                textAlign: 'center',
              }}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ContainerView>
  );
};

export default AddStyleRoom;

const styles = StyleSheet.create({});
