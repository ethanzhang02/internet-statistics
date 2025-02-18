import { useTheme, useMediaQuery, Box } from "@mui/material";
import { PieChart } from "@mui/x-charts";

const CountryPieChart = ({ topCountries }) => {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

	const data = topCountries.map((country) => ({
		id: country.country_code,
		label: country.country_name,
		value: country.wb_rate,
	}));

	return (
		<Box
			sx={{
				height: isSmallScreen ? "500px" : "300px",
			}}>
			<PieChart 
				margin={{
					left: 20,
					right: 20,
					bottom: isSmallScreen ? 120 : 70,
				  }}
				series={[{ data: data }]} 
				slotProps={{
        			legend: {
        			  direction: 'row',
        			  position: {
        			    horizontal: 'middle',
        			    vertical: 'bottom',
        			  },
					  itemMarkHeight: 2,
        			},
      			}}
			/>
		</Box>
	);
}

export default CountryPieChart;