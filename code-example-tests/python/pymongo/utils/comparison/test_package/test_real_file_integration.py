"""
Test real-world integration with actual PyMongo example files using document comparison.
This demonstrates the library working with the existing examples using structured comparison.
"""

import unittest
from utils.comparison import Expect


class TestRealExampleFileIntegration(unittest.TestCase):
    """Test integration with real PyMongo example output files using document comparison."""

    def test_filter_tutorial_with_document_comparison(self):
        """Test structured document comparison with the filter tutorial output."""
        # Simulate the actual data that would come from running the filter tutorial
        # This represents what the aggregation pipeline would return after normalization
        simulated_actual_data = [
            {
                "person_id": "7363626383",
                "firstname": "Carl",
                "lastname": "Simmons",
                "dateofbirth": "1998-12-26T13:13:55.000Z",  # Normalized datetime
                "vocation": "ENGINEER",
            },
            {
                "person_id": "1723338115",
                "firstname": "Olive",
                "lastname": "Ranieri",
                "dateofbirth": "1985-05-12T23:14:30.000Z",  # Normalized datetime
                "gender": "FEMALE",
                "vocation": "ENGINEER",
            },
            {
                "person_id": "6392529400",
                "firstname": "Elise",
                "lastname": "Smith",
                "dateofbirth": "1972-01-13T09:32:07.000Z",  # Normalized datetime
                "vocation": "ENGINEER",
            },
        ]

        # This should now work with document comparison instead of just text comparison
        try:
            Expect.that(simulated_actual_data).should_match(
                "examples/aggregation/pipelines/filter/filter-tutorial-output.txt"
            )
        except Exception as e:
            self.fail(f"Document comparison failed: {e}")

    def test_real_aggregation_patterns(self):
        """Test patterns commonly found in MongoDB aggregation results."""
        expected_content = """
        {
          "first_purchase_date": datetime.datetime(2020, 1, 1, 8, 25, 37),
          "total_value": 63,
          "total_orders": 1,
          "orders": [
            {
              "orderdate": datetime.datetime(2020, 1, 1, 8, 25, 37),
              "value": 63
            }
          ],
          "customer_id": "oranieri@warmmail.com"
        }
        """

        actual_data = {
            "first_purchase_date": "2020-01-01T08:25:37.000Z",
            "total_value": 63,
            "total_orders": 1,
            "orders": [{"orderdate": "2020-01-01T08:25:37.000Z", "value": 63}],
            "customer_id": "oranieri@warmmail.com",
        }

        Expect.that(actual_data).should_match(expected_content)

    def test_document_comparison_vs_text_comparison(self):
        """Compare document comparison vs text comparison for tutorial validation."""

        # Simulate aggregation result data (what a real tutorial would produce)
        mock_aggregation_result = [
            {
                "person_id": "7363626383",
                "firstname": "Carl",
                "lastname": "Simmons",
                "dateofbirth": "1998-12-26T13:13:55.000Z",  # Normalized datetime
                "vocation": "ENGINEER",
            },
            {
                "person_id": "1723338115",
                "firstname": "Olive",
                "lastname": "Ranieri",
                "dateofbirth": "1985-05-12T23:14:30.000Z",  # Normalized datetime
                "gender": "FEMALE",
                "vocation": "ENGINEER",
            },
            {
                "person_id": "6392529400",
                "firstname": "Elise",
                "lastname": "Smith",
                "dateofbirth": "1972-01-13T09:32:07.000Z",  # Normalized datetime
                "vocation": "ENGINEER",
            },
        ]

        # Test 1: Document comparison with structured validation
        try:
            Expect.that(mock_aggregation_result).should_match(
                "examples/aggregation/pipelines/filter/filter-tutorial-output.txt"
            )
            document_comparison_result = "✅ PASSED"
        except Exception as e:
            document_comparison_result = f"❌ FAILED: {e}"

        # Test 2: Text comparison (current approach)
        # This simulates the text output that would be captured from print statements
        mock_text_output = (
            str(mock_aggregation_result[0])
            + "\n"
            + str(mock_aggregation_result[1])
            + "\n"
            + str(mock_aggregation_result[2])
        )

        try:
            with open(
                "examples/aggregation/pipelines/filter/filter-tutorial-output.txt", "r"
            ) as f:
                expected_text = f.read()
            Expect.that(mock_text_output).should_match(expected_text)
            text_comparison_result = "✅ PASSED"
        except Exception as e:
            text_comparison_result = f"❌ FAILED: {e}"

        print(f"\n=== Comparison Results ===")
        print(f"Document comparison: {document_comparison_result}")
        print(f"Text comparison: {text_comparison_result}")

        # Document comparison should work now that we have datetime parsing
        self.assertTrue(
            "✅ PASSED" in document_comparison_result,
            "Document comparison should pass with datetime parsing",
        )

    def test_robust_validation_with_with_ignored_fields(self):
        """Test robust validation that ignores generated fields like ObjectIds."""

        # Simulate realistic aggregation result with ObjectIds that would vary between runs
        variable_result = [
            {
                "_id": "507f1f77bcf86cd799439011",  # This would vary between test runs
                "person_id": "7363626383",
                "firstname": "Carl",
                "dateofbirth": "1998-12-26T13:13:55.000Z",
                "vocation": "ENGINEER",
            }
        ]

        # Expected content with ellipsis for _id field
        expected_content = """
        [
          {
            "_id": "...",
            "person_id": "7363626383",
            "firstname": "Carl",
            "dateofbirth": datetime.datetime(1998, 12, 26, 13, 13, 55),
            "vocation": "ENGINEER"
          }
        ]
        """

        # Test with ignore_field_values option        Expect.that(variable_result).should_match(expected_content)

    def test_partial_result_validation(self):
        """Test validation of partial results using ellipsis patterns."""

        # Simulate a large aggregation result where we only want to validate key fields
        large_result = [
            {
                "timestamp": "2020-01-01T08:25:37.000Z",
                "status": "completed",
                "result_data": {"items_processed": 1500, "errors": 0, "warnings": 2},
                "metadata": {
                    "server_id": "srv-001",
                    "process_id": 12345,
                    "memory_usage": "45MB",
                    "cpu_usage": "12%",
                },
            },
            # ... many more results ...
        ]

        # We only want to validate the essential fields, allowing for extra metadata
        expected_pattern = """
        ...
        [
          {
            "timestamp": datetime.datetime(2020, 1, 1, 8, 25, 37),
            "status": "completed",
            "result_data": {
              "items_processed": 1500,
              "errors": 0
            }
          }
        ]
        """

        # This should pass because global ellipsis allows extra fields
        Expect.that(large_result).should_match(expected_pattern)


if __name__ == "__main__":
    unittest.main()
