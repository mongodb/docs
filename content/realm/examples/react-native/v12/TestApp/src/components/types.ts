export interface StepProps {
  currentStep: number;
  apiKey: ApiKey | undefined;
  setApiKey: React.Dispatch<React.SetStateAction<ApiKey | undefined>>;
}

export interface ApiKey {
  _id: string;
  key: string;
  name: string;
  disabled: boolean;
}

export interface GuideManagerProps {
  totalSteps: number;
  title: string;
}

export interface StepControllerProps {
  totalSteps: number;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export interface LoginManagerProps {
  apiKey: ApiKey | undefined;
}

export interface RegisterButtonProps {
  email: string;
  password: string;
}

export enum EventType {
  Continue,
  GoBack,
}
