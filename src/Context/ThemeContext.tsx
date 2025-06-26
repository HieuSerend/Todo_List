import { createContext, useContext, useState } from "react";

export type ThemeContextType = {
    theme: string,
    toggleTheme: (newThemes: string) => void
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    toggleTheme: () => {}
})

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
    const [theme, changeTheme] = useState<string>('light')

    const toggleTheme = (newThemes: string) => {
        changeTheme(newThemes)
    }   

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)