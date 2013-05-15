import sys
import os.path
import argparse
from multiprocessing import Pool

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import makecloth.utils as utils
from rstcloth import RstCloth

r = RstCloth()

def generate_pages(conf):
    image = '/'.join([conf['dir'], conf['name']])
    alt = conf['alt']
    b = conf['name']

    for output in conf['output']:
        if output['type'] == 'print':
            r.directive('only', 'latex', block=b)
        else:
            r.directive('only', 'not latex', block=b)

        r.newline()

        if output['tag'] == '':
            tag = '.png'
        else:
            tag = '-' + output['tag'] + '.png'

        r.directive('image', '/images/{0}{1}'.format(image, tag), fields=[('alt', alt), ('align', 'center')], indent=3, block=b)
        r.newline(block=b)

    r.write(image + '.rst')

def main():
    parser = argparse.ArgumentParser('image generator')
    parser.add_argument('--jobs', '-j', action='store', type=int, default=2, help='number of files to write at once.')
    parser.add_argument('--dir', '-d', action='store', default='source/images', help='path to images directory.')
    parser.add_argument('--config', '-c', action='store', default='metadata.yaml', help='config file name.')
    parser.add_argument('--quiet', '-q', action='store_true', default=False, help='suppress output to stdout.')

    ui = parser.parse_args()

    if ui.jobs > 1:
        p = Pool(ui.jobs)

    images = utils.ingest_yaml_list('/'.join([ui.dir, ui.config]))
    for image in images:
        image['dir'] = ui.dir
        image['quiet'] = ui.quiet

        if ui.jobs == 1:
            generate_pages(image)
        else:
            p.apply_async(generate_pages, image)

    if ui.jobs > 1:
        p.close()
        p.join()

    if ui.quiet == False:
        print('[image]: building rst for all images.')




if __name__ == '__main__':
    main()
