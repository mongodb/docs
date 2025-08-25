import React, {useState} from 'react';
import {Pressable, Text, View, StyleSheet} from 'react-native';
import {UserProvider, useApp, useAuth} from '@realm/react';

import {LoginManager} from './LoginManager';

// Import Guide steps
import {Step1} from './steps/Step1';
import {Step2} from './steps/Step2';
import {Step3} from './steps/Step3';
import {Step4} from './steps/Step4';

import {
  ApiKey,
  GuideManagerProps,
  EventType,
  StepControllerProps,
} from '../../types';

export const GuideManager = ({totalSteps, title}: GuideManagerProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [apiKey, setApiKey] = useState<ApiKey>();

  const app = useApp();
  const {result} = useAuth();
  const stepComponents = [Step1, Step2, Step3, Step4];

  const logout = async () => {
    if (app.currentUser) {
      await app.currentUser.logOut();
    }

    return;
  };

  // Render a component based on its index
  const renderComponentByIndex = (index: number) => {
    const Step = stepComponents[index];

    return (
      <Step
        currentStep={currentStep}
        apiKey={apiKey}
        setApiKey={setApiKey}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text>{title} Guide</Text>

      <UserProvider fallback={<LoginManager apiKey={apiKey} />}>
        {renderComponentByIndex(currentStep)}
      </UserProvider>

      <StepController
        totalSteps={totalSteps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />

      <Text testID="auth-operation">Auth operation: {result.operation}</Text>
      <Text testID="auth-status">Auth status: {result.state}</Text>
      <Pressable
        testID="logout-button"
        style={styles.button}
        onPress={logout}>
        <Text style={styles.buttonText}>Log out</Text>
      </Pressable>
    </View>
  );
};

function StepController({
  totalSteps,
  currentStep,
  setCurrentStep,
}: StepControllerProps) {
  const handleClick = (eventType: EventType) => {
    switch (eventType) {
      case EventType.Continue:
        const stepIncrement = currentStep + 1;
        if (stepIncrement > totalSteps - 1) {
          setCurrentStep(0);
        } else {
          setCurrentStep(stepIncrement);
        }

        break;

      case EventType.GoBack:
        const stepDecrement = currentStep - 1;
        if (stepDecrement < 0) {
          break;
        } else {
          setCurrentStep(stepDecrement);
        }

        break;

      default:
        setCurrentStep(0);
        break;
    }
  };

  return (
    <View style={styles.buttonGroup}>
      <Pressable
        style={styles.button}
        onPress={() => {
          handleClick(EventType.GoBack);
        }}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
      <Pressable
        testID="step-next-button"
        style={styles.button}
        onPress={() => {
          handleClick(EventType.Continue);
        }}>
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  section: {
    flex: 1,
    marginTop: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  textInput: {
    backgroundColor: '#C5CAE9',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 5,
  },
  inputGroup: {
    width: '100%',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#3F51B5',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ffffff',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 5,
    marginHorizontal: 8,
  },
  disabledButton: {
    backgroundColor: '#F3A6C2',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ffffff',
    opacity: 0.5,
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginVertical: 5,
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});
