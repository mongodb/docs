.. _om-upgrade-con-release-date:

Upgrade Versions in Chronological Order
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you upgrade to another version, make sure the new version has a
``release_date`` that was released after the date of the version you
want to upgrade. You might have this issue when upgrading from the
current version ({+manifest-version+}) to rapid release
({+rr-version+}) version. In this case, the version numbers don't
correspond to release dates.

.. example::

   - MongoDB released |onprem| 4.3.5 on 16 Jan 2020, but released
     |onprem| 4.2.8 on 06 Feb 2020. You *can't* upgrade |onprem| from
     4.2.8 to 4.3.5.

   - MongoDB released |onprem| 4.3.7 on 27 Feb 2020. You *can* upgrade
     |onprem| from 4.2.8 to 4.3.7.

To find the release dates, download the
`ops_manager_release_archive JSON file <https://info-mongodb-com.s3.amazonaws.com/com-download-center/ops_manager_release_archive.json>`__.
Search for ``version`` to find the |onprem| versions to and from which
you are upgrading.
