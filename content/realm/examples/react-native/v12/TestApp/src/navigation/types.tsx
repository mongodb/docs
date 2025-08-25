import {DrawerScreenProps} from '@react-navigation/drawer';
import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Home: undefined;
  Geospatial: undefined;
  ObjectModels: undefined;
  Logger: undefined;
  Subscriptions: undefined;
  SubscribeApi: undefined;
  FullTextSearch: undefined;
  Relationships: undefined;
  Errors: undefined;
  Authentication: undefined;
  Encryption: {
    encryptionKey: ArrayBuffer;
  };
  Quickstart: undefined;
  AppWithAuthHook: undefined;
};

export type SubscriptionStackParamList = {
  SubscriptionHome: undefined;
  SubscribeApi: undefined;
};
export type AuthenticationStackParamList = {
  AuthenticationHome: undefined;
  Login: undefined;
  LinkIdentities: undefined;
  ApiKeyAuth: undefined;
};
export type QuickstartStackParamList = {
  QuickstartHome: undefined;
  QuickstartNoSync: undefined;
  QuickstartSync: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  DrawerScreenProps<RootStackParamList, T>;

export type LoggerScreenProps = DrawerScreenProps<RootStackParamList, 'Logger'>;
export type SubscriptionHomeProps = StackScreenProps<
  SubscriptionStackParamList,
  'SubscriptionHome'
>;
export type AuthenticationHomeProps = StackScreenProps<
  AuthenticationStackParamList,
  'AuthenticationHome'
>;
export type QuickstartHomeProps = StackScreenProps<
  QuickstartStackParamList,
  'QuickstartHome'
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
