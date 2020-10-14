import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import reduxStore from './store'
import RootNavigator from './navigation/root';
import { setI18nConfig } from './language';

const store = reduxStore();

export default App = () => {

  useEffect(() => {
    setI18nConfig()
    return () => {}
  }, [])

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </SafeAreaProvider>
  );
}
