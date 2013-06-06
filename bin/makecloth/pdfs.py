#!/usr/bin/python

import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
import utils
from makecloth import MakefileCloth
from docs_meta import render_paths, get_manual_path

m = MakefileCloth()

paths = render_paths('dict')

correction = "'s/(index|bfcode)\{(.*!*)*--(.*)\}/\\1\{\\2-\{-\}\\3\}/g'"
link_correction = "'s%\\\\\code\{/%\\\\\code\{http://docs.mongodb.org/" + get_manual_path() + "/%g'"
pdf_latex_command = 'TEXINPUTS=".:{0}/latex/:" pdflatex --interaction batchmode --output-directory {0}/latex/ $(LATEXOPTS)'.format(paths['branch-output'])

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
    m.job('sed $(SED_ARGS_FILE) -e {0} -e {0} -e {1} {2}'.format(correction, link_correction, generated_latex))
    m.msg('[latex]: fixing $@ TeX from the Sphinx output.')

    m.target(target=built_tex, dependency=generated_latex)
    m.job('fab process.input:{0} process.output:{1} process.copy_if_needed:pdf'.format(generated_latex, built_tex))
    m.msg('[pdf]: updated "' + built_tex + '" for pdf generation.')

    m.target(target=staged_pdf_branch, dependency=built_pdf)
    m.job('cp {0} {1}'.format(built_pdf, staged_pdf_branch))
    m.msg('[pdf]: migrated ' + staged_pdf)

    m.target(target=staged_pdf, dependency=staged_pdf_branch)
    m.job('fab process.input:{0} process.output:{1} process.create_link'.format(name_tagged_branch_pdf, staged_pdf))
    m.msg('[pdf]: created link for ' + staged_pdf)

    return staged_pdf

def build_all_pdfs(pdfs):
    manual_pdfs = []

    for pdf in pdfs:
        name = pdf['output'].rsplit('.', 1)[0]
        pdf = pdf_makefile(name, pdf['tag'])
        manual_pdfs.append(pdf)

    m.newline()

    m.section_break('pdf build system')
    makefile_footer()

    m.newline()

    m.target(target='.PHONY', dependency='manual-pdfs')
    m.target(target='manual-pdfs', dependency=manual_pdfs)
    m.target(target='clean-pdfs')
    m.job('rm -f ' + ' '.join(manual_pdfs), ignore=True)
    m.msg('[pdf]: cleaned all compiled pdfs')

def makefile_footer():
    b = 'meta'

    m.target('pdfs', utils.expand_tree(os.path.join(paths['branch-output'], 'latex'), 'tex'), block=b)

    m.newline()
    m.target('%.pdf', '%.tex', block=b)
    m.job("{0} $(LATEXOPTS) '$<' >|$@.log".format(pdf_latex_command), block=b)
    m.msg("[pdf]: \(1/4\) pdflatex $<", block=b)
    m.job("makeindex -s $(output)/latex/python.ist '$(basename $<).idx' >>$@.log 2>&1", ignore=True, block=b)
    m.msg("[pdf]: \(2/4\) Indexing: $(basename $<).idx", block=b)
    m.job("{0} $(LATEXOPTS) '$<' >|$@.log".format(pdf_latex_command), block=b)
    m.msg("[pdf]: \(3/4\) pdflatex $<", block=b)
    m.job("{0} $(LATEXOPTS) '$<' >|$@.log".format(pdf_latex_command), block=b)
    m.msg("[pdf]: \(4/4\) pdflatex $<", block=b)
    m.msg("[pdf]: see '$@.log' for a full report of the pdf build process.", block=b)

def main():
    conf_file = utils.get_conf_file(__file__)
    build_all_pdfs(utils.ingest_yaml(conf_file))

    m.write(sys.argv[1])
    print('[meta-build]: built "' + sys.argv[1] + '" to specify pdf builders.')

if __name__ == '__main__':
    main()
