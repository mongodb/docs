data class Monolight(
    var powerStatus: PowerStatus = PowerStatus.OFF,
    var colorTemperature: Int? = null
) {
    override fun toString(): String = "Monolight [powerStatus=$powerStatus, colorTemperature=$colorTemperature]"
}
