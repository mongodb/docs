#!/bin/sh
# Wrapper script to run tests and send Slack notification with results

# Run tests and capture output (don't use set -e so we can capture failures)
echo "Running OpenAPI validation tests..."
TEST_OUTPUT=$(npm test 2>&1) || TEST_EXIT_CODE=$?
TEST_EXIT_CODE=${TEST_EXIT_CODE:-0}

echo "$TEST_OUTPUT"

# Send Slack notification if webhook URL is configured
if [ -n "$SLACK_WEBHOOK_URL" ]; then
    if [ "$TEST_EXIT_CODE" -eq 0 ]; then
        EMOJI="✅"
        STATUS="Passed"
    else
        EMOJI="❌"
        STATUS="Failed"
    fi

    # Extract test summary from output
    TEST_SUMMARY=$(echo "$TEST_OUTPUT" | grep -E "Tests:|Test Suites:" | tail -2 | tr '\n' ' ' || echo "See logs for details")

    # Build the message as a single string
    MESSAGE="$EMOJI *OpenAPI Validation CronJob*: $STATUS\n$TEST_SUMMARY"

    # Send to Slack Workflow webhook with single "message" field
    curl -s -X POST -H 'Content-type: application/json' \
        --data "{\"message\": \"$MESSAGE\"}" \
        "$SLACK_WEBHOOK_URL" || echo "Warning: Failed to send Slack notification"
fi

# Exit with original test exit code
exit $TEST_EXIT_CODE

