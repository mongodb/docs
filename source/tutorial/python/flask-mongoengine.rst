=====================
Flask and MongoEngine
=====================

Overview
--------

In this tutorial, you will learn how to create a basic tumblelog
application using the popular `Flask`_ framework and `MongoDB`_ as the
database.

The tumblelog will consist of two parts:

  #. A public site that lets people view posts and comment on them.
  #. An admin site that lets you add and change posts.

This tutorial assumes that you are already familiar with Flask and have a basic
idea of MongoDB operation and have a `configured MongoDB installation`_. Also,
you'll be using `MongoEngine`_ as the Object Data Mapper to simplify the interaction
to MongoDB.

.. admonition :: Where to get help

    If you're having trouble going through this tutorial, please post a message
    to `mongodb-user`_ or drop by `#mongodb on irc.freenode.net`_ to chat
    with other MongoDB users who might be able to help.


Installation
------------

First we need to install the required packages to get up and running.

Prerequisite
~~~~~~~~~~~~

In this tutorial we'll be using a pip_ its not a requirement but it helps, also
its advisable to use virtualenv_ for your the project to isolate the environment
and stop any conflict with other Python setups.

To setup virtualenv and environment

.. code-block:: bash

    pip install virtualenv  # Installs virtualenv
    virtualenv myproject    # Creates an environment called: myproject

To activate `myproject` environment in Bash type

.. code-block:: bash

    source myproject/bin/activate


Installing packages
~~~~~~~~~~~~~~~~~~~

As Flask is a microframework you need to install some extensions to
get some extra features for minimal effort:

    * `WTForms`_ for easy form handling.
    * `Flask-MongoEngine`_ extension to integrate MongoEngine and WTForms.
    * `Flask-Script`_ for an easy to use development server

To install simply

.. code-block:: bash

    pip install flask
    pip install flask-script
    pip install WTForms
    pip install https://github.com/hmarr/mongoengine/tarball/dev
    pip install https://github.com/rozza/flask-mongoengine/tarball/master

That's all you need to start building a tumblelog!


Getting started
---------------

First, lets create a barebones application to get up and running. Create a
directory called :file:`tumblelog` for the project and then inside that directory
add the following file :file:`__init__.py`:

.. code-block:: python

    from flask import Flask
    app = Flask(__name__)


    if __name__ == '__main__':
        app.run()

Now create :file:`manage.py` (any Djangonauts will be familiar with the
concept) here you can load any future flask-scripts you need. Flask-scripts
provide a development server and shell:

.. code-block:: python

    # Set the path
    import os, sys
    sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

    from flaskext.script import Manager, Server
    from tumblelog import app

    manager = Manager(app)

    # Turn on debugger by default and reloader
    manager.add_command("runserver", Server(
        use_debugger=True,
        use_reloader=True,
        host='0.0.0.0')
    )

    if __name__ == "__main__":
        manager.run()



Now you have a basic skeleton for your app, you should be able to run:

.. code-block :: bash

    python manage.py runserver

without errors and going to `http://localhost:5000/ <http://localhost:5000/>`_
should output a 404 page.


Setting up MongoEngine
~~~~~~~~~~~~~~~~~~~~~~

First install the flask extension and add the configuration. Update
:file:`__init__.py` to:

.. code-block:: python

    from flask import Flask
    from flaskext.mongoengine import MongoEngine

    app = Flask(__name__)
    app.config["MONGODB_DB"] = "my_tumble_log"

    db = MongoEngine(app)

    if __name__ == '__main__':
        app.run()

See the `MongoEngine Settings`_ docs for more configuration options.

Define the schema
~~~~~~~~~~~~~~~~~

The first step in writing a tumblelog in Flask_ is to define the models or in
MongoDB parlance *documents*.

In our simple tumblelog app, initally you need to define posts and comments, so
that each Post can contain a list of Comments. Edit the :file:`tumblelog/models.py`
file so it looks like this

