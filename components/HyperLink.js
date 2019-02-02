import React from 'react';
import {
  Linking,
  Text,
} from 'react-native';

/**
 * Renders a hyperlink to a web address that can be embedded in text.
 * Adapted from https://stackoverflow.com/questions/30540252/display-hyperlink-in-react-native-app.
 */
export default class HyperLink extends React.Component {
  constructor() {
    super();
    this.goToURL = this.goToURL.bind(this);
  }

  goToURL() {
    const { url } = this.props;
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URI: ${url}`);
      }
    });
  }

  render() {
    const { style } = this.props;
    return (
      <Text
        {...this.props}
        style={[style, { color: 'deepskyblue' }]}
        onPress={this.goToURL}
      />
    );
  }
}
