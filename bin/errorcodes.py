#!/usr/bin/env python
import os
import sys
import re
import ConfigParser

#sourceroot = "/Users/epc/Documents/github/epc/mongo"
#errorsrst = "/Users/epc/Documents/github/epc/docs/draft/messages/errors.txt"
#errorsCSV = "/Users/epc/Documents/github/epc/docs/draft/messages/errors.csv"
#errorsTitle = "MongoDB Error and Message Codes"

config = ConfigParser.SafeConfigParser()
config.read('errorcodes.conf')

sourceroot = config.get('errorcodes','source')
resultsRoot = config.get('errorcodes', 'outputDir')
generateCSV = config.get('errorcodes','generateCSV')
errorsTitle = config.get('errorcodes', 'Title')
errorsFormat = config.get('errorcodes', 'Format')

default_domain = "\n\n.. default-domain:: mongodb\n\n"

sys.path.append(sourceroot+"/buildscripts")

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


codes = []

def readErrorCodes():   
    """Open each source file in sourceroot and scan for potential error messages."""
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
    for x in utils.getAllSourceFiles(arr,sourceroot):
        sys.stderr.write("Analyzing: {}\n".format(x))
        needReplace = [False]
        lines = []
        lastCodes = [0]
        lineNum = 1
        
        stripChars = " " + "\n"
        
        for line in open( x ):

            found = False
            for zz in quick:
                if line.find( zz ) >= 0:
                    found = True
                    break

            if found:
                
                if x.find( "src/mongo/" ) >= 0:
                    for b in bad:
                        if len(b.findall( line )) > 0:
                            print( x )
                            print( line )
                            raise Exception( "you can't use a bare assert" )

                for p in ps:               

                    def repl( m ):
                        m = m.groups()
                        severity = m[0]
                        start = m[0]
                        spaces = m[3]
                        code = m[4]
                        message = m[5]
                        codes.append( ( x , lineNum , line , code, message, severity ) )

                        return start + "(" + spaces + code

                    line = re.sub( p, repl, line )
            
            lineNum = lineNum + 1

        

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
	sys.stderr.write("Writing to {}\n".format(errorsCSV))
	if os.path.exists(errorsCSV):
		i=open(errorsCSV,"r");
	
	out = open(errorsCSV, 'wb')
	out.write('"Error","Text","Module","Line","Message","Severity"' + "\n")
	
	prev = ""
	seen = {}
	
	stripChars = " " + "\n"

	
	codes.sort( key=lambda x: x[0]+"-"+x[3] )
	for f,l,line,num,message,severity in codes:
		if num in seen:
			continue
		seen[num] = True
		
		if f.startswith( "./"):
			f=f[2:]
			fn = f.rpartition("/")[2]
		
		out.write('"{}","{}","{}","{}","{}","{}"'.format(num, getBestMessage(line , str(num)).strip(stripChars),f,l,message,severity))
		
		out.write("\n")
	
	out.close()

if __name__ == "__main__":
	readErrorCodes()
	genErrorOutput()
	if (generateCSV == 'yes'):
		genErrorOutputCSV()

