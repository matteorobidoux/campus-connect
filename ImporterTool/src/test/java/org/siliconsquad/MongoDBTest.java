package org.siliconsquad;

import static org.junit.Assert.assertTrue;

import org.junit.Test;

/*
 * This class tests the MongoDB class
 * @author Matteo Robidoux
 */
public class MongoDBTest 
{

    /*
     * This method tests the connect method
     */
    @Test
    public void connectTest()
    {
        assertTrue( MongoDB.connect() != null );
    }
}
