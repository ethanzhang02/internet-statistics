import { DataGrid } from '@mui/x-data-grid';

const CountryLeagueTable = ({leagueTable}) => {
	const columns = [
		{ field: 'country_name', headerName: 'Country', width: 200 },
		{ field: 'wb_year', headerName: 'Year', width: 150 },
		{ field: 'wb_rate', headerName: 'WB Rate', width: 150 },
	];

	const rows = leagueTable.map((country) => ({
		id: country.country_code,
		country_name: country.country_name,
		wb_year: country.wb_year,
		wb_rate: country.wb_rate,
	}));

	return (
		<div style={{ height: '600px', overflow: 'auto'}}>
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
				pageSizeOptions={[10, 25, 50, { value: -1, label: 'All' }]}
			/>
		</div>
		
	)

};

export default CountryLeagueTable;