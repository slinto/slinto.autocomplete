goog.provide('slinto.autocomplete.ev.key');

goog.require('goog.array');
goog.require('goog.dom');
goog.require('goog.style');
goog.require('slinto.autocomplete.helpers');
goog.require('slinto.autocomplete.search');

/**
 * Check key value and call function arrowUp/arrowDown.
 * @param  {Object} input
 * @param  {Object} resultWrapper
 * @param  {number} key
 */
slinto.autocomplete.ev.key.arrowUpOrDown = function(input, resultWrapper, key) {
  var activeElement,
      child,
      childLen;

  child = goog.dom.getChildren(resultWrapper);
  childLen = child.length;
  activeElement = goog.dom.getElementByClass('active', resultWrapper);

  if (key === 38) {
    slinto.autocomplete.ev.key.arrowUp(activeElement, child, input);
  } else {
    slinto.autocomplete.ev.key.arrowDown(activeElement, child, input);
  }
};

/**
 * Change active element when is arrowUP down.
 * @param  {Object} activeElement
 * @param  {Object} child
 * @param  {Object} input
 */
slinto.autocomplete.ev.key.arrowUp = function(activeElement, child, input) {
  var childLen = child.length;

  if (activeElement === null) {
    slinto.autocomplete.helpers.setActive(child, childLen, childLen - 1, input);
  } else {
    activeText = activeElement.textContent;
    prevIndex = slinto.autocomplete.helpers.getActiveIndex(child, childLen, activeText) - 1;
    slinto.autocomplete.helpers.removeActiveClass(child, childLen);

    if (prevIndex === 0) {
      slinto.autocomplete.helpers.setActive(child, childLen, childLen - 1, input);
    } else {
      for (i = childLen - 1; i > 0; i--) {
        if (child[i].localName === 'li' && i <= prevIndex) {
          slinto.autocomplete.helpers.setActive(child, childLen, i, input);
          break;
        }
      }
    }
  }
};

/**
 * Change active element when is arrowDown down.
 * @param  {Object} activeElement
 * @param  {Object} child
 * @param  {Object} input
 */
slinto.autocomplete.ev.key.arrowDown = function(activeElement, child, input) {
  var childLen = child.length;

    if (activeElement === null) {
      slinto.autocomplete.helpers.setActive(child, childLen, 0, input);
    } else {
      activeText = activeElement.textContent;
      nextIndex = slinto.autocomplete.helpers.getActiveIndex(child, childLen, activeText) + 1;
      slinto.autocomplete.helpers.removeActiveClass(child, childLen);

      if (nextIndex === childLen) {
        nextIndex = 0;
        slinto.autocomplete.helpers.setActive(child, childLen, nextIndex, input);
      } else {
        slinto.autocomplete.helpers.setActive(child, childLen, nextIndex, input);
      }
    }
};

/**
 * Standard event when is down key.
 * Call search function and render results to searchWrapper.
 * @param  {Object} elementsObject
 */
slinto.autocomplete.ev.key.standardKeyEvent = function(elementsObject) {

  if (slinto.autocomplete.ENV === 'DEV') {
    var startTime = new Date();
  }

  var input = elementsObject.input,
      searchVal = input.value,
      resultWrapper = elementsObject.resultWrapper,
      dataFilesLen = elementsObject.dataFilesLen,
      dataArray = elementsObject.dataArray,
      headings = elementsObject.headings,
      setting = elementsObject.setting;

  resultWrapper.innerHTML = '';

  if (!goog.dom.classes.has(slinto.autocomplete.setting.resultWrapper, 'slinto-autocomplete-show')) {
    slinto.autocomplete.helpers.showResultWrapper();
  }

  if (searchVal === '') {
    resultWrapper.innerHTML = ' ';
    slinto.autocomplete.helpers.hideResultWrapper();
    return;
  }

  var pattern = new RegExp(searchVal, 'i');

  // Create headers for all files and call search for all files
  goog.array.forEach(dataArray, function(data, i) {
    var dataLen = data.length,
        head,
        numberOfSearched,
        nodesLen;

    if (headings !== undefined && headings[i] !== undefined) {
      head = goog.dom.createDom('div', {'class': 'heading'}, headings[i]);
      goog.dom.append(resultWrapper, head);
    }

    numberOfSearched = slinto.autocomplete.search(data, dataLen, pattern, resultWrapper);

    if (numberOfSearched === 1) {
      nodesLen = resultWrapper.childNodes.length;
      if (goog.isDef(resultWrapper.childNodes[nodesLen - 1])) {
        resultWrapper.removeChild(resultWrapper.childNodes[nodesLen - 1]);
      }
    }
  });

  // No ressults message
  if (resultWrapper.innerHTML === '') {
    var li = goog.dom.createDom('li', undefined, setting.noResultMessage);
    goog.dom.append(resultWrapper, li);
  }

  if (slinto.autocomplete.ENV === 'DEV') {
    var endTime = new Date();
    console.log('Search time: ' + (endTime - startTime) + 'ms');
  }

};
