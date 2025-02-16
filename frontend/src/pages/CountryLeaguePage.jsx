import {useState, useEffect} from "react";
import axios from "axios";
import CountryPieChart from "../components/CountryPieChart";
import CountryLeagueTable from "../components/CountryLeagueTable";
import { Box, Container, Grid2, Paper, Typography } from "@mui/material";


const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "http://localhost:3000/api";

const CountryLeaguePage = () => {
	const [leagueTable, setLeagueTable] = useState([]);
	const [topCountries, setTopCountries] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/countries/wb-rates`, {
					headers: {
						"x-api-key": API_KEY,
					},
				});
				const processedData = response.data.map((country) => ({
					...country,
					wb_year: country.wb_year == null ? 'N/A' : country.wb_year,
					wb_rate: country.wb_rate == null ? 'N/A' : country.wb_rate,
				}));

				setLeagueTable(processedData);
				setTopCountries(processedData.slice(0, 10));
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	return (
		<div>
			<h1>Country League Statistics</h1>
		  	<Grid2 container spacing={2}>
			{/* Pie Chart Section */}
				<Grid2 size={{ xs: 12, md: 12}}>
			  		<Paper style={{ padding: "16px" }}>
						<Typography variant="h6">Top 10 Countries by WB Rate</Typography>
						<CountryPieChart topCountries={topCountries} />
			  		</Paper>
				</Grid2>
	
			{/* Table Section */}
				<Grid2 size={{ xs: 12, md: 12}}>
			  		<Paper style={{ padding: "16px" }}>
						<Typography variant="h6">Country League Table</Typography>
						<CountryLeagueTable leagueTable={leagueTable} />
			  		</Paper>
				</Grid2>
		  	</Grid2>
		</div>
	);
};

export default CountryLeaguePage;