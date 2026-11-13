.. code-block:: json
   :copyable: false
   :linenos:

   {
     "enforcement": {
       "effectiveState": "LICENSED",
       "cause": "term:LICENSED",
       "enforced": false,
       "transition": {
         "evaluatorId": "term",
         "inStateUntil": "2027-06-30T00:00:00Z",
         "nextState": "GRACE"
       },
       "warnings": [],
       "verdicts": [
         {
           "evaluatorId": "term",
           "state": "LICENSED",
           "breachAt": "2027-06-30T00:00:00Z",
           "warningStart": "2027-02-28T00:00:00Z",
           "metadata": null,
           "transition": {
             "inStateUntil": "2027-06-30T00:00:00Z",
             "nextState": "GRACE"
           }
         }
       ]
     },
     "licenses": [
       {
         "artifactId": "{ARTIFACT-ID}",
         "usable": true,
         "generatedAt": "2026-10-01T12:00:00Z",
         "installedAt": "2026-11-04T15:30:00Z",
         "status": "ACTIVE",
         "statusCause": null,
         "statusReason": null,
         "termEnd": "2027-06-30T00:00:00Z",
         "grants": [
           {
             "grantType": "contract",
             "grantId": "{GRANT-ID}",
             "startDate": "2026-07-01T00:00:00Z",
             "endDate": "2027-06-30T00:00:00Z",
             "entitlements": []
           }
         ]
       }
     ],
     "activeEntitlements": {}
   }
