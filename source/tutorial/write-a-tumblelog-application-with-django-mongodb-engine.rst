==========================================================
Writing A Tumblelog Application With Django MongoDB Engine
==========================================================

Introduction
------------

In this tutorial, you will learn how to create a basic tumblelog
application using the popular `Django`_ framework and `MongoDB`_ as the
database.

The tumblelog will consist of two parts:

  #. A public site that lets people view posts and comment on them.
  #. An admin site that lets you add, change and delete posts and publish
     comments.

This tutorial assumes that you are already familiar with Django and have a
basic idea of MongoDB operation and have a `configured MongoDB installation`_.

.. admonition :: Where to get help

    If you're having trouble going through this tutorial, please post a
    message to `mongodb-user`_ or drop by `#mongodb on irc.freenode.net`_ to
    chat with other MongoDB users who might be able to help.

.. note ::

    `Django MongoDB Engine`_ uses the a forked version of Django 1.3 that adds
    non-relational support.

.. _Django: http://www.djangoproject.com
.. _MongoDB: http://mongodb.org
.. _configured MongoDB installation: http://www.mongodb.org/display/DOCS/Quickstart
.. _mongodb-user: http://groups.google.com/group/mongodb-user
.. _#mongodb on irc.freenode.net: irc://irc.freenode.net/mongodb
.. _Django MongoDB Engine: http://django-mongodb.org/


Installation
------------

First you need to install the required packages to get up and running.

Prerequisite
~~~~~~~~~~~~

In this tutorial we'll be using a pip_ its not a requirement but it helps, also
its advisable to use virtualenv_ for your the project to isolate the environment
and stop any conflict with other Python setups.

To setup virtualenv and environment::

    pip install virtualenv  # Installs virtualenv
    virtualenv myproject    # Creates an environment called: myproject

To activate `myproject` environment in Bash type::

    source myproject/bin/activate

.. _pip: http://pypi.python.org/pypi/pip
.. _virtualenv: http://virtualenv.org

Installing Packages
~~~~~~~~~~~~~~~~~~~

Django MongoDB Engine directly depends on:

* Django-nonrel_, a fork of Django 1.3 that adds support for non-relational
  databases
* djangotoolbox_, a bunch of utilities for non-relational Django applications
  and backends

To install simply:

.. code-block:: bash

    pip install https://bitbucket.org/wkornewald/django-nonrel/get/tip.tar.gz
    pip install https://bitbucket.org/wkornewald/djangotoolbox/get/tip.tar.gz
    pip install https://github.com/django-nonrel/mongodb-engine/tarball/master


That's all thats needed to start building our tumblelog!


.. _Django-nonrel: http://www.allbuttonspressed.com/projects/django-nonrel
.. _djangotoolbox: http://www.allbuttonspressed.com/projects/djangotoolbox

Getting Started By Building A Blog
----------------------------------

The first focus is on getting the basic tumblelog up and running, with
the first post manually added via the shell, later we'll use django admin.

As with any Django project you call `startproject` to get started and create
the basic project skeleton:

.. code-block:: bash

  django-admin.py startproject tumblelog


Configuring Django
~~~~~~~~~~~~~~~~~~

Configure the database in :file:`tumblelog/settings.py`:

.. code-block:: python

   DATABASES = {
      'default': {
         'ENGINE': 'django_mongodb_engine',
         'NAME': 'my_tumble_log'
      }
   }

See the `Django MongoDB Engine Settings`_ docs for more configuration options.

.. _Django MongoDB Engine Settings: http://django-mongodb.org/reference/settings.html

Defining The Schema
~~~~~~~~~~~~~~~~~~~

The first step in writing a tumblelog in Django is to define the models or in
MongoDB parlance *documents*.

In our simple tumblelog app, initally all that is needed are posts and
comments.  Each Post can contain a list of Comments. Edit the
:file:`tumblelog/models.py` file so it looks like this:

.. code-block:: python

    from django.db import models
    from django.core.urlresolvers import reverse

    from djangotoolbox.fields import ListField, EmbeddedModelField


    class Post(models.Model):
        created_at = models.DateTimeField(auto_now_add=True, db_index=True)
        title = models.CharField(max_length=255)
        slug = models.SlugField()
        body = models.TextField()
        comments = ListField(EmbeddedModelField('Comment'), editable=False)

        def get_absolute_url(self):
            return reverse('post', kwargs={"slug": self.slug})

        def __unicode__(self):
            return self.title

        class Meta:
            ordering = ["-created_at"]


    class Comment(models.Model):
        created_at = models.DateTimeField(auto_now_add=True)
        body = models.TextField(verbose_name="Comment")
        author = models.CharField(verbose_name="Name", max_length=255)


