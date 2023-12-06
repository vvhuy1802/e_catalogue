import {
  Alert,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import ContainerView from '~/components/global/containerView';
import {useSelector} from 'react-redux';
import {selectDemoImage} from '~/redux/reducers/globalSlice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {SetIsAuthorized} from '~/redux/reducers/authSlice';
import {AppProvider} from '~/app/appProvider';

const Profile = () => {
  const data = useSelector(selectDemoImage);
  const dispatch = useDispatch<AppDispatch>();
  return (
    // <ContainerView
    //   style={{
    //     flex: 1,
    //     alignItems: 'center',
    //     backgroundColor: 'white',
    //   }}>
    //   <Pressable
    //     onPress={e => {
    //       //check if the user is long pressing on a rectangle
    //       const isLongPressOnRectangle = data?.retangles.some(
    //         (retangle: {
    //           minX: any;
    //           minY: any;
    //           maxX: any;
    //           maxY: any;
    //           info: any;
    //         }) => {
    //           const {locationX, locationY} = e.nativeEvent;
    //           const {minX, minY, maxX, maxY, info} = retangle;
    //           if (
    //             locationX > minX &&
    //             locationX < maxX &&
    //             locationY > minY &&
    //             locationY < maxY
    //           ) {
    //             Alert.alert(info);
    //             return true;
    //           }
    //         },
    //       );
    //       if (!isLongPressOnRectangle) {
    //         Alert.alert('Press on image');
    //       }
    //     }}
    //     style={{
    //       width: data?.width,
    //       height: data?.height,
    //     }}>
    //     <Svg
    //       style={{
    //         position: 'absolute',
    //         zIndex: 1,
    //         width: data?.width,
    //         height: data?.height,
    //       }}>
    //       {data?.retangles.map(
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
    //             d={`M${retangle.minX},${retangle.minY} L ${retangle.maxX},${retangle.minY} L ${retangle.maxX},${retangle.maxY} L ${retangle.minX},${retangle.maxY} L ${retangle.minX},${retangle.minY}`}
    //             stroke="#EF6556"
    //             strokeWidth={4}
    //             fill={'none'}
    //           />
    //         ),
    //       )}
    //     </Svg>
    //     <ImageBackground
    //       style={{
    //         width: data?.width,
    //         height: data?.height,
    //       }}
    //       resizeMode="contain"
    //       source={{uri: data?.image.assets[0].uri}}
    //     />
    //   </Pressable>
    // </ContainerView>
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
