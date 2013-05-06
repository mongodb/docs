#!/usr/bin/python
# Copyright 2012-2013 10gen, Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Author: Sam Kleinman (tychoish)

class BuildClothError(Exception):
    """
    :class:`~cloth.BuildClothError` is the primary exception base class for
    Buildcloth.

    When raised with a string, the resulting exception will return the error
    message.
    """
    def __init__(self, msg=None):
        """
        :param string msg: A message to include with the exception. Defaults to
                           ``None``.
        """

        self.msg = msg
        "A message included  exception message."

    def __str__(self):
        if self.msg is None:
            return "Error constructing buildfile."
        else:
            return "Error: " + self.msg

class MalformedBlock(BuildClothError):
    "Raised when attempting to insert an invalid block."
    pass

class DuplicateBlock(BuildClothError):
    "Raised when inserting a duplicate block to avoid overwriting data."
    pass

class MalformedRawContent(BuildClothError):
    "Raised when attempting to insert malformed raw content directly to a build system object."
    pass

class MalformedContent(BuildClothError):
    "Raised when attempting to insert malformed content to builder."
    pass

class InvalidBuilder(BuildClothError):
    "Raised when a :attr:`~cloth.BuildCloth.builder` block is not valid."
    pass

class MissingBlock(BuildClothError):
    """
    Raised when attempting to access a :attr:`~cloth.BuildCloth.builder` block
    that does not exit.
    """
    pass


import os

def print_output(list):
    """
    :param list list: A list of strings to print.

    Takes a list as a single argument and prints each line.
    """
    for line in list:
        print(line)

def write_file(list, filename):
    """
    :param list list: A list of strings to write.
    :param string filename: The name of the file to write with ``list``.

    Write all items in ``list`` to the file specified by ``filename``. Creates
    enclosing directories if needed, and overwrite an existing file of the same
    name if it exists.
    """
    dirpath = filename.rsplit('/', 1)[0]
    if os.path.isdir(dirpath) is False:
        os.mkdir(dirpath)

    with open(filename, 'w') as f:
        for line in list:
            f.write(line + '\n')

