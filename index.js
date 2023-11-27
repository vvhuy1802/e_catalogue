/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { PaperProvider } from 'react-native-paper';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import { store } from '~/app/store';
export default function Main() {
    return (
        <Provider store={store}>
            <PaperProvider>
                <App />
            </PaperProvider>
        </Provider>
    );
}
AppRegistry.registerComponent(appName, () => Main);