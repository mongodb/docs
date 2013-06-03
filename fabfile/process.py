import json
import re
import os
import shutil

from utils import md5_file
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


@task
def copy_if_needed(builder='build'):
    if os.path.isfile(env.input_file) is False:
        abort("[{0}]: Input file does not exist.".format(builder))
    elif os.path.isfile(env.output_file) is False:
        if not os.path.exists(os.path.dirname(env.output_file)):
            os.makedirs(os.path.dirname(env.output_file))
        shutil.copyfile(env.input_file, env.output_file)
        puts('[{0}]: created "{1}" which did not exist.'.format(builder, env.input_file))
    else:
        if md5_file(env.input_file) == md5_file(env.output_file):
            puts('[{0}]: "{1}" not changed.'.format(builder, env.input_file))
        else:
            shutil.copyfile(env.input_file, env.output_file)
            puts('[{0}]: "{1}" changed.'.format(builder, env.input_file))

@task
def create_link():
    if os.path.exists(env.output_file):
        if os.path.islink(env.output_file):
            os.remove(env.output_file)
        elif os.path.isdir(env.output_file):
            abort('[{0}]: {1} exists and is a directory'.format('link', env.output_file))
        else:
            abort('[{0}]: could not create a symlink at {1}.'.format('link', env.output_file))
    else:
        os.symlink(env.input_file, env.output_file)
        puts('[{0}] created symbolic link pointing to "{1}" named "{2}"'.format('symlink', env.output_file, env.input_file))
