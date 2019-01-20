import React from 'react';
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import mascot from '../assets/images/catpix-blue.png';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  onHiraganaChosen() {
  }

  onKatakanaChosen () {

  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Text style={styles.appTitle}>
              <Text style={{ color: 'red' }}>K</Text>
              <Text style={{ color: 'orange' }}>A</Text>
              <Text style={{ color: 'yellow' }}>N</Text>
              <Text style={{ color: 'lime' }}>A </Text>
              <Text style={{ color: 'deepskyblue' }}>D</Text>
              <Text style={{ color: 'magenta' }}>R</Text>
              <Text style={{ color: 'gold' }}>A</Text>
              <Text style={{ color: 'red' }}>G </Text>
              <Text style={{ color: 'orange' }}>'N </Text>
              <Text style={{ color: 'yellow' }}>D</Text>
              <Text style={{ color: 'lime' }}>R</Text>
              <Text style={{ color: 'deepskyblue' }}>O</Text>
              <Text style={{ color: 'magenta' }}>P</Text>
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.mainMenuButton} 
                onPress={() => navigate('DragNDrop', {kanaType: 'hiragana'})}>
              <Text style={styles.mainMenuButton}>HIRAGANA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mainMenuButton} 
                onPress={() => navigate('DragNDrop', {kanaType: 'katakana'})}>
              <Text style={styles.mainMenuButton}>KATAKANA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.mainMenuButton} 
                onPress={() => navigate('About')}>
              <Text style={styles.mainMenuButton}>ABOUT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.mascotContainer}>
          <Image source={mascot} style={styles.mascot} />
        </View>
      </View>
    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use useful development
          tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    backgroundColor: 'darkslategrey',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },
  appTitle: {
    fontSize: 30,
    fontFamily: 'press-start-2p',
    textAlign: 'center'
  },
  mainMenuButton: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 24,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'press-start-2p',
  },
  buttonContainer: {
    margin: 20
  },
  mascotContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // width: 200
  },
  mascot: {
    width: 100,
    height: 100,
  }
});