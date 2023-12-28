import {
  PanResponder,
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
import Svg, {Path} from 'react-native-svg';
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
  const [size, setSize] = useState({width: 0, height: 0});
  const [actualImage, setActualImage] = useState<actualImageProps>({
    image: route.params.imageAdding,
    width: 0,
    height: 0,
    retangles: [],
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const [currentPosition, setCurrentPosition] = useState<any>([]);
  const [lines, setLines] = useState([]);
  const [retangles, setRetangles] = useState<Array<Retangle>>([]);
  const path = useRef('');
  const pathRetange = useRef({
    minX: 0,
    minY: 0,
    maxX: 0,
    maxY: 0,
  });
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        path.current = '';
        pathRetange.current = {
          minX: 0,
          minY: 0,
          maxX: 0,
          maxY: 0,
        };
      },
      onPanResponderMove: (e, gesture) => {
        const newPoint = {
          x: e.nativeEvent.locationX,
          y: e.nativeEvent.locationY,
        };
        setCurrentPosition([...currentPosition, newPoint]);
        if (path.current === '') {
          path.current = `M${newPoint.x},${newPoint.y}`;
        } else {
          path.current += ` L ${newPoint.x},${newPoint.y}`;
        }
        if (
          pathRetange.current.minX === 0 &&
          pathRetange.current.minY === 0 &&
          pathRetange.current.maxX === 0 &&
          pathRetange.current.maxY === 0
        ) {
          pathRetange.current.minX = newPoint.x;
          pathRetange.current.minY = newPoint.y;
          pathRetange.current.maxX = newPoint.x;
          pathRetange.current.maxY = newPoint.y;
        } else {
          if (newPoint.x < pathRetange.current.minX) {
            pathRetange.current.minX = newPoint.x;
          }
          if (newPoint.y < pathRetange.current.minY) {
            pathRetange.current.minY = newPoint.y;
          }
          if (newPoint.x > pathRetange.current.maxX) {
            pathRetange.current.maxX = newPoint.x;
          }
          if (newPoint.y > pathRetange.current.maxY) {
            pathRetange.current.maxY = newPoint.y;
          }
        }
      },
      onPanResponderRelease: (e, gesture) => {
        // if area is too small, it is not a retangle
        if (
          pathRetange.current.maxX - pathRetange.current.minX < 10 ||
          pathRetange.current.maxY - pathRetange.current.minY < 10
        ) {
          pathRetange.current = {
            minX: 0,
            minY: 0,
            maxX: 0,
            maxY: 0,
          };
          return;
        }
        setLines((lines): any => [...lines, path.current]);
        setRetangles(retangles => [
          ...retangles,
          {
            minX: pathRetange.current.minX,
            minY: pathRetange.current.minY,
            maxX: pathRetange.current.maxX,
            maxY: pathRetange.current.maxY,
          },
        ]);
        setModalVisible(true);
        setCurrentPosition([]);
      },
    }),
  ).current;
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    if (actualImage?.image?.assets[0].uri) {
      Image.getSize(actualImage?.image?.assets[0].uri, (w, h) => {
        const widthImg = width;
        const heightImg = WidthSize((width * h) / w);
        setSize({width: widthImg, height: heightImg});
        setActualImage({
          image: actualImage?.image,
          width: widthImg,
          height: heightImg,
          retangles: retangles,
        });
      });
    }
  }, [actualImage?.image?.assets[0].uri]);
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
                  setLines(lines => lines.slice(0, lines.length - 1));
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
          <View
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
          </View>
        </View>
      )}
      <View
        // onLayout={onLayout}
        style={{
          width: width,
          height: size.height,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        {...panResponder.panHandlers}>
        <Svg
          style={{
            position: 'absolute',
            zIndex: 1,
            width: size.width,
            height: size.height,
          }}>
          {/* {lines.map((line, index) => (
            <Path
              key={index}
              d={line}
              stroke="#EF6556"
              strokeWidth={4}
              fill={'none'}
            />
          ))} */}
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
                d={`M${WidthSize(retangle.minX)},${WidthSize(
                  retangle.minY,
                )} L ${WidthSize(retangle.maxX)},${WidthSize(
                  retangle.minY,
                )} L ${WidthSize(retangle.maxX)},${WidthSize(
                  retangle.maxY,
                )} L ${WidthSize(retangle.minX)},${WidthSize(
                  retangle.maxY,
                )} L ${WidthSize(retangle.minX)},${WidthSize(retangle.minY)}`}
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
        </Svg>
        <ImageBackground
          style={{
            width: size.width,
            height: size.height,
          }}
          resizeMode="contain"
          source={{uri: actualImage?.image?.assets[0].uri}}
        />
      </View>

      {/* <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Pressable
          // onPress={openImagePicker}
          style={{
            width: '40%',
            height: 50,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>Open Image Picker</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            //undo previous line
            setLines(lines => lines.slice(0, lines.length - 1));
            setRetangles(retangles => retangles.slice(0, retangles.length - 1));
            setActualImage({
              image: actualImage?.image,
              width: size.width,
              height: size.height,
              retangles: retangles,
            });

            // console.log('actualImage', JSON.stringify(actualImage, null, 2));
          }}
          style={{
            width: '40%',
            height: 50,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>{size.height}</Text>
        </Pressable>
      </View> */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setLines(lines => lines.slice(0, lines.length - 1));
          setRetangles(retangles => retangles.slice(0, retangles.length - 1));
          setModalVisible(false);
          setText('');
        }}>
        <Pressable
          onPress={() => {
            setLines(lines => lines.slice(0, lines.length - 1));
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
                    setLines(lines => lines.slice(0, lines.length - 1));
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
    </ContainerView>
  );
};

export default AddStyleRoom;

const styles = StyleSheet.create({});
