import axios from "axios";
import { useState, useEffect } from "react";
import { Box, InputLabel, MenuItem, FormControl, Select, Paper } from "@mui/material";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

const CountrySelect = ({ countryCode, setCountryCode }) => {
	const [countries, setCountries] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`${API_URL}/countries`, {
					headers: {
						"x-api-key": API_KEY,
					},
				});
				setCountries(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);

	const handleChange = (event) => {
		if (event.target.value === "") {
			return;
		}
		setCountryCode(event.target.value);
	};

	return (
		<Box sx={{ minWidth: 120 }} backgroundColor="white">
			<Paper style={{ padding: "16px" }}>
      		<FormControl fullWidth>
        		<InputLabel id="country-select-label">Country</InputLabel>
        		<Select
          			id="country-select"
					value={countryCode}
          			label="Country"
          			onChange={handleChange}
        		>
					{countries.map((country) => (
						<MenuItem key={country.country_code} value={country.country_code}>
							{country.country_name}
						</MenuItem>
					))}
        		</Select>
      		</FormControl>
			</Paper>
    	</Box>
	)
}

export default CountrySelect;