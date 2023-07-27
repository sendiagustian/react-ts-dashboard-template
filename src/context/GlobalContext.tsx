import { createContext, useContext, useState } from "react";

interface GlobalContextType {
    drawerWidth: number;
    openSideMenu: boolean;
    setOpenSideMenu: (value: boolean) => void;
    isAction: boolean;
    setAction: (value: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobal = () => {
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("Error bro");
    }

    return context;
};

export const GlobalContextProvider = (props: { children: JSX.Element }) => {
    const drawerWidth = 240;

    const [openSideMenu, setOpenSideMenu] = useState(true);
    const [isAction, setAction] = useState<boolean>(false);

    return (
        <GlobalContext.Provider
            value={{
                drawerWidth,
                openSideMenu,
                setOpenSideMenu,
                isAction,
                setAction,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};
