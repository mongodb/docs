The React Native SDK docs testing suite contains a real, functional, React
Native app.

# Get Started with the React Native SDK Docs Test Suite

Before you begin, follow the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions. You need a working React Native environment
before you can do anything else.

1. [Prerequisite] Set up your React Native environment
2. Install the testing suite's dependencies
3. Run the test app in an Android or iOS simulator or physical device
4. Write components for features
5. Write and run tests for components
6. Add Bluehawk markup and generate Bluehawk snippets

# Write a New Component

Creating a new component for the test app isn't always straightforward, but this
basic plan should apply to most situations.

Check out the file names section for guidance on how to name your files and
directories.

1. In `src/components`, create a new directory for your component.
2. In the new directory, create a new component file. Add a very basic component
   to test for now.
3. In `App.tsx`, import your new component and add it to the navigation as a new
   `<Drawer.Screen>`.
4. In `src/navigation/types.tsx`, add your component to the `RootStackParamList`
   type. This makes TypeScript happy with new navigation added in the previous
   step.
5. Run `npm run android` or `npm run ios` to see your component in the app's
   drawer navigation.
6. Write your component code while the simulator runs. Make sure it works as
   you would expect.
7. Create a test file in the same directory as your component file. Run the test
   with `npm test -- FILENAME`.

# Test Conventions

There are a number of testing conventions in this test suite that you should
know about. Some of these are simply side effects of how React Native and Jest
work together and others are more stylistic choices that we want to be consistent
with.

## Write Jest Tests Like a User

We want our Jest tests to mimic user interactions as closely as possible. Write
your components like a Realm developer would, then use Jest to interact with
the completed product.

We can do this by including actual UI elements in our components and rendering
data to the UI. For example, in `FtsQuery.tsx`, we want users to be able to
create book objects. So, we have an input field for a book name. Users input
a name, then click a create button and the new object is added to the realm. At
this point, we render some element of the data to the UI, like how many books
match a query.

What does all this effort give us? In our Jest test, we can mimic all of these
steps and then access the data rendered in the UI to test against expected
values.

To mimic a user in a Jest test:

1. Set up an artificial user with Jest's `userEvent`.
   `const user = userEvent.setup();`
2. Get any UI elements you want the user to interact with.
   `const bookNameNode = await screen.findByTestId('bookNameInput');`
   or
   `const addButton = await screen.findByTestId('addBookButton');`
3. Have the artifical user interact with the UI element.
   `await user.type(bookNameNode, 'The Hunger Games');`
   or
   `await user.press(addButton);`
4. Get the UI element where the updated data is rendered.
   `const checkForHunger = await screen.findByTestId('hungerQueryResults');`
5. Assert that the rendered data matches an expected value.
   `expect(checkForHunger.children[1]).toBe('1');`

## Test With Jest and A Simulator

We use both manual testing in a simulator and automated Jest tests to ensure
our code does what it should do.

There are some important differences between the two tests that you should
know about

The simulator and Jest tests don't share Realm files. Think of them as two
different devices using the same app. The simulator uses a realm file that's
saved to the simulator's sandbox. Jest uses your computer's file directory.
For Device Sync apps, you can share data between the two with Device Sync, but
they still don't use the same realm file.

Becuase of this, you can't assume that what works in the simulator will work in
the Jest test or the other way around.

## TypeScript Only

The React Native SDK docs should only contain TypeScript examples. We don't
need to generate JavaScript versions of TypeScript code. We take this approach
because:

- React Native itself and its template apps are TypeScript only
- Most React Native developers work with TypeScript
- Working in TypeScript files is a better experience and results in better code
  examples.
- It's relatively easy to adapt TypeScript-specific examples to work in a
  JavaScript-only environment.

## File Structure

The test app's file structure should stay consistent so that it's easy to find
what you're looking for.

This section covers file structure conventions and information about important
files and directories.

### Top Level

| src
| App.tsx
| index.ts
| package.json

These are important parts of the app's top-level directory:

- `src` contains all of the TestApp's screens, components, and component tests.
- `App.tsx` is the top-level component for the app and contains the app's primary
  navigation structure.
- `index.ts` is the app's entry point. This file will rarely change or be tested
  in any way.
- `package.json` contains the app's dependencies and scripts.

### `src`

| components
| - component directory
| - component directory
| navigation
| - types.ts
| screens
| - HomeScreen.tsx
| - screen with sub navigation

These are important parts of the `src` directory:

- `components`. Contains most of the app's component and test files. See "Write
  a New Component" for a description of component directories.
- `navigation`. Contains the type definitions for the test app's navigation.
- `screens`. Contains standalone screens, like the home page, or parts of the
  test app that need their own sub navigation.

## File Names

- Components: Pascal case, followed by the `.tsx` file extension. For
  example, `ObjectModels.tsx`.
- Component tests: Pascal case, followed by the `.test.ts`. Test files should
  have the same name as their component counterparts. For example,
  `ObjectModels.tsx` is the component and `ObjectModels.test.ts` is the test
  file.
- Directories: directories should use Kebab case. For example, `object-model`.
  The directory name should clearly indicate what components might be inside it.

# Learn More

## React Native

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

## Jest and Testing React Native apps

- [Common mistakes with React Testing Library](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [React Native Testing Library docs](https://callstack.github.io/react-native-testing-library/docs/api)
