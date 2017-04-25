+++
title = "Text Search with Basis Technology Rosette Linguistics Platform"

[tags]
mongodb = "product"
+++

# Text Search with Basis Technology Rosette Linguistics Platform

Enterprise Feature: Available in MongoDB Enterprise only.


## Overview

New in version 3.2.

In addition to the languages supported by text search in MongoDB,
MongoDB Enterprise provides support for the following additional
languages: Arabic, Farsi (specifically Dari and Iranian Persian
dialects), Urdu, Simplified Chinese, and Traditional Chinese.

To provide support for these six additional languages, MongoDB
Enterprise integrates Basis Technology Rosette Linguistics Platform
(RLP) to perform normalization, word breaking, sentence breaking, and
stemming or tokenization depending on the language.

MongoDB Enterprise supports RLP SDK 7.11.1 on Red Hat Enterprise Linux
6.x. For information on providing support on other platforms, contact
your sales representative.

See also: [Text Search Languages](https://docs.mongodb.com/manual/reference/text-search-languages), [Specify a Language for Text Index](https://docs.mongodb.com/manual/tutorial/specify-language-for-text-index)

<span id="text-search-with-rlp-prereq"></span>


## Prerequisites

To use MongoDB with RLP, MongoDB requires a license for the Base
Linguistics component of RLP and one or more languages specified above.
MongoDB does not require a license for all six languages listed above.

Support for any of the specified languages is conditional on having a
valid RLP license for the language. For instance, if there is only an
RLP license provided for Arabic, then MongoDB will only enable support
for Arabic and will not enable support for any other RLP based
languages. For any language which lacks a valid license, the MongoDB
log will contain a warning message. Additionally, you can set the
MongoDB log verbosity level to ``2`` to log debug messages that
identify each supported language.

You do not need the Language Extension Pack as MongoDB does not support
these RLP languages at this time.

Contact Basis Technology at [info@basistech.com](https://docs.mongodb.com/manual/tutorial/text-search-with-rlp.txt/mailto:info@basistech.com) to get a copy of RLP and
a license for one or more languages. For more information on how
to contact Basis Technology, see [http://www.basistech.com/contact/](http://www.basistech.com/contact/).


## Procedure


### Step 1: Download Rosette Linguistics Platform from Basis Technology.

From Basis Technology, obtain the links to download the RLP C++ SDK
package file, the documentation package file, and the license file
(``rlp-license.xml``) for Linux x64. Basis Technology provides the
download links in an email.

Using the links, download the RLP C++ SDK package file, the
documentation package file, and the license file
(``rlp-license.xml``) for Linux x64.

Note: These links automatically expire after 30 days.


### Step 2: Install the RLP binaries.

Untar the RLP binaries and place them in a directory; this directory
is referred to as the installation directory or ``BT_ROOT``. For this
example, we will use ``/opt/basis`` as the ``BT_ROOT``.

```sh

tar zxvC /opt/basis rlp-7.11.1-sdk-amd64-glibc25-gcc41.tar.gz

```


### Step 3: Move the RLP license into the RLP licenses directory.

Move the RLP license file ``rlp-license.xml`` to the
``<BT_ROOT>/rlp/rlp/licenses`` directory; in our example, move the
file to the ``/opt/basis/rlp/rlp/licenses/`` directory.

```sh

mv rlp-license.xml /opt/basis/rlp/rlp/licenses/

```


### Step 4: Run ``mongod`` with RLP support.

To enable support for RLP, use the ``--basisTechRootDirectory``
option to specify the ``BT_ROOT`` directory.

Include any additional settings as appropriate for your deployment.

```sh

mongod --basisTechRootDirectory=/opt/basis

```


## Additional Information

For installation help, see the RLP Quick Start manual or Chapter 2 of
the Rosette Linguistics Platform Application Developer’s Guide.

For debugging any RLP specific issues, you can set the ``rlpVerbose``
parameter to ``true`` (i.e. ``--setParameter rlpVerbose=true``) to view
``INFO`` messages from RLP.

Warning: Enabling ``rlpVerbose`` has a performance overhead and should only be enabled for troubleshooting installation issues.
