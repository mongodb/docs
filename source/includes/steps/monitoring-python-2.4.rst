.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">1</div></div>

   .. _step-1-monitoring-python-2.4-install-hmac-hashlib-modules:

   Install ``hmac`` and ``hashlib`` Python modules
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


   Install these Python modules with ``easy_install``:

   .. code-block:: sh
   
      sudo easy_install hmac hashlib
      

   Do not use ``pip`` to install modules when using Python 2.4 or 2.5, as
   there are some compatibility issues. Some users have reported problems
   installing ``hmac``, if ``easy_install`` produces an error or you
   suspect a problem with these libraries see :ref:`instructions for
   installing hmac manually <troubleshooting-hmac>`.

   If ``easy_install`` produces an error when trying to install ``hmac``,
   or you see the following error in your agent logs, you will need to
   install the ``hmac`` package manually:

   .. code-block:: none
   
      AttributeError:'builtin_function_or_method' object has no attribute 'new'
      

   To install the ``hmac`` package, begin by downloading the latest source
   package. The following example uses version ``20101005``. Issue the
   following command:

   .. code-block:: sh
   
      curl -O http://pypi.python.org/packages/source/h/hmac/hmac-20101005.tar.gz
      

   Always download the latest version of ``hmac``, which you can find at
   the `hmac page on PyPi <http://pypi.python.org/pypi/hmac>`_.

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">2</div></div>

   .. _step-2-monitoring-python-2.4-extract-hmac-modules-files:

   Extract ``hmac`` Files
   ~~~~~~~~~~~~~~~~~~~~~~


   Extract the files from the archive with the following command:

   .. code-block:: sh
   
      sudo easy_install hmac hashlib
      

   .. raw:: html
   
      </div>

.. only:: not latex

   .. raw:: html
   
      <div class="sequence-block"><div class="bullet-block"><div class="sequence-step">3</div></div>

   .. _step-3-monitoring-python-2.4-install-hmac-modules-files:

   Install ``hmac`` Files
   ~~~~~~~~~~~~~~~~~~~~~~


   Extract the files from the archive with the following command:

   .. code-block:: sh
   
      cd hmac-20101005/
      python setup.py install
      

   You may need root (i.e. ``sudo``) privileges to run the final
   ``install`` step.

   .. raw:: html
   
      </div>

.. only:: latex

   
   Step 1: Install ``hmac`` and ``hashlib`` Python modules
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   Install these Python modules with ``easy_install``:
   
   .. code-block:: sh
   
      sudo easy_install hmac hashlib
      
   
   Do not use ``pip`` to install modules when using Python 2.4 or 2.5, as
   there are some compatibility issues. Some users have reported problems
   installing ``hmac``, if ``easy_install`` produces an error or you
   suspect a problem with these libraries see :ref:`instructions for
   installing hmac manually <troubleshooting-hmac>`.
   
   If ``easy_install`` produces an error when trying to install ``hmac``,
   or you see the following error in your agent logs, you will need to
   install the ``hmac`` package manually:
   
   .. code-block:: none
   
      AttributeError:'builtin_function_or_method' object has no attribute 'new'
      
   
   To install the ``hmac`` package, begin by downloading the latest source
   package. The following example uses version ``20101005``. Issue the
   following command:
   
   .. code-block:: sh
   
      curl -O http://pypi.python.org/packages/source/h/hmac/hmac-20101005.tar.gz
      
   
   Always download the latest version of ``hmac``, which you can find at
   the `hmac page on PyPi <http://pypi.python.org/pypi/hmac>`_.
   
   
   Step 2: Extract ``hmac`` Files
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   Extract the files from the archive with the following command:
   
   .. code-block:: sh
   
      sudo easy_install hmac hashlib
      
   
   
   Step 3: Install ``hmac`` Files
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   
   Extract the files from the archive with the following command:
   
   .. code-block:: sh
   
      cd hmac-20101005/
      python setup.py install
      
   
   You may need root (i.e. ``sudo``) privileges to run the final
   ``install`` step.
   
