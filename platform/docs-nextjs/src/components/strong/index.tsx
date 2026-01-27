// TODO: remove this component once we're mapping MDX components (no longer looking at AST)

interface StrongProps {
  value: string;
}

const Strong = ({ value }: StrongProps) => {
  return <strong>{value}</strong>;
};

export default Strong;