The Django nonrel code looks the same as vanilla Django however, there is no
inbuilt support for some of MongoDB's native datatypes like Lists
and Embedded data, djangotoolbox is used to handle those definitions
(For more information see the Django MongoDB Engine fields_ documentation).

The models declare an index to ``Post``. One for the ``created_at`` date as
our frontpage will order by date - theres no need to add ``db_index`` on the
``SlugField`` as its indexed by default.


.. _fields: http://django-mongodb.org/reference/fields.html


Adding Data Into MongoDB Via The Shell
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Its nearly time to setup our urls and views, but first lets try it out in the
python shell.  To load the python shell run:

.. code-block:: bash

    python manage.py shell

Create the first post:

.. code-block:: pycon

    >>> from tumblelog.models import *
    >>> post = Post(
    ... title="Hello World!",
    ... slug="hello-world",
    ... body = "Welcome to my new shiny Tumble log powered by MongoDB and Django-MongoDB!"
    ... )
    >>> post.save()

Next add some comments:

.. code-block:: pycon

    >>> post.comments
    []
    >>> comment = Comment(
    ... author="Joe Bloggs",
    ... body="Great post! I'm looking forward to reading your blog")
    >>> post.comments.append(comment)
    >>> post.save()

Finally inspect the post:

.. code-block:: pycon

    >>> post = Post.objects.get()
    >>> post
    <Post: Hello World!>
    >>> post.comments
    [<Comment: Comment object>]


Adding The Views
~~~~~~~~~~~~~~~~

Thanks to django-mongodb tight integration to Django you can use `generic
views`_ to display our frontpage and post page.  Adding the views is as simple
as setting :file:`urls.py`:

.. code-block:: python

    from django.conf.urls.defaults import patterns, include, url
    from django.views.generic import ListView, DetailView
    from tumblelog.models import Post

    urlpatterns = patterns('',
        url(r'^$', ListView.as_view(
            queryset=Post.objects.all(),
            context_object_name="posts_list"),
            name="home"
        ),
        url(r'^post/(?P<slug>[a-zA-Z0-9-]+)/$', DetailView.as_view(
            queryset=Post.objects.all(),
            context_object_name="post"),
            name="post"
        ),
    )

.. _`generic views`: https://docs.djangoproject.com/en/1.3/topics/class-based-views/


Adding Templates
~~~~~~~~~~~~~~~~


In the tumblelog directory add the following directories :file:`templates`
and :file:`templates/tumblelog` for storing the tumblelog templates:

.. code-block:: bash

    mkdir -p templates/tumblelog


Configure Django so it can find the templates by updating **TEMPLATE_DIRS** in
:file:`settings.py` to

.. code-block:: python

    import os.path
    TEMPLATE_DIRS = (
        os.path.join(os.path.realpath(__file__), '../templates'),
    )


It's best practise to add a base template that all others can inherit from.
Add the following to :file:`templates/base.html`:

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

        <div class="topbar">
          <div class="fill">
            <div class="container">
              <h1><a href="/" class="brand">My Tumblelog</a> <small>Starring MongoDB and Django-Mongodb</small></h1>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="content">
            {% block page_header %}{% endblock %}
            {% block content %}{% endblock %}
          </div>
        </div>

      </body>
    </html>


Now create the frontpage for the blog, which should list all the posts. Add
the following to :file:`templates/tumblelog/post_list.html`:

.. code-block:: html

    {% extends "base.html" %}

    {% block content %}
        {% for post in posts_list %}
          <h2><a href="{% url post slug=post.slug %}">{{ post.title }}</a></h2>
          <p>{{ post.body|truncatewords:20 }}</p>
          <p>
            {{ post.created_at }} |
            {% with total=post.comments|length %}
                {{ total }} comment{{ total|pluralize }}
            {% endwith %}
          </p>
        {% endfor %}
    {% endblock %}

