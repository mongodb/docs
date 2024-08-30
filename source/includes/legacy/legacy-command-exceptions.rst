For commands whose output includes ``{ ok: 0 }``, ``mongosh`` returns a
consistent exception and omits the server raw output. The legacy
``mongo`` shell returns output that varies for each command.
