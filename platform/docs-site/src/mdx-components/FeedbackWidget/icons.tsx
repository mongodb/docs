type FontAwesomeIconProps = {
  icon: string;
  size: string;
  spin?: boolean;
};

export const FontAwesomeIcon = ({ icon, size, spin, ...props }: FontAwesomeIconProps) => {
  const classes = [`fa`, `fa-${icon}`, `fa-${size}`];
  if (spin) {
    classes.push(`fa-spin`);
  }
  return <div className={classes.join(' ')} {...props} />;
};

export const CameraIcon = (props: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon="camera" {...props} />;

export const SpinnerIcon = (props: Omit<FontAwesomeIconProps, 'icon'>) => (
  <FontAwesomeIcon icon="spinner" spin {...props} />
);

export const CheckIcon = (props: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon="check" {...props} />;

export const StarIcon = (props: Omit<FontAwesomeIconProps, 'icon'>) => <FontAwesomeIcon icon="star" {...props} />;
