import React from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {
  AppLoading,
  Asset,
  Font,
  Icon,
} from 'expo';
import AppNavigator from './navigation/AppNavigator';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

async function loadResourcesAsync() {
  return Promise.all([
    Asset.loadAsync([
      require('./assets/images/catpix2.png'),
      require('./assets/images/catpix.png'),
    ]),
    Font.loadAsync({
      // This is the font that we are using for our tab bar
      ...Icon.Ionicons.font,
      'zcool': require('./assets/fonts/ZCOOLQingKeHuangYou-Regular.ttf'),
      'press-start-2p': require('./assets/fonts/PressStart2P-Regular.ttf'),
      'jackeyfont': require('./assets/fonts/jackeyfont.ttf'),
    }),
  ]);
}

function handleLoadingError(error) {
  // TODO: something better
  console.warn(error);
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  handleFinishLoading() {
    this.setState({ isLoadingComplete: true });
  }

  render() {
    const { isLoadingComplete } = this.state;
    const { skipLoadingScreen } = this.props;
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }
}
