const { MAX_EMBED_FIELD_SIZE } = require('../../common/constants');

const splitForMessageEmbedField = (strings = []) => {
  const splittedStrings = [];
  let singleMessage = '';
  let splittedCounter = 0;
  let stringsCounter = 0;

  while (stringsCounter < strings.length) {
    const newStringLength = strings[stringsCounter].length;
    let curStringLength = 0;

    if (newStringLength >= MAX_EMBED_FIELD_SIZE) {
      throw new Error(`One of the messages is longer than ${MAX_EMBED_FIELD_SIZE} characters.`);
    }

    if (splittedStrings[splittedCounter]) {
      curStringLength = splittedStrings[splittedCounter].length;
    }

    if (curStringLength < MAX_EMBED_FIELD_SIZE - newStringLength) {
      singleMessage += strings[stringsCounter];
      stringsCounter++;
    } else {
      splittedStrings.push(singleMessage);
      singleMessage = '';
      splittedCounter++;
    }
  }

  if (singleMessage.length > 0) {
    splittedStrings.push(singleMessage);
  }

  return splittedStrings;
};

module.exports = {
  splitForMessageEmbedField
};
