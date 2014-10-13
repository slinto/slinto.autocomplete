goog.provide('slinto.autocomplete.scan');

/**
 * Search in actual array.
 * @param {Array} actualTokens
 * @param {Object} searchSettings
 */
slinto.autocomplete.scan.arrayScan = function(actualTokens, searchSettings) {
  var actualTokensLen = actualTokens.length;

  for (var j = 0; j < actualTokensLen; j++) {
    var token = actualTokens[j],
        match = searchSettings.pattern.exec(token),
        li;

    if (match !== null) {
      li = goog.dom.createDom('li', {
        'data-url': searchSettings.actualData['url'],
        'class': 'item'
      }, searchSettings.actualData['value']);
      goog.dom.append(searchSettings.liFragment, li);
      slinto.matchedNum++;
      break;
    }
  }
};

/**
 * Search in actual string.
 * @param {String} token
 * @param {Object} searchSettings
 */
slinto.autocomplete.scan.stringScan = function(token, searchSettings) {
  var match = searchSettings.pattern.exec(token),
      li;

  if (match !== null) {
    li = goog.dom.createDom('li', {
      'data-url': searchSettings.actualData['url'],
      'class': 'item'
    }, searchSettings.actualData['value']);
    goog.dom.append(searchSettings.liFragment, li);
    slinto.matchedNum++;
  }
};

/**
 * Search and add results from "token" field.
 * @param  {Object} searchSettings
 * @return {Object}
 */
slinto.autocomplete.scan.token = function(searchSettings) {
  slinto.autocomplete.scan.arrayScan(searchSettings.actualData['tokens'], searchSettings);
  return searchSettings.liFragment;
};

/**
 * Search and add results from array of fields.
 * @param  {Object} searchSettings
 * @return {Object}
 */
slinto.autocomplete.scan.custom = function(searchSettings) {
  for (var i = 0; i < searchSettings.scanArray.length; i++) {
    var actualTokens = searchSettings.actualData[searchSettings.scanArray[i]];



    if (goog.isArrayLike(actualTokens)) {
      slinto.autocomplete.scan.arrayScan(actualTokens, searchSettings);
    } else {
      slinto.autocomplete.scan.stringScan(actualTokens, searchSettings);
    }
  }

  return searchSettings.liFragment;
};
