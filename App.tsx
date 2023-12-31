import React, {useEffect} from 'react';
import {LogBox, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigation from '~/navigation';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppProvider} from '~/app/appProvider';
import axios from 'axios';
import {
  NormalizedDistricts,
  NormalizedLocationVietNam,
  NormalizedWards,
} from '~/types/auth';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';
LogBox.ignoreAllLogs(true);
function App(): JSX.Element {
  useEffect(() => {
    const getLocation = async () => {
      const locationVietNam = await AppProvider.getLocationVietNam();
      if (locationVietNam === null) {
        await axios
          .get('https://provinces.open-api.vn/api/?depth=3')
          .then(async res => {
            const dataProvinces: NormalizedLocationVietNam = {
              ids: [],
              entities: {},
            };
            await res.data.forEach(async (item: any) => {
              dataProvinces.ids.push(item.codename);
              const dataDistricts: NormalizedDistricts = {
                ids: [],
                entities: {},
              };

              await item.districts.forEach(async (district: any) => {
                const dataWards: NormalizedWards = {
                  ids: [],
                  entities: {},
                };
                dataDistricts.ids.push(district.codename);
                await district.wards.forEach((ward: any) => {
                  dataWards.ids.push(ward.codename);
                  dataWards.entities[ward.codename] = ward;
                });
                dataDistricts.entities[district.codename] = {
                  ...district,
                  wards: dataWards,
                };
              });
              dataProvinces.entities[item.codename] = {
                ...item,
                districts: dataDistricts,
              };
            });
            await AppProvider.setLocationVietNam(dataProvinces);
          });
      }
    };
    getLocation();
  }, []);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={'transparent'}
          translucent={true}
        />
        <AutocompleteDropdownContextProvider>
          <RootNavigation />
        </AutocompleteDropdownContextProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
