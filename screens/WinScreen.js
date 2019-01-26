import React from 'react';
import { 
  Image, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { HeaderText, ParagraphText } from '../components/StyledText';
import mascot from '../assets/images/chubbycat-dorsa.png';
import { appStyles } from '../constants/AppStyles';

export default class WinScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={appStyles.container}>
        <View style={appStyles.mascotContainer}>
          <Text style={styles.goodJobText}>
          よくできました
          </Text>
          <Image source={mascot} style={appStyles.mascot} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  goodJobText: { 
    fontFamily: 'jackeyfont',
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 10,
  }
});
