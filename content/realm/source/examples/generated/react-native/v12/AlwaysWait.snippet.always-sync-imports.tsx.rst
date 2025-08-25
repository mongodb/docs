.. code-block:: typescript

   import React, {useEffect, useState} from 'react';
   import {WaitForSync} from 'realm';
   import {useRealm, useQuery} from '@realm/react';
   import {View, Text, FlatList} from 'react-native';

   import {Bird} from '../../models';
   import {Subscription} from 'realm/dist/bundle';
