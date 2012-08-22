#!/usr/bin/env python
"""Scans MongoDB source tree for potential error codes and creates multiple outputs"""

generateCSV = 'no'
generateRST = 'no'
generateJSON = 'no'
debug = False
save_to_mongo = False

import os
import sys
import re
import ConfigParser

try: 
	import pymongo
	pymongo_flag = True
except:
	sys.stderr.write("pymongo unavailable, continuing\n")
	pymongo_flag = False

config_file = 'errorcodes.conf'

config = ConfigParser.SafeConfigParser()
config_flag = False
config_files = [ config_file, 'bin/{}'.format(config_file)]
try:
	config.read(config_files)
	config_flag = True
except:
	sys.exit("Could not read config file, exiting\n")

if config_flag == True:
	sourceroot = config.get('errorcodes','source')
	resultsRoot = config.get('errorcodes', 'outputDir')
	errorsTitle = config.get('errorcodes', 'Title')
	if (config.has_option('errorcodes','Format')):
		errorsFormat = config.get('errorcodes', 'Format')
	if (config.has_option('errorcodes','generateCSV')):
		generateCSV = config.get('errorcodes','generateCSV')
	if (config.has_option('errorcodes','generateJSON')):
		generateJSON = config.get('errorcodes','generateJSON')
	if (config.has_option('errorcodes','generateRST')):
		generateRST = config.get('errorcodes', 'generateRST')
	if (config.has_option('mongodb', 'persistence')):
		if (config.get('mongodb','persistence') == 'insert'):
			save_to_mongo = True
		elif (config.get('mongodb','persistence') == 'update'):
			sys.exit("Fatal, updating not supported")
else:
	sys.exit("No configuration data present, exiting\n")
	
if save_to_mongo == True:
#	why candygram? because there's only so many times you can use mongo and
#	database before going mad.  Alt: cf. Blazing Saddles
	fields = ['database','collection','user','password','port']
	for field in fields:
		if config.has_option('mongodb',field):
			candygram[field]  = config.get('mongodb',field)
	if candygram['database'] == '':
		sys.exit("Fatal: you told me to save to a database but did not configure one.");
	if candygram['collection'] == '':
		sys.exit("Fatal: you told me to save to a database but did not configure a collection.");

default_domain = "\n\n.. default-domain:: mongodb\n\n"

sys.path.append(sourceroot+"/buildscripts")

# we only need to scan the mongo source tree not 3rd party
product_source = sourceroot + '/src/mongo'

# get mongodb/buildscripts/utils.py 
import utils


assertNames = [ "uassert" , "massert", "fassert", "fassertFailed" ]

severityTexts = dict({
		'fassert':'Abort', 
		'fasserted' : 'Abort',
		'fassertFailed': 'Abort',
		'massert':'Info', 
		'masserted': 'Info',
		'msgasserted': 'Info',
		'wassert':'Warning',
		'wasserted': 'Warning',
		})

exceptionTexts = dict({
	'uassert': 'UserException',
	'uasserted': 'UserException',
	'UserException' : 'UserException',
	'dbexception': 'DBException',
	'DBException': 'DBException',
	'DBexception': 'DBException',
	'MsgException': 'MsgException',
	'MSGException': 'MsgException',
	'MsgAssertionException': 'MsgAssertionException',
	})
	
# codes is legacy errocodes.py
codes = []
# messages is our real structure
messages = {}

def assignErrorCodes():
    cur = 10000
    for root in assertNames:
        for x in utils.getAllSourceFiles():
            print( x )
            didAnything = False
            fixed = ""
            for line in open( x ):
                s = line.partition( root + "(" )
                if s[1] == "" or line.startswith( "#define " + root):
                    fixed += line
                    continue
                fixed += s[0] + root + "( " + str( cur ) + " , " + s[2]
                cur = cur + 1
                didAnything = True
            if didAnything:
                out = open( x , 'w' )
                out.write( fixed )
                out.close()