class BuildCloth(object):
    """
    The primary base class for a generated build system file. Contains an
    interface for producing output, as well as the structure for representing
    build system fragments internally.

    :class:`~cloth.BuildCloth` have a notion of :term:`block <block>`, or
    sections of a makefile, identified by keys in the
    :attr:`~cloth.BuildCloth.builder` dictionary. All items are always added to
    the ``_all`` key, which is the default block, but you can optionally add
    data to other ``blocks`` if you want to insert build specifications out of
    order. Nevertheless, :class:`~cloth.BuildCloth` is not thread-safe.
    """

    def __init__(self, buildfile=None):
        """
        :param BuildCloth buildfile: An object of the :class:`~cloth.BuildCloth` class.

        By default, :class:`~cloth.BuildCloth` creates an empty
        :class:`~cloth.BuildCloth` object. However, if you pass a
        :class:`~cloth.BuildCloth` object or list buildfile lines, the new
        :class:`~cloth.BuildCloth` object will add these lines to the ``_all``
        block.

        Raises :exc:`~err.MalformedBlock` if ``buildfile`` is not a list, or
        if ``buildfile`` is a list or a dict.
        """

        self.builder = { '_all' : [] }
        """The main mapping of :term:`block` names to block content, which are
        lists of lines of build systems. The ``_all`` key stores all block
        content, somewhat redundantly."""

        self.buildfile = self.builder['_all']
        "An alias to the ``_all`` block of :attr:`~cloth.BuildCloth.builder`."

        if buildfile is None:
            pass
        elif type(buildfile) is list:
            for line in buildfile:
                if type(line) is list or type(line) is dict:
                    raise MalformedBlock('Cannot instantiate BuildCloth with nested list or dictionary.')
                    break
                else:
                    self.builder['_all'].append(line)
        else:
            raise MalformedBlock('Instantiated BuildCloth object with malformed argument.')

    # The following two methods allow more direct interaction with the
    # internal representation of the buildfile.

    def block(self, block):
        """
        :param string block: The name of a build file block to create.

        Raises a :exc:`~err.DuplicateBlock` error if the block exists,
        otherwise creates a new empty block and inserts a section break with the
        name of the block as the title.
        """

        if block in self.builder:
            raise DuplicateBlock('Cannot add "%s" to build. %s already exists.'
                                 % (block, block))
        else:
            self.builder[block] = []
            self.section_break(block, block)

    def raw(self, lines, block='_all'):
        """
        :param list lines: A list of strings used as lines inserted directly to
                           buildfile blocks.

        :param string block: Optional; defaults to ``_all``. Specify the name of
                             the block in :attr:`~cloth.BuildCloth.builder`.

        Adds raw content to the buildfile representation, useful for inserting
        build systems constructs not present in Buildcloth such as ``ifdef``
        statements in :term:`Makefiles <makefile>`.

        Raises :exc:`~err.MalformedRawContent` if you attempt to add non-list
        content or a list that contains lists or dicts.
        """

        if type(lines) is list:
            o = []
            for line in lines:
                if type(line) is list or type(line) is dict:
                    raise MalformedRawContent('Cannot add nested lists or dicts with raw().')
                else:
                    o.append(line)
            self._add_to_builder(data=o, block=block, raw=True)
        else:
            raise MalformedRawContent('Cannot add non-list raw() content.')

    # Basic commenting and other formatting niceties that are not builder
    # specific but are generally userfacing.

    def section_break(self, name, block='_all'):
        """
        :param string name: The name of the section.

        :param string block: Optional; defaults to ``_all``. Specify the name of
                             the block in :attr:`~cloth.BuildCloth.builder`.

        Adds an item to a block that consists of 2 blank lines a series of
        octothorpe characters (e.g. ``#``), the ``name`` and more octothrope
        characters. Use section breaks to increase the readability of output
        build systems.
        """
        self._add_to_builder('\n\n########## ' + name + ' ##########', block)

    def comment(self, comment, block='_all'):
        """
        :param string comment: The text of a comment.

        :param string block: Optional; defaults to ``_all``. Specify the name of
                             the block in :attr:`~cloth.BuildCloth.builder`.

        Adds an item to a block that consists of a blank line, a single
        octothorpe and the text of the ``comment``. Use comments to increase
        readability and explictness of the build system.
        """
        self._add_to_builder('\n# ' + comment, block)

    def newline(self, n=1, block='_all'):
        """
        :param int n: Defaults to ``1``.

        :param string block: Optional; defaults to ``_all``. Specify the name of
                             the block in :attr:`~cloth.BuildCloth.builder`.

        Appends new empty strings to a block, which the output methods render as
        blank lines.
        """

        for i in range(n):
            self._add_to_builder('', block)

    # the following method is used internally to construct and
    # maintain the internal representation of the buildfile.

    def _add_to_builder(self, data, block, raw=False):
        """
        Internal interface used to append content to a block, used by all other
        methods to modify the content of a buildfile. Do not call directly: use
        :meth:`~cloth.BuildCloth.raw()` to add content directly.

        May raise :exc:`~err.BuildCloth.MalformedContent()` in cases when
        a user attempts to add non-string data to the build file.
        """
        def add(data, block):
            if block is '_all':
                pass
            else:
                self.buildfile.append(data)

            if block in self.builder:
                self.builder[block].append(data)
            else:
                self.builder[block] = [data]

        if raw is True:
            for line in data:
                add(line, block)
        elif not isinstance(data, basestring):
            raise MalformedContent('Avoided adding malformed data to BuildCloth.')
        else:
            add(data, block)

    # The following methods produce output for public use.

    def get_block(self, block='_all'):
        """
        :param string block: The name of a block in :attr:`~cloth.BuildCloth.builder`.

        Returns the content of the block in :attr:`~cloth.BuildCloth.builder`
        specified by ``block``. Used for testing and integration with other
        Python code.

        If ``block`` does not exist in :attr:`~cloth.BuildCloth.builder`,
        :meth:`~cloth.BuildCloth.get_block()` raises :exc:`~err.InvalidBuilder`.
        """
        if block not in self.builder:
            raise MissingBlock('Error: ' + block + ' not specified in buildfile')
        else:
            return self.builder[block]

    def print_content(self, block_order=['_all']):
        """
        :param list block_order: Defaults to ``['_all']``. Must be a
                                 list. Specifies the list of order to return
                                 blocks in.

        Print blocks in :attr:`~cloth.BuildCloth.builder`, in the order
        specified by ``block_order``. Use for testing or output to standard output.

        Use :meth:`~cloth.BuildCloth.write()` to write content to


        """

        output = []

        if type(block_order) is not list:
            raise InvalidBuilder('Cannot print blocks not specified as a list.')
        else:
            for block in block_order:
                output.append(self.builder[block])

            output = [item for sublist in output for item in sublist]
            print_output(output)

    def print_block(self, block='_all'):
        """
        :param string block: The name of a block in
                             :attr:`~cloth.BuildCloth.builder`.

        Prints a single named block. use for testing and writing block content
        to standard output.

        If ``block`` does not exist in :attr:`~cloth.BuildCloth.builder`,
        :meth:`~cloth.BuildCloth.print_block()` raises
        :exc:`~err.MissingBlock`.
        """
        if block not in self.builder:
            raise MissingBlock('Error: ' + block + ' not specified in buildfile')
        else:
            print_output(self.builder[block])

    def write(self, filename, block_order=['_all']):
        """
        :param string filename: The path of a file to write
                                :attr:`~cloth.BuildCloth.builder` builder content to.

        :param list block_order: Defaults to ``['_all']``. Must be a
                                 list. Specifies the list of order to return
                                 blocks in.

        Uses :meth:`~cloth.write_file()`. In default operation,
        :meth:`~cloth.BuildCloth.write()`
        :meth:`~cloth.BuildCloth.write_block()` have the same output.
        :meth:`~cloth.BuildCloth.write()` makes it possible to write a sequence
        of :term:`blocks <block>`.
        """

        output = []

        if type(block_order) is not list:
            raise MissingBlock('Cannot write blocks not specified as a list.')
        else:
            for block in block_order:
                output.append(self.builder[block])

            output = [item for sublist in output for item in sublist]
            write_file(output, filename)

    def write_block(self, filename, block='_all'):
        """
        :param string filename: The path of a file to write
                                :attr:`~cloth.BuildCloth.builder` content to.

        :param string block: The name of a :attr:`~cloth.BuildCloth.builder`
                             :term:`block``.

        Uses :meth:`~cloth.write_file()`. In default operation,
        :meth:`~cloth.BuildCloth.write()`
        :meth:`~cloth.BuildCloth.write_block()` have the same output.
        :meth:`~cloth.BuildCloth.write_block()` makes it possible to write a
        single :term:`block`.
        """

        if block not in self.builder:
            raise MissingBlock('Error: ' + block + ' not specified in buildfile')
        else:
            write_file(self.builder[block], filename)



