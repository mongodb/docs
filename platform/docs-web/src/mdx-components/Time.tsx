type TimeProps = {
  minutes: string;
};

export const Time = ({ minutes }: TimeProps) => {
  return (
    <p>
      <em>
        Time required: {minutes} minute{minutes === '1' ? '' : 's'}
      </em>
    </p>
  );
};
