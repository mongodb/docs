from docutils.parsers.rst import Directive, directives
from docutils import nodes
from sphinx.locale import _
from sphinx.util.compat import Directive, make_admonition
from sphinx import addnodes

class MongoDBNode(Directive):
    """
    An custom admonition for the MongoDB Manual.
    """
    has_content = True
    required_arguments = 0
    optional_arguments = 1
    final_argument_whitespace = True
    option_spec = {}
    is_seealso = False
    is_related = False

    def run(self):
        if self.is_seealso:
            ret = make_admonition(addnodes.seealso, self.name, [_('See')], self.options,
                                  self.content, self.lineno, self.content_offset, self.block_text,
                                  self.state, self.state_machine)
        elif self.is_related:
            ret = make_admonition(addnodes.seealso, self.name, [_('Related')], self.options,
                                  self.content, self.lineno, self.content_offset, self.block_text,
                                  self.state, self.state_machine)
        else:
            ret = make_admonition(optional_node, self.name, self.directive_name, self.options,
                                  self.content, self.lineno, self.content_offset,
                                  self.block_text, self.state, self.state_machine)

        if self.arguments:
            argnodes, msgs = self.state.inline_text(self.arguments[0],
                                                    self.lineno)
            para = nodes.paragraph()
            para += argnodes
            para += msgs
            ret[0].insert(1, para)
        return ret

def visit_mongodb_node(self, node):
    self.visit_admonition(node)

def depart_mongodb_node(self, node):
    self.depart_admonition(node)

def mongodb_add_node(app, type):
    app.add_node(type,
                 html=(visit_mongodb_node, depart_mongodb_node),
                 latex=(visit_mongodb_node, depart_mongodb_node),
                 text=(visit_mongodb_node, depart_mongodb_node),
                 man=(visit_mongodb_node, depart_mongodb_node),
                 texinfo=(visit_mongodb_node, depart_mongodb_node))

################################################################################

class optional_node(nodes.Admonition, nodes.Element): pass

class example_node(nodes.Admonition, nodes.Element): pass

class Optional(MongoDBNode):
    directive_name = ["Optional"]

class Example(MongoDBNode):
    directive_name = ["Example"]

class See(MongoDBNode):
    is_seealso = True
    directive_name = ["See"]

class Related(MongoDBNode):
    is_related = True
    directive_name = ["Related"]

def setup(app):
    app.add_directive('optional', Optional)
    app.add_directive('see', See)
    app.add_directive('related', Related)
    app.add_directive('example', Example)

    mongodb_add_node(app, optional_node)
    mongodb_add_node(app, example_node)
