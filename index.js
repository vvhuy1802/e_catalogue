/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from '~/app/store';
import {Text, TextInput} from 'react-native';

export default function Main() {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;
    return (
        <Provider store={store}>
            <PaperProvider>
                <App />
            </PaperProvider>
        </Provider>
    );
}
AppRegistry.registerComponent(appName, () => Main);