package org.siliconsquad.objects;

import java.util.List;
import org.bson.codecs.pojo.annotations.BsonProperty;

public class Section {
    private String title;

    private String number;
    
    private String teacher;

    @BsonProperty(value="schedule")
    private List<Slot> schedule;

    public List<Slot> getSchedule() {
        return schedule;
    }

    public void setSchedule(List<Slot> schedule) {
        this.schedule = schedule;
    }

    private List<String> students;

    public String getNumber() {
        return number;
    }

    public String getTeacher() {
        return teacher;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public void setTeacher(String teacher) {
        this.teacher = teacher;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getStudents() {
        return students;
    }

    public void setStudents(List<String> students) {
        this.students = students;
    }

    
}
