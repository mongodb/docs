#!/bin/python

ACCEPTABLE = 864000
msgid = 'intersphinx'


import sys
import os 
import time
import subprocess

def interface():
    try: 
        f = sys.argv[1]
    except IndexError:
        exit('[%s]: the first argument to must be an existing file.' % (msgid, sys.argv[0]))

    try: 
        s = sys.argv[2]
    except IndexError:
        exit('[%s]: the second argument to %s must a URL.' % (msgid, sys.argv[0]))

    return f, s

def download_file(file, url):
    r = subprocess.call(['curl', '-s', '--remote-time', url, '-o', file])
        
    if r != 0: 
        exit('[%s]: %s is not a url.' % (msgid, url))
    else: 
        print('[%s]: "%s" file downloaded' % (msgid, file))
        return True

def file_timestamp(path): 
    return os.stat(path)[8]

def main():
    f, s = interface()

    if os.path.isfile(f):
        newf = False
    else: 
        print('[%s]: "%s" file does not exist' % (msgid, f))
        newf = download_file(f, s)
    
    mtime = file_timestamp(f)

    if mtime < time.time() - ACCEPTABLE: 
        # if mtime is less than now - n days, it may be stale.

        newtime = time.time() - (ACCEPTABLE / 2)

        if newf is True: 
            # if we just downloaded the file it isn't stale yet
            os.utime(f, (newtime, newtime))
        else: 
            # definitley stale, must download it again.
            newf = download_file(f, s)
            if mtime == file_timestamp(f):
                # if the source is stale, modify mtime so we don't
                # download it for a few days.
                os.utime(f, (newtime, newtime))
    else: 
        # otherwise, mtime is within the window of n days, and we can do nothing.
        print('[%s]: "%s" is up to date' % (msgid, f))

if __name__ == '__main__':
    main()
