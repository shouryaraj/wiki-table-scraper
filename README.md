
# Extracting tables from Wikipedia
## Installation
Make sure Node js is install in your local pc
```
git clone https://github.com/shouryaraj/wiki-table-scraper.git
npm run postinstall
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


## Future Development
+ Adding error control for URL Link in the search bar
+ More AdHoc/CI CD testing with the Wiki pages
+ Graph Chart for relevant information from the wiki page
+ Return Image of the chart and table by implementing a button with each chart and column to download the image
