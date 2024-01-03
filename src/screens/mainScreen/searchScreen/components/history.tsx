import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import {IconSvg} from '~/components/global/iconSvg';
import {AppProvider} from '~/app/appProvider';
import {StackNavigationProp} from '@react-navigation/stack';
import {HomeStackParamList} from '~/types';
import {DETAILSEARCHSCREEN} from '~/constants/routeNames';

type Props = {
  navigation: StackNavigationProp<HomeStackParamList>;
};
const HistorySearch = ({navigation}: Props) => {
  const [histories, setHistory] = React.useState<string[]>([]);
  const [fetching, setFetching] = React.useState<boolean>(false);

  //get history search from local storage
  useEffect(() => {
    const subscriber = navigation.addListener('focus', () => {
      AppProvider.getHistorySearch().then(res => {
        setFetching(true);
        setHistory(res);
      });
    });

    const blur = navigation.addListener('blur', () => {
      setFetching(false);
    });
    return () => {
      subscriber;
      blur;
    };
  }, [navigation]);

  return (
    <View
      style={{
        display: histories.length > 0 ? 'flex' : 'none',
        paddingTop: HeightSize(40),
      }}>
      <Text
        style={{
          color: '#3B3021',
          ...TextStyle.XL,
          ...TextFont.SBold,
        }}>
        Recent searches
      </Text>
      <View
        style={{
          marginTop: HeightSize(16),
          gap: HeightSize(16),
        }}>
        {histories
          .map((item, index) => {
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate(DETAILSEARCHSCREEN, {
                    searchQuery: item,
                  });
                }}
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <IconSvg icon="IconClock" />
                <Text
                  style={{
                    marginLeft: WidthSize(20),
                    ...TextStyle.Base,
                    ...TextFont.SRegular,
                  }}>
                  {item}
                </Text>
              </Pressable>
            );
          })
          .reverse()}
      </View>
    </View>
  );
};

export default HistorySearch;

const styles = StyleSheet.create({});
