/*
 * One-off: store the sage-prep GitHub App credentials in Jira's plugin-settings
 * store. Run from Jira admin -> ScriptRunner -> Script Console.
 *
 * Takes effect immediately — NO Jira restart. Persists across restarts (stored
 * in the Jira DB). Needs no filesystem access to the Jira host.
 *
 * FILL IN the three values below, run once, then CLEAR them from this file and
 * from the Script Console text box (the console keeps a history of what you ran).
 *
 * The private key MUST be PKCS#8 ("BEGIN PRIVATE KEY"). GitHub hands out PKCS#1
 * ("BEGIN RSA PRIVATE KEY"), so convert it first, on your laptop:
 *   openssl pkcs8 -topk8 -nocrypt -in app.private-key.pem -out app.pkcs8.pem
 */

import com.atlassian.jira.component.ComponentAccessor
import com.atlassian.sal.api.pluginsettings.PluginSettingsFactory

final String APP_ID          = ""          // numeric, e.g. "123456"
final String INSTALLATION_ID = "" // numeric; see README (GET /app/installations)
final String PRIVATE_KEY_PEM = '''
'''

def settings = ComponentAccessor
    .getOSGiComponentInstanceOfType(PluginSettingsFactory)
    .createGlobalSettings()

settings.put("sage.github.appId", APP_ID)
settings.put("sage.github.installationId", INSTALLATION_ID)
settings.put("sage.github.privateKey", PRIVATE_KEY_PEM)

// Verify round-trip without echoing the secret, and sanity-check the key format.
def out = new StringBuilder()
["sage.github.appId", "sage.github.installationId"].each {
    out << "${it} = ${settings.get(it)}\n"
}
def storedKey = settings.get("sage.github.privateKey") as String
out << "sage.github.privateKey = ${storedKey?.size() ?: 0} chars\n"
out << (storedKey?.contains("BEGIN PRIVATE KEY")
        ? "  OK: PKCS#8 header present\n"
        : "  ERROR: not PKCS#8 — convert with `openssl pkcs8 -topk8 -nocrypt`\n")

// Prove the key actually parses and signs here, in Jira's JVM, before the
// listener ever runs. This is the check that catches a bad paste.
try {
    def der = storedKey.replaceAll(/-----(BEGIN|END)[^-]+-----/, "").replaceAll(/\s/, "")
    def spec = new java.security.spec.PKCS8EncodedKeySpec(Base64.mimeDecoder.decode(der))
    def key = java.security.KeyFactory.getInstance("RSA").generatePrivate(spec)
    def sig = java.security.Signature.getInstance("SHA256withRSA")
    sig.initSign(key)
    sig.update("test".bytes)
    sig.sign()
    out << "  OK: key parses and signs (${key.algorithm}, ${key.format})\n"
} catch (Exception e) {
    out << "  ERROR: key does NOT parse: ${e.class.simpleName}: ${e.message}\n"
}

return out.toString()
