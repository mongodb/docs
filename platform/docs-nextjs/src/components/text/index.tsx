import React from 'react';

export type TextProps = {
  value: string;
}; 

const Text = ({ value }: TextProps) => (
  <React.Fragment>{value}</React.Fragment>
);

export default Text;