.. code-block:: python

    import datetime
    from flask import url_for
    from tumblelog import db


    class Post(db.Document):
        created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
        title = db.StringField(max_length=255, required=True)
        slug = db.StringField(max_length=255, required=True)
        body = db.StringField(required=True)
        comments = db.ListField(db.EmbeddedDocumentField('Comment'))

        def get_absolute_url(self):
            return url_for('post', kwargs={"slug": self.slug})

        def __unicode__(self):
            return self.title

        meta = {
            'indexes': ['-created_at', 'slug'],
            'ordering': ['-created_at']
        }


    class Comment(db.EmbeddedDocument):
        created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
        body = db.StringField(verbose_name="Comment", required=True)
        author = db.StringField(verbose_name="Name", max_length=255, required=True)


As you can see the MongoEngine syntax is simple and declarative, it should look
familiar to those from a Django background. You've defined a couple of indexes
to  ``Post``. One for the ``created_at`` date as our frontpage will order by
date and another for the individual post ``slug``.

Trying out the shell
~~~~~~~~~~~~~~~~~~~~

Its nearly time to setup our urls and views, but first lets try it out in the
python shell. To load the python shell run:

.. code-block:: bash

    python manage.py shell

Now lets create the first post:

.. code-block:: pycon

    >>> from tumblelog.models import *
    >>> post = Post(
    ... title="Hello World!",
    ... slug="hello-world",
    ... body="Welcome to my new shiny Tumble log powered by MongoDB, MongoEngine and Flask"
    ... )
    >>> post.save()

    # Surely we want to add some comments.

    >>> post.comments
    []
    >>> comment = Comment(
    ... author="Joe Bloggs",
    ... body="Great post! I'm looking forward to reading your blog"
    ... )
    >>> post.comments.append(comment)
    >>> post.save()

    # Look and see, it has actually been saved!

    >>> post = Post.objects.get()
    >>> post
    <Post: Hello World!>
    >>> post.comments
    [<Comment: Comment object>]


Adding the views
~~~~~~~~~~~~~~~~

Using Flask's Class based views will let you quickly produce a List and Detail
view for the tumblelog posts. Add :file:`views.py` and create a *posts*
blueprint_:

.. code-block :: python

    from flask import Blueprint, request, redirect, render_template, url_for
    from flask.views import MethodView
    from tumblelog.models import Post, Comment

    posts = Blueprint('posts', __name__, template_folder='templates')


    class ListView(MethodView):

        def get(self):
            posts = Post.objects.all()
            return render_template('posts/list.html', posts=posts)


    class DetailView(MethodView):

        def get(self, slug):
            post = Post.objects.get_or_404(slug=slug)
            return render_template('posts/detail.html', post=post)


    # Register the urls
    posts.add_url_rule('/', view_func=ListView.as_view('list'))
    posts.add_url_rule('/<slug>/', view_func=DetailView.as_view('detail'))



Now in :file:`__init__.py` register the blueprint, avoiding a circular
dependency by registering the blueprints in a method. Add the following code:

.. code-block :: python

    def register_blueprints(app):
        # Prevents circular imports
        from tumblelog.views import posts
        app.register_blueprint(posts)

    register_blueprints(app)


Adding templates
~~~~~~~~~~~~~~~~

In the tumblelog directory add the following directories :file:`templates`
and :file:`templates/posts` for storing the tumblelog templates:

.. code-block:: bash

    mkdir -p templates/posts

First lets create a base template that all others can inherit from, add the
following to :file:`templates/base.html`:

.. code-block:: html

    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>My Tumblelog</title>
        <link href="http://twitter.github.com/bootstrap/1.4.0/bootstrap.css" rel="stylesheet">
        <style>.content {padding-top: 80px;}</style>
      </head>

      <body>

        {%- block topbar -%}
        <div class="topbar">
          <div class="fill">
            <div class="container">
              <h2>
                  <a href="/" class="brand">My Tumblelog</a> <small>Starring Flask, MongoDB and MongoEngine</small>
              </h2>
            </div>
          </div>
        </div>
        {%- endblock -%}

        <div class="container">
          <div class="content">
            {% block page_header %}{% endblock %}
            {% block content %}{% endblock %}
          </div>
        </div>
        {% block js_footer %}{% endblock %}
      </body>
    </html>

Now create the frontpage for the blog, which should list all the posts. Add
the following to :file:`templates/posts/list.html`:

