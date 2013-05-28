import json
import re
import os 

from docs_meta import get_manual_path
from fabric.api import task, env, abort, puts, local

env.input_file = None
env.output_file = None

@task
def input(fn):
    env.input_file = fn

@task
def output(fn):
    env.output_file = fn

@task
def json_output():
    if env.input_file is None or env.output_file is None:
        abort('[json]: you must specify input and output files.')

    with open(env.input_file, 'r') as f:
        document = f.read()

    doc = json.loads(document)
    
    if 'body' not in doc:
        pass
    else:
        text = doc['body'].encode('ascii', 'ignore')

        text = re.sub('<[^>]*>', '', text)
        text = re.sub('&#8220;', '"', text)
        text = re.sub('&#8221;', '"', text)
        text = re.sub('&#8216;', "'", text)
        text = re.sub('&#8217;', "'", text)
        text = re.sub('&#\d{4};', '', text)

        doc['text'] = ' '.join(text.split('\n')).strip()

        url = [ 'http://docs.mongodb.org', get_manual_path() ]
        url.extend(env.input_file.rsplit('.', 1)[0].split('/')[3:])

        doc['url'] = '/'.join(url)

    with open(env.output_file, 'w') as f:
        f.write(json.dumps(doc))

