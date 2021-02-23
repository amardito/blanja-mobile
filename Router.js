import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/global/store';

import Navigator from './src/screen';

import {SocketProvider} from './src/utils/context/SocketProvider';

const App = () => {
  return (
    <Provider store={store}>
      <SocketProvider>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Navigator />
      </SocketProvider>
    </Provider>
  );
};

export default App;
