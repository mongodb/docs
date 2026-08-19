/*
 * ScriptRunner Script Listener — skill-review ticket Closed -> GitHub dispatch
 * ---------------------------------------------------------------------------
 * Fires a GitHub `repository_dispatch` (event_type: skill-review-complete) at
 * 10gen/docs-mongodb-internal when a skill-review ticket transitions to Closed.
 * The skill-review-complete.yml workflow reads only client_payload.issue_key,
 * then .github/scripts/skill_review_complete.py re-validates everything and
 * decides whether to bump last_reviewed and open a PR.
 *
 * WHY THIS EXISTS (instead of an Automation for Jira rule)
 *   A4J's "Send web request" holds only a static Authorization header. We have
 *   GitHub *App* credentials, not a PAT, so the only usable token is a ~1h
 *   installation token that must be minted per fire. A4J can't sign a JWT;
 *   this listener can, reusing the App creds already stored for sage-prep.
 *
 * SETUP
 *   Listener type : Custom listener
 *   Events        : Issue Updated, Issue Closed, Generic Event  <-- select ALL
 *                   (which one a Close transition emits depends on the
 *                   workflow's Fire Event post-function, so cover all three;
 *                   the status-change gate below makes extras inert)
 *   Project(s)    : DOCSP
 *   Auth          : GitHub App (NOT a PAT), same three plugin-settings keys as
 *                   sage-prep — sage.github.appId / sage.github.privateKey /
 *                   sage.github.installationId. Already set; nothing to add.
 *                   The App needs Contents: write (granted 2026-07-30).
 *
 * GATING — deliberately thin. This listener only checks the cheap things:
 *   component "Maverick", a skill-review-* label, and an actual transition
 *   into Closed. It does NOT check resolution: per the design note on PR
 *   #22475, skill_review_complete.py is the sole gate on resolution == "Done",
 *   so Won't Do / Duplicate / no-resolution closes are evaluated (and
 *   commented on, where useful) by the script, not filtered out here.
 *
 * FIRE-ONCE + RE-CLOSE
 *   A per-issue entity property (skill.review.dispatched) is set after a
 *   successful dispatch, so a Closed ticket can't dispatch twice. Transitioning
 *   OUT of Closed clears the marker — which is what makes the script's
 *   "reopen and re-close with resolution Done" instruction actually work.
 */

import com.atlassian.jira.bc.issue.properties.IssuePropertyService
import com.atlassian.jira.component.ComponentAccessor
import com.atlassian.jira.entity.property.EntityPropertyService
import com.atlassian.sal.api.pluginsettings.PluginSettingsFactory
import groovy.json.JsonOutput
import groovy.json.JsonSlurper
import java.security.KeyFactory
import java.security.Signature
import java.security.spec.InvalidKeySpecException
import java.security.spec.PKCS8EncodedKeySpec

// --- config ---------------------------------------------------------------
final String CLOSED_STATUS  = "Closed"
final String COMPONENT_NAME = "Maverick"
final String LABEL_PREFIX   = "skill-review-"
final String GITHUB_REPO    = "10gen/docs-mongodb-internal"
final String EVENT_TYPE     = "skill-review-complete"
final String PROP_KEY       = "skill.review.dispatched"

def issue = event?.issue
if (!issue) return

def issueKey = issue.key

// --- decide what THIS event means for the status ---------------------------
// Gate on the changelog, not the current status: without this, every later edit
// to an already-Closed ticket would look like a fresh close.
boolean closedNow = false
boolean reopened  = false

def changeLog = event?.changeLog
if (changeLog) {
    def statusChange = changeLog.getRelated("ChildChangeItem")
                                .find { it.get("field") == "status" }
    if (statusChange) {
        String from = statusChange.get("oldstring") ?: ""
        String to   = statusChange.get("newstring") ?: ""
        closedNow = (to == CLOSED_STATUS && from != CLOSED_STATUS)
        reopened  = (from == CLOSED_STATUS && to != CLOSED_STATUS)
    }
}

if (!closedNow && !reopened) return

