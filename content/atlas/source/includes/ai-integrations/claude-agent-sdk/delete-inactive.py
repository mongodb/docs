from datetime import timedelta

# Delete every session with no new entries in the last 30 days.
deleted = await store.delete_inactive(timedelta(days=30))
print(f"Deleted {deleted} inactive sessions.")
