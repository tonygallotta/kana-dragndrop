import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { HeaderText, ParagraphText } from '../components/StyledText';
import HyperLink from '../components/HyperLink';

export default class AboutScreen extends React.Component {
  static navigationOptions = {
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <HeaderText style={{color: 'white'}}>ABOUT</HeaderText>
        <ParagraphText>
        This app was created with inspiration from <HyperLink url="https://www.csus.edu/indiv/s/sheaa/projects/genki/hiragana-timer.html">
          Usagi-chan's Genki Resource Page
        </HyperLink> by Tony Gallotta, a software engineer and aspiring Japanese speaker.
        </ParagraphText>
        <ParagraphText>
        It is free and open source. Visit the <HyperLink url="https://github.com/tonygallotta/kana-dragndrop">Github page</HyperLink> for more details.
        </ParagraphText>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 5,
    backgroundColor: 'darkslategrey',
  },
});
