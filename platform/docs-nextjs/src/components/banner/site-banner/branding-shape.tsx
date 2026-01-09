const BrandingShape = () => {
  const width = 109;
  const height = 40;
  const viewBox = `0 0 ${width} ${height}`;
  const titleId = 'branding-shape-title';

  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>MongoDB Branding Shape</title>
      <path
        d="M55.9997 98.9928L55.9997 99.0001L55.9998 151C55.9998 165.076 44.5756 176.5 30.4998 176.5C16.4239 176.5 4.99975 165.076 4.99975 151C4.99975 136.372 -6.8721 124.5 -21.5002 124.5L-73.5002 124.5C-87.5761 124.5 -99.0002 113.076 -99.0003 99.0001C-99.0003 84.9242 -87.5761 73.5001 -73.5003 73.5001L-47.2923 73.5001C-18.3108 73.5001 4.99974 49.9789 4.99974 21.208L4.99974 -4.99991C4.99974 -19.0758 16.4239 -30.4999 30.4997 -30.4999C44.5756 -30.4999 55.9997 -19.0758 55.9997 -4.99992C55.9997 9.62821 67.8716 21.5001 82.4997 21.5001C96.5756 21.5001 108 32.9242 108 47.0001C108 61.0759 96.5756 72.5001 82.4997 72.5001C67.8651 72.5001 56.2116 84.377 55.9997 98.9928Z"
        stroke="#00ED64"
      />
    </svg>
  );
};

export default BrandingShape;
