'use client';

import { Text, TextStyle } from '@via-ds/components/typography';
import { Size } from '@via-ds/components/types';

type KbdProps = {
  children: React.ReactNode;
};

export const Kbd = ({ children }: KbdProps) => (
  <Text textStyle={TextStyle.inlineKeyCode} size={Size.Large} elementType="code">
    {children}
  </Text>
);
