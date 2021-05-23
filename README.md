
# Extracting tables from Wikipedia
## Installation
Make sure Node js is install in your local pc
```
git clone https://github.com/shouryaraj/wiki-table-scraper.git
cd wiki-table-scraper
npm run backendinstall
npm run installfrontend
npm run dev
```
Server will start running on the default web browser

## After first installation 
```
npm run dev 
```

## Functionality 
Currently, Search function only takes a proper Wikipedia Link e.g.
`https://en.wikipedia.org/wiki/Good_Country_Index` 

if wiki link has Table with numerical content then it will return the exact column with header. **A user can find it by scrolling down.**
## Assumption
+ To identify the numerical column, the value has to be number and number with commas can also be consider. 
+ If a column has a number more than 60% of column length(number of rows) then program will consider it as numerical column.
+ Returning just column and displaying in table rather than exporting into image.
+ Program has not implemented any chart functionality because tables data is widely different for wiki pages. 
Hence, it is hard to generalise the type of chart. Perpahs, it could be in a furture development. 
## Future Development
+ Adding error control for URL Link in the search bar
+ More AdHoc/CI CD testing with the Wiki pages
+ Graph Chart for relevant information from the wiki page
+ Return Image of the chart and table by implementing a button with each chart and column to download the image
