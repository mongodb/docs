// TODO: remove this component once we're mapping MDX components (no longer looking at AST)

export type TextProps = {
  value: string;
};

const Text = ({ value }: TextProps) => <>{value}</>;

export default Text;
