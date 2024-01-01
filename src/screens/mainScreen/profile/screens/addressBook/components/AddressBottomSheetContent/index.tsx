import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Animated, {
  FadeInUp,
  Layout,
  LinearTransition,
} from 'react-native-reanimated';
import {Button, FAB} from 'react-native-paper';
import {Keyboard} from 'react-native';
import {IconSvg} from '~/components/global/iconSvg';
import {HeightSize, WidthSize} from '~/theme/size';
import {TextStyle, TextFont} from '~/theme/textStyle';
import {ContactAPIParams, addressTree} from '~/types/contact';
import {stringify} from 'querystring';

const heightScreen = Dimensions.get('window').height;

type AddressBottomSheetContentProps = {
  data: addressTree;
  locationNameConverter: {
    Ward: (
      codenameCity: string,
      codenameDistrict: string,
      codenameWard: string,
    ) => string;
    District: (codenameCity: string, codenameDistrict: string) => string;
    City: (codenameCity: string) => string;
  };
  onCloseBottomSheet: () => void;
  onSetAddress: (contact: ContactAPIParams) => void;
  initialAddress: any;
};

type formState = {
  ID?: number;
  IsTemporary?: boolean;
  IsDeleted?: boolean;
  City: string;
  District?: string;
  Ward?: string;
  DetailAddress?: string;
  Phone?: string;
};

