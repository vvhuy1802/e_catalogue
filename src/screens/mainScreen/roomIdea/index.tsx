import {
  Pressable,
  Image,
  View,
  ImageBackground,
  Keyboard,
  PanResponder,
  Animated,
  Text,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useRef, useState} from 'react';
import ContextMenu from 'react-native-context-menu-view';
import {
  launchImageLibrary,
  launchCamera,
  ImageLibraryOptions,
  ImagePickerResponse,
} from 'react-native-image-picker';
import ContainerView from '~/components/global/containerView';
import {Path, Svg} from 'react-native-svg';
import {HeightSize, WidthSize, height, width} from '~/theme/size';
import {BOTTOM_TAB_HEIGHT} from '~/constants/global';
import {TextInput} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {setDemoImage} from '~/redux/reducers/globalSlice';

type Retangle = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  info?: any;
};

type actualImageProps = {
  image: ImagePickerResponse;
  width: number;
  height: number;
  retangles: Array<Retangle>;
  lines?: Array<string>;
};

const RoomIdea = () => {
  const [selectedImage, setSelectedImage] = useState<ImagePickerResponse>();
  const [size, setSize] = useState({width: 0, height: 0});
  const [actualImage, setActualImage] = useState<actualImageProps>();
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const openImagePicker = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    //get image from media library with typescript
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
        console.log('response', response);
        //calculate size of image
        const ratio = response.assets[0].height / response.assets[0].width;
        const newHeight =
          width * ratio > height - BOTTOM_TAB_HEIGHT - 50
            ? height - BOTTOM_TAB_HEIGHT - 50
            : width * ratio;
        const newWidth = width;
        setSize({width: newWidth, height: newHeight});
        setSelectedImage(response);
        setActualImage({
          image: response,
          width: newWidth,
          height: newHeight,
          retangles: [],
        });
        dispatch(
          setDemoImage({
            image: response,
            width: newWidth,
            height: newHeight,
            retangles: [],
          }),
        );
      } else {
        console.log('error');
      }
    });
  };

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
  return (
    <ContainerView
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <View
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
          {lines.map((line, index) => (
            <Path
              key={index}
              d={line}
              stroke="#EF6556"
              strokeWidth={4}
              fill={'none'}
            />
          ))}
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
        </Svg>
        <ImageBackground
          style={{
            width: '100%',
            height: size.height,
          }}
          resizeMode="contain"
          source={{uri: selectedImage?.assets[0].uri}}></ImageBackground>
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Pressable
          onPress={openImagePicker}
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
              image: selectedImage,
              width: size.width,
              height: size.height,
              retangles: retangles,
            });
            dispatch(
              setDemoImage({
                image: selectedImage,
                width: size.width,
                height: size.height,
                retangles: retangles.slice(0, retangles.length - 1),
              }),
            );
          }}
          style={{
            width: '40%',
            height: 50,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white'}}>Undo</Text>
        </Pressable>
      </View>
      <Modal
        animationType="slide"
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
                      image: selectedImage,
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

export default RoomIdea;
