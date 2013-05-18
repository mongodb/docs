import sys
import os.path
import argparse
import json
from multiprocessing import cpu_count

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
import utils
from makecloth import MakefileCloth

m = MakefileCloth()

def generate_targets(images):
    image_files = []
    image_rst_files = []

    for image in images:
        b = image['name']
        source_base = '/'.join([image['dir'], image['name']])
        source_file = source_base + '.svg'

        m.section_break(image['name'], block=b)
        m.newline(block=b)

        for output in image['output']:
            if 'tag' in output:
                tag = '-' + output['tag']
            else:
                tag = ''

            target = source_base + tag + '.png'
            image_files.append(target)
            inkscape_cmd = '$(INKSCAPEBIN) -z -d {0} -w {1} -y 0.0 -e >/dev/null'.format(output['dpi'], output['width'])

            m.target(target, source_file, block=b)
            m.job('{0} {1} {2}'.format(inkscape_cmd, target, source_file), block=b)
            m.msg('[image]: inkscape generated images for "%s."' % b, block=b)
            m.newline(block=b)

        rst_file = source_base + '.rst'
        image_rst_files.append(rst_file)
        m.target(rst_file, 'bin/rstcloth/images.py source/images/metadata.yaml', block=b)
        m.job("$(PYTHONBIN) bin/rstcloth/images.py '%s'" % json.dumps(image), block=b)
        m.msg('[image]: generating rst file for %s' % b, block=b)

    b = 'footer'
    m.section_break('meta targets', block=b)
    m.newline(block=b)

    m.target('.PHONY', 'images clean-images clean-images-rst', block=b)
    m.newline(block=b)
    m.target('images', image_files, block=b)
    m.newline(block=b)
    m.target('images-rst', image_rst_files, block=b)
    m.newline(block=b)
    m.target('clean-images', block=b)
    m.job('rm -f ' + ' '.join(image_files), ignore=True, block=b)
    m.msg('[clean-images] removed all generated images.', block=b)
    m.newline(block=b)
    m.target('clean-images-rst', block=b)
    m.job('rm -f ' + ' '.join(image_rst_files), ignore=True, block=b)
    m.msg('[clean-images-rst] removed all generated rst files for images.', block=b)

def main():
    parser = argparse.ArgumentParser('image generator')
    parser.add_argument('output', action='store', default='build/makefile.images', help='config file name.')
    parser.add_argument('dir', action='store', default='source/images', help='path to images directory.')
    parser.add_argument('config', action='store', default='metadata.yaml', help='config file name.')
    ui = parser.parse_args()

    conf = '/'.join([ui.dir, ui.config])

    images = utils.ingest_yaml_list(conf)
    for image in images:
        image['dir'] = ui.dir

    generate_targets(images)

    m.write(ui.output)

    print('[meta-build]: built "' + sys.argv[1] + '" to specify images.')

if __name__ == '__main__':
    main()
