# -*- coding: utf-8 -*-
"""
    MongoDB Domain for Sphinx
    ~~~~~~~~~~~~~~~~~~~~~~~~~

    Based on the default JavaScript domain distributed with Sphinx.

    :copyright: Copyright 2007-2011 by the Sphinx team, see AUTHORS.
    :license: BSD, see LICENSE for details.

    Additional work to adapt for MongoDB purposes done by 10gen,
    inc. (Sam Kleinman, et al.)
"""

from sphinx import addnodes
from sphinx.domains import Domain, ObjType
from sphinx.locale import l_, _
from sphinx.directives import ObjectDescription
from sphinx.roles import XRefRole
from sphinx.domains.python import _pseudo_parse_arglist
from sphinx.util.nodes import make_refnode
from sphinx.util.docfields import Field, GroupedField, TypedField

import yaml

try:
    with open('composite-pages.yaml', 'r') as f:
        composite_pages = yaml.safe_load_all(f).next()
except IOError:
    composite_pages = []


def basename(path):
    return path.split('/')[-1].rsplit('.', 1)[0]

class MongoDBObject(ObjectDescription):
    """
    Description of a MongoDB object.
    """
    #: If set to ``True`` this object is callable and a `desc_parameterlist` is
    #: added
    has_arguments = False

    #: what is displayed right before the documentation entry
    display_prefix = None

    def handle_signature(self, sig, signode):
        sig = sig.strip()
        if '(' in sig and sig[-1:] == ')':
            prefix, arglist = sig.split('(', 1)
            prefix = prefix.strip()
            arglist = arglist[:-1].strip()
        else:
            prefix = sig
            arglist = None
        if '.' in prefix:
            nameprefix, name = prefix.rsplit('.', 1)
        else:
            nameprefix = None
            name = prefix

        objectname = self.env.temp_data.get('mongodb:object')
        if nameprefix:
            if objectname:
                # someone documenting the method of an attribute of the current
                # object? shouldn't happen but who knows...
                nameprefix = objectname + '.' + nameprefix
            fullname = nameprefix + '.' + name
        elif objectname:
            fullname = objectname + '.' + name
        else:
            # just a function or constructor
            objectname = ''
            fullname = name

        signode['object'] = objectname
        signode['fullname'] = fullname

        if self.display_prefix:
            signode += addnodes.desc_annotation(self.display_prefix,
                                                self.display_prefix)
        if nameprefix:
            signode += addnodes.desc_addname(nameprefix + '.', nameprefix + '.')
        signode += addnodes.desc_name(name, name)
        if self.has_arguments:
            if not arglist:
                signode += addnodes.desc_parameterlist()
            else:
                _pseudo_parse_arglist(signode, arglist)
        return fullname, nameprefix

    def add_target_and_index(self, name_obj, sig, signode):
        objectname = self.options.get(
            'object', self.env.temp_data.get('mongodb:object'))

        if self.objtype == 'dbcommand':
            fullname = 'dbcmd.' + name_obj[0]
        elif self.objtype == 'operator':
            fullname = 'op.' + name_obj[0]
        elif self.objtype == 'projection':
            fullname = 'prj.' + name_obj[0]
        elif self.objtype == 'binary':
            fullname = 'bin.' + name_obj[0]
        elif self.objtype == 'parameter':
            fullname = 'param.' + name_obj[0]
        elif self.objtype == 'pipeline':
            fullname = 'stage.' + name_obj[0]
        elif self.objtype == 'group':
            fullname = 'grp.' + name_obj[0]
        elif self.objtype == 'expression':
            fullname = 'exp.' + name_obj[0]
        elif name_obj[0] in self.state.document.ids:
            fullname = 'iddup.' + name_obj[0]
        else:
            fullname = name_obj[0]

        signode['names'].append(fullname)
        signode['ids'].append(fullname.replace('$', '_S_'))
        signode['first'] = not self.names
        self.state.document.note_explicit_target(signode)
        objects = self.env.domaindata['mongodb']['objects']
        if fullname in objects:
            path = self.env.doc2path(self.env.domaindata['mongodb']['objects'][fullname][0])
            spath = basename(path)
            sspath = basename(self.state_machine.reporter.source)

            if spath in composite_pages:
                pass
            elif sspath in composite_pages:
                pass
            elif spath == fullname:
                pass
            elif spath == fullname.lstrip('$'):
                pass
            elif spath == fullname.lstrip('_'):
                pass
            elif path == self.state_machine.reporter.source:
                pass
            elif fullname.startswith(spath):
                pass
            elif fullname == '$':
                pass
                # temporary: silencing the positional operator
                # warning, this is the namespace clash for
                # projection and query/update operators.
            else:
                self.state_machine.reporter.warning(
                    'duplicate object description of "%s", ' % fullname +
                    'other instance in ' + path,
                    line=self.lineno)

        if self.env.docname.rsplit('/', 1)[1] in composite_pages:
            pass
        else:
            objects[fullname] = self.env.docname, self.objtype


        indextext = self.get_index_text(objectname, name_obj)
        if indextext:
            self.indexnode['entries'].append(('single', indextext,
                                              fullname.replace('$', '_S_'),
                                              ''))

    def get_index_text(self, objectname, name_obj):
        name, obj = name_obj
        if self.objtype == 'dbcommand':
            return _('%s (database command)') % name
        elif self.objtype == 'operator':
            return _('%s (operator)') % name
        elif self.objtype == 'projection':
            return _('%s (projection operator)') % name
        elif self.objtype == 'binary':
            return _('%s (program)') % name
        elif self.objtype == 'setting':
            return _('%s (setting)') % (name)
        elif self.objtype == 'data':
            return _('%s (MongoDB reporting output)') % (name)
        elif self.objtype == 'method':
            return _('%s (shell method)') % (name)
        elif self.objtype == 'collflag':
            return _('%s (collection flag)') % (name)
        elif self.objtype == 'readmode':
            return _('%s (read preference mode)') % (name)
        elif self.objtype == 'error':
            return _('%s (error code)') % (name)
        elif self.objtype == 'macro':
            return _('%s (JavaScript shell macro)') % (name)
        elif self.objtype == 'limit':
            return _('%s (MongoDB system limit)') % (name)
        elif self.objtype == 'bsontype':
            return _('%s (BSON type)') % (name)
        elif self.objtype == 'authrole':
            return _('%s (User role)') % (name)
        elif self.objtype == 'parameter':
            return _('%s (setParameter option)') % (name)
        elif self.objtype == 'pipeline':
            return _('%s (aggregation framework pipeline operator)') % (name)
        elif self.objtype == 'expression':
            return _('%s (aggregation framework transformation expression)') % (name)
        elif self.objtype == 'group':
            return _('%s (aggregation framework group expression)') % (name)
        return ''

    def run(self):
        return super(MongoDBObject, self).run()

    doc_field_types = [
        TypedField('arguments', label=l_('Arguments'),
                   names=('argument', 'arg'),
                   typerolename='method', typenames=('paramtype', 'type')),
        TypedField('options', label=l_('Options'),
                   names=('options', 'opts', 'option', 'opt'),
                   typerolename=('dbcommand', 'setting', 'status', 'stats', 'aggregator', 'data'),
                   typenames=('optstype', 'type')),
        TypedField('parameters', label=l_('Parameters'),
                   names=('param', 'paramter', 'parameters'),
                   typerolename=('dbcommand', 'setting', 'status', 'stats', 'aggregator', 'data'),
                   typenames=('paramtype', 'type')),
        TypedField('fields', label=l_('Fields'),
                   names=('fields', 'fields', 'field', 'field'),
                   typerolename=('dbcommand', 'setting', 'status', 'stats', 'aggregator', 'data'),
                   typenames=('fieldtype', 'type')),
        TypedField('flags', label=l_('Flags'),
                   names=('flags', 'flags', 'flag', 'flag'),
                   typerolename=('dbcommand', 'setting', 'status', 'stats', 'aggregator', 'data'),
                   typenames=('flagtype', 'type')),
        GroupedField('errors', label=l_('Throws'), rolename='err',
                     names=('throws', ),
                     can_collapse=True),
        GroupedField('exception', label=l_('Exception'), rolename='err',
                     names=('exception', ),
                     can_collapse=True),
        Field('returnvalue', label=l_('Returns'), has_arg=False,
              names=('returns', 'return')),
        Field('returntype', label=l_('Return type'), has_arg=False,
              names=('rtype',)),
    ]

