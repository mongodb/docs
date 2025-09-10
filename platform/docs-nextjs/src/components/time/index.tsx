import type { ASTNode } from '@/types/ast';
import { getPlaintext } from '@/utils/get-plaintext';

export type TimeProps = {
  argument: ASTNode[];
};

const Time = ({ argument }: TimeProps) => {
  const time = getPlaintext(argument);
  if (!time) {
    return null;
  }

  return (
    <p>
      <em>Time required: {time} minutes</em>
    </p>
  );
};

export default Time;
