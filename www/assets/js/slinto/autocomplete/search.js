goog.provide('slinto.autocomplete.search');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('slinto.autocomplete.scan');

/**
 * Search function.
 * @param  {Array.<Object>} data Object with item data.
 * @param  {number} dataLen
 * @param  {RegExp} pattern
 * @param  {Object} resultWrapper
 * @return {number} Number of matched items.
 */
slinto.autocomplete.search = function(data, dataLen, pattern, resultWrapper) {
  slinto.matchedNum = 1;

  for (var i = 0; i < dataLen; i++) {
    var actualData = data[i],
        liFragment = document.createDocumentFragment();

    if (!slinto.autocomplete.setting.scan) {
      liFragment = slinto.autocomplete.scan.token({
        actualData: actualData,
        liFragment: liFragment,
        pattern: pattern
      });
    } else {
      slinto.autocomplete.scan.custom({
        actualData: actualData,
        liFragment: liFragment,
        pattern: pattern,
        scanArray: slinto.autocomplete.setting.scan
      });
    }

    goog.dom.append(resultWrapper, liFragment);

    if (slinto.matchedNum > slinto.autocomplete.NUMBER_OF_RECORDS) {
       return 0;
    }
  }

  return slinto.matchedNum;
};