.. code-block:: html

    {% extends "base.html" %}

    {% block content %}
        {% for post in posts %}
          <h2><a href="{{ url_for('posts.detail', slug=post.slug) }}">{{ post.title }}</a></h2>
          <p>{{ post.body|truncate(100) }}</p>
          <p>
            {{ post.created_at.strftime('%H:%M %Y-%m-%d') }} |
            {% with total=post.comments|length %}
                {{ total }} comment {%- if total > 1 %}s{%- endif -%}
            {% endwith %}
          </p>
        {% endfor %}
    {% endblock %}


Finally, add :file:`templates/posts/detail.html` template for the individual
posts:

.. code-block:: html

    {% extends "base.html" %}

    {% block page_header %}
      <div class="page-header">
        <h1>{{ post.title }}</h1>
      </div>
    {% endblock %}

    {% block content %}
      <p>{{ post.body }}<p>
      <p>{{ post.created_at.strftime('%H:%M %Y-%m-%d') }}</p>
      <hr>
      <h2>Comments</h2>
      {% if post.comments %}
        {% for comment in post.comments %}
           <p>{{ comment.body }}</p>
           <p><strong>{{ comment.author }}</strong> <small>on {{ comment.created_at.strftime('%H:%M %Y-%m-%d') }}</small></p>
          {{ comment.text }}
        {% endfor %}
      {% endif %}
    {% endblock %}


Now run ``python manage.py runserver`` and see your new tumblelog! Go to
`http://localhost:5000 <http://localhost:5000/>`_ and you should see:

    .. image:: .static/flask-mongoengine-frontpage.png


Adding comments
---------------

The next step is to allow the tumblelog readers to comment on posts.
To achieve this we'll setup the form with `WTForms`_, update the view to
handle the form data and update the template to include the form. Lets get
started!


Updating the view
~~~~~~~~~~~~~~~~~

First :file:`views.py` needs updating and refactoring to handle the form add
the import and update the DetailView to:

.. code-block:: python

    from flaskext.mongoengine.wtf import model_form

    ...

    class DetailView(MethodView):

        form = model_form(Comment, exclude=['created_at'])

        def get_context(self, slug):
            post = Post.objects.get_or_404(slug=slug)
            form = self.form(request.form)

            context = {
                "post": post,
                "form": form
            }
            return context

        def get(self, slug):
            context = self.get_context(slug)
            return render_template('posts/detail.html', **context)

        def post(self, slug):
            context = self.get_context(slug)
            form = context.get('form')

            if form.validate():
                comment = Comment()
                form.populate_obj(comment)

                post = context.get('post')
                post.comments.append(comment)
                post.save()

                return redirect(url_for('posts.detail', slug=slug))
            return render_template('posts/detail.html', **context)


.. note::
    DetailView extends the default Flask MethodView.  The code is kept DRY by
    defining a `get_context` method to get the default context for both GET
    and POST requests. On POST the form is validated and if its valid the
    comment is appended to the post.


Updating templates
~~~~~~~~~~~~~~~~~~

The final stage is adding the form to the templates, so then readers can
comment away! Creating a macro for the forms in :file:`templates/_forms.html`
will allow maximum reuse of forms code:

.. code-block:: html

    {% macro render(form) -%}
    <fieldset>
    {% for field in form %}
    {% if field.type == 'HiddenField' %}
      {{ field() }}
    {% else %}
      <div class="clearfix {% if field.errors %}error{% endif %}">
        {{ field.label }}
        <div class="input">
          {% if field.name == "body" %}
            {{ field(rows=10, cols=40) }}
          {% else %}
            {{ field() }}
          {% endif %}
          {% if field.errors or field.help_text %}
            <span class="help-inline">
            {% if field.errors %}
              {{ field.errors|join(' ') }}
            {% else %}
              {{ field.help_text }}
            {% endif %}
            </span>
          {% endif %}
        </div>
      </div>
    {% endif %}
    {% endfor %}
    </fieldset>
    {% endmacro %}


Now add the comments form to :file:`templates/posts/detail.html`.  Adding an
import at the top of the page and then outputting the form after the comments
are displayed:

.. code-block:: html

    {% import "_forms.html" as forms %}

    ...

    <hr>
    <h2>Add a comment</h2>
    <form action="." method="post">
      {{ forms.render(form) }}
      <div class="actions">
        <input type="submit" class="btn primary" value="comment">
      </div>
    </form>

