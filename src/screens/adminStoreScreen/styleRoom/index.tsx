import {
  PanResponder,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {images} from '~/assets';
import {setDemoImage} from '~/redux/reducers/globalSlice';
import {HeightSize, width, WidthSize} from '~/theme/size';
import {
  ImagePickerResponse,
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import ContainerImage from '~/components/global/containerImage';
import {TextStyle, TextFont} from '~/theme/textStyle';
import FullWidthImage from '~/components/global/fullWidthImage';
import CustomListView from '~/components/global/customListView';
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
const StyleRoom = () => {
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
        setActualImage({
          image: response,
          width: 0,
          height: 0,
          retangles: [],
        });
        dispatch(
          setDemoImage({
            image: response,
            width: 0,
            height: 0,
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
  useEffect(() => {
    if (actualImage?.image?.assets[0].uri) {
      Image.getSize(actualImage?.image?.assets[0].uri, (w, h) => {
        const widthImg = WidthSize(width);
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

  const stylelist = [
    {
      id: 1,
      img: 'https://images2.thanhnien.vn/528068263637045248/2023/7/24/huu-anh-zoner-2-4-16901664385181453210496.jpg',
    },
    {
      id: 2,
      img: 'https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg',
    },
    {
      id: 3,
      img: 'https://imgupscaler.com/images/samples/anime-after.webp',
    },
    {
      id: 4,
      img: 'https://pixlr.com/images/index/ai-image-generator-two.webp',
    },
    {
      id: 5,
      img: 'https://cdn.pixabay.com/photo/2023/06/29/03/02/ai-generated-8095540_1280.jpg',
    },
    {
      id: 6,
      img: 'https://db53ipnarc8vy.cloudfront.net/task-category1.png',
    },
  ];

  return (
    // <ContainerView
    //   style={{
    //     flex: 1,
    //     alignItems: 'center',
    //     backgroundColor: 'white',
    //   }}>
    //   <View
    //     // onLayout={onLayout}
    //     style={{
    //       width: width,
    //       height: size.height,
    //       alignItems: 'center',
    //       justifyContent: 'center',
    //     }}
    //     {...panResponder.panHandlers}>
    //     <Svg
    //       style={{
    //         position: 'absolute',
    //         zIndex: 1,
    //         width: size.width,
    //         height: size.height,
    //       }}>
    //       {/* {lines.map((line, index) => (
    //         <Path
    //           key={index}
    //           d={line}
    //           stroke="#EF6556"
    //           strokeWidth={4}
    //           fill={'none'}
    //         />
    //       ))} */}
    //       {retangles.map(
    //         (
    //           retangle: {
    //             minX: any;
    //             minY: any;
    //             maxX: any;
    //             maxY: any;
    //             info?: any;
    //           },
    //           index: React.Key | null | undefined,
    //         ) => (
    //           <Path
    //             key={index}
    //             d={`M${WidthSize(retangle.minX)},${WidthSize(
    //               retangle.minY,
    //             )} L ${WidthSize(retangle.maxX)},${WidthSize(
    //               retangle.minY,
    //             )} L ${WidthSize(retangle.maxX)},${WidthSize(
    //               retangle.maxY,
    //             )} L ${WidthSize(retangle.minX)},${WidthSize(
    //               retangle.maxY,
    //             )} L ${WidthSize(retangle.minX)},${WidthSize(retangle.minY)}`}
    //             stroke="#EF6556"
    //             strokeWidth={4}
    //             fill={'none'}
    //           />
    //         ),
    //       )}
    //       {currentPosition.length > 0 && (
    //         <Path
    //           d={path.current}
    //           stroke="black"
    //           strokeWidth={4}
    //           fill={'none'}
    //         />
    //       )}
    //     </Svg>
    //     <ImageBackground
    //       style={{
    //         width: size.width,
    //         height: size.height,
    //       }}
    //       resizeMode="contain"
    //       source={{uri: actualImage?.image?.assets[0].uri}}
    //     />
    //   </View>

    //   <View
    //     style={{
    //       width: '100%',
    //       flexDirection: 'row',
    //       justifyContent: 'space-around',
    //     }}>
    //     <Pressable
    //       onPress={openImagePicker}
    //       style={{
    //         width: '40%',
    //         height: 50,
    //         backgroundColor: 'blue',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}>
    //       <Text style={{color: 'white'}}>Open Image Picker</Text>
    //     </Pressable>
    //     <Pressable
    //       onPress={() => {
    //         //undo previous line
    //         setLines(lines => lines.slice(0, lines.length - 1));
    //         setRetangles(retangles => retangles.slice(0, retangles.length - 1));
    //         setActualImage({
    //           image: actualImage?.image,
    //           width: size.width,
    //           height: size.height,
    //           retangles: retangles,
    //         });
    //         dispatch(
    //           setDemoImage({
    //             image: actualImage?.image,
    //             width: size.width,
    //             height: size.height,
    //             retangles: retangles.slice(0, retangles.length - 1),
    //           }),
    //         );
    //         // console.log('actualImage', JSON.stringify(actualImage, null, 2));
    //       }}
    //       style={{
    //         width: '40%',
    //         height: 50,
    //         backgroundColor: 'blue',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //       }}>
    //       <Text style={{color: 'white'}}>{size.height}</Text>
    //     </Pressable>
    //   </View>
    //   <Modal
    //     animationType="slide"
    //     transparent={true}
    //     visible={modalVisible}
    //     onRequestClose={() => {
    //       setLines(lines => lines.slice(0, lines.length - 1));
    //       setRetangles(retangles => retangles.slice(0, retangles.length - 1));
    //       setModalVisible(false);
    //       setText('');
    //     }}>
    //     <Pressable
    //       onPress={() => {
    //         setLines(lines => lines.slice(0, lines.length - 1));
    //         setRetangles(retangles => retangles.slice(0, retangles.length - 1));
    //         setModalVisible(false);
    //         setText('');
    //       }}
    //       style={{
    //         flex: 1,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         backgroundColor: '#0000008d',
    //       }}>
    //       <Pressable
    //         onPress={() => {
    //           Keyboard.dismiss();
    //         }}
    //         style={{
    //           width: '80%',
    //           height: '80%',
    //           backgroundColor: 'white',
    //           borderRadius: 10,
    //           padding: 20,
    //         }}>
    //         <View
    //           style={{
    //             alignItems: 'center',
    //             flex: 1,
    //           }}>
    //           <Text>Add Info</Text>
    //           <TextInput
    //             style={{
    //               width: '100%',
    //               height: 50,
    //               marginTop: 20,
    //               borderWidth: 1,
    //               borderColor: 'black',
    //               borderRadius: 10,
    //               paddingHorizontal: 10,
    //             }}
    //             onChangeText={text => setText(text)}
    //             value={text}
    //           />
    //           <View
    //             style={{
    //               width: '100%',
    //               flexDirection: 'row',
    //               justifyContent: 'space-around',
    //               position: 'absolute',
    //               bottom: 20,
    //             }}>
    //             <Pressable
    //               onPress={() => {
    //                 const index = retangles.length - 1;
    //                 retangles[index].info = text;
    //                 const data = {
    //                   image: actualImage?.image,
    //                   width: size.width,
    //                   height: size.height,
    //                   retangles: retangles,
    //                 };
    //                 console.log('data', JSON.stringify(data));
    //                 dispatch(setDemoImage(data));
    //                 setActualImage(data);
    //                 setModalVisible(false);
    //                 setText('');
    //               }}
    //               style={{
    //                 width: '40%',
    //                 height: 50,
    //                 backgroundColor: 'blue',
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //                 borderRadius: 10,
    //               }}>
    //               <Text style={{color: 'white'}}>Save</Text>
    //             </Pressable>
    //             <Pressable
    //               onPress={() => {
    //                 //undo previous line
    //                 setLines(lines => lines.slice(0, lines.length - 1));
    //                 setRetangles(retangles =>
    //                   retangles.slice(0, retangles.length - 1),
    //                 );
    //                 setModalVisible(false);
    //                 setText('');
    //               }}
    //               style={{
    //                 width: '40%',
    //                 height: 50,
    //                 backgroundColor: 'blue',
    //                 justifyContent: 'center',
    //                 alignItems: 'center',
    //                 borderRadius: 10,
    //               }}>
    //               <Text style={{color: 'white'}}>Cancel</Text>
    //             </Pressable>
    //           </View>
    //         </View>
    //       </Pressable>
    //     </Pressable>
    //   </Modal>
    // </ContainerView>

    <ContainerImage
      isOpacity={true}
      style={{flex: 1}}
      resizeMode="cover"
      source={images.home.BackgroundHome}>
      <View
        style={{
          paddingHorizontal: WidthSize(32),
          paddingVertical: HeightSize(16),
        }}>
        <Text
          style={{
            color: '#3B3021',
            ...TextStyle.XXXL,
            ...TextFont.GRegular,
          }}>
          Your Style Room
        </Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: HeightSize(16),
          }}>
          <CustomListView
            widthView={width / 2 - WidthSize(40)}
            data={stylelist}
            onPress={item => {
              console.log(item);
            }}
          />
        </ScrollView>
      </View>
    </ContainerImage>
  );
};

export default StyleRoom;

const styles = StyleSheet.create({});
