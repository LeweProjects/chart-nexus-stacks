"use client";
import React, { useEffect, useRef, useState } from "react";

const useTableFunctions = ({ res, convert }) => {
	const [stockData, setStock] = useState({
		last: 0,
		vol: 0,
		sell: 0,
		sellVol: 0,
		buy: 0,
		buyVol: 0,
		changes: 0,
		changesPercentage: 0,
	});

	const prevData = useRef("");

	useEffect(() => {
		prevData.current = res;

		setStock((prevStock) => {
			return {
				...prevStock,
				last: res.last.toFixed(3),
				vol: convert(res?.volume),
				sell: res?.sell_price,
				sellVol: res?.sell_volume,
				buy: res?.buy_price,
				buyVol: res?.buy_volume,
				changes: (res.last - res.previous)?.toFixed(3),
				changesPercentage: (
					(100 * (res.last - res.previous)) /
					res.previous
				)?.toFixed(1),
			};
		});

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [res]);

	const prev = prevData?.current;
	function isUpdate(data1, data2) {
		if (prev !== "") {
			if (res[data1] !== prev[data1] || res[data2] !== prev[data2]) {
				return true;
			}
		}
	}
	function isAllUpdate() {
		const lastVolRow = res.last !== prev.last || res.volume !== prev.volume;
		const buyRow =
			res.buy_price !== prev.buy_price || res.buy_volume !== prev.buy_volume;
		const sellRow =
			res.sell_price !== prev.sell_price ||
			res.sell_volume !== prev.sell_volume;
		const ChangesRow = res.last !== prev.last || res.previous !== prev.previous;

		if (lastVolRow && buyRow && sellRow && ChangesRow) return true;
	}

	return { isUpdate, stockData, isAllUpdate };
};

export default useTableFunctions;
