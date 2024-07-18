"use client";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import _ from "lodash";

const useFetchData = () => {
	//data
	const [chart, setChartData] = useState([]);

	//routers
	const router = useRouter();
	const searchParams = useSearchParams();

	//params
	const marketId = searchParams.get("market_id") || "0";
	const list = searchParams.get("list") || "0";
	const [exchange, setExchange] = useState("0");

	//handle select option changes
	function handleChange(e) {
		setExchange(e.target.value);
	}

	//fetching Data
	useEffect(() => {

		async function getData() {
			await axios
				.get(
					`https://livefeed3.chartnexus.com/Dummy/quotes?market_id=${marketId}&list=${list}`
				)
				.then((res) => {
					setChartData(res.data);
				})
				.catch((res) => console.log(res));
		}
		router.push(`?market_id=${exchange || "0"}&list=${list}`, {
			scroll: false,
		});

		getData();
		const interval = setInterval(() => getData(), 3000);
		return () => clearInterval(interval);
	}, [exchange, list, marketId, router]);

	//number conversion
	function convert(n) {
		if (n < 1e3) return n;
		if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(2) + "K";
		if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(2) + "M";
		if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(2) + "B";
		if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
	}

	return {
		chart,
		convert,
		list,
		marketId,
		handleChange,
		exchange,
	};
};

export default useFetchData;