Your tumblelog readers can now comment on your posts! Run
``python manage.py runserver`` to see your changes.

    .. image:: .static/flask-mongoengine-comment-form.png


Administration
--------------

Adding new posts via the shell is going to get tiring quickly, but adding an
admin is a case of adding authentication and some of Admin Views. This
tutorial only covers adding and editing posts - adding a delete view and
handling slug collisions is left as an exercise for the reader.

Adding basic authentication
~~~~~~~~~~~~~~~~~~~~~~~~~~~

For the purposes of this tutorial all we need is a very basic form of
authentication.  The following example is based off this
`Auth snippet <http://flask.pocoo.org/snippets/8/>`_ .Create :file:`auth.py`:

.. code-block:: python

    from functools import wraps
    from flask import request, Response


    def check_auth(username, password):
        """This function is called to check if a username /
        password combination is valid.
        """
        return username == 'admin' and password == 'secret'


    def authenticate():
        """Sends a 401 response that enables basic auth"""
        return Response(
        'Could not verify your access level for that URL.\n'
        'You have to login with proper credentials', 401,
        {'WWW-Authenticate': 'Basic realm="Login Required"'})


    def requires_auth(f):
        @wraps(f)
        def decorated(*args, **kwargs):
            auth = request.authorization
            if not auth or not check_auth(auth.username, auth.password):
                return authenticate()
            return f(*args, **kwargs)
        return decorated

.. note ::
    This creates a `requires_auth` decorator - it provides basic authentication.
    Any view that needs authentication should be decorated with this decorator.
    The username is ``admin`` and password is ``secret``.


Admin View
~~~~~~~~~~

Create the views and admin blueprint in :file:`admin.py`. As in the next stage
extends the admin, its been deliberately made generic.

.. code-block:: python

    from flask import Blueprint, request, redirect, render_template, url_for
    from flask.views import MethodView

    from flaskext.mongoengine.wtf import model_form

    from tumblelog.auth import requires_auth
    from tumblelog.models import Post, Comment

    admin = Blueprint('admin', __name__, template_folder='templates')


    class List(MethodView):
        decorators = [requires_auth]
        cls = Post

        def get(self):
            posts = self.cls.objects.all()
            return render_template('admin/list.html', posts=posts)


    class Detail(MethodView):

        decorators = [requires_auth]

        def get_context(self, slug=None):
            form_cls = model_form(Post, exclude=('created_at', 'comments'))

            if slug:
                post = Post.objects.get_or_404(slug=slug)
                if request.method == 'POST':
                    form = form_cls(request.form, inital=post._data)
                else:
                    form = form_cls(obj=post)
            else:
                post = Post()
                form = form_cls(request.form)

            context = {
                "post": post,
                "form": form,
                "create": slug is None
            }
            return context

        def get(self, slug):
            context = self.get_context(slug)
            return render_template('admin/detail.html', **context)

        def post(self, slug):
            context = self.get_context(slug)
            form = context.get('form')

            if form.validate():
                post = context.get('post')
                form.populate_obj(post)
                post.save()

                return redirect(url_for('admin.index'))
            return render_template('admin/detail.html', **context)


    # Register the urls
    admin.add_url_rule('/admin/', view_func=List.as_view('index'))
    admin.add_url_rule('/admin/create/', defaults={'slug': None}, view_func=Detail.as_view('create'))
    admin.add_url_rule('/admin/<slug>/', view_func=Detail.as_view('edit'))

.. note::
    Here the List and Detail views are similar to the frontend of the site,
    however, both views are decorated by the ``requires_auth`` decorator.

    The Detail view is slightly more complex, in setting the context there
    is a check for a slug - if no slug the view is for creating a new post,
    otherwise its for editting an existing post.


In :file:`__init__.py` update the :func:`register_blueprints` method to import
the new admin blueprint.

.. code-block:: python

    def register_blueprints(app):
        # Prevents circular imports
        from tumblelog.views import posts
        from tumblelog.admin import admin
        app.register_blueprint(posts)
        app.register_blueprint(admin)



