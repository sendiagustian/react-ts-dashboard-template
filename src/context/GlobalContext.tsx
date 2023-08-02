import { createContext, useContext, useState } from "react";

interface GlobalContextType {
    drawerWidth: number;
    openSideMenu: boolean;
    setOpenSideMenu: (value: boolean) => void;
    onActioning: boolean;
    setActioning: (value: boolean) => void;
    onLoading: boolean;
    setLoading: (value: boolean) => void;
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
    const [onActioning, setActioning] = useState<boolean>(false);
    const [onLoading, setLoading] = useState<boolean>(false);

    return (
        <GlobalContext.Provider
            value={{
                drawerWidth,
                openSideMenu,
                setOpenSideMenu,
                onActioning,
                setActioning,
                onLoading,
                setLoading,
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};
