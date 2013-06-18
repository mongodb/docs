import os
import subprocess
import argparse
import yaml
import sys

master_conf = os.path.abspath(os.path.join('bin', 'docs_meta.yaml'))

with open(master_conf, 'r') as f:
    conf = yaml.safe_load(f)

buildsystem = conf['build']['paths']['buildsystem']

sys.path.append(os.path.join(buildsystem, 'bin'))

def bootstrap():
    repo = 'git@github.com:{0}.git'.format(conf['git']['remote']['tools'])

    if os.path.exists(buildsystem):
        import bootstrap_helper

        cmd = []
        cmd.append(['git', 'reset', '--quiet', '--hard', bootstrap_helper.reset_ref])
        cmd.append(['git', 'pull', '--quiet', 'origin', 'master'])

        for c in cmd:
            p = subprocess.Popen(c, cwd=buildsystem)
            p.wait()
        print('[bootstrap]: updated git repository.')
    else:
        p = subprocess.Popen([ 'git', 'clone', repo, buildsystem])
        p.wait()

        import bootstrap_helper
        print('[bootstrap]: created buildsystem directory.')

    bootstrap_helper.init_fabric(buildsystem, master_conf)
    bootstrap_helper.bootstrap()

    p = subprocess.Popen(['make', 'noop', '--silent', '-i'])
    p.wait()

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('op', nargs='?', choices=['clean', 'setup'], default='setup')
    ui = parser.parse_args()

    if ui.op == 'clean':
        try: 
            import bootstrap_helper
            bootstrap_helper.clean_buildsystem(buildsystem, conf['build']['paths']['output'])
        except ImportError:
            exit('[bootstrap]: Buildsystem not installed.')
    else:
        bootstrap()


if __name__ == '__main__':
    main()
