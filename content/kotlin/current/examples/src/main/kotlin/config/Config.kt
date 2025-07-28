package config

import io.github.cdimascio.dotenv.dotenv

data class Config(val connectionUri: String)

fun getConfig(): Config {
    val ci = System.getenv("CI")
    if(ci == "true") {
        val connectionUri = System.getenv("CONNECTION_URI")
        return Config(System.getenv("CONNECTION_URI"))
    }
    val env = dotenv()
    val connectionUri = env["MONGODB_CONNECTION_URI"]
    return Config(connectionUri)
}
