
# Setting up your Environment

1. Install Visual Studio 2019 Community Edition.

2. Go to https://ci.realm.io/blue/organizations/jenkins/realm%2Frealm-dotnet/detail/PR-2011/48/artifacts/
   and download Realm.10.0.0-alpha.....nupkg and Realm.Fody.10.0.0-alpha.....nupkg.

3. Clone the ``mongodb/docs-realm`` repo.

4. Navigate to ``/examples/dotnet/`` and open ``dotnet.sln`` in Visual Studio.

   **NOTE:** You might need to update XCode -- the MAUI/Xamarin code requires a 
   specific version of the SDks. Visual Studio will tell you if this is the case.

5. In Visual Studio, expand ``dotnet``, expand ``Examples``, and then right-click
   on Dependencies.

   a. Click "Manage Nuget Packages".

   b. In the upper left corner is a drop-down that probably says "All Sources" or "nuget.org".
      In that dropdown, select "Configure Sources".

   c. Click the Add button (lower right).

   d. Give it a name (I did "Realm10"), and point the location to wherever you downloaded
      the two ``nupkg`` files earlier.

   e. When done, you should have 2 sources listed: nuget.org and the one you just
      created. Make sure both are selected and then click ``OK``.

   f. Back in the Manage Nuget Packages dialog, select your new source in the
      dropdown, and you should see your two packages. Select both, and confirm in the right
      pane that you are installing version 10.0.0-alpha.xyz where xyz is the latest version you downloaded.

   g. Click Add Packages.

At this point, you can run tests with one of the following:

- Run the "Examples - Unit Tests" target
- Run > Run Unit Tests
- Open a Unit Test file and press Cmd-T to run tests in that file
- Open the Unit Test explorer on the right-hand side of the IDE.

# Testing with the `dotnet` CLI

You can also run these tests using the dotnet CLI, available via `brew`.
To install the dotnet CLI:

```
   brew install dotnet
```

When that's finished installing, you should be able to manage dependencies
with Nuget, build the project, and run the tests.

## Download Dependencies via Nuget

```
   dotnet restore
```

## Build the Project

```
   dotnet build --configuration Release --no-restore
```

You can remove the `--no-restore` parameter to ensure that
dependencies are updated to their most recent versions each time you
build the application.

## Run the Tests

```
   dotnet test --no-restore --verbosity normal
```

Expect a few warnings when you run the tests, mostly about fields and
variables that are declared but never used -- these cases are important
for certain code samples, so there isn't much we can do about those
warnings. The dotnet CLI should show you any errors or warnings that
occur during all tests and their respective SetUp/TearDown methods, as
well as a nifty summary of how many tests passed:

```
Test Run Successful.
Total tests: 18
     Passed: 18
 Total time: 14.0003 Seconds
     2>Done Building Project "/Users/nathan.contino/Documents/docs-realm/examples/dotnet/Examples/Examples.csproj" (VSTest target(s)).
     1>Done Building Project "/Users/nathan.contino/Documents/docs-realm/examples/dotnet/dotnet.sln" (VSTest target(s)).
```

## Run a Singular Test

```
dotnet test --filter "FullyQualifiedName=Examples.[NAME_OF_THE_FILE]" 
```

- NAME_OF_THE_FILE: Name of the test file without the file extension. 
   - Ex. If the file is BaseURLChange.cs, NAME_OF_THE_FILE = BaseURLChange

# The Testing Backend

You can find the backend MongoDB Realm App used for these tests in the
CHT organization of Atlas in a project called Realmtest [here](https://services.cloud.mongodb.com/groups/5ed68f962ffddd4c32690cfd/apps/5f5fe0a7991e260dd9941711).
If you need permissions for tasks like editing schemas or enabling/disabling
Sync, you can request permissions from the current project owners,
Caleb Thompson and Nathan Contino.


# Upgrading Realm Version

If you are writing code in unit tests that apply to either the `LocalOnly/`,
`Examples/`, or `ConsoleTests/` folders and the changes require an update Realm
version, you will have to update the following files for each folder,
respectively:

- `examples/dotnet/LocalOnly/LocalOnly.csproj`
- `examples/dotnet/Examples/Examples.csproj`
- `examples/dotnet/ConsoleTests/ConsoleTests.csproj` 
