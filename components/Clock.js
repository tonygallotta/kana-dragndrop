import React from 'react';
import { Text, View } from 'react-native';
import moment from 'moment';

import AppStyles from '../constants/AppStyles';

/**
 * Renders a clock that displays elapsed time.
 */
export default class Clock extends React.Component {
  constructor() {
    super();
    this.state = {
      elapsedTime: 0,
    };
  }

  componentDidMount() {
    const intervalId = setInterval(() => {
      this.setState(previousState => ({
        elapsedTime: previousState.elapsedTime + 1,
      }));
    }, 1000);
    this.setState({ intervalId });
  }

  componentWillUnmount() {
    this.stopClock();
  }

  stopClock() {
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  render() {
    const { elapsedTime } = this.state;
    const displayTime = moment.utc(elapsedTime * 1000)
      .format('mm:ss');
    const { style = {} } = this.props;
    return (
      <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
        alignItems: 'stretch',
      }}
      >
        <Text style={[style, AppStyles.normalText, { textAlign: 'right' }]}>
          { displayTime }
        </Text>
      </View>
    );
  }
}
