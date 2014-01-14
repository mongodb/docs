import os
import subprocess
import argparse
import yaml
import sys

project_root = os.path.abspath(os.path.dirname(__file__))

master_conf = os.path.join(project_root, 'bin', 'docs_meta.yaml')

with open(master_conf, 'r') as f:
    conf = yaml.safe_load(f)

buildsystem = conf['build']['paths']['buildsystem']

sys.path.append(os.path.join(buildsystem, 'bin'))

def bootstrap_init():
    repo = 'git://github.com/{0}.git'.format(conf['git']['remote']['tools'])

    if os.path.exists(buildsystem):
        import bootstrap_helper

        cmd = []
        cmd.append(['git', 'reset', '--quiet', '--hard', bootstrap_helper.reset_ref])
        cmd.append(['git', 'pull', '--quiet', 'origin', 'master'])

        for c in cmd:
            subprocess.call(c, cwd=buildsystem)

        print('[bootstrap]: updated git repository.')

def bootstrap_base():
    if not os.path.exists(buildsystem):
        subprocess.call([ 'git', 'clone', repo, buildsystem])
        print('[bootstrap]: created buildsystem directory.')

    import bootstrap_helper
        
    bootstrap_helper.init_fabric(buildsystem, master_conf)
    bootstrap_helper.bootstrap()
    print('[bootstrap]: initialized buildsystem.')
    
    subprocess.call(['make', 'noop', '--silent', '-i'])

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('op', nargs='?', choices=['clean', 'setup', 'safe'], default='setup')
    ui = parser.parse_args()

    if ui.op == 'clean':
        try:
            import bootstrap_helper
            bootstrap_helper.clean_buildsystem(buildsystem, conf['build']['paths']['output'])
        except ImportError:
            exit('[bootstrap]: Buildsystem not installed.')
    elif ui.op == 'safe':
        bootstrap_base()
    else: 
        bootstrap_init()
        bootstrap_base()


if __name__ == '__main__':
    main()
