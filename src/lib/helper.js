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
 * Takes a number and add dollar sign and trailing zero
 * @param {number} price
 * @returns correctly formatted price
 */
export const formatPrice = (price) => `$${price}.00`;