def readErrorCodes():   
    """Open each source file in sourceroot and scan for potential error messages."""
    sys.stderr.write("Analyzing source tree: {}\n".format(sourceroot))
    quick = [ "assert" , "Exception"]

    ps = [ re.compile( "(([wum]asser(t|ted))) *\(( *)(\d+) *,\s*(\"\S[^\"]+\S\")\s*,?.*" ) ,
           re.compile( "(([wum]asser(t|ted))) *\(( *)(\d+) *,\s*([\S\s+<\(\)\"]+) *,?.*" ) ,
           re.compile( '((msgasser(t|ted))) *\(( *)(\d+) *, *(\"\S[^,^\"]+\S\") *,?' ) ,
           re.compile( '((msgasser(t|ted)NoTrace)) *\(( *)(\d+) *, *(\"\S[^,^\"]+\S\") *,?' ) ,
           re.compile( "((fasser(t|ted))) *\(( *)(\d+)()" ) ,  
           re.compile( "((DB|User|Msg|MsgAssertion)Exceptio(n))\(( *)(\d+) *,? *(\S+.+\S) *,?" ),
           re.compile( "((fassertFailed)()) *\(( *)(\d+)()" ),
           re.compile( "(([wum]asser(t|ted)))\s*\(([^\d]*)(\d+)\s*,?()"),
           re.compile( "((msgasser(t|ted)))\s*\(([^\d]*)(\d+)\s*,?()"),
           re.compile( "((msgasser(t|ted)NoTrace))\s*\(([^\d]*)(\d+)\s*,?()"),
           
           ]

    bad = [ re.compile( "\sassert *\(" ) ]
    arr=[]
    for x in utils.getAllSourceFiles(arr,product_source):
    	if (debug == True):
			sys.stderr.write("Analyzing: {}\n".format(x))
        needReplace = [False]
        lines = []
        lastCodes = [0]
        lineNum = 1
        
        stripChars = " " + "\n"
        sourcerootOffset = len(sourceroot)

        
        for line in open( x ):

            found = False
            for zz in quick:
                if line.find( zz ) >= 0:
                    found = True
                    break

            if found:
                
                for p in ps:               

                    def repl( m ):
                        m = m.groups()
                        severity = m[0]
                        start = m[0]
                        spaces = m[3]
                        code = m[4]
                        message = m[5]
                        codes.append( ( x , lineNum , line , code, message, severity ) )
                        if x.startswith(sourceroot):
							fn = x[sourcerootOffset+1:].rpartition("/2")[2]

                        msgDICT = {
							'id': code, 
							'parsed':message, 
							'message':message,
							'assert':severity,
							'severity': returnSeverityText(severity),
							'uresp':'',
							'sysresp':'', 
							'linenum':lineNum, 
							'file':fn,
							'src': line.strip(stripChars),
							'altered': 0
							}
                        messages[int(code)] = msgDICT

                        return start + "(" + spaces + code

                    line = re.sub( p, repl, line )
            
            lineNum = lineNum + 1

def returnSeverityText(s):
	if not s:
		return ""
	elif s in severityTexts:
		result = severityTexts[s]
	elif s in exceptionTexts:
		result = exceptionTexts[s]
	else:
		result = s
	return result


def getNextCode( lastCodes = [0] ):
    highest = [max(lastCodes)]
    def check( fileName , lineNum , line , code ):
        code = int( code )
        if code > highest[0]:
            highest[0] = code
    readErrorCodes( check )
    return highest[0] + 1

def checkErrorCodes():
    seen = {}
    errors = []
    def checkDups( fileName , lineNum , line , code ):
        if code in seen:
            print( "DUPLICATE IDS" )
            print( "%s:%d:%s %s" % ( fileName , lineNum , line.strip() , code ) )
            print( "%s:%d:%s %s" % seen[code] )
            errors.append( seen[code] )
        seen[code] = ( fileName , lineNum , line , code )
    readErrorCodes( checkDups,False )
    return len( errors ) == 0 

def getBestMessage( err , start ):
    #print(err + "\n")
    err = err.partition( start )[2]
    if not err:
        return ""
    err = err.partition( "\"" )[2]
    if not err:
        return ""
    err = err.rpartition( "\"" )[0]
    if not err:
        return ""
    return err
    
def genErrorOutput():
    """Sort and iterate through codes printing out error codes and messages in RST format."""
    sys.stderr.write("Generating RST files\n");
    separatefiles = False
    if errorsFormat == 'single':
        errorsrst = resultsRoot + "/errors.txt"
        if os.path.exists(errorsrst ):
            i = open(errorsrst , "r" ) 
        out = open( errorsrst , 'wb' )
        sys.stderr.write("Generating single file: {}\n".format(errorsrst))
        titleLen = len(errorsTitle)
        out.write(":orphan:\n")
        out.write("=" * titleLen + "\n")
        out.write(errorsTitle + "\n")
        out.write("=" * titleLen + "\n")
        out.write(default_domain);
    elif errorsFormat == 'separate':
        separatefiles = True
    else:
        raise Exception("Unknown output format: {}".format(errorsFormat))
    
    prev = ""
    seen = {}
    
    sourcerootOffset = len(sourceroot)
    stripChars = " " + "\n"
    
