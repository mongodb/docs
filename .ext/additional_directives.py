from docutils.parsers.rst import Directive, directives
from docutils import nodes
from sphinx.locale import _
from sphinx.util.compat import Directive, make_admonition
from sphinx import addnodes

class optional_node(nodes.Admonition, nodes.Element): pass

class Optional(Directive):
    """
    An admonition mentioning optional steps in a process.
    """
    has_content = True
    required_arguments = 0
    optional_arguments = 1
    final_argument_whitespace = True
    option_spec = {}

    def run(self):
        ret = make_admonition(optional_node, self.name, [_('Optional')], self.options,
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


class See(Directive):
    """
    An admonition mentioning things to look at.
    """
    has_content = True
    required_arguments = 0
    optional_arguments = 1
    final_argument_whitespace = True
    option_spec = {}

    def run(self):
        ret = make_admonition(
            addnodes.seealso, self.name, [_('See')], self.options,
            self.content, self.lineno, self.content_offset, self.block_text,
            self.state, self.state_machine)
        if self.arguments:
            argnodes, msgs = self.state.inline_text(self.arguments[0],
                                                    self.lineno)
            para = nodes.paragraph()
            para += argnodes
            para += msgs
            ret[0].insert(1, para)
        return ret


def visit_optional_node(self, node):
    self.visit_admonition(node)

def depart_optional_node(self, node):
    self.depart_admonition(node)

def setup(app):
    app.add_directive('optional', Optional)
    app.add_directive('see', See)
    app.add_node(optional_node,
                 html=(visit_optional_node, depart_optional_node),
                 latex=(visit_optional_node, depart_optional_node),
                 text=(visit_optional_node, depart_optional_node),
                 man=(visit_optional_node, depart_optional_node),
                 texinfo=(visit_optional_node, depart_optional_node))
