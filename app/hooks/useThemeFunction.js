"use client";
import { useEffect, useState } from "react";

const useThemeFunction = () => {
	const [theme, setTheme] = useState(null);

	const selectedTheme = localStorage.getItem("theme");
	useEffect(() => {
		if (selectedTheme) {
			if (theme == true) {
				localStorage.setItem("theme", "dark");
			} else if (theme == false) {
				localStorage.setItem("theme", "light");
			}
		}

		console.log();
	}, [selectedTheme, theme]);

	useEffect(() => {
		if (selectedTheme == "dark") {
			setTheme(true);
		} else if (selectedTheme == "light") {
			setTheme(false);
		} else if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)").matches
		) {
			localStorage.setItem("theme", "dark");
			setTheme(true);
		} else {
			localStorage.setItem("theme", "light");
			setTheme(false);
		}
	}, []);

	return { theme, setTheme };
};

export default useThemeFunction;
