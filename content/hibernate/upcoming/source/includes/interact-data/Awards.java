package org.example;
import jakarta.persistence.*;
import org.hibernate.annotations.Struct;

// start-awards-struct
@Embeddable
@Struct(name = "Awards")
public class Awards {
    private int wins;
    private int nominations;
    private String text;

    public Awards(int wins, int nominations, String text) {
        this.wins = wins;
        this.nominations = nominations;
        this.text = text;
    }

    public Awards() {

    }

    public int getWins() {
        return wins;
    }

    public void setWins(int wins) {
        this.wins = wins;
    }

    public int getNominations() {
        return nominations;
    }

    public void setNominations(int nominations) {
        this.nominations = nominations;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
// end-awards-struct
