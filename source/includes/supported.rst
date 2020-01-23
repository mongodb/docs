.. contents:: On this page
   :local:
   :backlinks: none
   :depth: 1
   :class: singlecol

Tables
------

.. list-table::
   :header-rows: 1
   :stub-columns: 1

   * - Platform
     - 4.0 Community & Enterprise
     - 3.6 Community & Enterprise
   * - Ubuntu 16.04
     - x
     - x

Pullouts and other formatting niceties
--------------------------------------

.. note:: This is a note
  
   This is a note, use this when you really just want the user to read something, but it's not an emergency if they don't.

.. warning:: This is a warning

   Use this when you have something to say that if ignored could result in danger.

.. important:: This is an important thing

   Something that is important to know, but not an emergency.

.. tip:: This is a tip
  
   Make the reader feel like an insider

Literal include with a code block
---------------------------------

language options are:

- javascript
- java
- node
- python
- go
- csharp
- c++
- sh

.. literalinclude:: /driver-examples/react_stitch_google.js  
   :language: javascript
   :dedent: 2
   :start-after: start stitch import
   :end-before: end stitch import

Plain code block
----------------

Use this code block when you need to embed something in the page directly. Note that language formatting is specified as a parameter.

.. code-block:: sh
     
   npm install mongodb-stitch-browser-sdk

Including images
----------------

Indicate alt text and screen size.

Include a figure:

.. figure:: /images/compass-find-filter-and-or.png
   :alt: Always use alt so screen readers can see.
   :figwidth: 300px


The Uriwriter
-------------

The uriwriter is a directive that will inject a simple form into the page for the user to copy/paste their connection string (without password of course). Alternatively they can type their server params for self-managed MongoDB instances. Once populated, any content in code blocks that contain <URISTRING> will be replaced with a connection string.

.. note:: Tabs
   
   Hidden tabs for the tabs-cloud set and the languages tab set will result in toggle pills at the top of the page. The page will behave differently if you've selected cloud vs local.

.. tabs-cloud::

   hidden: true

   tabs:
     - id: cloud
       content: |
         
        Lucky cloud user!


     - id: local
       content: |

         .. tabs-platforms::

            tabs:

              - id: windows
                content: |
                 
                  We feel sorry for windows users, but we help them when we can.

              - id: linux
                content: |
                
                  Linux users rock.

              - id: macos
                content: |
                
                  Mac users are happier on mojave.
        

.. uriwriter::

and here is what the output will look like in  a code block:

.. code-block:: sh

   mongo <URISTRING>

The functionality is sticky, meaning that if the user comes back to the site later their URISTRING will display.


Roles
-----

In rst, roles are a great way to create logical linking to resources that may change (urls, specifically) and to provide standard formatting across the site.

The idea is that by using a role you don't need to maintain links when they change, and formatting changes will take place without migration.

Formatting roles
----------------

:guilabel:`This is the guilabel role`


Link roles
----------
This is how you :doc:`Link to docs content </server/delete>`

we support many roles in the legacy tool chain, more roles to come as we complete the snooty migration.










   










    




