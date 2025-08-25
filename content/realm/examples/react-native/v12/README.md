The React Native SDK docs testing suite contains a real, functional, React
Native app. This is important because the primary goal of this testing suite
is to ensure that code examples in the docs are tested and runable. Side effects
of this approach include the following benefits:

- Ensure the `@realm/react` library and Realm.js SDK work like we say they do.
- Expose unexpected behavior that should be addressed in the docs.
- Provide developers with examples of how to test React Native apps that use
  the `@realm/react` library and Realm.js SDK.

# Layers of Abstraction

The React Native SDK can be hard to reason about because it contains several
layers of abstraction. At a high level, we can break it down like this:

Realm Core -> Realm.js -> `@realm/react`, all of which sits on top of React
Native. React Native itself is an abstraction of React that works with native
components.

To all of this, we add Jest for testing and things can get confusing very
quickly. This README aims to provide guidance so that it doesn't become
overwhelming.

# Bluehawk

We use the Bluehawk CLI to generate code snippets for the React Native SDK docs.
To streamline its use, you can use the bluehawk scripts in the `v12/scripts`
directory.

## Generate All Test Suite Snippets

You can generate all of the Bluehawk snippets across the entire test suite with
the `bluehawk.sh` script. This will remove all of the existing snippets in
`/source/examples/generated/react-native/v12`. Then, the script will create new
snippets for every file in the `/examples/react-native/v12/TestApp` directory
that contains Bluehawk markup.

To generate all test suite snippets, run the `bluehawk.sh` script in your
terminal.

```sh
./bluehawk.sh
```

## Generate Snippets from One File

Most of the time, you'll probably only want to generate snippets from a single
file. You can do this with the `bluehawk-one.sh` script. This will remove
existing snippets in `/source/examples/generated/react-native/v12` that match
the name of the file you pass to the script. Then, it will generate new
snippets to place in that directory.

To generate snippets from a single file, run the `bluehawk-one.sh` script in
your terminal and pass it the name of the file you want to generate examples
from.

```sh
./bluehawk-one.sh -f Geospatial.tsx
```

The script does not require an exact match to the file's name. But, the more
specific you are with the file name, the more likely Bluehawk will parse the
correct file.

## Bluehawk Snippet Format

The Bluehawk scripts in this test suite generate snippets in the `.rst` format.
We do this by passing the `--format=rst` argument to `bluehawk snip`. The main
advantage to doing this instead of generating snippets as literal includes
is that we can use Bluehawk's `:emphasize:` tag.

This creates a stronger relationship between the code and the docs. As code
changes, so will the automatically-generated snippets that are based on the code.

The generated `.rst` files are consumed by the simple `.. include:: ` Sphinx
directive.