// --- is this even a skill-review ticket? ----------------------------------
// Checked before the marker work so non-skill tickets cost nothing.
def components = issue.componentObjects*.name
if (!(COMPONENT_NAME in components)) return

def labels = issue.labels*.label
if (!labels.any { it.startsWith(LABEL_PREFIX) }) return

def propertyService = ComponentAccessor.getComponent(IssuePropertyService)
def user = event?.user ?: ComponentAccessor.jiraAuthenticationContext.loggedInUser

// --- reopened: clear the marker so a re-close can fire again ---------------
if (reopened) {
    def hasMarker = propertyService.getProperty(user, issue.id, PROP_KEY)
    if (hasMarker.isValid() && hasMarker.entityProperty.isDefined()) {
        def delValidation = propertyService.validateDeleteProperty(user, issue.id, PROP_KEY)
        if (delValidation.isValid()) {
            propertyService.deleteProperty(user, delValidation)
            log.warn("skill-review dispatch: ${issueKey} reopened; cleared marker, " +
                     "re-close will re-run.")
        }
    }
    return
}

// --- idempotency: bail if we've already dispatched for this close ----------
def existing = propertyService.getProperty(user, issue.id, PROP_KEY)
if (existing.isValid() && existing.entityProperty.isDefined()) {
    log.warn("skill-review dispatch: already dispatched for ${issueKey}; skipping.")
    return
}

// --- GitHub App auth ------------------------------------------------------
// Same credentials as the sage-prep listener: App ID + RSA private key, not a
// PAT. Sign a short-lived JWT, exchange it for a ~1h installation access
// token, dispatch with that. All three values live in Jira's plugin-settings
// store (set once via sage-prep's set-github-app-creds-console.groovy; no restart).
final String KEY_APP_ID  = "sage.github.appId"
final String KEY_APP_KEY = "sage.github.privateKey"   // PKCS#8 PEM
final String KEY_INST_ID = "sage.github.installationId"

def settings = ComponentAccessor.getOSGiComponentInstanceOfType(PluginSettingsFactory)
                   ?.createGlobalSettings()
String appId  = System.getProperty(KEY_APP_ID)  ?: settings?.get(KEY_APP_ID)  as String
String pem    = System.getProperty(KEY_APP_KEY) ?: settings?.get(KEY_APP_KEY) as String
String instId = System.getProperty(KEY_INST_ID) ?: settings?.get(KEY_INST_ID) as String

if (!appId || !pem || !instId) {
    log.error("skill-review dispatch: GitHub App creds incomplete " +
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
    log.error("skill-review dispatch: private key is not PKCS#8. Convert it once with " +
              "`openssl pkcs8 -topk8 -nocrypt -in app.pem -out app.pkcs8.pem` and " +
              "re-store. (${e.message})")
    return
} catch (Exception e) {
    log.error("skill-review dispatch: could not sign App JWT: ${e.message}")
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
        log.error("skill-review dispatch: installation token exchange FAILED " +
                  "(HTTP ${tokConn.responseCode}): ${tokConn.errorStream?.text}")
        return
    }
    token = new JsonSlurper().parseText(tokConn.inputStream.getText("UTF-8")).token
} catch (Exception e) {
    log.error("skill-review dispatch: installation token exchange threw: ${e.message}")
    return
}

if (!token) {
    log.error("skill-review dispatch: no installation token returned; skipping.")
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
    log.error("skill-review dispatch: FAILED for ${issueKey} (HTTP ${status}): ${body}")
    return   // don't mark as dispatched, so a retry/re-close can try again
}

// --- mark as dispatched so it can't fire again ----------------------------
def input = new EntityPropertyService.PropertyInput('{"dispatched":true}', PROP_KEY)
def validation = propertyService.validateSetProperty(user, issue.id, input)
if (validation.isValid()) {
    propertyService.setProperty(user, validation)
} else {
    log.warn("skill-review dispatch: sent for ${issueKey} but could not set " +
             "idempotency marker: ${validation.errorCollection}")
}
log.warn("skill-review dispatch: sent for ${issueKey}")
