package org.example;

import org.bson.types.ObjectId;

import java.util.List;

// start-flower-class
public class Flower {

    private ObjectId id;
    private String name;
    private List<String> colors;
    private Boolean isBlooming;
    private Float height;

    // public empty constructor needed for retrieving the POJO
    public Flower() {
    }

    public Flower(String name, Boolean isBlooming, Float height, List<String> colors) {
        this.name = name;
        this.isBlooming = isBlooming;
        this.height = height;
        this.colors = colors;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getIsBlooming() {
        return isBlooming;
    }

    public void setIsBlooming(Boolean isBlooming) {
        this.isBlooming = isBlooming;
    }

    public Float getHeight() {
        return height;
    }

    public void setHeight(Float height) {
        this.height = height;
    }

    public List<String> getColors() {
        return colors;
    }

    public void setColors(List<String> colors) {
        this.colors = colors;
    }

    @Override
    public String toString() {
        return "\nFlower {\n\tid: " + id + "\n\tname: " + name + "\n\tcolors: " + colors + "\n\tisBlooming: " + isBlooming + "\n\theight: " + height + "\n}";
    }
}
// end-flower-class