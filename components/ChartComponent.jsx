"use client";
import useFetchData from "@/app/hooks/useFetchData";
import { motion } from "framer-motion";
import useTableFunctions from "@/app/hooks/useTableFunctions";
import React from "react";

export default function ChartComponent({ res }) {
	const { convert } = useFetchData();
	const { isUpdate, stockData, isAllUpdate } = useTableFunctions({
		res,
		convert,
	});

	return (
		<tr className="p-1 text-text-color">
			{/* stock code */}
			<td className={`${isAllUpdate() ? "blink" : "cellDefault"} px-3`}>
				<p className="font-semibold">{res?.name}</p>
				<p>{res?.stockcode}</p>
			</td>
			{/* Last Vol */}
			<motion.td
				className={`tableData ${
					isUpdate("last", "volume") ? "blink" : "cellDefault"
				}`}
			>
				<p
					className={`${
						stockData.last >= 0 ? "text-green-500" : "text-red-500"
					}`}
				>
					{stockData.last}
				</p>
				<p className={`${res.volume >= 0 ? "text-green-500" : "text-red-500"}`}>
					{stockData.vol}
				</p>
			</motion.td>
			{/* changes */}
			<td
				className={`tableData ${
					isUpdate("last", "previous") ? "blink" : "cellDefault"
				}`}
			>
				<p
					className={`${
						stockData.changes >= 0 ? "text-green-500" : "text-red-500"
					}`}
				>
					{stockData.changes >= 0 && "+"}
					{stockData.changes}
				</p>
				<p
					className={`${
						stockData.changesPercentage >= 0 ? "text-green-500" : "text-red-500"
					}`}
				>
					{stockData.changesPercentage >= 0 && "+"}
					{stockData.changesPercentage}
					{"%"}
				</p>
			</td>
			{/* buy volume */}
			<td
				className={`tableData ${
					isUpdate("buy_price", "buy_volume")
						? "blink text-text-color"
						: "cellDefault"
				}`}
			>
				<p className="">{convert(res.buy_price.toFixed(3))}</p>
				<p className="">{convert(res.buy_volume.toFixed(2))}</p>
			</td>
			{/* sell volume */}
			<td
				className={`tableData ${
					isUpdate("sell_price", "sell_volume")
						? "blink text-text-color"
						: "cellDefault"
				}`}
			>
				<p className="">{convert(res.sell_price.toFixed(3))}</p>
				<p className="">{convert(res.sell_volume.toFixed(2))}</p>
			</td>
			<td className={`${isAllUpdate() ? "blink" : "cellDefault"}`}></td>
		</tr>
	);
}
