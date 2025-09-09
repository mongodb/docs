// util function to mock window properties for testing
// extend to add additional properties as needed

export const mockLocation = ({hash}: {hash: string}) => {
  delete (window as unknown as { location?: Location }).location;
  (window as unknown as { location: Partial<Location> }).location = {
    hash,
    assign: jest.fn(),
    reload: jest.fn(),
    replace: jest.fn(),
    toString: () => '',
  };
};