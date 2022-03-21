import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Removes item for a key stored in async storage
 * @param {string} itemKey - async storage string value
 */
export const removeValue = async (itemKey) => {
  try {
    await AsyncStorage.removeItem(itemKey);
  } catch (err) {
    console.err("Problem removing key from async storage: ", err);
  }
};

/**
 * Capitalize the first letter in a word
 * @param {string} string
 * @returns Capitalize word
 */
export const capitalize = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Takes a number and add dollar sign
 * @param {number} num
 * @returns correctly formatted price
 */
export const formatPrice = (num) => {
  const price = num.toString();
  if (price.indexOf(".") > -1) {
    const arr = price.split(".");
    if (arr[1].length === 1) return `$${price}0`;
    else return `$${price}`;
  } else {
    return `$${price}.00`;
  }
};
