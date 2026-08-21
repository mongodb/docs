The ``$tumblingWindow`` stage batches the remaining events so the
pipeline writes one summarized count per interval instead of writing
on every event:

- The window groups events into one-second, non-overlapping
  intervals based on processing time.

- Within each window, the nested ``$group`` stage sums the deltas
  for each purchase method and records when the window started.
