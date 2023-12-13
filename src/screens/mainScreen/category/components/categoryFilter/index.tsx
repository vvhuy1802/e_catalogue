import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextFont, TextStyle} from '~/theme/textStyle';
import {IconSvg} from '~/components/global/iconSvg';
import {StackNavigationProp} from '@react-navigation/stack';
import {CategoryStackParamList, Normalized} from '~/types';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '~/app/store';
import {images} from '~/assets';
import ContainerImage from '~/components/global/containerImage';
import {Slider} from '@miblanchard/react-native-slider';

type Props = {
  categoryId: string | undefined;
  navigation: StackNavigationProp<CategoryStackParamList>;
  filter: Normalized<string, any>;
  setFilter: (filter: Normalized<string, any>) => void;
};

const CategoryFilter = ({categoryId, navigation, filter, setFilter}: Props) => {
  const [isShowModal, setIsShowModal] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [sortState, setSortState] = React.useState<'up' | 'down'>('down');
  const [colorState, setColorState] = React.useState<'up' | 'down'>('down');
  const [sizeState, setSizeState] = React.useState<'up' | 'down'>('down');
  const [priceState, setPriceState] = React.useState<'up' | 'down'>('down');

  const [isDisableScroll, setIsDisableScroll] = React.useState(false);

  const dataSortBy = [
    {
      id: 1,
      name: 'Recommend',
    },
    {
      id: 2,
      name: 'Newest',
    },
    {
      id: 3,
      name: 'Lowest to Highest price',
    },
    {
      id: 4,
      name: 'Highest to Lowest price',
    },
  ];

  const dataColoursNormalize = {
    ids: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    entities: {
      1: {id: 1, name: 'Whites', color: '#FFFFFF'},
      2: {id: 2, name: 'Blacks', color: '#000000'},
      3: {id: 3, name: 'Greys', color: '#83878D'},
      4: {id: 4, name: 'Beiges', color: '#A99C82'},
      5: {id: 5, name: 'Browns', color: '#401D0B'},
      6: {id: 6, name: 'Reds', color: '#A50221'},
      7: {id: 7, name: 'Greens', color: '#5FA758'},
      8: {id: 8, name: 'Blues', color: '#56AAFF'},
      9: {id: 9, name: 'Purples', color: '#800080'},
      10: {id: 10, name: 'Yellows', color: '#FFDD00'},
      11: {id: 11, name: 'Pinks', color: '#FF68B4'},
      12: {id: 12, name: 'Oranges', color: '#F2520A'},
    },
  };

  const dataSizeNormalize = {
    ids: [1, 2, 3, 4, 5, 6, 7],
    entities: {
      1: {id: 1, size: 'XS'},
      2: {id: 2, size: 'S'},
      3: {id: 3, size: 'S'},
      4: {id: 4, size: 'M'},
      5: {id: 5, size: 'L'},
      6: {id: 6, size: 'XL'},
      7: {id: 7, size: 'XXL'},
    },
  };

  const [sortByFilter, setSortByFilter] = useState({});
  const [colorFilter, setColorFilter] = useState<Normalized<number, any>>({
    ids: [],
    entities: {},
  });
  const [sizeFilter, setSizeFilter] = useState<Normalized<number, any>>({
    ids: [],
    entities: {},
  });
  const [priceFilter, setPriceFilter] = useState([0, 2000] as [number, number]);
  const refPriceSlider = useRef<Slider>(null);

  useEffect(() => {
    if (isShowModal) {
      setSortByFilter(
        filter.ids.includes('sortBy')
          ? {
              ...filter.entities['sortBy'],
            }
          : {},
      );
      setColorFilter(
        filter.ids.includes('color')
          ? {
              ids: [...filter.entities['color'].ids],
              entities: {...filter.entities['color'].entities},
            }
          : {
              ids: [],
              entities: {},
            },
      );
      setSizeFilter(
        filter.ids.includes('size')
          ? {
              ids: [...filter.entities['size'].ids],
              entities: {...filter.entities['size'].entities},
            }
          : {
              ids: [],
              entities: {},
            },
      );
      setPriceFilter(
        filter.ids.includes('price')
          ? [...filter.entities['price']]
          : [0, 2000],
      );
    }
  }, [isShowModal]);

  const handleReset = useCallback(() => {
    setPriceFilter([0, 2000]);
    setColorFilter({
      ids: [],
      entities: {},
    });
    setSizeFilter({
      ids: [],
      entities: {},
    });
    setSortByFilter({});
    setTimeout(() => {
      setPriceFilter([0, 2000]);
      refPriceSlider.current?._measureThumb;
      refPriceSlider.current?._measureContainer;
      refPriceSlider.current?._measureTrack;
    }, 10);
  }, []);

  return (
    <View
      style={{
        marginTop: HeightSize(11),
        paddingLeft: HeightSize(32),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          ...TextStyle.text4XL,
          ...TextFont.GRegular,
          color: '#3B3021',
        }}>
        {categoryId}
      </Text>
      <Pressable
        onPress={() => {
          setColorFilter({
            ids: [],
            entities: {},
          });
          setSizeFilter({
            ids: [],
            entities: {},
          });
          setSortByFilter({});
          setIsShowModal(!isShowModal);
        }}
        style={{
          width: HeightSize(100),
          height: HeightSize(80),
          backgroundColor: '#F1EFE9',
          borderTopLeftRadius: 36,
          borderBottomLeftRadius: 36,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IconSvg
          icon="IconFilterBlack"
          width={HeightSize(28)}
          height={HeightSize(28)}
        />
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isShowModal}
        onRequestClose={() => {
          setIsShowModal(!isShowModal);
        }}>
        <ContainerImage
          // isOpacity={true}
          style={{flex: 1}}
          resizeMode="cover"
          source={images.home.BackgroundHome}>
          <Pressable
            onPress={() => {
              setIsShowModal(!isShowModal);
            }}
            style={{
              width: HeightSize(80),
              height: HeightSize(40),
              borderTopRightRadius: 36,
              borderBottomRightRadius: 36,
              backgroundColor: '#EFEFE8',
              marginTop: HeightSize(3),
              justifyContent: 'center',
              paddingLeft: HeightSize(32),
            }}>
            <IconSvg
              icon="IconCloseBlack"
              width={HeightSize(16)}
              height={HeightSize(16)}
            />
          </Pressable>

          <View style={{padding: HeightSize(32)}}>
            <Text
              style={{
                ...TextStyle.text4XL,
                ...TextFont.GRegular,
                color: '#3B3021',
              }}>
              Filters
            </Text>
          </View>

          <ScrollView
            scrollEnabled={!isDisableScroll}
            contentContainerStyle={{
              paddingBottom: HeightSize(10),
            }}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                paddingHorizontal: HeightSize(32),
                paddingTop: HeightSize(32),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    ...TextFont.SMedium,
                    ...TextStyle.XL,
                    color: '#3B3021',
                  }}>
                  Sort by
                </Text>
                <IconSvg
                  onPress={() => {
                    setSortState(sortState === 'up' ? 'down' : 'up');
                  }}
                  icon={
                    sortState === 'up'
                      ? 'IconArrowUpBlack'
                      : 'IconArrowDownBlack'
                  }
                  width={HeightSize(20)}
                  height={HeightSize(20)}
                />
              </View>
              <View
                style={{
                  padding: HeightSize(16),
                  gap: HeightSize(8),
                }}>
                {dataSortBy.map((item, index) => (
                  <Pressable
                    onPress={() => {
                      if (item.id === sortByFilter?.id) {
                        setSortByFilter({});
                      } else {
                        setSortByFilter(item);
                      }
                    }}
                    key={index}
                    style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View
                      style={{
                        width: WidthSize(11),
                        height: WidthSize(11),
                        borderWidth: WidthSize(1),
                        borderColor: '#3B3021',
                        borderRadius: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{
                          width: WidthSize(7),
                          height: WidthSize(7),
                          backgroundColor:
                            sortByFilter?.id === item.id
                              ? '#3B3021'
                              : 'transparent',
                          borderRadius: 6,
                        }}
                      />
                    </View>
                    <Text
                      style={{
                        ...TextFont.SLight,
                        ...TextStyle.Base,
                        color: '#3B3021',
                        marginLeft: WidthSize(16),
                      }}>
                      {item.name}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View
                style={{
                  marginTop: HeightSize(4),
                  width: '100%',
                  height: HeightSize(2),
                  backgroundColor: '#EFEFE8',
                  borderRadius: 8,
                }}
              />
            </View>

            <View
              style={{
                paddingHorizontal: HeightSize(32),
                paddingTop: HeightSize(32),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    ...TextFont.SMedium,
                    ...TextStyle.XL,
                    color: '#3B3021',
                  }}>
                  Colours
                </Text>
                <IconSvg
                  onPress={() => {
                    setColorState(colorState === 'up' ? 'down' : 'up');
                  }}
                  icon={
                    colorState === 'up'
                      ? 'IconArrowUpBlack'
                      : 'IconArrowDownBlack'
                  }
                  width={HeightSize(20)}
                  height={HeightSize(20)}
                />
              </View>
              <View
                style={{
                  marginTop: HeightSize(16),
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: HeightSize(16),
                }}>
                {dataColoursNormalize.ids.map((item: number, index: number) => (
                  <Pressable
                    onPress={() => {
                      const newColorFilter = {...colorFilter};
                      if (colorFilter.ids.includes(item)) {
                        newColorFilter.ids.splice(
                          newColorFilter.ids.indexOf(item),
                          1,
                        );
                        delete newColorFilter.entities[item];
                      } else {
                        newColorFilter.ids.push(item);
                        newColorFilter.entities[item] =
                          dataColoursNormalize.entities[item];
                      }
                      setColorFilter(newColorFilter);
                    }}
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: HeightSize(
                        colorFilter.ids.includes(item) ? 15 : 16,
                      ),
                      paddingVertical: HeightSize(
                        colorFilter.ids.includes(item) ? 12 : 13,
                      ),
                      backgroundColor: '#EFEFE8',
                      borderRadius: 12,
                      marginLeft: index % 3 === 0 ? 0 : HeightSize(16),
                      borderWidth: colorFilter.ids.includes(item)
                        ? HeightSize(1)
                        : 0,
                      borderColor: colorFilter.ids.includes(item)
                        ? '#836E44'
                        : 'transparent',
                    }}>
                    <View
                      style={{
                        width: WidthSize(16),
                        height: WidthSize(16),
                        borderRadius: 8,
                        backgroundColor:
                          dataColoursNormalize.entities[item].color,
                        marginRight: WidthSize(8),
                      }}
                    />
                    <Text
                      style={{
                        ...TextFont.SLight,
                        ...TextStyle.Base,
                        color: '#3B3021',
                      }}>
                      {dataColoursNormalize.entities[item].name}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View
                style={{
                  marginTop: HeightSize(20),
                  width: '100%',
                  height: HeightSize(2),
                  backgroundColor: '#EFEFE8',
                  borderRadius: 8,
                }}
              />
            </View>

            <View
              style={{
                paddingHorizontal: HeightSize(32),
                paddingTop: HeightSize(32),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    ...TextFont.SMedium,
                    ...TextStyle.XL,
                    color: '#3B3021',
                  }}>
                  Sizes
                </Text>
                <IconSvg
                  onPress={() => {
                    setSizeState(sizeState === 'up' ? 'down' : 'up');
                  }}
                  icon={
                    sizeState === 'up'
                      ? 'IconArrowUpBlack'
                      : 'IconArrowDownBlack'
                  }
                  width={HeightSize(20)}
                  height={HeightSize(20)}
                />
              </View>
              <View
                style={{
                  padding: HeightSize(16),
                  gap: HeightSize(8),
                }}>
                {dataSizeNormalize.ids.map((item: number, index: number) => (
                  <Pressable
                    onPress={() => {
                      const newSizeFilter = {...sizeFilter};
                      if (sizeFilter.ids.includes(item)) {
                        newSizeFilter.ids.splice(
                          newSizeFilter.ids.indexOf(item),
                          1,
                        );
                        delete newSizeFilter.entities[item];
                      } else {
                        newSizeFilter.ids.push(item);
                        newSizeFilter.entities[item] =
                          dataSizeNormalize.entities[item];
                      }
                      setSizeFilter(newSizeFilter);
                    }}
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <IconSvg
                      icon={
                        sizeFilter.ids.includes(item)
                          ? 'IconCheckedBlack'
                          : 'IconUnCheckBlack'
                      }
                      width={WidthSize(12)}
                      height={WidthSize(12)}
                    />
                    <Text
                      style={{
                        ...TextFont.SLight,
                        ...TextStyle.Base,
                        color: '#3B3021',
                        marginLeft: WidthSize(16),
                      }}>
                      {dataSizeNormalize.entities[item].size}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <View
                style={{
                  marginTop: HeightSize(4),
                  width: '100%',
                  height: HeightSize(2),
                  backgroundColor: '#EFEFE8',
                  borderRadius: 8,
                }}
              />
            </View>

            <View
              style={{
                paddingHorizontal: HeightSize(32),
                paddingTop: HeightSize(32),
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    ...TextFont.SMedium,
                    ...TextStyle.XL,
                    color: '#3B3021',
                  }}>
                  Price
                </Text>
                <IconSvg
                  onPress={() => {
                    setPriceState(priceState === 'up' ? 'down' : 'up');
                  }}
                  icon={
                    priceState === 'up'
                      ? 'IconArrowUpBlack'
                      : 'IconArrowDownBlack'
                  }
                  width={HeightSize(20)}
                  height={HeightSize(20)}
                />
              </View>
              <View
                style={{
                  padding: HeightSize(16),
                }}>
                <Slider
                  ref={refPriceSlider}
                  onSlidingStart={() => {
                    setIsDisableScroll(true);
                  }}
                  onSlidingComplete={() => {
                    setIsDisableScroll(false);
                  }}
                  minimumValue={0}
                  maximumValue={2000}
                  step={1}
                  value={priceFilter as [number, number]}
                  onValueChange={value => {
                    setPriceFilter(value as [number, number]);
                  }}
                  thumbTintColor="#836E44"
                  thumbStyle={{
                    width: WidthSize(24),
                    height: WidthSize(24),
                    borderRadius: 12,
                    backgroundColor: '#EFEFE8',
                    shadowColor: '#0000001A',
                    shadowOffset: {
                      width: 0,
                      height: 4,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 10,
                    elevation: 10,
                    borderWidth: WidthSize(6),
                    borderColor: '#836E44',
                  }}
                  minimumTrackTintColor="#836E44"
                  maximumTrackTintColor="#EFEFE8"
                  trackStyle={{
                    height: HeightSize(4),
                    borderRadius: 8,
                    backgroundColor: '#D4D3DB',
                  }}
                  renderAboveThumbComponent={(value: number, index: number) => (
                    <View
                      style={{
                        width: WidthSize(100),
                        position: 'absolute',
                        top: -HeightSize(14),
                        left: -WidthSize(50),
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          ...TextStyle.Base,
                          ...TextFont.SLight,
                          color: '#3B3021',
                        }}>
                        ${index}
                      </Text>
                    </View>
                  )}
                />
              </View>

              <View
                style={{
                  marginTop: HeightSize(4),
                  width: '100%',
                  height: HeightSize(2),
                  backgroundColor: '#EFEFE8',
                  borderRadius: 8,
                }}
              />
            </View>
          </ScrollView>
          <View
            style={{
              bottom: 0,
              height: HeightSize(110),
              backgroundColor: 'white',
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              shadowColor: '#0000001A',
              shadowOffset: {
                width: 0,
                height: -4,
              },
              shadowOpacity: 1,
              shadowRadius: 10,
              elevation: 10,
              flexDirection: 'row',
              paddingHorizontal: WidthSize(32),
              paddingVertical: HeightSize(27),
            }}>
            <Pressable onPress={handleReset}>
              <Text
                style={{
                  color: '#836E44',
                  ...TextStyle.Base,
                  ...TextFont.SRegular,
                  alignSelf: 'center',
                }}>
                Reset
              </Text>
            </Pressable>
            <TouchableOpacity
              onPress={() => {
                const newFilter: Normalized<string, any> = {
                  ids: [],
                  entities: {},
                };
                if (sortByFilter?.id) {
                  newFilter.ids.push('sortBy');
                  newFilter.entities['sortBy'] = sortByFilter;
                }
                if (colorFilter?.ids.length > 0) {
                  newFilter.ids.push('color');
                  newFilter.entities['color'] = colorFilter;
                }
                if (sizeFilter?.ids.length > 0) {
                  newFilter.ids.push('size');
                  newFilter.entities['size'] = sizeFilter;
                }
                if (priceFilter[0] !== 0 || priceFilter[1] !== 2000) {
                  newFilter.ids.push('price');
                  newFilter.entities['price'] = priceFilter;
                }
                JSON.stringify(newFilter) !== JSON.stringify(filter) &&
                  setFilter(newFilter);
                setIsShowModal(!isShowModal);
              }}
              activeOpacity={0.8}
              style={{
                flex: 1,
                backgroundColor: '#836E44',
                marginLeft: WidthSize(42),
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  ...TextStyle.Base,
                  ...TextFont.SRegular,
                  alignSelf: 'center',
                }}>
                Apply filters
              </Text>
            </TouchableOpacity>
          </View>
        </ContainerImage>
      </Modal>
    </View>
  );
};

export default CategoryFilter;

const styles = StyleSheet.create({});
