The legacy ``mongo`` shell uses a configuration file named
``.mongorc.js``.

If :binary:`mongosh` finds ``.mongorc.js`` on startup but doesn't find
``.mongoshrc.js``, ``mongosh`` doesn't load the legacy ``.mongorc.js``
file and states you should rename ``.mongorc.js`` to ``.mongoshrc.js``.
