.. list-table::
    :header-rows: 1

    * - Number
      - Description

    * - 0
      - Generic binary subtype

    * - 1
      - Function data

    * - 2
      - Binary (old)
 
    * - 3
      - UUID (old)

    * - 4
      - UUID

    * - 5
      - MD5
 
    * - 6
      - Encrypted BSON value

    * - 7
      - Compressed time series data

        .. versionadded:: 5.2

    * - 8
      - Sensitive data, such as a key or secret. MongoDB does not log
        literal values for binary data with subtype 8. Instead, MongoDB
        logs a placeholder value of ``###``.

    * - 128
      - Custom data
