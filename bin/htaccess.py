import sys
import yaml
import makecloth.utils as utils
from docs_meta import PUBLISHED_BRANCHES

def process_redirect(redirect):
    if 'all' in redirect['outputs']:
        redirect['outputs'].remove('all')
        for branch in PUBLISHED_BRANCHES:
            redirect['outputs'].append(branch)

    for output in redirect['outputs']:
        if output.startswith('after-'):
            version = output.split('-', 1)[1]
            idx = PUBLISHED_BRANCHES.index(version)

            redirect['outputs'].remove(output)
            redirect['outputs'].extend(PUBLISHED_BRANCHES[:idx])

    if redirect['code'] in [ 301, 302, 303 ]:
        redirect['code'] = str(redirect['code'])
    else:
        raise Exception(str(redirect['code']) + ' is not a supported redirect code')

    if len(redirect['outputs']) > 1:
        redirect['match'] = True
        base = ''
        for path in redirect['outputs']:
            base += path + '|'
        redirect['base'] = base[:-1]
    else:
        redirect['match'] = False
        redirect['base'] = redirect['outputs'][0]

    return redirect

def generate_redirects(redir):
    if redir['match'] is True:
        o = 'RedirectMatch {0} /({1}){2} http://docs.mongodb.org/$1{3}'.format(redir['code'], 
                                                                           redir['base'], 
                                                                           redir['redirect-path'],
                                                                           redir['url-base'])
    else:
        o = 'Redirect {0} /{1}{2} http://docs.mongodb.org/{3}{4}'.format(redir['code'],
                                                                    redir['base'],
                                                                    redir['redirect-path'],
                                                                    redir['base'],
                                                                    redir['url-base'])

    o += '\n'
    return o

def main():
    lines = []

    for doc in utils.ingest_yaml(utils.get_conf_file(__file__)):
        if doc['type'] == 'redirect':
            lines.append(generate_redirects(process_redirect(doc)))

    with open(sys.argv[1], 'w') as f:
        for line in lines:
            f.write(line)

    print('[redirect]: regenerated ' + sys.argv[1] + ' file.' )


if __name__ == '__main__':
    main()
