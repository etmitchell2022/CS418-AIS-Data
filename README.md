## Setup Environment  
1. Unzip the project folder or clone the project from https://github.com/etmitchell2022/CS418-AIS-Data.  
2. Once the project is opened in your chosen text editor, enter the command ```npm install``` into your terminal to install any necessary node packages.
3. This project requires the AIS data for milestone 4. To download this data, https://ballstate.app.box.com/s/9n6kqat3tp7uh1zm1fpu8nhn3j4djrn2/folder/135704965845. Download all the json files in the folder.
4. To create a new database for this project, enter `use projectData` into the mongo shell. If you already have a database with this data, change the dbName variable in DAO.js to match your desired database.
5. To load the data into your database, inside your terminal enter:
```
mongoimport -d AISTestData -c vessels --maintainInsertionOrder vessels.json
mongoimport -d AISTestData -c mapviews --maintainInsertionOrder mapviews.json
mongoimport -d AISTestData -c ports --maintainInsertionOrder ports.json
mongoimport -d AISTestData -c aisdk_20201118 --maintainInsertionOrder aisdk_20201118_1000000.json
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