.. note::
   You can skip this step if you were **not** already using
   `Fody <https://github.com/Fody/Fody>`__ in your project.
   Visual Studio will generate a properly-configured
   ``FodyWeavers.xml`` file for you when you first build.

If your project was already using `Fody
<https://github.com/Fody/Fody>`__, you must manually add the
Realm weaver to your ``FodyWeavers.xml`` file. When done,
your ``FodyWeavers.xml`` file should look something like
this:

.. code-block:: xml

  <Weavers xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="FodyWeavers.xsd">
    <Realm />
  </Weavers>
