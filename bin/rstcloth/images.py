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

    r.directive('only', 'latex', )
    r.newline()
    r.directive('image', '/images/{0}-print.png'.format(image), fields=[('alt', alt), ('align', 'center')], indent=3 )
    r.newline(2)
    r.directive('only', 'not latex', )
    r.newline()
    r.directive('image', '/images/{0}.png'.format(image), fields=[('alt', alt), ('align', 'center')], indent=3 )
    r.write(image + '.rst')
    print('[image]: building rst for images generated from %s.svg' % image)

def main():
    parser = argparse.ArgumentParser('image generator')    
    parser.add_argument('--jobs', '-j', action='store', type=int, default=2, help='number of files to write at once.')
    parser.add_argument('--dir', '-d', action='store', default='source/images', help='path to images directory')
    parser.add_argument('--config', '-c', action='store', default='metadata.yaml', help='config file name.')
    ui = parser.parse_args()

    images = utils.ingest_yaml_list('/'.join([ui.dir, ui.config]))
    for image in images:
        image['dir'] = ui.dir

    if ui.jobs == 1: 
        for image in images:
            generate_pages(image)
    else:
        p = Pool(ui.jobs)
        p.apply_async(generate_pages, images)
        p.close()
        p.join()

if __name__ == '__main__':
    main()
