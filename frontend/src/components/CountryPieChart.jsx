import { PieChart } from "@mui/x-charts";

const CountryPieChart = ({ topCountries }) => {
	const data = topCountries.map((country) => ({
		id: country.country_code,
		label: country.country_name,
		value: country.wb_rate,
	}));

	return (
		<PieChart series={[{ data: data }]}
			height = {300}
		/>
	);
}

export default CountryPieChart;