Finally, add :file:`templates/tumblelog/post_detail.html` for the individual
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
      <p>{{ post.created_at }}</p>
      <hr>
      <h2>Comments</h2>
      {% if post.comments %}
        {% for comment in post.comments %}
           <p>{{ comment.body }}</p>
           <p><strong>{{ comment.author }}</strong> <small>on {{ comment.created_at }}</small></p>
          {{ comment.text }}
        {% endfor %}
      {% endif %}
    {% endblock %}

Now run ``python manage.py runserver`` and see your new tumblelog! Got to
`http://localhost:8000/ <http://localhost:8000/>`_ and you should see:

    .. image:: .static/django-nonrel-frontpage.png


Adding Comments To The Blog
---------------------------

The next step is to allow your tumblelog readers to comment on posts. Custom
views are needed to do this effectively with a custom form and a view that
handles the form data and update the template to include the form. Lets get
started!

Creating The Comments Form
~~~~~~~~~~~~~~~~~~~~~~~~~~

Form handling needs to be customised to deal with embedded comments.  By
extending :class:`ModelForm` so we can append the comment to the post on save.
Create and add the following to :file:`forms.py`:

.. code-block:: python

    from django.forms import ModelForm
    from tumblelog.models import Comment


    class CommentForm(ModelForm):

        def __init__(self, object, *args, **kwargs):
            """Override the default to store the original document
            that comments are embedded in.
            """
            self.object = object
            return super(CommentForm, self).__init__(*args, **kwargs)

        def save(self, *args):
            """Append to the comments list and save the post"""
            self.object.comments.append(self.instance)
            self.object.save()
            return self.object

        class Meta:
            model = Comment


Handling Comments In The View
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The generic views need to be extended to handle the form logic.  Add
:file:`views.py`:

.. code-block:: python

    from django.http import HttpResponseRedirect
    from django.views.generic import DetailView
    from tumblelog.forms import CommentForm


    class PostDetailView(DetailView):
        methods = ['get', 'post']

        def get(self, request, *args, **kwargs):
            self.object = self.get_object()
            form = CommentForm(object=self.object)
            context = self.get_context_data(object=self.object, form=form)
            return self.render_to_response(context)

        def post(self, request, *args, **kwargs):
            self.object = self.get_object()
            form = CommentForm(object=self.object, data=request.POST)

            if form.is_valid():
                form.save()
                return HttpResponseRedirect(self.object.get_absolute_url())

            context = self.get_context_data(object=self.object, form=form)
            return self.render_to_response(context)

.. note::
    The default DetailView has been extended to handle GET and POST
    requests.  When the form is POSTed the form is validated and if valid the
    ``Comment`` is added to the ``Post``.

Don't forget to update :file:`urls.py` and import your :class:`PostDetailView`
which replaces :class:`DetailView`.


Adding Comments To The Templates
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The final stage is adding the form to the templates, so then readers can
comment away! Splitting the template for the forms out into
:file:`templates/_forms.html` will allow maximum reuse of forms code:

.. code-block:: html

    <fieldset>
    {% for field in form.visible_fields %}
    <div class="clearfix {% if field.errors %}error{% endif %}">
      {{ field.label_tag }}
      <div class="input">
        {{ field }}
        {% if field.errors or field.help_text %}
          <span class="help-inline">
          {% if field.errors %}
            {{ field.errors|join:' ' }}
          {% else %}
            {{ field.help_text }}
          {% endif %}
          </span>
        {% endif %}
      </div>
    </div>
    {% endfor %}
    {% csrf_token %}
    <div style="display:none">{% for h in form.hidden_fields %} {{ h }}{% endfor %}</div>
    </fieldset>

After the comments in :file:`post_detail.html` add in the following code to
output the comments form :

.. code-block:: html

    <h2>Add a comment</h2>
    <form action="." method="post">
      {% include "_forms.html" %}
      <div class="actions">
        <input type="submit" class="btn primary" value="comment">
      </div>
    </form>

Your tumblelog readers can now comment on your posts! Now run
``python manage.py runserver`` and goto
`http://localhost:8000/hello-world/ <http://localhost:8000/hello-world/>`_
and you should see:

    .. image:: .static/django-nonrel-comment-form.png


Adding Site Administration
--------------------------

Adding new posts via the shell is going to get tiring quickly, but adding an
admin for the posts is easy with Django.

Enable the admin by adding the following apps to `INSTALLED_APPS`
in :file:`settings.py`.

 * django.contrib.admin
 * django_mongodb_engine
 * djangotoolbox
 * tumblelog

