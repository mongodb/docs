declare module 'no-scroll' {
  const noScroll: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
  export default noScroll;
}
