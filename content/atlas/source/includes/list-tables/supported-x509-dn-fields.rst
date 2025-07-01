.. list-table::
   :header-rows: 1
   :widths: 15 25 15 15
   
   * - Name
     - Description
     - Type
     - Size (in MB)
   * - ``businesscategory``
     - ``businessCategory`` attribute that describes the kinds of business
       performed by an organization.
     - DirectoryString
     - SIZE(1..128)
   * - ``c``
     - Two-letter `ISO 3166 <https://www.iso.org/iso-3166-country-codes.html>`__  
       country code. 
     - StringType
     - SIZE(2)
   * - ``cn``
     - Common names of an object. If the object corresponds to a person, it is 
       typically the person's full name. 
     - StringType
     - SIZE(1..64)
   * - ``countryofcitizenship``
     - `RFC 3039 <https://www.rfc-editor.org/rfc/rfc3039>`__ ``CountryOfCitizenship`` 
       attribute that contains the identifier of at least one country of
       citizenship. Accepts `ISO 3166 <https://www.iso.org/iso-3166-country-codes.html>`__ 
       codes only.
     - PrintableString
     - SIZE(2)
   * - ``countryofresidence``
     - `RFC 3039 <https://www.rfc-editor.org/rfc/rfc3039>`__ ``CountryOfResidence`` 
       attribute that contains the value of at least one country. Accepts `ISO 3166 
       <https://www.iso.org/iso-3166-country-codes.html>`__  codes only.
     - PrintableString
     - SIZE(2)
   * - ``dateofbirth``
     - `RFC 3039 <https://www.rfc-editor.org/rfc/rfc3039>`__ ``DateOfBirth`` attribute, 
       which specifies the date of birth of the subject.
     - GeneralizedTime in this format: ``YYYYMMDD000000Z``.
     - 
   * - ``dc``
     -  ``domainComponent`` attribute type that contains a DNS domain name.
     - StringType
     - 
   * - ``dn``
     - ``dnQualifier`` attribute type that contains disambiguating information to add 
       to the relative distinguished name of an entry.
     - DirectoryString
     - SIZE(1..64)
   * - ``e``
     - Email address in Verisign certificates.
     -  
     - 
   * - ``emailaddress``
     - ``emailAddress`` (RSA `PKCS#9 <https://datatracker.ietf.org/doc/html/rfc2985>`__ 
       extension) attribute that specifies the electronic-mail address or addresses as 
       an unstructured ASCII string.
     - IA5String
     - 
   * - ``gender``
     - `RFC 3039 <https://www.rfc-editor.org/rfc/rfc3039>`__ ``Gender`` attribute that 
       specifies the value of the gender of the subject. Accepts 
       ``M``, ``F``, ``m``, or ``f``.
     - PrintableString
     - SIZE(1)
   * - ``generation``
     - ``generationQualifier`` attribute type that contains name strings that
       are typically the suffix part of a person's name.
     - DirectoryString
     - SIZE(1..64)
   * - ``givenname``
     - Name strings that are the part of a person's name that is not their surname.
     - DirectoryString
     - SIZE(1..64)
   * - ``initials``
     - Initials of some or all of an individual's names, except the surnames.
     - DirectoryString
     - SIZE(1..64)
   * - ``l``
     - ``localityName`` attribute that contains names of a
       locality or place, such as a city, county, or other geographic
       region.
     - StringType
     - SIZE(1..64)
   * - ``name``
     - (``id-at-name``) Attribute supertype from which user attribute types with the 
       name syntax inherit. 
     - DirectoryString
     - SIZE(1..64)
   * - ``nameofbirth``
     - `ISIS-MTT <https://www.teletrust.de/fileadmin/files/ISIS-MTT_Core_Specification_v1.1.pdf>`__ 
       ``NameAtBirth`` attribute that specifies the name of a person at his or her 
       birth.
     - DirectoryString
     - SIZE(1..64)
   * - ``o``
     - Name of an organization.
     - StringType
     - SIZE(1..64)
   * - ``ou``
     - Name of an organizational unit.
     - StringType
     - SIZE(1..64)
   * - ``placeofbirth``
     - `RFC 3039 <https://www.rfc-editor.org/rfc/rfc3039>`__ ``PlaceOfBirth`` that 
       specifies the value of the place of birth.
     - DirectoryString
     - SIZE(1..128)
   * - ``postaladdress``
     - `RFC 3039 <https://www.rfc-editor.org/rfc/rfc3039>`__ ``PostalAddress``, which 
       includes the ``stateOrProvinceName`` and the ``localityName`` attribute types, 
       if present, to store address and geographical information.
     - Sequence
     - SIZE (1..6) OF DirectoryString(SIZE(1..30))
   * - ``postalcode``
     - ``postalCode`` attribute that specifies the code used by a Postal
       Service to identify postal service zone.
     - DirectoryString
     - SIZE(1..40)
   * - ``pseudonym``
     - `RFC 3039 <https://www.rfc-editor.org/rfc/rfc3039>`__ ``pseudonym`` 
       attribute that specifies a pseudonym, such as nicknames and names with 
       spelling other than defined by the registered name.
     - DirectoryString
     - SIZE(1..64)
   * - ``serialnumber``
     - Device serial number name.
     - StringType
     - SIZE(1..64)
   * - ``sn``
     - Device serial number name.
     - StringType
     - SIZE(1..64)
   * - ``st``
     - State, or province name.
     - StringType
     - SIZE(1..64)
   * - ``street``
     - Name of street.
     - StringType
     - SIZE(1..64)
   * - ``surname``
     - Naming attributes of type X520name.
     - DirectoryString
     - SIZE(1..64)
   * - ``t``
     - ``Title`` attribute, which contains the designated position or 
       function of the subject within an organization.
     - DirectoryString
     - SIZE(1..64)
   * - ``telephonenumber``
     - ``id-at-telephoneNumber``, which is an internationally agreed-upon format 
       for international telephone numbers. 
     - PrintableString
     - SIZE (1..32)
   * - ``uid``
     - LDAP User ID.
     - DirectoryString
     - 
   * - ``uniqueidentifier``
     - Unique identifier for an object.
     - DirectoryString
     - 
   * - ``unstructuredaddress``
     - `PKCS#9 <https://datatracker.ietf.org/doc/html/rfc2985>`__ attribute that 
       specifies the address or addresses of a subject as an unstructured 
       directory string.
     - DirectoryString
     - 
   * - ``unstructuredname``
     - `PKCS#9 <https://datatracker.ietf.org/doc/html/rfc2985>`__ attribute that 
       specifies the name or names of a subject as an unstructured ASCII string..
     - DirectoryString
     - SIZE(1..64)
