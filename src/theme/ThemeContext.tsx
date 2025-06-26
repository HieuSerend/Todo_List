import { createContext, useContext, useState } from "react";
import { lightTheme, darkTheme } from "./themes";

export const ThemeContext = createContext({
    theme: lightTheme,
    toggleTheme: () => {}
})

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
    const [theme, changeTheme] = useState(lightTheme)

    const toggleTheme = () => {
        changeTheme(theme === lightTheme ? darkTheme : lightTheme)
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)