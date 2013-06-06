import sys
import argparse
import yaml
import utils

from docs_meta import PUBLISHED_BRANCHES

def process_redirect(redirect):
    if 'all' in redirect['outputs']:
        redirect['outputs'].remove('all')
        for branch in PUBLISHED_BRANCHES:
            redirect['outputs'].append(branch)

    for output in redirect['outputs']:
        if output.startswith('after-'):
            idx = PUBLISHED_BRANCHES.index(output.split('-', 1)[1])

            redirect['outputs'].remove(output)
            redirect['outputs'].extend(PUBLISHED_BRANCHES[:idx])
        elif output.startswith('before-'):
            idx = PUBLISHED_BRANCHES.index(output.split('-', 1)[1])

            redirect['outputs'].remove(output)
            redirect['outputs'].extend(PUBLISHED_BRANCHES[idx:])

    if redirect['code'] in [ 301, 302, 303 ]:
        redirect['code'] = str(redirect['code'])
    else:
        raise Exception(str(redirect['code']) + ' is not a supported redirect code')

    return redirect

def generate_match_rule(redir, base):
    o = 'RedirectMatch {0} /({1}){2} http://docs.mongodb.org/$1{3}'

    return o.format(redir['code'], base, redir['redirect-path'],
                    redir['url-base'])

def generate_simple_rule(redir, base=None):
    if base is None:
        base = redir['outputs'][0]

    o = 'Redirect {0} /{1}{2} http://docs.mongodb.org/{3}{4}'

    return o.format(redir['code'], base, redir['redirect-path'],
                    base, redir['url-base'])

def determine_is_multi(targets):
    if len(targets) > 1:
        return True
    else:
        return False

def generate_redirects(redirect, match=False):
    multi = determine_is_multi(redirect['outputs'])

    if multi and match is True:
        _base = ''
        for path in redirect['outputs']:
            _base += path + '|'
        base = _base[:-1]

        o = generate_match_rule(redirect, base)
        o += '\n'
    elif multi is True and match is False:
        o = ''
        for output in redirect['outputs']:
            o += generate_simple_rule(redirect, output)
            o += '\n'
    elif multi is False:
        o = generate_simple_rule(redirect)
        o += '\n'

    return o

def user_input():
    parser = argparse.ArgumentParser('.htaccess generator.')
    parser.add_argument('filename', nargs='?', default='.htaccess',
                        help='the name of the file to generate. Defaults to ".htaccess"')
    parser.add_argument('--match', '-m', action='store_true', default=False,
                        help='generate RedirectMatch if specified, rather than the default Redirect rules.')
    parser.add_argument('--data', '-d', action='store',
                        help='the .yaml file containing the redirect information.')
    return parser.parse_args()

def main():
    ui = user_input()

    lines = []

    for doc in utils.ingest_yaml(ui.data):
        if doc['type'] == 'redirect':
            lines.append(generate_redirects(process_redirect(doc), match=ui.match))
        if doc['type'] == 'redirect-draft':
            print(generate_redirects(process_redirect(doc), match=ui.match))

    if lines:
        with open(ui.filename, 'w') as f:
            for line in lines:
                f.write(line)

        print('[redirect]: regenerated ' + ui.filename + ' file.' )


if __name__ == '__main__':
    main()