Add admin templates
~~~~~~~~~~~~~~~~~~~

Similar to the frontend, the admin requires three templates, a base template
a list view and a detail view.

Create an :file:`admin` directory for the templates. Add a simple main index
page for the admin :file:`templates/admin/base.html`:

.. code-block:: html

    {% extends "base.html" %}

    {%- block topbar -%}
    <div class="topbar" data-dropdown="dropdown">
      <div class="fill">
        <div class="container">
          <h2>
               <a href="{{ url_for('admin.index') }}" class="brand">My Tumblelog Admin</a>
          </h2>
          <ul class="nav secondary-nav">
            <li class="menu">
               <a href="{{ url_for("admin.create") }}" class="btn primary">Create new post</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    {%- endblock -%}


List all the posts :file:`templates/admin/list.html`:

.. code-block:: html

    {% extends "admin/base.html" %}

    {% block content %}
      <table  class="condensed-table zebra-striped">
        <thead>
          <th>Title</th>
          <th>Created</th>
          <th>Actions</th>
        </thead>
        <tbody>
        {% for post in posts %}
          <tr>
            <th><a href="{{ url_for('admin.edit', slug=post.slug) }}">{{ post.title }}</a></th>
            <td>{{ post.created_at.strftime('%Y-%m-%d') }}</td>
            <td><a href="{{ url_for("admin.edit", slug=post.slug) }}" class="btn primary">Edit</a></td>
          </tr>
        {% endfor %}
        </tbody>
      </table>
    {% endblock %}

Add the create / edit post template :file:`templates/admin/detail.html`:

.. code-block:: html

    {% extends "admin/base.html" %}
    {% import "_forms.html" as forms %}

    {% block content %}
      <h2>
        {% if create %}
          Add new Post
        {% else %}
          Edit Post
        {% endif %}
      </h2>

      <form action="?{{ request.query_string }}" method="post">
        {{ forms.render(form) }}
        <div class="actions">
          <input type="submit" class="btn primary" value="save">
          <a href="{{ url_for("admin.index") }}" class="btn secondary">Cancel</a>
        </div>
      </form>
    {% endblock %}


The admin should now be ready. Restart the runserver and you can login to
admin by going to `http://localhost:5000/admin/ <http://localhost:5000/admin/>`_.
(The username and password is `admin` `secret`).

    .. image:: .static/flask-mongoengine-admin.png


Blog to Tumblelog
-----------------

Currently, the tumblelog only supports posts but tumblelogs traditionally
support different types of media. Add the following types: *Video*, *Image*
and *Quote*.  No migration is needed to start adding this data!
`MongoEngine`_ supports document inheritance.  Refactor :class:`Post` to be a
base class and create classes for the new post types.

Update :file:`models.py` to include the following code to replace the old
:class:`Post` class:

.. code-block:: python

    class Post(db.DynamicDocument):
        created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
        title = db.StringField(max_length=255, required=True)
        slug = db.StringField(max_length=255, required=True)
        comments = db.ListField(db.EmbeddedDocumentField('Comment'))

        def get_absolute_url(self):
            return url_for('post', kwargs={"slug": self.slug})

        def __unicode__(self):
            return self.title

        @property
        def post_type(self):
            return self.__class__.__name__

        meta = {
            'indexes': ['-created_at', 'slug'],
            'ordering': ['-created_at']
        }


    class BlogPost(Post):
        body = db.StringField(required=True)


    class Video(Post):
        embed_code = db.StringField(required=True)


    class Image(Post):
        image_url = db.StringField(required=True, max_length=255)


    class Quote(Post):
        body = db.StringField(required=True)
        author = db.StringField(verbose_name="Author Name", required=True, max_length=255)

.. note::
    In the ``Post`` class the `post_type` helper returns the class name, this
    will allow us to output the different post types in the templates.

As MongoEngine handles returning the correct classes when fetching :class:`Post`
objects no changes are needed to the frontend view logic, only the templates
need modifying.

Update :file:`templates/posts/list.html` and change outputting the post to:

