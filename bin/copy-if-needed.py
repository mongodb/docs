#!/usr/bin/python

import sys
import os.path 
import shutil
import hashlib

def md5_file(file, block_size=2**20):
    md5 = hashlib.md5()

    f = open(file, 'rb')
    
    for chunk in iter(lambda: f.read(128*md5.block_size), b''):
        md5.update(chunk)

    return md5.digest()

def send_output(message, verbosity):
    if verbosity is True:
        print(message)
    else:
        pass

def copy_if_needed(input_file, output_file, builder, verbosity=True):
    if not os.path.isfile(output_file):
        shutil.copyfile(input_file, output_file)
        send_output('[' + builder + ']: created "' + output_file + ';" rebuild needed.', verbosity)
    else:
        if md5_file(input_file) == md5_file(output_file):
            send_output('[' + builder + ']: no changes; no rebuild required.', verbosity)
        else: 
            shutil.copyfile(input_file, output_file)
            send_output('[' + builder + ']: changes require rebuild.', verbosity)

def main():
    generated_file = sys.argv[1]
    output_file = sys.argv[2]
        
    builder = 'PDF'

    if len(sys.argv) is 4:
        verbosity = False
    else:
        verbosity = True

    copy_if_needed(generated_file, output_file, builder, verbosity)

if __name__ == '__main__':
    main()
