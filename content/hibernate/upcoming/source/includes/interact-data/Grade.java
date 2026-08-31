package org.example;
import jakarta.persistence.*;
import org.hibernate.annotations.Struct;

@Embeddable
@Struct(name = "Grade")
public class Grade {
    private String grade;
    private int score;

    public Grade() {
        
    }

    public Grade(String grade, int score) {
        this.grade = grade;
        this.score = score;
    }

    public String getGrade() {
        return grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

}