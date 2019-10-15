import React from 'react';
import { 
  Image, 
  StyleSheet, 
  Text, 
  View 
} from 'react-native';
import { HeaderText, ParagraphText } from '../components/StyledText';
import mascot from '../assets/images/chubbycat-dorsa.png';
import AppStyles from '../constants/AppStyles';

export default class WinScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <View style={AppStyles.container}>
        <View style={AppStyles.mascotContainer}>
          <Text style={styles.goodJobText}>
          よくできました
          </Text>
          <Image source={mascot} style={AppStyles.mascot} />
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