const AddressBottomSheetContent: React.FC<AddressBottomSheetContentProps> = ({
  data,
  locationNameConverter,
  onCloseBottomSheet,
  onSetAddress,
  initialAddress,
}) => {
  const [addressTree, setAddressTree] = useState([]);
  const [form, setForm] = useState<formState>({
    ID: undefined,
    IsTemporary: undefined,
    IsDeleted: undefined,
    City: '',
    District: undefined,
    Ward: undefined,
    DetailAddress: '',
    Phone: '',
  });
  const [selected, setSelected] = useState('City');
  const [currentData, setCurrentData] = useState<any>(data);

  useEffect(() => {
    if (initialAddress) {
      console.log('Initial address: ' + JSON.stringify(initialAddress));
      setForm(initialAddress);
      if (initialAddress.City == 0) {
        setSelected('City');
        setShowDetailAddress(false);
        setCurrentData(data);
      }
      // const city = data.filter(item => item.ID === initialAddress.City)[0];
      // setCurrentData(data.filter(item => item.ID === initialAddress.City)[0].Districts);
      // setSelected('District');
    }
  }, [initialAddress]);

  const onSelect = (name: string) => {
    setSelected(name);
    if (name === 'City') {
      setCurrentData(data);
    } else if (name === 'District') {
      setCurrentData(
        data.filter((item: any) => item.codename === form.City)[0].districts,
      );
    } else if (name === 'Ward') {
      setCurrentData(
        data
          .filter((item: any) => item.codename === form.City)[0]
          .districts.filter((item: any) => item.ID === form.District)[0].wards,
      );
    }
    setShowDetailAddress(false);
  };

  const onChooseLocation = (name: string, code: string, value: any) => {
    console.log(
      'param choose location: ',
      JSON.stringify({
        name,
        code,
        value,
      }),
    );
    if (name === 'City') {
      setSelected('District');
      setForm({...form, City: code, District: '', Ward: undefined});
      // setForm({ ...form, City: value, District: 'Choose district', Ward: '' });
      console.log(
        'current data: ',
        JSON.stringify(
          currentData.filter(
            (item: {codename: string}) => item.codename === code,
          )[0],
          null,
          2,
        ),
      );
      setCurrentData(
        currentData.filter(
          (item: {codename: string}) => item.codename === code,
        )[0].districts,
      );
      return;
    } else if (name === 'District') {
      setSelected('Ward');
      setForm({...form, District: code, Ward: ''});
      // setForm({ ...form, District: value, Ward: 'Choose Ward' });
      setCurrentData(
        currentData.filter(
          (item: {codename: string}) => item.codename === code,
        )[0].wards,
      );
      return;
    }
    setForm({...form, [name]: code});
    // setForm({ ...form, [name]: value });
    setShowDetailAddress(true);
    setSelected('');
  };

  // const onDelete = () => {
  //   if (!form.IsDeleted) {
  //     const temp = {...form, IsDeleted: true};
  //     onSetAddress({temp});
  //   }
  //   onCloseBottomSheet();
  // };

  useEffect(() => {
    if (selected === 'Ward' && form.Ward) {
      //onSetAddress(IDForm);
      // onCloseBottomSheet();
      setShowDetailAddress(true);
      setSelected('');
    }
  }, [form.Ward]);

  const _renderContent = (data: any, selected: string) => {
    return data.map((item: any, index: number) => {
      let flag = false;
      let firstLetter = '';
      if (
        (selected === 'City' && item.codename === form.City) ||
        (selected === 'District' && item.codename === form.District) ||
        (selected === 'Ward' && item.codename === form.Ward)
      )
        flag = true;
      if (index === 0) firstLetter = item.name[0].toUpperCase();
      else if (item.name[0] !== data[index - 1].name[0])
        firstLetter = item.name[0].toUpperCase();
      return (
        <TouchableWithoutFeedback
          key={index}
          onPress={() => onChooseLocation(selected, item.codename, item.name)}>
          <View
            style={{
              paddingBottom: index === data.length - 1 ? 315 : 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                padding: 12,
              }}>
              <View style={{width: 25}}>
                {firstLetter && (
                  <Text style={{color: '#686868'}}>{firstLetter}</Text>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: flag ? '#836E44' : '#3B3021',
                  }}>
                  {item.name}
                </Text>

                {flag && (
                  <IconSvg
                    icon={'IconCheck'}
                    style={{
                      paddingTop: HeightSize(3),
                    }}
                  />
                )}
              </View>
            </View>
            <View
              style={{
                height: 1,
                borderBottomWidth: 1,
                borderBottomColor: '#CCCCD0',
                marginStart: 35,
              }}
            />
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  const [showDetailAddress, setShowDetailAddress] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{backgroundColor: '#F0EFE9', height: '100%'}}>
        <Animated.View
          layout={LinearTransition.stiffness(100).damping(10).duration(300)}>
          <View style={[styles.selectedSectionLabel, {marginTop: 8}]}>
            <Text
              style={[
                styles.selectedLabel,
                {
                  ...TextFont.SMedium,
                  ...TextStyle.SM,
                  color: '#3B3021',
                },
              ]}>
              Selected area
            </Text>
            <TouchableWithoutFeedback
              onPress={() => {
                setForm({
                  City: '',
                  District: undefined,
                  Ward: undefined,
                });
                setCurrentData(data);
                setSelected('City');
                setShowDetailAddress(false);
              }}>
              <Text
                style={[
                  styles.resetLabel,
                  {...TextFont.SMedium, color: '#836E44'},
                ]}>
                Reset
              </Text>
            </TouchableWithoutFeedback>
          </View>
          <Animated.View
            layout={LinearTransition.stiffness(100).damping(10).duration(300)}>
            {Object.keys(form).map((key, index) => {
              if (
                (key === 'City' || key === 'District' || key === 'Ward') &&
                form[key] != undefined
              ) {
                let text = '';
                if (key === 'City') {
                  if (form.City == '') text = 'Choose city';
                  else {
                    console.log('city selected: ', form.City);
                    text = locationNameConverter.City(form.City);
                  }
                } else if (key === 'District') {
                  if (form.District == '') text = 'Choose district';
                  else
                    text = locationNameConverter.District(
                      form.City,
                      form.District || '',
                    );
                } else if (key === 'Ward') {
                  if (form.Ward == '') text = 'Choose ward';
                  else
                    text = locationNameConverter.Ward(
                      form.City,
                      form.District || '',
                      form.Ward,
                    );
                }
                return (
                  <Animated.View
                    key={index}
                    layout={LinearTransition.springify()}
                    entering={FadeInUp}>
                    <TouchableWithoutFeedback onPress={() => onSelect(key)}>
                      <View style={styles.selectedSectionItem}>
                        <View style={{alignItems: 'center'}}>
                          {key !== 'City' && (
                            <View
                              style={[
                                {
                                  width: 1,
                                  height: 24,
                                  backgroundColor: '#D8D8D8',
                                  marginTop: 3,
                                },
                              ]}
                            />
                          )}
                          {selected === key ? (
                            <IconSvg
                              icon={'IconCircleSlice'}
                              width={WidthSize(16)}
                              height={WidthSize(16)}
                              style={{paddingTop: 3}}
                            />
                          ) : (
                            <View
                              style={{
                                width: WidthSize(16),
                                height: WidthSize(16),
                                paddingTop: HeightSize(3),
                                backgroundColor: '#D8D8D8',
                                borderRadius: 999,
                              }}
                            />
                          )}
                        </View>
                        <Text
                          style={[
                            styles.selectedSectionItemText,
                            {color: '#3B3021'},
                            selected === key && {
                              color: '#836E44',
                              ...TextFont.SMedium,
                            },
                          ]}>
                          {text}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  </Animated.View>
                );
              }
            })}
          </Animated.View>
        </Animated.View>

        {!showDetailAddress && (
          <Animated.View
            layout={LinearTransition.stiffness(100).damping(10).duration(300)}
            style={styles.selectedSectionContent}>
            <Text
              style={[
                styles.selectedLabel,
                {color: '#3B3021', ...TextFont.SMedium, marginTop: 12},
              ]}>
              {selected}
            </Text>
            <ScrollView>
              {_renderContent(
                Array.from(currentData).sort((a: any, b: any) =>
                  a.name.localeCompare(b.name),
                ),
                selected,
              )}
            </ScrollView>
          </Animated.View>
        )}

        {showDetailAddress && (
          <Animated.View
            layout={LinearTransition.stiffness(100).damping(10).duration(300)}
            style={styles.selectedSectionContent}>
            <Text
              style={[
                styles.selectedLabel,
                {
                  marginBottom: 10,
                  marginTop: 15,
                  color: '#3B3021',
                  ...TextFont.SMedium,
                },
              ]}>
              Detail Address
            </Text>

            <View
              style={{
                marginHorizontal: WidthSize(16),
                marginBottom: HeightSize(32),
              }}>
              <TextInput
                style={styles.txtInput}
                placeholderTextColor={'#A5ABB9'}
                placeholder="Enter your detail address"
                value={form.DetailAddress}
                onChangeText={text => setForm({...form, DetailAddress: text})}
                secureTextEntry={false}
              />
            </View>

            <Text
              style={[
                styles.selectedLabel,
                {
                  marginBottom: 10,
                  marginTop: 15,
                  color: '#3B3021',
                  ...TextFont.SMedium,
                },
              ]}>
              Phone Number
            </Text>
            <View
              style={{
                marginHorizontal: WidthSize(16),
                marginBottom: HeightSize(32),
              }}>
              <TextInput
                style={styles.txtInput}
                placeholderTextColor={'#A5ABB9'}
                placeholder="Enter your phone number"
                value={form.Phone}
                onChangeText={text => setForm({...form, Phone: text})}
                keyboardType="decimal-pad"
                secureTextEntry={false}
              />
            </View>
          </Animated.View>
        )}

        {showDetailAddress && (
          <View
            style={{
              alignSelf: 'center',
              width: '80%',
              margin: 16,
              marginHorizontal: 20,
              marginTop: 30,
            }}>
            <FAB
              onPress={() => {
                onSetAddress({
                  phone: form.Phone || '',
                  province: form.City,
                  district: form.District || '',
                  ward: form.Ward || '',
                  details: form.DetailAddress || '',
                });
                onCloseBottomSheet();
              }}
              label="Save"
              size="small"
              color={'#fff'}
              style={{
                backgroundColor: '#836E44',
                marginBottom: 30,
              }}
            />
            {/* <FAB
              onPress={() => {
                onDelete();
              }}
              label="Delete"
              size="small"
              color={'#000'}
              style={{backgroundColor: '#D8D8D8'}}
            /> */}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AddressBottomSheetContent;

const styles = StyleSheet.create({
  selectedSectionLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  selectedLabel: {
    marginStart: 15,
    // color: colors.black,
    // fontWeight: 'bold',
  },
  resetLabel: {
    marginEnd: 15,
    // color: colors.primary,
    // fontWeight: 'bold',
  },
  selectedSectionContent: {
    marginTop: 15,
  },

  selectedSectionItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginStart: 25,
  },
  selectedSectionItemText: {
    marginStart: 10,
    alignSelf: 'flex-end',
  },
  title: {
    ...TextStyle.Base,
    ...TextFont.SMedium,
    fontWeight: 'bold',
    marginBottom: HeightSize(5),
    color: '#525A7F',
  },
  error: {
    ...TextStyle.Base,
    ...TextFont.SMedium,
    fontWeight: 'bold',
    marginBottom: HeightSize(5),
    color: '#BC2424',
  },
  txtInput: {
    ...TextFont.SRegular,
    borderRadius: 16,
    paddingHorizontal: WidthSize(20),
    backgroundColor: '#F2F2F4',
    color: 'black',
    height: HeightSize(64),
    borderColor: '#D8D2C4',
    borderWidth: 1,
  },
});
