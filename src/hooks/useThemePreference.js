import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const scheme = useColorScheme();
  const [themePreference, setThemePreference] = useState(scheme);
  const [themeName, setThemeName] = useState("device");

  useEffect(() => {
    const getThemeValue = async () => {
      const value = await AsyncStorage.getItem("@theme_preference");
      //get the theme preference value if exist
      if (value !== null) {
        if (value === "device") {
          setThemePreference(scheme);
          setThemeName("device");
        } else {
          setThemePreference(value);
          setThemeName(value);
        }
      } else {
        //default theme is based on phone setting if nothing is saved in local storage
        setThemePreference(scheme);
        setThemeName("device");
      }
    };

    getThemeValue().catch((err) =>
      console.log("async storage fetching: ", err)
    );
  }, []);

  /**
   * Change context provider local theme state
   * @param {string} value - theme name
   */
  const updateGlobalThemePreference = (value) => {
    setThemePreference(value);
    setThemeName(value);
  };

  return (
    <ThemeContext.Provider
      value={{
        themePreference,
        themeName,
        updateGlobalThemePreference,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default function useThemePreference() {
  return useContext(ThemeContext);
}
