package org.siliconsquad;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.*;
import com.mongodb.client.*;

import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.siliconsquad.objects.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;
import org.bson.codecs.pojo.*;
import org.bson.codecs.configuration.*;

/*
 * This class connects to the MongoDB database and inserts the scraped data into the database
 * @author Matteo Robidoux
 */

public class MongoDB 
{
    /*
     * This method inserts the scraped data into the MongoDB database without duplicates and sorts the sections by number
     * @throws IOException if the file is not found
     * @throws ParseException if the JSON file is not formatted correctly
     */
    public static void main( String[] args ) throws IOException, ParseException
    {
        MongoClient mongoClient = connect();
        MongoDatabase database = mongoClient.getDatabase("CampusConnect");
        MongoCollection<Course> courses = database.getCollection("Courses",Course.class);
        List<Course> completeCourseList = new ArrayList<Course>();
        ObjectMapper mapper = new ObjectMapper();
        JSONParser parser = new JSONParser();
        System.out.println("Inserting scraped data into MongoDB...");
        for (File file : getScraperFiles()) {
            Object obj = parser.parse(new FileReader(file));
            JSONArray jsonObject = (JSONArray) obj;
            List<Course> courseList = Arrays.asList(mapper.readValue(jsonObject.toJSONString(), Course[].class));
            completeCourseList.addAll(courseList);
        }

        Map<String, Course> courseMap = new HashMap<String, Course>();

        for (Course c : completeCourseList) {
            if(!courseMap.containsKey(c.getTitle() + " " + c.getNumber())){
                courseMap.put(c.getTitle() + " " + c.getNumber(), c);
            } else {
                Course course = courseMap.get(c.getTitle() + " " + c.getNumber());
                course.getSections().addAll(c.getSections());
                Map<String, Section> sectionMap = new HashMap<String, Section>();
                for(Section s : course.getSections()){
                    if(!sectionMap.containsKey(s.getNumber())){
                        sectionMap.put(s.getNumber(), s);
                    }
                }
                course.setSections(new ArrayList<Section>(sectionMap.values()));
                course.sortSections();
            }
        }

        for(Course c : courseMap.values()){
            courses.insertOne(c);
        }

        System.out.println("Inserted scraped data into MongoDB!");
    }

    /*
     * This method connects to the MongoDB database
     * @return MongoClient object
     */
    public static MongoClient connect(){
        System.out.println("Connecting to MongoDB...");
        ConnectionString connectionString = new ConnectionString("mongodb+srv://nenechi:nenechi12@exercise11.cfvsryo.mongodb.net/test");
        CodecRegistry pojoCodecRegistry = CodecRegistries.fromProviders(PojoCodecProvider.builder().automatic(true).build());
        CodecRegistry codecRegistry = CodecRegistries.fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),pojoCodecRegistry);
        MongoClientSettings clientSettings = MongoClientSettings.builder().applyConnectionString(connectionString).codecRegistry(codecRegistry).build();
        System.out.println("Connected to MongoDB!");
        return MongoClients.create(clientSettings);
    }

    /*
     * This method returns an array of files from the path specified in the config.txt file
     * @return File[] of files from the path specified in the config.txt file
     * @throws FileNotFoundException if the config.txt file is not found
     */
    public static File[] getScraperFiles() throws FileNotFoundException{
        String configFilePath = "./ImporterTool/config.txt";
        File configFile = new File(configFilePath);
        Scanner scanner = new Scanner(configFile);
        String path = scanner.nextLine();
        scanner.close();
        File folder = new File(path);
        File[] listOfFiles = folder.listFiles();
        return listOfFiles;
    }
}
