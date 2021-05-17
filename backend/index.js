const express = require('express');
const app = express();
const cheerio = require("cheerio");
const axios = require("axios");
const jsdom = require('jsdom');
var cors = require('cors')



const { next } = require('cheerio/lib/api/traversing');
// url= "https://en.wikipedia.org/wiki/World_Tourism_rankings";

// Funciton to check whether value is Real Number
function isNumeric(n) {
    /**
     * n: A string
     */
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function tables(html){
    /**
     * Extract the table information from the html string file, and also numnerical columns
     * @html: String that can be converted into the html format
     */
    var rowData = [ ]
    var table = {}
    var tableNumeric = {}
    var myData = {};
    var count = [ ]
    var percentage;
    // cheerio is the library to load the html version in string response in HTML format to do query 
    var $ = cheerio.load(html);

    // Quering the table tag on HTML file
    $("table").each((tab,elem) => {
            // Reinitialising the data again for new table 
            rowData = [ ];
            myData = { };
            count = [ ];
            stop = false;
            // Inside each table need to find tbody tag 
            $(elem).find("tbody").each((tag, line)=> {
                // Finding each row
                $(line).find("tr").each((i,tr) =>{
                    // getting header for each column
                    $(tr).find("th").each((row, th)=>{
                        // header text value
                        $(th).each((col, t) => {
                            var value = $(t).text();
                            // Making sure header is not an empty string
                            if(value.length > 0){
                                // Pushing the data as a first row data and removing any extra characters
                                rowData.push(value.replace(/[\n\r]+/g,''))
                                // Each column has their own count to track the number as per requirement
                                count.push(0);
                            }
                        })
                    })      
                            // Each row will be stored in a dictionary having key as row number for example row 1: [col1, col2, col3]
                            myData[i] = rowData;
                            // Looping to get new row
                            rowData = [ ];
                })
            })
             // Inside each table need to find tbody tag 
             // Similar to previous step but this code will extract row except the header
             // This block of code will look for the numerical column and store into the another 
             // array about the numerical column
            $(elem).find("tbody").each((tag, line)=> {
                $(line).find("tr").each((i,tr) =>{
                    // Looping to get td tag which means row without including header 
                    $(tr).find("td").each((row, th)=>{
                        $(th).each((col, t) => {
                            var value = $(t).text();
                            value = value.replace(/[\n\r]+/g,'').trim()
                            if(value.length > 0){
                                // check if value is numerical or not
                                // removing the comma to extract the data for numerical value
                                myData[i].push(value)
                                temp = value.replace(/[,]+/g,'')
                                // not considering any currency value
                                // handing missing numerical data
                                num = isNumeric(temp);
                                // if value is numerical then increment the count in count for the specific column
                                if(num){
                                    count[myData[i].length -1] = count[myData[i].length -1] + 1; 
                            
                                }
                                  
                            }
                                
                        })  

                
                    })  
                })
            })
            //Assumping 60% of data has to be numerical to be consider as a numerical column
            percentage= 0.6;
            // Looping into the count array to identify which column is numerical for current table 
            for(k=0; k < count.length; k++){
                // checking the percentage according to the assumption
                if( count[k] > percentage*Object.keys(myData).length){
                    // storing the information in dictonary of numerical column for each table 
                    // Initialising if there is no data about the table in the dictionary
                    if(tableNumeric[tab] == undefined){
                        tableNumeric[tab] = [ ]
                    }
                    // pushing the coulum index in the array mapped to table number in dictonary
                    tableNumeric[tab].push(k)
                }
            }
            // Storing the information of each table as dictionary
            table[tab] = myData;    
        })
    // returing the table data and their numerical column data
    return [table, tableNumeric]
}

function numericalCol(state){
    /**
     * Extracting the numerical data and seperating into in a new column from a given table
     * @state: Dictionary of tables
     */
    // state[0] --> table details
    // state[1] --> table numerical column details
    var col;
    var table;
    var numerical = {};
    var temp = [ ];
    // Here key refers in each table in the data
    // Looping to all table which has numerical column
    for (var key in state[1]){
        // Getting the single table at a time
        table = state[0][key];
        // soring the extracted columns into a dictorial with the key as a table number
        numerical[key] = [ ]
        // looping to columns for each table to get the data 
        for(var j=0; j<state[1][key].length; j++){
                // column value from numerical table
                col = state[1][key][j];
                // Getting sepcific column data and storing into an array
                for(var k=0; k < Object.keys(table).length; k++){
                    // pushing the data into an temp array
                    temp.push(table[k][col]);
                }
                // pushing each numerical column data for each table 
                numerical[key].push(temp)
                // initialising the temp array for next column
                temp = [ ]
        }
        
    }
    // console.log(numerial)
    return numerical
    }


// app.use(express.static(path.join(__dirname, '../frontend/build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/../frontend/build/index.html'))
//   })
// Middleware to communicate between frontend and backend
app.use(cors())
// '/url/', 
app.get('/url/', (req, res) => {
    console.log(req.url);
    // Getting the URL from the user/frontend search query
    var url = req.query.URL;
    // url = "https://en.wikipedia.org/wiki/Good_Country_Index";
    // Response
    axios.get(url)
    .then((response) => {
    // console.log(response.data);
        // Extracting the table data
        var table = tables(response.data);
        // selecting the numerical column data
        var numericalOnly = numericalCol(table)
        // sending the repsonse of numerical data
      res.json(numericalOnly)

    })
    .catch(function (e) {
        res.json(e)

})



});
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Port is listening on ${port}`)
    
})