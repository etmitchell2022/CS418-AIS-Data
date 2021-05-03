## Setup Environment  
1. Unzip the project folder or clone the project from https://github.com/etmitchell2022/CS418-AIS-Data.  
2. Once the project is opened in your chosen text editor, enter the command ```npm install``` into your terminal to install any necessary node packages.
3. This project requires the AIS data for milestone 4. To download this data, https://ballstate.app.box.com/s/9n6kqat3tp7uh1zm1fpu8nhn3j4djrn2/folder/135704965845. Download all the json files in the folder.
4. To create a new database for this project, enter `use projectData` into the mongo shell. If you already have a database with this data, change the dbName variable in DAO.js to match your desired database.
5. To load the data into your database, inside your terminal enter:
```
mongoimport -d projectData -c vessels --maintainInsertionOrder vessels.json
mongoimport -d projectData -c mapviews --maintainInsertionOrder mapviews.json
mongoimport -d projectData -c ports --maintainInsertionOrder ports.json
mongoimport -d projectData -c aisdk_20201118 --maintainInsertionOrder aisdk_20201118_1000000.json
```
* Note: For simplicity, the collection `aisdk_20201118_1000000` was renamed to `ais`. To change the name, enter this into the mongo shell:
```
db.aisdk_20201118_1000000.renameCollection('ais')
```

## Run Project  
* Note: Data is inserted before tests run for necessary queries however, due to a weird memory leak error we were unable to insert all data for milestone 4. This means the data must be loaded through ```mongoimport``` in the setup step for all tests to successfully run. 
1. To run the tests, make sure you are in the root directory of the project and enter ```npm test``` into your terminal.
    * In total there are 28 tests, each query has an integration and unit test.
    * The DAO.js and DAO_Test.js files include documentation above each function describing the purpose, any parameters, and the expected return values.
    * In the test file, there is a timeout set for certain tests that are more costly. Depending on the machine, there is a chance that the timout set is not enough to complete the function. To fix this, simply change the timeout number in milliseconds.

## Places of improvement
1. Automatically loading all of the data through a few queries inside of a function before tests run is the first area that could be improved. Some of the queries proved to be too costly causing a memory leak to occur.
2. Most edge cases are covered for each query however, there may be a few missing cases that were overlooked that may cause errors.