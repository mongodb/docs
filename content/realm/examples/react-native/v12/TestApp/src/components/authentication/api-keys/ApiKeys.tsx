import React from 'react';
import {AppProvider} from '@realm/react';

import {GuideManager} from './GuideManager';

import {APP_ID} from '../../../../appServicesConfig';

export const ApiKeyAuth = () => {
  return (
    <AppProvider id={APP_ID}>
      <GuideManager
        title="User API Key"
        totalSteps={4}
      />
    </AppProvider>
  );
};
