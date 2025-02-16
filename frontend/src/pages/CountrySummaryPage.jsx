import { useState, useEffect } from "react";
import axios from "axios";
import CountrySelect from "../components/CountrySelect";
import CountrySummaryTable from "../components/CountrySummaryTable";

const CountrySummaryPage = () => {
	const [countryCode, setCountryCode] = useState("");

	return (
		<div>
			<h1>Country Summary</h1>
			<CountrySelect countryCode={countryCode} setCountryCode={setCountryCode} />
			<CountrySummaryTable countryCode={countryCode} />
		</div>
	);
};

export default CountrySummaryPage;