from datetime import timedelta

def format_time(ms):
    """Convert milliseconds to a human-readable format"""
    delta = timedelta(milliseconds=ms)

    # Extract minutes, seconds, and milliseconds with more precision
    minutes = delta.seconds // 60
    seconds = delta.seconds % 60
    milliseconds = round(ms % 1000, 3)  # Keep 3 decimal places for milliseconds

    # Format based on duration
    if minutes > 0:
        return f"{minutes}m {seconds}.{milliseconds:03.0f}s"
    elif seconds > 0:
        return f"{seconds}.{milliseconds:03.0f}s"
    else:
        return f"{milliseconds:.3f}ms"