.. important::

    The Sites framework isn't needed please remove **'django.contrib.sites'**
    from **INSTALLED_APPS**.  If you need it later please read `SITE_ID issues`_.

Create a basic :file:`admin.py` and register Post model with the admin app:

.. code-block:: python

    from django.contrib import admin
    from tumblelog.models import Post

    admin.site.register(Post)


.. note ::

    We've had to work round django-nonrel / djangotoolbox a little here. The
    **comments** field has been excluded, by making it non editable in the
    model definition, otherwise the admin wouldn't function.

    If you need an admin for a ListField you'd have to write your own Form /
    Widget.  See Django Admin docs for more details.

Update the :file:`urls.py` to enable admin.  Add the import and discovery
mechanism to the top of the file, then add the admin import rule to the
``urlpatterns``:

.. code-block:: python

    # Enable admin
    from django.contrib import admin
    admin.autodiscover()

    urlpatterns = patterns('',

        ...

        url(r'^admin/', include(admin.site.urls)),
    )

Finally, add a superuser and setup the indexes by running:

.. code-block:: bash

    python manage.py syncdb

Once done run the server and you can login to admin by going to
`http://localhost:8000/admin/ <http://localhost:8000/admin/>`_.

    .. image:: .static/django-nonrel-admin.png


.. _`SITE_ID issues`: http://django-mongodb.org/troubleshooting.html#site-id-issues


Converting The Blog To A Tumblelog
----------------------------------

Currently, the web app only support posts but tumblelogs traditionally support
different types of media.  The next step is to add the following types:
*Video*, *Image* and *Quote*. No migration is needed to start adding this data!
In :file:`models.py` update the :class:`Post` class to add new fields for the
new post types, we mark ``blank=True`` so that they don't have to store a
value.

Update :class:`Post` in :file:`models.py` to:

.. code-block:: python


    POST_CHOICES = (
        ('p', 'post'),
        ('v', 'video'),
        ('i', 'image'),
        ('q', 'quote'),
    )


    class Post(models.Model):
        created_at = models.DateTimeField(auto_now_add=True)
        title = models.CharField(max_length=255)
        slug = models.SlugField()

        comments = ListField(EmbeddedModelField('Comment'), editable=False)

        post_type = models.CharField(max_length=1, choices=POST_CHOICES, default='p')

        body = models.TextField(blank=True, help_text="The body of the Post / Quote")
        embed_code = models.TextField(blank=True, help_text="The embed code for video")
        image_url = models.URLField(blank=True, help_text="Image src")
        author = models.CharField(blank=True, max_length=255, help_text="Author name")

        def get_absolute_url(self):
            return reverse('post', kwargs={"slug": self.slug})

        def __unicode__(self):
            return self.title


.. note::
    Django Nonrel doesn't support multi-table inheritance which means that
    you have to manually create an admin form to handle data validation for
    the different post types.

    Using Abstract Inheritance would mean that our view logic
    would have to merge data from multiple collections.

The admin should now handle adding multiple types of post. All that is left is
updating the frontend to handle and output the different post types.

In :file:`post_list.html` change outputting the post to:

.. code-block:: html

    {% if post.post_type == 'p' %}
      <p>{{ post.body|truncatewords:20 }}</p>
    {% endif %}
    {% if post.post_type == 'v' %}
      {{ post.embed_code|safe }}
    {% endif %}
    {% if post.post_type == 'i' %}
      <p><img src="{{ post.image_url }}" /><p>
    {% endif %}
    {% if post.post_type == 'q' %}
      <blockquote>{{ post.body|truncatewords:20 }}</blockquote>
      <p>{{ post.author }}</p>
    {% endif %}

And on :file:`post_detail.html` output the full posts:

.. code-block:: html

    {% if post.post_type == 'p' %}
      <p>{{ post.body }}<p>
    {% endif %}
    {% if post.post_type == 'v' %}
      {{ post.embed_code|safe }}
    {% endif %}
    {% if post.post_type == 'i' %}
      <p><img src="{{ post.image_url }}" /><p>
    {% endif %}
    {% if post.post_type == 'q' %}
      <blockquote>{{ post.body }}</blockquote>
      <p>{{ post.author }}</p>
    {% endif %}

Now you have a fully fledged tumbleblog using Django and MongoDB!

    .. image:: .static/django-nonrel-tumblelog.png
