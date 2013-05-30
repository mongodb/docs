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

@task
def manpage_url():
    if env.input_file is None:
        abort('[man]: you must specify input and output files.')

    project_source = 'source'

    top_level_items = set()
    for fs_obj in os.listdir(project_source):
        if fs_obj.startswith('.static') or fs_obj == 'index.txt':
            continue
        if os.path.isdir(os.path.join(project_source, fs_obj)):
            top_level_items.add(fs_obj)
        if fs_obj.endswith('.txt'):
            top_level_items.add(fs_obj[:-4])

    top_level_items = '/' + '.*|/'.join(top_level_items)
    re_string = '(\\\\fB({0}.*)\\\\fP)'.format(top_level_items)

    with open(env.input_file, 'r') as f:
        manpage = f.read()

    manpage = re.sub(re_string, "http://docs.mongodb.org/manual\\2", manpage)

    with open(env.input_file, 'w') as f:
        f.write(manpage)

    puts("[{0}]: fixed urls in {1}".format('man', env.input_file))
