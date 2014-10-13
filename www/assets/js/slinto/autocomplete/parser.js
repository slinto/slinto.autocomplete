goog.provide('slinto.autocomplete.parser');

goog.require('goog.array');
goog.require('goog.dom');

/**
 * Get all data from all files.
 * @param  {Array.<string>} link
 * @return {Array.<Array>}
 */
slinto.autocomplete.parser.getRequest = function(link) {
  var req = new XMLHttpRequest(),
      data;

  req.open('GET', link, false);
  req.send(null);

  if (req.status === 200) {
    data = JSON.parse(req.responseText);
  }

  return data;
};

/**
 * Ajax GET request
 * @param  {Array.<string>} links
 * @return {Array.<Object>}
 */
slinto.autocomplete.parser.getData = function(links) {
  var linksNum = links.length,
      dataArray = [];

  goog.array.forEach(links, function(link, index) {
    dataArray[index] = slinto.autocomplete.parser.getRequest(link);
  });

  return dataArray;
};
