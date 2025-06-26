Before the new screenshot is transfered to the ``source/images``
folder, you are given the opportunity to verify the image looks
as expected by checking the ``screenshots-temp`` folder in the
repository's root directory.

After grabbing an image, if an image with the same name already
exists in the ``source/image`` repository, the script presents
a *mismatch percentage* (brought to you by
`ResembleJS <https://www.npmjs.com/package/node-resemble-js>`_). The
script places the new screenshot as well as an image analysis file
into the ``screenshots-temp`` folder. The image analysis file
pinpoints exactly where the new screenshot differs from the original
image so you can check before answering the prompt.

.. note::

   Manually comparing images is largely for debugging purposes. If
   the script is running as expected, it should be safe to replace
   the image automatically without comparing first.
