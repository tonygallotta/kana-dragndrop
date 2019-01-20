import React from 'react';
import { Text } from 'react-native';

export class MonoText extends React.Component {
  render() {
    return <Text {...this.props} style={[this.props.style, { fontFamily: 'space-mono' }]} />;
  }
}

export class HeaderText extends React.Component {
  render() {
    return <Text {...this.props} 
    style={[this.props.style, 
      { fontFamily: 'press-start-2p', fontSize: 30, textAlign: 'center' }]} />;
  }
}

export class ParagraphText extends React.Component {
  render() {
    return <Text {...this.props} 
    style={[this.props.style, 
      { 
        fontFamily: 'press-start-2p', 
        fontSize: 18, 
        textAlign: 'left', 
        color: 'white',
    }]} />;
  }
}
