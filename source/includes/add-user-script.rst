To add users with the script, run the following command. Replace the
placeholders in angle brackets with the appropriate values.

.. tabs-platforms::

   tabs:

     - id: windows
       content: |

         .. code-block:: sh

            docker exec -it ^
              $(docker container ls --filter name=_charts -q) ^
              charts-cli add-user --first-name "<First>" --last-name "<Last>" ^
              --email "<user@example.com>" --password "<Password>" ^
              --role "<UserAdmin|User>"

     - id: macos
       content: |

         .. code-block:: sh

            docker exec -it \
              $(docker container ls --filter name=_charts -q) \
              charts-cli add-user --first-name "<First>" --last-name "<Last>" \
              --email "<user@example.com>" --password "<Password>" \
              --role "<UserAdmin|User>"

     - id: linux
       content: |

         .. code-block:: sh

            docker exec -it \
              $(docker container ls --filter name=_charts -q) \
              charts-cli add-user --first-name "<First>" --last-name "<Last>" \
              --email "<user@example.com>" --password "<Password>" \
              --role "<UserAdmin|User>"
