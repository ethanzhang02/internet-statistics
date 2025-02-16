import { DataGrid } from '@mui/x-data-grid';

const CountryLeagueTable = ({leagueTable}) => {
	const columns = [
		{ field: 'country_code', headerName: 'Country Code', width: 150 },
		{ field: 'country_name', headerName: 'Country Name', width: 150 },
		{ field: 'wb_year', headerName: 'Year', width: 150 },
		{ field: 'wb_rate', headerName: 'WB Rate', width: 150 },
	];

	const rows = leagueTable.map((country) => ({
		id: country.country_code,
		country_code: country.country_code,
		country_name: country.country_name,
		wb_year: country.wb_year,
		wb_rate: country.wb_rate,
	}));

	return (
		<DataGrid 
			rows={rows} 
			columns={columns} 
			initialState={{
				pagination: {
			  		paginationModel: {
						pageSize: 10,
					},
			  	},
			}}
			pageSizeOptions={[5, 10, 25, { value: -1, label: 'All' }]}
		/>
	)

};

export default CountryLeagueTable;