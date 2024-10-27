import { setTheme, THEME } from "@/Redux/features/userSlice";
import { useDispatch } from "react-redux";

const useTheme = () => {
    const dispatch = useDispatch();

    const toggleTheme = (theme: THEME) => {
        const htmlElement = document.querySelector("html");

        if (theme === THEME.DARK) {
            htmlElement?.classList.remove("light");
            htmlElement?.classList.add("dark");
            dispatch(setTheme(THEME.DARK));
        } else {
            htmlElement?.classList.remove("dark");
            htmlElement?.classList.add("light");
            dispatch(setTheme(THEME.LIGHT));
        }
    };

    return { toggleTheme };
};

export default useTheme;
