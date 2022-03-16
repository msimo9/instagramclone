import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainStackNavigator from './appNavigation';
import { Provider } from 'react-redux';
import store from './redux';

export default function App() {
  return (
    <Provider store={store}>
      <MainStackNavigator>
      </MainStackNavigator>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