class MongoDBMethod(MongoDBObject):
    has_arguments = True

class MongoDBXRefRole(XRefRole):
    def process_link(self, env, refnode, has_explicit_title, title, target):
        # basically what sphinx.domains.python.PyXRefRole does
        refnode['mongodb:object'] = env.temp_data.get('mongodb:object')
        if not has_explicit_title:
            title = title.lstrip('.')
            target = target.lstrip('~')
            if title[0:1] == '~':
                title = title[1:]
                dot = title.rfind('.')
                if dot != -1:
                    title = title[dot+1:]
        if target[0:1] == '.':
            target = target[1:]
            refnode['refspecific'] = True
        return title, target

class MongoDBDomain(Domain):
    """MongoDB Documentation domain."""
    name = 'mongodb'
    label = 'MongoDB'
    # if you add a new object type make sure to edit MongoDBObject.get_index_string
    object_types = {
        'dbcommand':    ObjType(l_('dbcommand'),   'dbcommand'),
        'operator':     ObjType(l_('operator'),    'operator'),
        'projection':   ObjType(l_('projection'),  'projection'),
        'binary':       ObjType(l_('binary'),      'program'),
        'setting':      ObjType(l_('setting'),     'setting'),
        'readmode':     ObjType(l_('readmode'),    'readmode'),
        'method':       ObjType(l_('method'),      'method'),
        'data':         ObjType(l_('data'),        'data'),
        'collflag':     ObjType(l_('collflag'),    'collflag'),
        'error':        ObjType(l_('error'),       'error'),
        'macro':        ObjType(l_('macro'),       'macro'),
        'limit':        ObjType(l_('limit'),       'limit'),
        'bsontype':     ObjType(l_('bsontype'),    'bsontype'),
        'authrole':     ObjType(l_('authrole'),    'authrole'),
        'parameter':    ObjType(l_('parameter'),   'parameter'),
        'pipeline':     ObjType(l_('pipeline'),    'pipeline'),
        'group':        ObjType(l_('group'),       'group'),
        'expression':   ObjType(l_('expression'),  'expression'),
    }

    directives = {
        'dbcommand':     MongoDBObject,
        'operator':      MongoDBObject,
        'projection':    MongoDBObject,
        'binary':        MongoDBObject,
        'setting':       MongoDBObject,
        'readmode':      MongoDBObject,
        'method':        MongoDBMethod,
        'data':          MongoDBObject,
        'collflag':      MongoDBObject,
        'error':         MongoDBObject,
        'macro':         MongoDBObject,
        'limit':         MongoDBObject,
        'bsontype':      MongoDBObject,
        'authrole':      MongoDBObject,
        'parameter':     MongoDBObject,
        'pipeline':      MongoDBObject,
        'group':         MongoDBObject,
        'expression':    MongoDBObject,
    }
    roles = {
        'dbcommand':   MongoDBXRefRole(),
        'operator':    MongoDBXRefRole(),
        'projection':  MongoDBXRefRole(),
        'program':     MongoDBXRefRole(),
        'setting':     MongoDBXRefRole(),
        'readmode':    MongoDBXRefRole(),
        'method':      MongoDBXRefRole(),
        'data':        MongoDBXRefRole(),
        'collflag':    MongoDBXRefRole(),
        'error':       MongoDBXRefRole(),
        'macro':       MongoDBXRefRole(),
        'limit':       MongoDBXRefRole(),
        'bsontype':    MongoDBXRefRole(),
        'authrole':    MongoDBXRefRole(),
        'parameter':   MongoDBXRefRole(),
        'pipeline':    MongoDBXRefRole(),
        'group':       MongoDBXRefRole(),
        'expression':  MongoDBXRefRole(),
    }
    initial_data = {
        'objects': {}, # fullname -> docname, objtype
    }

    def find_obj(self, env, obj, name, typ, searchorder=0):
        if name[-2:] == '()':
            name = name[:-2]
        objects = self.data['objects']
        newname = None

        if typ == 'program':
            name = 'bin.' + name
            newname = name
        elif typ == 'dbcommand':
            name = 'dbcmd.' + name
            newname = name
        elif typ == 'operator':
            name = 'op.' + name
            newname = name
        elif typ == 'projection':
            name = 'prj.' + name
            newname = name
        elif typ == 'parameter':
            name = 'param.' + name
            newname = name
        elif typ == 'pipeline':
            name = 'stage.' + name
            newname = name
        elif typ == 'group':
            name = 'grp.' + name
            newname = name
        elif typ == 'expression':
            name = 'exp.' + name
            newname = name

        searchorder = 1

        if searchorder == 1:
            if obj and obj + '.' + name in objects:
                newname = obj + '.' + name
            else:
                newname = name
        else:
            if name in objects:
                newname = name
            elif obj and obj + '.' + name in objects:
                newname = obj + '.' + name

        return newname, objects.get(newname)

    def resolve_xref(self, env, fromdocname, builder, typ, target, node,
                     contnode):
        objectname = node.get('mongodb:object')
        searchorder = node.hasattr('refspecific') and 1 or 0

        name, obj = self.find_obj(env, objectname, target, typ, searchorder)

        if obj is not None:
            if fromdocname == obj[0]:
                return None

        if obj is None:
            name, obj = self.find_obj(env, 'iddup.' + name, target, typ, searchorder)

            if obj is None:
                # print names and info from the node object at this
                # point to report on links that fail to resolve
                return None



        return make_refnode(builder, fromdocname, obj[0],
                            name.replace('$', '_S_'), contnode, target)

    

    def get_objects(self):
        for refname, (docname, type) in self.data['objects'].items():
            yield refname, refname, type, docname, refname.replace('$', '_S_'), 1

def setup(app):
    app.add_domain(MongoDBDomain)
