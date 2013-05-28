#!/usr/bin/python

import sys
import os
import shutil
import hashlib
import argparse 

def md5_file(file, block_size=2**20):
    md5 = hashlib.md5()

    f = open(file, 'rb')
    
    for chunk in iter(lambda: f.read(128*md5.block_size), b''):
        md5.update(chunk)

    return md5.hexdigest()

def send_output(message, quiet):
    if quiet is True:
        pass
    else:
        print(message)

def copy_if_needed(input_file, output_file, builder='build', quiet=False):
    if os.path.isfile(input_file) is False:
        exit("[" + builder + "]: ERROR: Input file doesn't exist. Call this script later in the build process.")
    elif os.path.isfile(output_file) is False:
        if not os.path.exists(os.path.dirname(output_file)):
            os.makedirs(os.path.dirname(output_file))
        shutil.copyfile(input_file, output_file)
        send_output('[' + builder + ']: created "' + output_file + '," which did not exist.', quiet)
    else:
        if md5_file(input_file) == md5_file(output_file): 
            send_output('[' + builder + ']: "' + input_file + '" not changed.', quiet)
        else: 
            shutil.copyfile(input_file, output_file)
            send_output('[' + builder + ']: "' + input_file + '" changed.', quiet)

def user_input():
    parser = argparse.ArgumentParser("File hashing and comparison to let make do awesome things.")
    parser.add_argument('--input', '-i', help='Input filename.')
    parser.add_argument('--output', '-o', help='Output filename.')
    parser.add_argument('--quiet', '-q', help='Disable output.', default=False)
    parser.add_argument('--builder', '-b', help='Buildername. Output only.', default='build')

    return parser.parse_args()

def main():
    interface = user_input()

    copy_if_needed(interface.input, interface.output, interface.builder, interface.quiet)

if __name__ == '__main__':
    main()
