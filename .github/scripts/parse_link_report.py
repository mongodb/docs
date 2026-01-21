#!/usr/bin/env python3
"""Parse lychee JSON output and create webhook payload for AI link fixer."""

import json
import sys
from datetime import datetime


def main():
    try:
        with open('/tmp/link-report.json', 'r') as f:
            data = json.load(f)

        broken_links = []
        fail_map = data.get('fail_map', {})

        for file_path, failures in fail_map.items():
            for failure in failures:
                status_info = failure.get('status', {})
                if isinstance(status_info, dict):
                    status_text = status_info.get('text', str(status_info.get('code', 'unknown')))
                else:
                    status_text = str(status_info)
                broken_links.append({
                    'file': file_path,
                    'url': failure.get('url', ''),
                    'status': status_text,
                })

        payload = {
            'scan_date': datetime.utcnow().strftime('%Y-%m-%d'),
            'broken_links': broken_links
        }

        with open('/tmp/webhook-payload.json', 'w') as f:
            json.dump(payload, f, indent=2)

        print(len(broken_links))
    except Exception as e:
        print(f'Error: {e}', file=sys.stderr)
        print('0')


if __name__ == '__main__':
    main()
