// TODO: remove this component once we're mapping MDX components (no longer looking at AST)

export type EmphasisProps = {
  value: string;
};

const Emphasis = ({ value }: EmphasisProps) => <em>{value}</em>;

export default Emphasis;
