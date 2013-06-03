import sys
import os.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../bin')))

import deploy
import sphinx
import clean
import git
import intersphinx
import process
import delegated

import fabric
fabric.state.output.status = False
fabric.state.output.aborts = True
fabric.state.output.warnings = True
fabric.state.output.running = True
fabric.state.output.user = True
