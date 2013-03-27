import yaml
import sys
import os.path

def ingest_yaml(filename):
    o = []
    with open(filename, 'r') as f:
        data = yaml.load_all(f)

        for i in data:
            o.append(i)

    if len(o) == 1:
        o = o[0]

    return o

def get_conf_file(file):
    return file.rsplit('.', 1)[0] + '.yaml'

def build_platform_notification(title, content):
    if sys.platform.startswith('darwin'):
        return 'growlnotify -n "mongodb-doc-build" -a "Terminal.app" -m %s -t %s' % (title, content)
    if sys.platform.startswith('linux'):
        return 'notify-send "%s" "%s"' % (title, content)
