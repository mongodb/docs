#
#
import subprocess

def shell_value(command):
    output = subprocess.check_output(command, shell=True).decode().split('\n')[0]
    return output

class VersionMeta:
    branch = shell_value('git symbolic-ref HEAD 2>/dev/null').split('/')[2]
    commit = shell_value('git rev-parse --verify HEAD')
