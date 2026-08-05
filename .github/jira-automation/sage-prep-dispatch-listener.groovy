/*
 * ScriptRunner Script Listener — Slack-request -> sage-prep dispatch
 * ---------------------------------------------------------------------------
 * Fires a GitHub `repository_dispatch` (event_type: sage-prep) at
 * 10gen/docs-mongodb-internal when the `slack-request` label lands on a DOCSP
 * ticket. The sage-prep workflow reads only client_payload.issue_key.
 *
 * SETUP
 *   Listener type : Custom listener
 *   Events        : Issue Created, Issue Updated   <-- select BOTH
 *   Project(s)    : DOCSP
 *   Auth          : GitHub App (NOT a PAT). Needs three values, read from a JVM
 *                   system property or else Jira's plugin-settings store:
 *                     sage.github.appId          - numeric App ID
 *                     sage.github.privateKey     - PKCS#8 PEM private key
 *                     sage.github.installationId - installation on 10gen
 *                   The App must be installed on the repo with Contents: write.
 *                   Set all three once from the Script Console — see
 *                   set-github-app-creds-console.groovy. No Jira restart required.
 *                   Do NOT hardcode them.
 *
 * FIRE-ONCE (per label add) + RE-REQUEST
 *   Layers that stop a ticket from dispatching more than once per request:
 *     1. On Created:  fires only if the label is present at creation.
 *     2. On Updated:  fires only on the transition into having the label
 *                     (present in new labels, absent from old) — so later
 *                     edits, and the workflow adding its own labels, are inert.
 *     3. A per-issue entity property (sage.prep.dispatched) is set after a
 *        successful dispatch and checked up front, so nothing double-fires
 *        even across the Created + Updated events.
 *   Manual re-request:
 *     Removing the `slack-request` label clears the marker, so removing then
 *     re-adding the label deliberately re-runs sage-prep.
 */

import com.atlassian.jira.bc.issue.properties.IssuePropertyService
import com.atlassian.jira.component.ComponentAccessor
import com.atlassian.jira.entity.property.EntityPropertyService
import com.atlassian.jira.event.type.EventType
import com.atlassian.sal.api.pluginsettings.PluginSettingsFactory
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import java.security.KeyFactory
import java.security.Signature
import java.security.spec.InvalidKeySpecException
import java.security.spec.PKCS8EncodedKeySpec

// --- config ---------------------------------------------------------------
final String TRIGGER_LABEL = "slack-request"
final String GITHUB_REPO   = "10gen/docs-mongodb-internal"
final String EVENT_TYPE    = "sage-prep"
final String PROP_KEY      = "sage.prep.dispatched"

def issue = event?.issue
if (!issue) return

// --- GitHub App auth ------------------------------------------------------
// We hold App credentials (App ID + RSA private key), not a PAT, so we can't
// send a bearer token directly. Sign a short-lived JWT with the private key,
// exchange it for a ~1h installation access token, and use that.
// All three values live in Jira's plugin-settings store (no restart needed);
// set them once via set-github-app-creds-console.groovy.
final String KEY_APP_ID  = "sage.github.appId"
final String KEY_APP_KEY = "sage.github.privateKey"   // PKCS#8 PEM
final String KEY_INST_ID = "sage.github.installationId"

def settings = ComponentAccessor.getOSGiComponentInstanceOfType(PluginSettingsFactory)
                   ?.createGlobalSettings()
String appId  = System.getProperty(KEY_APP_ID)  ?: settings?.get(KEY_APP_ID)  as String
String pem    = System.getProperty(KEY_APP_KEY) ?: settings?.get(KEY_APP_KEY) as String
String instId = System.getProperty(KEY_INST_ID) ?: settings?.get(KEY_INST_ID) as String

if (!appId || !pem || !instId) {
    log.error("sage-prep dispatch: GitHub App creds incomplete " +
              "(appId=${appId ? 'set' : 'MISSING'}, key=${pem ? 'set' : 'MISSING'}, " +
              "installationId=${instId ? 'set' : 'MISSING'}); skipping.")
    return
}

/** Base64url without padding, per JWS. */
def b64url = { byte[] bytes ->
    Base64.urlEncoder.withoutPadding().encodeToString(bytes)
}

/** Sign an RS256 JWT asserting the App identity. Valid 9 min; GitHub caps at 10. */
def buildAppJwt = { String id, String pemText ->
    def der = pemText.replaceAll(/-----(BEGIN|END)[^-]+-----/, "").replaceAll(/\s/, "")
    def keySpec = new PKCS8EncodedKeySpec(Base64.mimeDecoder.decode(der))
    def key = KeyFactory.getInstance("RSA").generatePrivate(keySpec)

    long now = System.currentTimeMillis() / 1000L
    String header  = b64url('{"alg":"RS256","typ":"JWT"}'.bytes)
    String payload = b64url(JsonOutput.toJson([
        iat: now - 60,      // backdate for clock skew between Jira and GitHub
        exp: now + 540,
        iss: id,
    ]).bytes)

    def signer = Signature.getInstance("SHA256withRSA")
    signer.initSign(key)
    signer.update("${header}.${payload}".bytes)
    return "${header}.${payload}.${b64url(signer.sign())}"
}

