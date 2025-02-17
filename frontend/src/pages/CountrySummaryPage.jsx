import { useState } from "react";
import CountrySelect from "../components/CountrySelect";
import CountrySummaryTable from "../components/CountrySummaryTable";
import { Grid2 } from "@mui/material";

const CountrySummaryPage = () => {
	const [countryCode, setCountryCode] = useState("");

	return (
		<div>
			<h1>Country Summary</h1>
			<Grid2 container spacing={2}>
				<Grid2 size={3}>
					<CountrySelect countryCode={countryCode} setCountryCode={setCountryCode} />
				</Grid2>
				<Grid2 size={12}>
					<CountrySummaryTable countryCode={countryCode} />
				</Grid2>
			</Grid2>
		</div>
	);
};

export default CountrySummaryPage;