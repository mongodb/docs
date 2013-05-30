from fabric.api import cd, local, task, env, hide, settings
from fabric.utils import puts
from multiprocessing import cpu_count
import pkg_resources
import docs_meta
import datetime

paths = docs_meta.render_paths(True)

def get_tags(target):
    if target.startswith('html') or target.startswith('dirhtml'):
        return 'website'
    else:
        return 'print'

def timestamp(form='filename'):
    if form == 'filename':
        return datetime.datetime.now().strftime("%Y-%m-%d.%H-%M")
    else:
        return datetime.datetime.now().strftime("%Y-%m-%d, %H:%M %p")

def get_sphinx_args(nitpick=None):
    o = ''

    if pkg_resources.get_distribution("sphinx").version == '1.2b1-xgen-dev-20130529':
         o += '-j ' + str(cpu_count() + 1) + ' '

    if nitpick is not None:
        o += '-n -w {0}/build.{1}.log'.format(paths['branch-output'], timestamp('filename'))

    return o

@task
def build(builder='html', nitpick=None):
    with settings(host_string='sphinx'):
        with hide('running'):

            local('mkdir -p {0}/{1}'.format(paths['branch-output'], builder))

            puts('[{0}]: created {1}/{2}'.format(builder, paths['branch-output'], builder))
            puts('[{0}]: starting {0} build {1}'.format(builder, timestamp()))

            cmd = 'sphinx-build -b {0} -t {1} -q -d {2}/doctrees-{0} -c ./ {3} {2}/source {2}/{0}'

            if builder.startswith('epub'):
                cmd += ' 2>&1 1>&3 | grep -v "WARNING: unknown mimetype" | grep -v "WARNING: search index" 1>&2; 3>&1'

            local(cmd.format(builder, get_tags(builder), paths['branch-output'], get_sphinx_args(nitpick)))

            if builder.startswith('linkcheck'):
                puts('[{0}]: See {1}/{0}/output.txt for output.'.format(builder, paths['branch-output']))

            puts('[build]: completed {0} build at {1}'.format(builder, timestamp()))
