import AsyncStorage from "@react-native-async-storage/async-storage";
import { menu } from "../assets/menu";

export const emailRegex = /\S+@\S+\.\S+/;
export const addressRegex = /^\s*\S+(?:\s+\S+){2}/;
export const stateRegex =
  /^((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))$/;
export const zipcodeRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
export const phoneRegex = /^(\d{3})(\d{3})(\d{4}).*/;

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

/**
 * convert number to pizza size name
 * @param {number} index
 * @returns pizza size name
 */
export const mapSize = (index) => `${capitalize(menu.type[index].size)} size`;

/**
 * convert number to pizza crust name
 * @param {number} index
 * @returns pizza crust name
 */
export const mapCrust = (index) =>
  `${capitalize(menu.crust[index].type)} crust`;

/**
 * converts a array of numbers to topping names
 * @param {toppingsArr} arr -toppings array
 * @returns sorted topping names
 */
export const mapToppings = (arr) =>
  arr
    .sort((a, b) => a - b)
    .map((index) => capitalize(menu.toppings[index].type));

/**
 * converts a array of numbers to sauce names
 * @param {saucesArr} arr -sauces array
 * @returns sorted sauce names
 */
export const mapSauces = (arr) =>
  arr.sort((a, b) => a - b).map((index) => capitalize(menu.sauces[index].type));

/**
 * takes a string of number and determined the credit card type
 * @param {string} cc
 * @returns credit card icon name
 */
export const creditCardType = (cc) => {
  let amex = new RegExp("^3[47][0-9]{13}$");
  let visa = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$");

  let mastercard = new RegExp("^5[1-5][0-9]{14}$");
  let mastercard2 = new RegExp("^2[2-7][0-9]{14}$");

  let disco1 = new RegExp("^6011[0-9]{12}[0-9]*$");
  let disco2 = new RegExp("^62[24568][0-9]{13}[0-9]*$");
  let disco3 = new RegExp("^6[45][0-9]{14}[0-9]*$");

  if (visa.test(cc)) return ["visa", true];
  if (amex.test(cc)) return ["american-express", true];
  if (mastercard.test(cc) || mastercard2.test(cc)) return ["mastercard", true];
  if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc))
    return ["discover", true];
  return ["", false];
};
