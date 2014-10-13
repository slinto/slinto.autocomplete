# slinto.autocomplete() [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)


slinto.autocomplete() is JavaScript autocomplete plugin written in [Google Closure Tools](https://developers.google.com/closure/).

## Features
 - Fast
   - Average time in **23 records** is **1ms** (jQuery has 200ms Ouch!)
   - Average time in approx. **1000 records / 3 JSON files**  is **5ms**
 - Lightweight - 15kB (6kB Gzipped)
 - No dependencies

## Demo
For live preview go to [autocomplete page](http://autocomplete.slinto.sk/).

## Download
**Preferred:**  
`$ bower install slinto.autocomplete`

**Optional**  
[Download latest release](https://raw.githubusercontent.com/slinto/slinto.autocomplete/master/build/slinto.autocomplete-latest.js)

## Usage
### Basic usage
``` javascript
slinto.autocomplete.init({
  wrapper: "main-wrapper",
  files: ["assets/data/fruits.json"],
  headings: ["Fruits"],
  scan: ["value"]
});
```

### Advanced usage
``` javascript
slinto.autocomplete.init({
  wrapper: "main-wrapper",
  files: ["assets/data/fruits.json", "assets/data/vegetables.json"],
  headings: ["Fruits", "Vegetables"],
  resultWrapper: "ul#result-wrapper",
  input: "input#search",
  numberOfRecords: 4,
  scan: ["value"],
  events: {
    open: function() {
      console.log('Open event triggered!');
    },
    close: function() {
      console.log('Close event triggered!');
    },
    select: function(url, name){
      console.log("Select event triggered!\n Nazov podniku: " + name + "\n url:" + url);
    }
  }
});
```

## Options:

### wrapper
**Required**
Type: `String`  
Default: `none`  
Example: `'wrapperID'`  

Id of autocomplete wrapper.

### files
**Required**
Type: `Array of Strings`  
Default: `none`  
Example: `['data.json']` or `['data1.json', 'data2.json']`

### headings
Type: `Array of Strings`  
Default: `none`
Example: `['Heading']` or `['Heading 1', 'Heading 2']`

### resultWrapper
Type: `String`  
Default: `none`  
Example: `'ul#id.className'`

### input
Type: `String`  
Default: `First input[type="text"] searched in wrapper.`  
Example: `input#id.className`  



### numberOfRecords
Type: `Number`  
Default: `5`  

Number of records from every JSON displayed in the results.

### scan
Type: `Array of Strings`  
Default: `['token']`  
Example: `['value']` or `['value', 'tokens']`

### events
#### events#open
Type: `Function`  
Default: `none`  
Example: `function(){...}`

#### events#close
Type: `Function`  
Default: `none`  
Example: `function(){...}`

#### events#select
Type: `Function`  
Default: `none`  
Example: `function(url, name){...}`

## JSON structure
Example of JSON structure:

``` json
[
  {
    "url": "Tomato-url",
    "value": "Tomato"
  }
]
```
or
``` json
[
  {
    "url": "Tomato-url",
    "tokens": ["One", "Two", "Red"],
    "value": "Tomato"
  }
]
```

## Browser Support
 - Chrome
 - Firefox
 - Safari
 - Opera
 - Internet Explorer 8+
 - Android Browser 2.3+
 - iOS Safari

## To-Do
 - Mocha unit tests
 - Full JSON data for change event

## Release History
For release history please go to [releases page](http://github.com/slinto/slinto.autocomplete/releases) in this repository.

## License
[MIT](http://opensource.org/licenses/MIT) © [Tomáš Stankovič /Slinto/](http://slinto.sk)
