// To mock the next/navigation we are using the manual mock approach from Jest: https://jestjs.io/docs/manual-mocks#mocking-user-modules
// We are only using the mocked the userRouter. But later on
// will mostly need the use the other navigation hooks
export const useRouter = jest.fn();
export const usePathname = jest.fn();
export const useSearchParams = jest.fn();
export const useParams = jest.fn();
