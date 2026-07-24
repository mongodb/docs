interface ReplacementProps {
  name: string;
  children: React.ReactNode;
}

/**
 * Slot marker for include-file replacements. The Include component reads
 * these children to build a replacements map before loading the include file.
 * The component itself renders its children so it behaves sensibly if ever
 * rendered outside of an Include context.
 */
export const Replacement = ({ children }: ReplacementProps) => <>{children}</>;
