#!/usr/bin/python

import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
import utils
from makecloth import MakefileCloth
from docs_meta import render_paths

m = MakefileCloth()

paths = render_paths('dict')

def pdf_makefile(name, tag):
    name_tagged = '-'.join([name, tag])
    name_tagged_pdf = name_tagged + '.pdf'
    name_tagged_branch_pdf = '-'.join([name, tag,  utils.get_branch()]) + '.pdf'
    
    generated_latex = '{0}/latex/{1}.tex'.format(paths['branch-output'], name)
    built_tex = '{0}/latex/{1}.tex'.format(paths['branch-output'], name_tagged)

    built_pdf = '{0}/latex/{1}'.format(paths['branch-output'], name_tagged_pdf)
    staged_pdf_branch = '{0}/{1}'.format(paths['branch-staging'], name_tagged_branch_pdf)
    staged_pdf = '{0}/{1}'.format(paths['branch-staging'], name_tagged_pdf)

    m.section_break(name)
    m.target(target=generated_latex, dependency='latex')
    m.job('sed $(SED_ARGS_FILE) -e $(LATEX_CORRECTION) -e $(LATEX_CORRECTION) -e $(LATEX_LINK_CORRECTION) ' + generated_latex)
    m.msg('[latex]: fixing $@ TeX from the Sphinx output.')

    m.target(target=built_tex, dependency=generated_latex)
    m.job('fab process.input:{0} process.output:{1} process.copy_if_needed:pdf'.format(generated_latex, built_tex))
    m.msg('[pdf]: updated "' + built_tex + '" for pdf generation.')

    m.target(target=staged_pdf_branch, dependency=built_pdf)
    m.job('cp {0} {1}'.format(built_pdf, staged_pdf_branch))
    m.msg('[pdf]: migrated ' + staged_pdf)

    m.target(target=staged_pdf, dependency=staged_pdf_branch)
    m.job('{0}/create-link {1} {2} {3}'.format(paths['tools'], name_tagged_branch_pdf, name_tagged_pdf, paths['branch-staging']))
    m.msg('[pdf]: created link for ' + staged_pdf)

    m.comment('adding ' + name + '.pdf to the build dependency.')

    return staged_pdf

def build_all_pdfs(pdfs):
    manual_pdfs = []

    for pdf in pdfs:
        name = pdf['output'].rsplit('.', 1)[0]
        pdf = pdf_makefile(name, pdf['tag'])
        manual_pdfs.append(pdf)

    m.newline()
    m.target(target='.PHONY', dependency='manual-pdfs')
    m.target(target='manual-pdfs', dependency=manual_pdfs)

def main():
    conf_file = utils.get_conf_file(__file__)
    build_all_pdfs(utils.ingest_yaml(conf_file))

    m.write(sys.argv[1])
    print('[meta-build]: built "' + sys.argv[1] + '" to specify pdf builders.')

if __name__ == '__main__':
    main()
