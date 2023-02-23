package org.siliconsquad.objects;

import java.util.List;

import org.bson.codecs.pojo.annotations.BsonProperty;

public class Course {
    private String title;

    private String number;

    @BsonProperty(value="sections")
    private List<Section> sections;

    

    public List<Section> getSections() {
        return sections;
    }



    public String getTitle() {
        return title;
    }



    public void setTitle(String title) {
        this.title = title;
    }



    public String getNumber() {
        return number;
    }



    public void setNumber(String number) {
        this.number = number;
    }



    public void setSections(List<Section> sections) {
        this.sections = sections;
    }
}
