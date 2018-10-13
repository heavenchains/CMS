module.exports = {
  objectWithoutKey: (object, key) => {
    const { [key]: deletedKey, ...otherKeys } = object._doc;
    return otherKeys;
  }
};
