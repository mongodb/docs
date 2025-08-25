import React from 'react';
import {View, Text} from 'react-native';

import {StepProps} from '../../../types';

export const Step4 = ({currentStep, apiKey}: StepProps) => {
  return (
    <View>
      <Text>Step {currentStep + 1}: Log out and log in with API key</Text>

      <Text>Logged in with this API key:</Text>
      <Text>
        • {apiKey!.name} | {apiKey!._id}
      </Text>
    </View>
  );
};
