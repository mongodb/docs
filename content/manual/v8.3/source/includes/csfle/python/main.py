"""
Main script to run the CSFLE example.
First generates a data encryption key, then inserts an encrypted document.
"""

import subprocess
import sys

def run_script(script_name):
    """Run a Python script and exit if it fails."""
    print(f"\n{'='*60}")
    print(f"Running {script_name}...")
    print('='*60)
    result = subprocess.run([sys.executable, script_name])
    if result.returncode != 0:
        print(f"\nError: {script_name} failed with exit code {result.returncode}")
        sys.exit(result.returncode)

if __name__ == "__main__":
    run_script("make_data_key.py")
    run_script("insert_encrypted_document.py")
    print("\n" + "="*60)
    print("All scripts completed successfully!")
    print("="*60)
