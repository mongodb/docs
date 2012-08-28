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
        fullname = name_obj[0]
        if fullname not in self.state.document.ids:
            signode['names'].append(fullname)
            signode['ids'].append(fullname.replace('$', '_S_'))
            signode['first'] = not self.names
            self.state.document.note_explicit_target(signode)
            objects = self.env.domaindata['mongodb']['objects']
            # if fullname in objects:
            #     self.state_machine.reporter.warning(
            #         'duplicate object description of %s, ' % fullname +
            #         'other instance in ' +
            #         self.env.doc2path(objects[fullname][0]),
            #         line=self.lineno)
            objects[fullname] = self.env.docname, self.objtype
        # elif self.objtype == "binary":
        #     signode['names'].append(fullname + "-bin")
        #     signode['ids'].append(fullname.replace('$', '_S_') +"-bin")
        #     signode['first'] = not self.names
        #     self.state.document.note_explicit_target(signode)

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
        elif self.objtype == 'program':
            return _('%s (program)') % name
        elif self.objtype == 'setting':
            return _('%s (setting)') % (name)
        elif self.objtype == 'status':
            return _('%s (status)') % (name)
        elif self.objtype == 'stats':
            return _('%s (statistic)') % (name)
        elif self.objtype == 'data':
            return _('%s (shell output)') % (name)
        elif self.objtype == 'method':
            return _('%s (shell method)') % (name)
        elif self.objtype == 'collflag':
            return _('%s (collection flag)') % (name)
        elif self.objtype == 'readmode':
            return _('%s (read preference mode)') % (name)
        elif self.objtype == 'error':
            return _('%s (error code)') % (name)
        return ''

    def run(self):
        return super(MongoDBObject, self).run()

    doc_field_types = [
        TypedField('arguments', label=l_('Arguments'),
                   names=('argument', 'arg', 'parameter', 'param'),
                   typerolename='method', typenames=('paramtype', 'type')),
        TypedField('options', label=l_('Options'),
                   names=('options', 'opts', 'option', 'opt'),
                   typerolename=('dbcommand', 'setting', 'status', 'stats', 'aggregator'),
                   typenames=('optstype', 'type')),
        TypedField('fields', label=l_('Fields'),
                   names=('fields', 'fields', 'field', 'field'),
                   typerolename=('dbcommand', 'setting', 'status', 'stats', 'aggregator'),
                   typenames=('fieldtype', 'type')),
        TypedField('flags', label=l_('Flags'),
                   names=('flags', 'flags', 'flag', 'flag'),
                   typerolename=('dbcommand', 'setting', 'status', 'stats', 'aggregator'),
                   typenames=('flagtype', 'type')),
        GroupedField('errors', label=l_('Throws'), rolename='err',
                     names=('throws', ),
                     can_collapse=True),
        Field('returnvalue', label=l_('Returns'), has_arg=False,
              names=('returns', 'return')),
        Field('returntype', label=l_('Return type'), has_arg=False,
              names=('rtype',)),
    ]

class MongoDBCallable(MongoDBObject):
    """Description of a MongoDB function, method or constructor."""
    has_arguments = False

class MongoDBCallableComplex(MongoDBObject):
    """Description of a MongoDB function, method or constructor."""
    has_arguments = True

class MongoDBCallableProgram(MongoDBObject):
    pass

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
        'status':       ObjType(l_('status'),      'status'),
        'stats':        ObjType(l_('stats'),       'stats'),
        'readmode':     ObjType(l_('readmode'),    'readmode'),
        'method':       ObjType(l_('method'),      'method'),
        'data':         ObjType(l_('data'),        'data'),
        'aggregator':   ObjType(l_('aggregator'),  'aggregator'),
        'group':        ObjType(l_('group'),       'group'),
        'expression':   ObjType(l_('expression'),  'expression'),
        'collflag':     ObjType(l_('collflag'),    'collflag'),
        'error':        ObjType(l_('error'),       'error'),
    }

    directives = {
        'dbcommand':     MongoDBCallable,
        'operator':      MongoDBCallable,
        'projection':    MongoDBCallable,
        'binary':        MongoDBCallable,
        'setting':       MongoDBCallable,
        'status':        MongoDBCallable,
        'stats':         MongoDBCallable,
        'readmode':      MongoDBCallable,
        'method':        MongoDBCallableComplex,
        'data':          MongoDBCallable,
        'aggregator':    MongoDBCallable,
        'group':         MongoDBCallable,
        'expression':    MongoDBCallable,
        'collflag':      MongoDBCallable,
        'error':         MongoDBCallable,
    }
    roles = {
        'dbcommand':   MongoDBXRefRole(),
        'operator':    MongoDBXRefRole(),
        'projection':  MongoDBXRefRole(),
        'program':     MongoDBXRefRole(),
        'setting':     MongoDBXRefRole(),
        'status':      MongoDBXRefRole(),
        'stats':       MongoDBXRefRole(),
        'readmode':    MongoDBXRefRole(),
        'method':      MongoDBXRefRole(),
        'data':        MongoDBXRefRole(),
        'aggregator':  MongoDBXRefRole(),
        'group':       MongoDBXRefRole(),
        'expression':  MongoDBXRefRole(),
        'collflag':    MongoDBXRefRole(),
    }
    initial_data = {
        'objects': {}, # fullname -> docname, objtype
    }

    def find_obj(self, env, obj, name, typ, searchorder=0):
        if name[-2:] == '()':
            name = name[:-2]
        objects = self.data['objects']
        newname = None
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
        if not obj:
            return None
        return make_refnode(builder, fromdocname, obj[0],
                            name.replace('$', '_S_'), contnode, name)

    def get_objects(self):
        for refname, (docname, type) in self.data['objects'].items():
            yield refname, refname, type, docname, refname.replace('$', '_S_'), 1

def setup(app):
    app.add_domain(MongoDBDomain)
