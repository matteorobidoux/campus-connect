package org.siliconsquad;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.*;
import com.mongodb.client.*;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
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

/**
 * Hello world!
 *
 */
public class MongoDB 
{
    public static void main( String[] args ) throws IOException, ParseException
    {
        MongoClient mongoClient = new MongoDB().connect();
        MongoDatabase database = mongoClient.getDatabase("test");
        MongoCollection<Course> courses = database.getCollection("Courses",Course.class);
        ObjectMapper mapper = new ObjectMapper();
        JSONParser parser = new JSONParser();
        for (File file : getScraperFiles()) {
            Object obj = parser.parse(new FileReader(file));
            JSONArray jsonObject = (JSONArray) obj;
            List<Course> courseList = Arrays.asList(mapper.readValue(jsonObject.toJSONString(), Course[].class));
            courses.insertMany(courseList);
        }
    }

    public MongoClient connect(){
        ConnectionString connectionString = new ConnectionString("mongodb+srv://nenechi:nenechi12@exercise11.cfvsryo.mongodb.net/test");
        CodecRegistry pojoCodecRegistry = CodecRegistries.fromProviders(PojoCodecProvider.builder().automatic(true).build());
        CodecRegistry codecRegistry = CodecRegistries.fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),pojoCodecRegistry);
        MongoClientSettings clientSettings = MongoClientSettings.builder().applyConnectionString(connectionString).codecRegistry(codecRegistry).build();
        return MongoClients.create(clientSettings);
    }

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
