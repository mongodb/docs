import React from 'react';
import {AppProvider} from '@realm/react';
function AppWrapper() {
  return (
    <View>
      <AppProvider id={APP_ID}>
        <MyApp />
      </AppProvider>
    </View>
  );
}
