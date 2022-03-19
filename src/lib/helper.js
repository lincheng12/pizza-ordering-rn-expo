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
