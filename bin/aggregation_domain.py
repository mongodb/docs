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

from mongodb_domain import MongoDBObject, MongoDBMethod, MongoDBXRefRole, MongoDBDomain

from sphinx.locale import l_, _
from sphinx.domains import Domain, ObjType

class AggregationObject(MongoDBObject):
   def get_index_text(self, objectname, name_obj):
        name, obj = name_obj
        if self.objtype == 'aggregator':
            return _('%s (aggregation framework pipeline operator)') % (name)
        elif self.objtype == 'expression':
            return _('%s (aggregation framework transformation expression)') % (name)
        elif self.objtype == 'group':
            return _('%s (aggregation framework group expression)') % (name)
        return ''

class AggregationCallable(MongoDBMethod):
    pass

class Aggregation(MongoDBXRefRole):
    pass

class AggregationDomain(MongoDBDomain):
    """Aggregation Framework Documentation domain."""
    name = 'agg'
    label = 'Aggregation Framework'
    # if you add a new object type make sure to edit MongoDBObject.get_index_string
    object_types = {
        'pipeline':     ObjType(l_('pipeline'),    'pipeline'),
        'group':        ObjType(l_('group'),       'group'),
        'expression':   ObjType(l_('expression'),  'expression'),
    }
    directives = {
        'pipeline':      MongoDBObject,
        'group':         MongoDBObject,
        'expression':    MongoDBObject,
    }
    roles = {
        'pipeline':    MongoDBXRefRole(),
        'group':       MongoDBXRefRole(),
        'expression':  MongoDBXRefRole(),
    }

def setup(app):
    app.add_domain(AggregationDomain)