class MakefileCloth(BuildCloth):
    def __init__(self, makefile=None):
        """
        :class:`~makefile.MakefileCloth` initializes instances using
        :class:`~cloth.BuildCloth()`.
        """
        super(MakefileCloth, self).__init__(makefile)
        self.makefile = self.buildfile
        "An alias for :attr:`~cloth.BuildCloth.buildfile`."

    # The following methods constitute the 'public' interface for
    # building makefile.

    def var(self, variable, value, block='_all'):
        """
        :param string variable: The name of the variable.

        :param string value: The value of the variable.

        :param string block: Optional; defaults to ``_all``. Specify the name of
                             the block in :attr:`~cloth.BuildCloth.builder`.

        Adds a variable assignment to a build system block.
        """

        self._add_to_builder(variable + ' = ' + value, block)

    def target(self, target, dependency=None, block='_all'):
        """
        :param string,list target:

           The name of the build target. May be a list of strings of build
           targets or a single string in the form that will appear in the
           Makefile output.

        :panram string,list dependency:

           Optional. Specify dependencies for this build target as either a list
           of targets, or as a string a string in the form that will appear in
           the Makefile output.

        :param string block:

           Optional; defaults to ``_all``. Specify the name of the block in
           :attr:`~cloth.BuildCloth.builder`.

        Adds a build target to a build system block. You can specify targets and
        dependencies as either strings or as lists of strings. May raise
        :exc:`~err.MalformedContent` if you attempt to add non-string data to a
        builder, or :exc:`~python:TypeError` if a list does not contain strings.
        """
        if isinstance(target, list):
            target = ' '.join(target)

        if not isinstance(target, basestring):
            err = 'Targets must be strings before inserting them to builder.'
            raise MalformedContent(err)

        if dependency is None:
            self._add_to_builder(target + ':', block)
        else:
            if isinstance(dependency, list):
                dependency = ' '.join(dependency)

            if not isinstance(dependency, basestring):
                err = 'Dependencies must be strings before inserting them to builder.'
                raise MalformedContent(err)

            self._add_to_builder(target + ':' + dependency, block)

    def append_var(self, variable, value, block='_all'):
        """
        :param string variable: A string that specifies the name of the variable.

        :param string value: A string that specifies the value of that variable.

        :param string block: Optional; defaults to ``_all``. Specify the name of
                             the block in :attr:`~cloth.BuildCloth.builder`.

        Declare a variable using Make's ``+=`` assignment method. These values
        create or append the ``value`` to the existing value of the variable of
        this name. Unlike Python, in Make, these you may use
        :meth:`~makefile.append_var()` for previously unassigned variables.
        """
        self._add_to_builder(variable + ' += ' + value, block)

    def simple_var(self, variable, value, block='_all'):
        """
        :param string variable: A string that specifies the name of the variable.

        :param string value: A string that specifies the value of that variable.

        :param string block: Optional; defaults to ``_all``. Specify the name of
                             the block in :attr:`~cloth.BuildCloth.builder`.

        Declare a variable using Make's ``:=`` assignment method. These values
        of these variables are expanded once at the time of the creation. By
        default, the value of all other variables in Make are evaluated once
        upon use.
        """
        self._add_to_builder(variable + ' := ' + value, block)

    def new_var(self, variable, value, block='_all'):
        """
        :param string variable: A string that specifies the name of the variable.

        :param string value: A string that specifies the value of that variable.

        :param string block: Optional; defaults to ``_all``. Specify the name of
                             the block in :attr:`~cloth.BuildCloth.builder`.

        Declare a variable using Make's ``?=`` assignment method. In Make, these
        variables do not override previous assignments of this variable, whereas
        other assignment methods will override existing values.
        """
        self._add_to_builder(variable + ' ?= ' + value, block)

    def _job(self, job, display=False, ignore=False, block='_all'):
        """
        Internal implementation of :meth:`~makefile.MakefileCloth.job`. To allow
        :meth:`~makefile.MakefileCloth.job()` to handle both list and string
        inputs.
        """
        if isinstance(job, str):
            o = '\t'

            if display is False:
                o += '@'

            if ignore is True:
                o += '-'

            o += job

            self._add_to_builder(o, block)
        else:
            raise MalformedContent('Jobs must all be strings.')

    def job(self, job, display=False, ignore=False, block='_all'):
        """
        :param string,list job: The shell command that specifies a job to run to
                                build a target. If you specify a list,
                                :meth:`~makefile.MakefileCloth.job()` will add a
                                sequence of jobs to a builder.

        :param boolean display: Optional; defaults to ``False``. When ``True``
                                Make will output the command when calling it. By
                                default all jobs have an ``@`` prepended,
                                setting this option reverses this behavior.

        :param boolean ignore: Optional; defaults to ``False``. When ``True``,
                               this job will have an ``-`` prepended, which will
                               allow Make to continue building even when this
                               job has a non-zero exit code.

        :param string block: Optional; defaults to ``_all``. Specify the name of
                             the block in :attr:`~cloth.BuildCloth.builder`.

        Creates a shell line or lines (if ``job`` is a list) in a Makefile to
        build a target. May raise :exc:`~err.MalformedContent` ``job`` is not a
        string or list of strings. The ``display`` and ``ignore`` options expose
        underlying Make functionality.
        """

        if isinstance(job, list):
            for j in job:
                self._job(j, display, ignore, block)
        else:
            self._job(job, display, ignore, block)

    def message(self, message, block='_all'):
        """
        :param string message: The text of a message to be output by a build
                               process to describe the current state of builds.

        :param string block: Optional; defaults to ``_all``. Specify the name of
                             the block in :attr:`~cloth.BuildCloth.builder`.

        :meth:`~makefile.MakefileCloth.message()` is a special wrapper around
        :meth:`~makefile.MakefileCloth.job()` that makes it possible to describe
        the actions of a Make shell line in human-readable text. The buildcloth
        idiom, inspired by ninja is to suppress echoing shell lines to the user
        in favor of crafted messages that describe each action.
        """

        m = 'echo ' + message
        self.job(job=m, display=False, block=block)

    msg = message
    "An alias for :meth:`~makefile.MakefileCloth.message()`"
