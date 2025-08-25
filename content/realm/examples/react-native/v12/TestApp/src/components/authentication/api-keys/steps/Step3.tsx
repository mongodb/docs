import React from 'react';

import {StepProps} from '../../../types';
import {Step1} from './Step1';

export const Step3 = ({currentStep, apiKey, setApiKey}: StepProps) => {
  return (
    <Step1
      currentStep={currentStep}
      apiKey={apiKey}
      setApiKey={setApiKey}
    />
  );
};
