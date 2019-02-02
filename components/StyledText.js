import React from 'react';
import { Text } from 'react-native';
import { appStyles } from '../constants/AppStyles';

export function HeaderText(props) {
  const { style } = props;
  return (
    <Text
      {...props}
      style={[style,
        { fontFamily: 'press-start-2p', fontSize: 30, textAlign: 'center' }]}
    />
  );
}

export function ParagraphText(props) {
  const { style } = props;
  return (
    <Text
      {...props}
      style={[style, appStyles.normalText]}
    />
  );
}
