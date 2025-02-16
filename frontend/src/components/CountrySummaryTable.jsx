import axios from "axios";
import { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "http://localhost:3000/api";

const CountrySummaryTable = ({ countryCode }) => {
	const [rows, setRows] = useState([]);

	useEffect(() => {
		if (!countryCode) {
			return;
		}
		
		const fetchData = async () => {
			try {
				const response = await axios.get(`${BASE_URL}/statistics/${countryCode}`, {
					headers: {
						"x-api-key": API_KEY,
					},
				});
				const country = response.data;  // Get the single country data
					
					// Format the response to match DataGrid rows
					const formattedRow = {
						id: country.country_code, // Unique ID for the DataGrid row
						country_name: country.country_name,
						wb_year: country.wb_year || 'N/A',
						wb_rate: country.wb_rate || 'N/A',
						itu_year: country.itu_year || 'N/A',
						itu_rate: country.itu_rate || 'N/A',
						cia_year: country.cia_year || 'N/A',
						cia_users: country.cia_users || 'N/A',
						notes: country.notes || "No notes available",  // Default value for notes
					};
					
					setRows([formattedRow]); // Set the row array with one item
				
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [countryCode]);

	const columns = [
		{ field: 'id', headerName: 'Country Code', width: 150 },
		{ field: 'country_name', headerName: 'Country Name', width: 200 },
		{ field: 'wb_year', headerName: 'WB Year', width: 150, editable: true},
		{ field: 'wb_rate', headerName: 'WB Rate', width: 150, editable: true},
		{ field: 'itu_year', headerName: 'ITU Year', width: 150 },
		{ field: 'itu_rate', headerName: 'ITU Rate', width: 150 },
		{ field: 'cia_year', headerName: 'CIA Year', width: 150 },
		{ field: 'cia_users', headerName: 'CIA Users', width: 150 },
		{ field: 'notes', headerName: 'Notes', width: 200 },
	];

	return (
		<DataGrid
			rows={rows}
			columns={columns}
		/>

	);
}

export default CountrySummaryTable;
