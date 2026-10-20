"""Regression test for release_schedule.py. Exits 1 on any mismatch."""
import json, os, subprocess, sys, tempfile

S = os.path.join(os.path.dirname(os.path.abspath(__file__)), "release_schedule.py")
H100 = "Major Version,Minor Version,Patch Version,Mongot Version,Branch Cut Date, 10% Release Date, 50% Release Date, 100% Release Date,Release Captain,Release Targets,Final Release Status,Release Dates Change Log (see change log tab for details),Release Notes,Release Feature Planning Notes,,"
HEA = "Major Version,Minor Version,Patch Version,Mongot Version,Branch Cut Date,Release Date,Release Captain,Release Targets,Final Release Status,,"
CAP = "<a href='mailto:x@mongodb.com'>X Y</a>"

tab1 = [H100,
    f'1, 73, 2,v1.73.2,"Tuesday, September 8, 2026","Wednesday, September 9, 2026","Thursday, September 10, 2026","Monday, September 14, 2026",{CAP},Atlas commercial,,,,',
    f'1, 76, 0,v1.76.0,"Thursday, September 24, 2026","Wednesday, September 30, 2026","Monday, October 5, 2026","Monday, October 5, 2026",{CAP},Atlas commercial,,,,']
tab_ea = [HEA, f'1, 70, 5,v1.70.5,"Tuesday, September 29, 2026","Wednesday, September 30, 2026",{CAP},"EA, Community",,,,']
tab_hist = [H100,
    f'1, 48, 0,v1.48.0,,"Tuesday, June 10, 2025",{CAP},, 100% Atlas Release,,,,,',
    f'1, 60, 0,v1.60.0,"Monday, January 12, 2026",none,{CAP},Community only,,,,',
    f'1, 73, 0,v1.73.0,"Thursday, August 13, 2026","Monday, August 24, 2026","Thursday, August 27, 2026","Wednesday, September 2, 2026",{CAP},,Paused at 50%,"9/2/2026: 1.73.0 canceled",x,,',
    f'1, 57, 0,v1.57.0,"Friday, November 21, 2025","Tuesday, December 2, 2025","Monday, December 8, 2025","Monday, December 15, 2025",{CAP},, 100% Atlas Release,,,,']
tab5 = [H100,
    f'1, 73, 1,v1.73.1,"Wednesday, September 2, 2026","Tuesday, September 8, 2026","Wednesday, September 9, 2026","Thursday, September 10, 2026",{CAP},Atlas commercial,ABANDONED at QA,"9/2/2026: x",,',
    f'1, 73, 2,v1.73.2,"Tuesday, September 8, 2026","Wednesday, September 9, 2026","Thursday, September 10, 2026","Monday, September 14, 2026",{CAP},Atlas commercial,,,,,',
    f'1, 76, 0,v1.76.0,"Thursday, September 24, 2026","Thursday, October 1, 2026","Monday, October 5, 2026","Monday, October 12, 2026",{CAP},Atlas commercial,,,,,,']


def table(rows):
    return "<table>" + "".join(f"<tr><td>{r}</td></tr>\n" for r in rows) + '<tr><td colspan="4"/>\n</table>\n'


page = "<html><body>" + "".join(table(t) for t in (tab1, tab_ea, tab_hist, tab5)) + "</body></html>"
glean = {"documents": [{"richDocumentData": {"content": json.dumps({"pageBody": page, "comments": []})}}]}
path = os.path.join(tempfile.mkdtemp(), "schedule.json")
json.dump(glean, open(path, "w"))

# (version, rc, found, planned_100_date, status, stderr substring or None for empty stderr)
EXPECTED = [
    ("1.73.2", 0, True, "2026-09-14", "planned", None),
    ("v1.76.0", 0, True, "2026-10-12", "planned", "tabs disagree on the 100% date"),
    ("1.73.1", 0, True, "2026-09-10", "abandoned", "schedule status is abandoned"),
    ("1.73.0", 0, True, "2026-09-02", "paused", "schedule status is paused"),
    ("1.57.0", 0, True, "2025-12-15", "released", None),
    ("1.48.0", 2, False, None, None, "cells do not line up with the header"),
    ("1.60.0", 2, False, None, None, "cells do not line up with the header"),
    ("1.70.5", 2, False, None, None, None),
    ("9.9.9", 2, False, None, None, None),
]

failures = []
for version, rc, found, date, status, warning in EXPECTED:
    p = subprocess.run([sys.executable, S, "--input", path, "--version", version], capture_output=True, text=True)
    r = json.loads(p.stdout) if p.stdout.strip().startswith("{") else {}
    err = p.stderr.strip()
    print(f"{version:8} rc={p.returncode} found={r.get('found')} date={r.get('planned_100_date')} "
          f"status={r.get('status')} {err}")
    actual = (p.returncode, r.get("found"), r.get("planned_100_date"), r.get("status"))
    if actual != (rc, found, date, status):
        failures.append(f"{version}: expected rc/found/date/status {(rc, found, date, status)}, got {actual}")
    if warning is None and err:
        failures.append(f"{version}: expected no stderr, got {err!r}")
    if warning is not None and warning not in err:
        failures.append(f"{version}: expected stderr containing {warning!r}, got {err!r}")

if failures:
    print(f"\nFAIL: {len(failures)} mismatch(es)")
    for f in failures:
        print(f"  {f}")
    sys.exit(1)
print(f"\nPASS: {len(EXPECTED)} versions")
