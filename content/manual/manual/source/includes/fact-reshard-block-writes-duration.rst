|method-or-command| blocks writes early and
forces resharding operations to complete.

During a resharding operation, MongoDB does not block writes until the 
estimated duration to complete the resharding operation is below a certain 
value. In MongoDB 8.0.12 or earlier, this value is two seconds. In MongoDB 8.0.13
or later, this value is 500 milliseconds.

If the current estimated duration is above the threshold but the time frame is
acceptable to you, you can finish resharding faster by calling |method-or-command|.
This blocks writes early and forces the resharding operation to complete.