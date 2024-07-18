"use client";
import Link from "next/link";
import ChartComponent from "../components/ChartComponent";
import useFetchData from "./hooks/useFetchData";
import DarkModeToggle from "react-dark-mode-toggle";
import useThemeFunction from "./hooks/useThemeFunction";
import { Suspense } from "react";

export default function Home() {
	const { chart, list, marketId, handleChange, exchange } = useFetchData();
	const { theme, setTheme } = useThemeFunction();

	return (
		<main
			className={`${
				theme ? "dark" : "light"
			} duration-150 flex min-h-screen flex-col items-center bg-background justify-between p-24`}
		>
			<div className="flex flex-col w-[80%] max-w-[55rem] ">
				<Suspense>
					<section className="w-full flex justify-between text-text-color bg-header-bg p-4">
						<label className="font-semibold flex items-center">
							DELAYED QUOTES
						</label>
						<select
							name=""
							id=""
							value={exchange}
							onChange={handleChange}
							className="rounded-md text-black"
						>
							<option value="0">SGX</option>
							<option value="2">Bursa</option>
							<option value="3">Nasdaq</option>
						</select>
						<div className="flex flex-col justify-center items-center">
							<p className="text-sm font-semibold">Dark Mode</p>
							<DarkModeToggle
								onChange={() => setTheme(!theme)}
								checked={theme}
								size={70}
							/>
						</div>
					</section>
					<section className="grid grid-cols-5 border-b-2 text-text-color bg-header-bg border-filters chartHeader">
						<Link
							href={`?market_id=${marketId}&list=0`}
							className={`${
								list == "0" ? "tableFilters" : "border-filter-def"
							}`}
						>
							Top Volume
						</Link>
						<Link
							href={`?market_id=${marketId}&list=1`}
							className={`${
								list == "1" ? "tableFilters" : "border-filter-def"
							}`}
						>
							Top Gainers
						</Link>
						<Link
							href={`?market_id=${marketId}&list=2`}
							className={`${
								list == "2" ? "tableFilters" : "border-filter-def"
							}`}
						>
							Top Losers
						</Link>
						<Link
							href={`?market_id=${marketId}&list=3`}
							className={`${
								list == "3" ? "tableFilters" : "border-filter-def"
							}`}
						>
							Top % Gainer
						</Link>
						<Link
							href={`?market_id=${marketId}&list=4`}
							className={`${
								list == "4" ? "tableFilters" : "border-filter-def"
							}`}
						>
							Top % Losers
						</Link>
					</section>
					<section className="grid col-span-5 border-[1px] border-table-bg p-3 bg-table-bg overflow-y-scroll max-h-screen">
						<table className="chartTable">
							<tbody>
								<tr className="sticky -top-3 bg-table-bg text-text-color">
									<th>
										<p className="text-left px-3">
											Stock <br /> Code
										</p>
									</th>
									<th>
										Last <br /> Vol
									</th>
									<th>
										+/- <br /> %Chng
									</th>
									<th>
										Buy <br /> Buy Vol
									</th>
									<th>
										Sell <br /> Sell Vol
									</th>
									<th></th>
								</tr>
								{chart?.map((res, i) => (
									<ChartComponent key={i} res={res} />
								))}
							</tbody>
						</table>
					</section>
				</Suspense>
			</div>
		</main>
	);
}
