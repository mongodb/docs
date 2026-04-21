Go tests use the built-in ``testing`` package:

.. code-block:: go

   func TestFindMoviesByYear(t *testing.T) {
       // 1. Set up + 4. Clean up: defer runs
       //    cleanup after the test finishes
       _, cleanup := setupTestDB(t)
       defer cleanup()

       // 2. Run: call the example function
       result := examples.FindMoviesByYear()
       // 3. Assert: compare to expected output
       compare.ExpectThat(t, result).
           WithIgnoredFields("_id").
           ShouldMatch("path/to/output.json")
   }
