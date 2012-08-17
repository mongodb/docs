#!/usr/bin/env python

import os
import sys
import re
import utils

sourceroot = "/Users/epc/Documents/github/epc/mongo"
errorsrst = "/Users/epc/Documents/github/epc/docs/draft/messages/errors.txt"
errorsCSV = "/Users/epc/Documents/github/epc/docs/draft/messages/errors.csv"
errorsTitle = "MongoDB Error and Message Codes"

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

def XreadErrorCodes( callback, replaceZero = False ):
    
    quick = [ "assert" , "Exception"]

    ps = [ re.compile( "(([umsgf]asser(t|ted))) *\(( *)(\d+)" ) ,
           re.compile( "((User|Msg|MsgAssertion)Exceptio(n))\(( *)(\d+)" ),
           re.compile( "streamNotGood"),
           re.compile( "((fassertFailed)()) *\(( *)(\d+)" )
           ]

    bad = [ re.compile( "\sassert *\(" ) ]
    arr=[]
    for x in utils.getAllSourceFiles(arr,sourceroot):
        
        needReplace = [False]
        lines = []
        lastCodes = [0]
        lineNum = 1
        
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

                        start = m[0]
                        spaces = m[3]
                        code = m[4]
                        if code == '0' and replaceZero :
                            code = getNextCode( lastCodes )
                            lastCodes.append( code )
                            code = str( code )
                            needReplace[0] = True

                            print( "Adding code " + code + " to line " + x + ":" + str( lineNum ) )

                        else :
                            codes.append( ( x , lineNum , line , code ) )
                            callback( x , lineNum , line , code )

                        return start + "(" + spaces + code

                    line = re.sub( p, repl, line )
                    # end if ps loop
            
            if replaceZero : lines.append( line )
            lineNum = lineNum + 1
        
        if replaceZero and needReplace[0] :
            print( "Replacing file " + x )
            of = open( x + ".tmp", 'w' )
            of.write( "".join( lines ) )
            of.close()
            os.remove(x)
            os.rename( x + ".tmp", x )


def readErrorCodes( callback, replaceZero = False ):
    
    quick = [ "assert" , "Exception"]

#    ps = [ re.compile( "(([umsgf]asser(t|ted))) *\(( *)(\d+)" ) ,
#           re.compile( "((DB|User|Msg|MsgAssertion)Exceptio(n))\(( *)(\d+)" ),
#           re.compile( "((fassertFailed)()) *\(( *)(\d+)" )
#           ]
    ps = [ re.compile( "(([wum]asser(t|ted))) *\(( *)(\d+) *,? *(\S+.+\S) *,?" ) ,
           re.compile( "((msgasser(t|ted))) *\(( *)(\d+) *,? *(\S+.+\S) *,?" ) ,
           re.compile( "((fasser(t|ted))) *\(( *)(\d+)()" ) ,  
           re.compile( "((DB|User|Msg|MsgAssertion)Exceptio(n))\(( *)(\d+) *,? *(\S+.+\S) *,?" ),
           re.compile( "((fassertFailed)()) *\(( *)(\d+)()" )
           ]

    bad = [ re.compile( "\sassert *\(" ) ]
    arr=[]
    for x in utils.getAllSourceFiles(arr,sourceroot):
        
        needReplace = [False]
        lines = []
        lastCodes = [0]
        lineNum = 1
        
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
#                        if code == '0' and replaceZero :
#                            code = getNextCode( lastCodes )
#                            lastCodes.append( code )
#                            code = str( code )
#                            needReplace[0] = True
#
#                            print( "Adding code " + code + " to line " + x + ":" + str( lineNum ) )
#
#                        else :
                        codes.append( ( x , lineNum , line , code, message, severity ) )
                        print("x(" + x + ") lineNum(" + str(lineNum) + ") line(" + line + ") spaces(" + spaces + ") code(" + code + ")")
                        callback( x , lineNum , line , code )

                        return start + "(" + spaces + code

                    line = re.sub( p, repl, line )
                    print("line(" + line + ")")
                    # end if ps loop
            
#            if replaceZero : lines.append( line )
            lineNum = lineNum + 1
#        
#        if replaceZero and needReplace[0] :
#            print( "Replacing file " + x )
#            of = open( x + ".tmp", 'w' )
#            of.write( "".join( lines ) )
#            of.close()
#            os.remove(x)
#            os.rename( x + ".tmp", x )

        

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
    
    if os.path.exists(errorsrst ):
        i = open(errorsrst , "r" ) 
    out = open( errorsrst , 'wb' )
    titleLen = len(errorsTitle)
    out.write(":orphan:\n")
    out.write("=" * titleLen + "\n")
    out.write(errorsTitle + "\n")
    out.write("=" * titleLen + "\n")

    out.write("\n\n.. default-domain:: mongodb\n\n");
    
    prev = ""
    seen = {}
    
    sourcerootOffset = len(sourceroot)
    
    codes.sort( key=lambda x: x[0]+"-"+x[3] )
    for f,l,line,num,message,severity in codes:
        if num in seen:
            continue
        seen[num] = True

#        if f.startswith( "./" ):
        if f.startswith(sourceroot):
            f = f[sourcerootOffset+1:]
        
        fn = f.rpartition("/")[2]

#        if f != prev:
#            out.write( "\n\n" )
#            out.write( f + "\n----\n" )
#            prev = f

        url = ":source:`" + f + "#L" + str(l) + "`"
        
#       out.write("\n.. error:: {}\n\n   Text: {}\n\n".format(num,getBestMessage( line , str(num))))
#        out.write("   Module: {}\n\n".format(f))
#        out.write("   :module: `{}:{} <{}>`_\n".format(fn,l,url))
#        out.write("   .. seealso:: `{}:{} <{}>`_\n".format(f,l, url))
#        out.write( "* " + str(num) + " [code](" + url + ") " + getBestMessage( line , str(num) ) + "\n" )

        out.write(".. error:: {}\n\n".format(num))
        if message:
           out.write("   :message: {}\n".format(message))
        else:
           out.write("   :message: {}\n".format(getBestMessage( line , str(num))))
        if severity:
           if severity in severityTexts:
              out.write("   :severity: {}\n".format(severityTexts[severity]))
           elif severity in exceptionTexts:
              out.write("   :throws: {}\n".format(exceptionTexts[severity]))
           else:
              out.write("   :severity: {}\n".format(severity))
        
        out.write("   :module: {}\n\n".format(url) )
    
        
    out.write( "\n" )
    out.close()
    
def genErrorOutputCSV():
	if os.path.exists(errorsCSV):
		i=open(errorsCSV,"r");
	
	out = open(errorsCSV, 'wb')
	out.write('"Error","Text","Module","Line"' + "\n")
	
	prev = ""
	seen = {}
	
	codes.sort( key=lambda x: x[0]+"-"+x[3] )
	for f,l,line,num,message,severity in codes:
		if num in seen:
			continue
		seen[num] = True
		
		if f.startswith( "./"):
			f=f[2:]
			fn = f.rpartition("/")[2]
		
		out.write('"{}","{}","{}","{}","{}","{}"'.format(num, getBestMessage(line , str(num)),f,l,message,severity))
		
		out.write("\n")
	
	out.close()

if __name__ == "__main__":
    ok = checkErrorCodes()
    print( "ok:" + str( ok ) )
#    print( "next: " + str( getNextCode() ) )
    if ok:
        genErrorOutput()
        genErrorOutputCSV()

