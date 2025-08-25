import React from 'react';
import {useUser} from '@realm/react';

function Addition() {
  // Get currently logged in user
  const user = useUser();

  const addNumbers = async (numA: number, numB: number) => {
    // Call Atlas Function

    // Method 1: call with User.callFunction()
    const sumMethod1 = await user?.callFunction('sum', numA, numB);

    // Method 2: Call with User.function.<Function name>()
    const sumMethod2 = await user?.functions.sum(numA, numB);

    // Both methods return the same result
    console.log(sumMethod1 === sumMethod2); // true
  };
  // ...
}
