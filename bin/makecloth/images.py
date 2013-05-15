import sys
import os.path
import argparse
import json
from multiprocessing import cpu_count

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
import makecloth.utils as utils
from makecloth import MakefileCloth

m = MakefileCloth()

def generate_targets(image):
    b = image['name']
    source_base = '/'.join([image['dir'], image['name']])
    source_file = source_base + '.svg'

    m.section_break(image['name'], block=b)
    m.newline(block=b)

    rst_files = []
    for output in image['output']:
        target = source_base + output['tag'] + '.png'
        inkscape_cmd = '$(INKSCAPEBIN) -z -d {0} -w {1} -y 0.0 -e >/dev/null'.format(output['dpi'], output['width'])

        m.target(target, source_file, block=b)
        m.job('{0} {1} {2}'.format(inkscape_cmd, target, source_file), block=b)
        m.msg('[image]: inkscape generated images for "%s."' % b, block=b)
        m.append_var('image-output', target, block=b)
        m.newline(block=b)

    rst_file = source_base + '.rst'
    m.append_var('image-rst-files', rst_file, block=b)
    m.target(rst_file, 'bin/rstcloth/images.py source/images/metadata.yaml', block=b)
    m.job("$(PYTHONBIN) bin/rstcloth/images.py '%s'" % json.dumps(image), block=b)
    m.msg('[image]: generating rst file for %s' % b, block=b)

def generate_make_footer():
    b = 'footer'

    m.section_break('meta targets', block=b)
    m.newline(block=b)

    m.target('.PHONY', 'images clean-images', block=b)
    m.newline(block=b)
    m.target('images', '$(image-output) images-rst', block=b)
    m.target('images-rst', '$(image-rst-files)', block=b)
    m.newline(block=b)
    m.target('clean-images', block=b)
    m.job('rm -f $(image-output) $(image-rst-files)', ignore=True, block=b)
    m.msg('[clean-images] removed all generated image content.', block=b)

def main():
    parser = argparse.ArgumentParser('image generator')
    parser.add_argument('output', action='store', default='build/makefile.images', help='config file name.')
    parser.add_argument('dir', action='store', default='source/images', help='path to images directory.')
    parser.add_argument('config', action='store', default='metadata.yaml', help='config file name.')

    ui = parser.parse_args()

    conf = '/'.join([ui.dir, ui.config])

    for image in utils.ingest_yaml_list(conf):
        image['dir'] = ui.dir

        generate_targets(image)

    generate_make_footer()

    m.write(ui.output)

    print('[meta-build]: built "' + sys.argv[1] + '" to specify images.')

if __name__ == '__main__':
    main()