String appJwt
try {
    appJwt = buildAppJwt(appId, pem)
} catch (InvalidKeySpecException e) {
    log.error("sage-prep dispatch: private key is not PKCS#8. Convert it once with " +
              "`openssl pkcs8 -topk8 -nocrypt -in app.pem -out app.pkcs8.pem` and " +
              "re-store. (${e.message})")
    return
} catch (Exception e) {
    log.error("sage-prep dispatch: could not sign App JWT: ${e.message}")
    return
}

// Exchange the JWT for an installation access token.
String token = null
try {
    def tokConn = new URL("https://api.github.com/app/installations/${instId}/access_tokens")
        .openConnection() as HttpURLConnection
    tokConn.with {
        requestMethod = "POST"
        setRequestProperty("Authorization", "Bearer ${appJwt}")
        setRequestProperty("Accept", "application/vnd.github+json")
        setRequestProperty("X-GitHub-Api-Version", "2022-11-28")
    }
    if (tokConn.responseCode != 201) {
        log.error("sage-prep dispatch: installation token exchange FAILED " +
                  "(HTTP ${tokConn.responseCode}): ${tokConn.errorStream?.text}")
        return
    }
    token = new JsonSlurper().parseText(tokConn.inputStream.getText("UTF-8")).token
} catch (Exception e) {
    log.error("sage-prep dispatch: installation token exchange threw: ${e.message}")
    return
}

if (!token) {
    log.error("sage-prep dispatch: no installation token returned; skipping.")
    return
}

def propertyService = ComponentAccessor.getComponent(IssuePropertyService)
def user = event?.user ?: ComponentAccessor.jiraAuthenticationContext.loggedInUser
def issueKey = issue.key

// --- decide what THIS event means for the label ---------------------------
boolean shouldFire = false
boolean labelRemoved = false
def eventTypeId = event.getEventTypeId()

if (eventTypeId == EventType.ISSUE_CREATED_ID) {
    // Label stamped at creation (e.g. JIP creates the ticket with it on).
    shouldFire = issue.labels.any { it.label == TRIGGER_LABEL }

} else if (eventTypeId == EventType.ISSUE_UPDATED_ID) {
    def changeLog = event.changeLog
    if (changeLog) {
        def labelChange = changeLog.getRelated("ChildChangeItem")
                                   .find { it.get("field") == "labels" }
        if (labelChange) {
            def oldLabels = (labelChange.get("oldstring") ?: "").tokenize(" ")
            def newLabels = (labelChange.get("newstring") ?: "").tokenize(" ")
            // fire on the transition into having the label...
            shouldFire    = TRIGGER_LABEL in newLabels && !(TRIGGER_LABEL in oldLabels)
            // ...and clear the marker on the transition out of having it, so a
            // deliberate remove-then-re-add re-runs sage-prep.
            labelRemoved  = TRIGGER_LABEL in oldLabels && !(TRIGGER_LABEL in newLabels)
        }
    }
}

// --- label removed: reset the marker so a re-add can fire again -----------
if (labelRemoved) {
    def hasMarker = propertyService.getProperty(user, issue.id, PROP_KEY)
    if (hasMarker.isValid() && hasMarker.entityProperty.isDefined()) {
        def delValidation = propertyService.validateDeleteProperty(user, issue.id, PROP_KEY)
        if (delValidation.isValid()) {
            propertyService.deleteProperty(user, delValidation)
            log.warn("sage-prep dispatch: label removed from ${issueKey}; " +
                     "cleared marker, re-add will re-run.")
        }
    }
    return
}

if (!shouldFire) return

// --- idempotency: bail if we've already dispatched for this issue ---------
def existing = propertyService.getProperty(user, issue.id, PROP_KEY)
if (existing.isValid() && existing.entityProperty.isDefined()) {
    log.warn("sage-prep dispatch: already dispatched for ${issueKey}; skipping.")
    return
}

// --- fire the repository_dispatch -----------------------------------------
def payload = JsonOutput.toJson([
    event_type    : EVENT_TYPE,
    client_payload: [issue_key: issueKey],
])

def conn = new URL("https://api.github.com/repos/${GITHUB_REPO}/dispatches")
    .openConnection() as HttpURLConnection
conn.with {
    requestMethod = "POST"
    doOutput = true
    setRequestProperty("Authorization", "Bearer ${token}")
    setRequestProperty("Accept", "application/vnd.github+json")
    setRequestProperty("Content-Type", "application/json")
    outputStream.withWriter("UTF-8") { it << payload }
}

int status = conn.responseCode
if (status != 204) {
    def body = conn.errorStream?.text
    log.error("sage-prep dispatch: FAILED for ${issueKey} (HTTP ${status}): ${body}")
    return   // don't mark as dispatched, so a retry/re-label can try again
}

// --- mark as dispatched so it can't fire again ----------------------------
def input = new EntityPropertyService.PropertyInput('{"dispatched":true}', PROP_KEY)
def validation = propertyService.validateSetProperty(user, issue.id, input)
if (validation.isValid()) {
    propertyService.setProperty(user, validation)
} else {
    log.warn("sage-prep dispatch: sent for ${issueKey} but could not set " +
             "idempotency marker: ${validation.errorCollection}")
}
log.warn("sage-prep dispatch: sent for ${issueKey}")
