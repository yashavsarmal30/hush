"""PyInstaller entry point for Hush headless engine service."""

import os
import sys

# Ensure repository root is on sys.path when running as source
REPO_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
if REPO_ROOT not in sys.path:
    sys.path.insert(0, REPO_ROOT)

from hush.service import main

if __name__ == "__main__":
    main()
