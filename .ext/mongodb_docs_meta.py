#
#
import subprocess
import re

def shell_value( args ):
    import subprocess
    if isinstance( args , str ):
        r = re.compile( "\s+" )
        args = r.split( args )
    p = subprocess.Popen( args , stdout=subprocess.PIPE , stderr=subprocess.PIPE )
    r = p.communicate()
    value = r[0].decode().rstrip()
    return value

class VersionMeta:
    branch = shell_value('git symbolic-ref HEAD').split('/')[2]
    commit = shell_value('git rev-parse --verify HEAD')