.. code-block:: html

    {% if post.body %}
      {% if post.post_type == 'Quote' %}
        <blockquote>{{ post.body|truncate(100) }}</blockquote>
        <p>{{ post.author }}</p>
      {% else %}
        <p>{{ post.body|truncate(100) }}</p>
      {% endif %}
    {% endif %}
    {% if post.embed_code %}
      {{ post.embed_code|safe() }}
    {% endif %}
    {% if post.image_url %}
      <p><img src="{{ post.image_url }}" /><p>
    {% endif %}

And in :file:`templates/posts/detail.html` output the full posts:

.. code-block:: html

    {% if post.body %}
      {% if post.post_type == 'Quote' %}
        <blockquote>{{ post.body }}</blockquote>
        <p>{{ post.author }}</p>
      {% else %}
        <p>{{ post.body }}</p>
      {% endif %}
    {% endif %}
    {% if post.embed_code %}
      {{ post.embed_code|safe() }}
    {% endif %}
    {% if post.image_url %}
      <p><img src="{{ post.image_url }}" /><p>
    {% endif %}


Updating the admin
~~~~~~~~~~~~~~~~~~

The final stage is to update the admin to support the new post types.
Update :file:`admin.py` to import the new document models and then update
:func:`get_context` in the :class:`Detail` class to dynamically create the
correct model form to use:

.. code-block:: python

    from tumblelog.models import Post, BlogPost, Video, Image, Quote, Comment

    ...

    class Detail(MethodView):

        decorators = [requires_auth]
        # Map post types to models
        class_map = {
            'post': BlogPost,
            'video': Video,
            'image': Image,
            'quote': Quote,
        }

        def get_context(self, slug=None):

            if slug:
                post = Post.objects.get_or_404(slug=slug)
                # Handle old posts types as well
                cls = post.__class__ if post.__class__ != Post else BlogPost
                form_cls = model_form(cls,  exclude=('created_at', 'comments'))
                if request.method == 'POST':
                    form = form_cls(request.form, inital=post._data)
                else:
                    form = form_cls(obj=post)
            else:
                # Determine which post type we need
                cls = self.class_map.get(request.args.get('type', 'post'))
                post = cls()
                form_cls = model_form(cls,  exclude=('created_at', 'comments'))
                form = form_cls(request.form)
            context = {
                "post": post,
                "form": form,
                "create": slug is None
            }
            return context

        ...

Finally update the :file:`template/admin/base.html` to add a create new post
dropdown in the toolbar:

.. code-block:: html

    {% extends "base.html" %}

    {%- block topbar -%}
    <div class="topbar" data-dropdown="dropdown">
      <div class="fill">
        <div class="container">
          <h2>
               <a href="{{ url_for('admin.index') }}" class="brand">My Tumblelog Admin</a>
          </h2>
          <ul class="nav secondary-nav">
            <li class="menu">
              <a href="#" class="menu">Create new</a>
              <ul class="menu-dropdown">
                {% for type in ('post', 'video', 'image', 'quote') %}
                    <li><a href="{{ url_for("admin.create", type=type) }}">{{ type|title }}</a></li>
                {% endfor %}
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    {%- endblock -%}

    {% block js_footer %}
      <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>
      <script src="http://twitter.github.com/bootstrap/1.4.0/bootstrap-dropdown.js"></script>
    {% endblock %}


Now you have a fully fledged tumbleblog using Flask and MongoEngine!

    .. image:: .static/flask-mongoengine-tumblelog.png


.. _Flask: http://flask.pocoo.org/
.. _MongoDB: http://mongodb.org
.. _configured MongoDB installation: http://www.mongodb.org/display/DOCS/Quickstart
.. _mongodb-user: http://groups.google.com/group/mongodb-user
.. _#mongodb on irc.freenode.net: irc://irc.freenode.net/mongodb
.. _pip: http://pypi.python.org/pypi/pip
.. _virtualenv: http://virtualenv.org
.. _MongoEngine: http://mongoengine.org/
.. _WTForms: http://wtforms.simplecodes.com/docs/dev/
.. _Flask-Script: http://pypi.python.org/pypi/Flask-Script
.. _Flask-MongoEngine: http://github.com/rozza/flask-mongoengine
.. _`MongoEngine Settings`: http://mongoengine.org/docs/v0.5/guide/connecting.html
.. _blueprint: http://flask.pocoo.org/docs/blueprints/

