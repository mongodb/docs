import type { TextNode } from '@/types/ast';
import React from 'react';

const Text = ({ value }: { value: TextNode['value'] }) => (
  <React.Fragment>{value}</React.Fragment>
);

export default Text;