#    codes.sort( key=lambda x: x[0]+"-"+x[3] )
    codes.sort( key=lambda x: int(x[3]) )
    for f,l,line,num,message,severity in codes:
        if num in seen:
            continue
        seen[num] = True

        if f.startswith(sourceroot):
            f = f[sourcerootOffset+1:]
        fn = f.rpartition("/")[2]
        url = ":source:`" + f + "#L" + str(l) + "`"
        
        if separatefiles:
           outputFile = "{}/{:d}.txt".format(resultsRoot,int(num))
           out = open(outputFile, 'wb')
           out.write(default_domain)
           sys.stderr.write("Generating file: {}\n".format(outputFile))
           
        out.write(".. line: {}\n\n".format(line.strip(stripChars)))
        out.write(".. error:: {}\n\n".format(num))
        if message != '':
           out.write("   :message: {}\n".format(message.strip(stripChars)))
        else:
           message = getBestMessage(line,str(num)).strip(stripChars)
           if message != '':
              out.write("   :message: {}\n".format(message))
        if severity:
           if severity in severityTexts:
              out.write("   :severity: {}\n".format(severityTexts[severity]))
           elif severity in exceptionTexts:
              out.write("   :throws: {}\n".format(exceptionTexts[severity]))
           else:
              out.write("   :severity: {}\n".format(severity))
        
        out.write("   :module: {}\n".format(url) )
        if separatefiles:
           out.write("\n")
           out.close()

    if separatefiles==False:    
        out.write( "\n" )
        out.close()
    
def genErrorOutputCSV():
	"""Parse through codes array and generate a csv file."""
	errorsCSV = "{}/errors.csv".format(resultsRoot)
	sys.stderr.write("Writing to {}\n".format(errorsCSV))
	if os.path.exists(errorsCSV):
		i=open(errorsCSV,"r");
	
	out = open(errorsCSV, 'wb')
	out.write('"Error","Text","Module","Line","Message","Severity"' + "\n")
	
	prev = ""
	seen = {}
	
	stripChars = " " + "\n" + '"'

	
	codes.sort( key=lambda x: int(x[3]) )
	for f,l,line,num,message,severity in codes:
		if num in seen:
			continue
		seen[num] = True
		
		if f.startswith( "./"):
			f=f[2:]
			fn = f.rpartition("/")[2]
		
		out.write('"{}","{}","{}","{}","{}","{}"'.format(num, getBestMessage(line , str(num)).strip(stripChars),f,l,message.strip(stripChars),severity))
		
		out.write("\n")
	
	out.close()
	
def writeToMongo():
	"""Pipe the messages array into mongodb"""
	sys.stderr.write("Saving to db.messages.errors, will not check for duplicates!")
	from  pymongo import Connection
	connection = Connection()
	db = connection['messages']
	errorcodes = db['errors']
#	errorcodes.insert(messages)
	for errCode in messages.keys():
		sys.stderr.write('Inserting code: {}\n'.format(errCode))
		result = errorcodes.insert(messages[errCode])
		sys.stderr.write('Result: {}\n'.format(result))
#	for k in messages:
#		print("{}\t{}".format(k,messages[k]))
#		errorcodes.insert(k,messages[k])
		
	#for key in messages.keys()
#		val= 'foo'
#		print("key({})\tvalue({})\n".format(key,val))
	

if __name__ == "__main__":
	readErrorCodes()
	if (generateRST == 'yes'):
		genErrorOutput()
	else:
		sys.stderr.write("Not generating RST files\n");
	if (generateCSV == 'yes'):
		genErrorOutputCSV()
	else:
		sys.stderr.write("Not generating CSV file\n");
	if (generateJSON== 'yes'):
		import json
		outputFile = "{}/errorcodes.json".format(resultsRoot)
		out = open(outputFile, 'wb')
		sys.stderr.write("Generating JSON file: {}\n".format(outputFile))
		out.write(json.dumps(messages))
		out.close()
	else:
		sys.stderr.write("Not generating JSON file\n");

	if save_to_mongo == True:
		writeToMongo()
	else:
		sys.stderr.write("Not inserting/updating to Mongo\n");		