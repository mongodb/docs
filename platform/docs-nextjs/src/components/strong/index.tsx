interface StrongProps {
  value: string;
}

const Strong = ({ value }: StrongProps) => {
  return <strong>{value}</strong>;
};

export default Strong;
