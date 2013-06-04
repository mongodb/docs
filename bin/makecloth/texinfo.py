#!/usr/bin/python

import sys
import os.path

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import utils
from makecloth import MakefileCloth

m = MakefileCloth()

def build_texinfo_manual(info):
    ofile = info + '-info-$(current-branch).tar.gz'
    build_loc = '$(branch-output)/texinfo/'
    build_output = build_loc + ofile
    info_outputs = '$(wildcard ' + info + '.info*)'

    m.comment(info + ' texinfo builder', block='content' )

    m.target(target=build_loc + info + '.texi',
        dependency='texinfo',
        block='content')

    m.target(target=build_loc + info + '.info',
        dependency=build_loc + info + '.texi',
        block='content')

    m.msg('[texinfo]: FORCING ' + info + '.info build: ERRORS IGNORED.', block='content')
    m.job('$(MAKEINFO) --no-warn --force -o $@ $<', ignore=True, block='content')
    m.msg('[texinfo]: creating ' +  info + '.info files', block='content')

    m.target(target=build_output,
        dependency=build_loc + info + '.info',
        block='content')
    m.job('touch $@.log', block='content')
    m.job('$(TARBIN) -C $(branch-output)/ --transform=s/texinfo/' + info + '-info/ ' +
          '-czvf $@ $(subst $(branch-output)/,,$(wildcard $(branch-output)/texinfo/' + info + '.info*)) >> $@.log',
          block='content')
    m.msg('[texinfo]: compressed "' + ofile + '"', block='content')

    m.target(target='$(public-branch-output)/' + ofile,
             dependency=build_loc + ofile)
    m.job('cp $< $@')
    m.msg('[build]: migrated $@')

    final_output = '$(public-branch-output)/' + info + '-info.tar.gz'
    m.target(target=final_output, dependency='$(public-branch-output)/' + ofile)
    m.job('fab process.input:{0} process.output:{1} process.create_link'.format(ofile, final_output))
    m.append_var('INFO_OUTPUT', final_output, block='content')


def main():
    m.section_break('texinfo manual builders for mongodb content', block='header')

    for info in utils.ingest_yaml(utils.get_conf_file(__file__)):
        build_texinfo_manual(info)

    m.comment('targets for integration')
    m.target(target='.PHONY',
             dependency='manual-info',
             block='footer')
    m.target(target='manual-info',
             dependency='$(INFO_OUTPUT)',
             block='footer')

    m.write(sys.argv[1])

if __name__ == '__main__':
    main()
    print('[meta-build]: built "' + sys.argv[1] + '" to specify texinfo builders.')
