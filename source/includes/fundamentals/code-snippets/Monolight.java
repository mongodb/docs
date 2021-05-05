package fundamentals.monolightcodec;

// start class
public class Monolight {
    private PowerStatus powerStatus = PowerStatus.OFF;
    private Integer colorTemperature;

    public Monolight() {}

    // ...
// end class

    public PowerStatus getPowerStatus() {
        return powerStatus;
    }

    public void setPowerStatus(PowerStatus powerStatus) {
        this.powerStatus = powerStatus;
    }

    public Integer getColorTemperature() {
        return colorTemperature;
    }

    public void setColorTemperature(Integer colorTemperature) {
        this.colorTemperature = colorTemperature;
    }


    @Override
    public String toString() {
        return "Monolight [powerStatus=" + powerStatus + ", colorTemperature=" + colorTemperature + "]";
    }

}
