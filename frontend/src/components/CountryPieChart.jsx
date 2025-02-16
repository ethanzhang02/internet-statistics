import { PieChart } from "@mui/x-charts";

const CountryPieChart = ({ topCountries }) => {
	const data = topCountries.map((country) => ({
		id: country.country_code,
		label: country.country_name,
		value: country.wb_rate,
	}));

	return (
		<PieChart series={[{ data: data }]}
			width = {400}
			height = {400}
		/>
	);
}

export default CountryPieChart;