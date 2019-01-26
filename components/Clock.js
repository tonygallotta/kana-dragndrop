import React from 'react';
import { Text } from 'react-native';
import moment from 'moment'

/**
 * Renders a clock that displays elapsed time.
 */
export class Clock extends React.Component {
  render() {
    return <Text style={[this.props.style, { fontFamily: 'zcool' }]}>
      </Text>;
  }
}
