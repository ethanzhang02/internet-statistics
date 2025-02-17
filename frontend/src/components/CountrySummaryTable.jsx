import axios from "axios";
import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from "@mui/material";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "http://localhost:3000/api";

const CountrySummaryTable = ({ countryCode }) => {
    const [countryData, setCountryData] = useState([]);
    const [editedData, setEditedData] = useState([]);

    useEffect(() => {
        if (!countryCode) return;

        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/statistics/${countryCode}`, {
                    headers: { "x-api-key": API_KEY },
                });

                setCountryData(response.data);
                setEditedData({
                    wb_rate: response.data.wb_rate || "N/A",
                });

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [countryCode]);

    const handleChange = (e) => {
		const {name, value} = e.target;
		setEditedData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleUpdate = async () => {
        if (editedData.wb_rate < 0 || editedData.wb_rate > 100) {
            alert("Rate must be between 0 and 100.");
            return;
        }

        try {
            await axios.put(`${BASE_URL}/update/${countryCode}`, {
                wb_rate: editedData.wb_rate,
                wb_year: new Date().getFullYear(),
            }, {
                headers: { "x-api-key": API_KEY }
            });
			
			const updatedResponse = await axios.get(`${BASE_URL}/statistics/${countryCode}`, {
                headers: { "x-api-key": API_KEY }
            });

            // Update country data with the latest response (with updated year)
            setCountryData(updatedResponse.data);
			
            alert("Update successful!");
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update data.");
        }
    };


    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{width: 300}}>Country</TableCell>
                        <TableCell style={{width: 150}}>WB Year</TableCell>
                        <TableCell style={{width: 150}}>WB Rate</TableCell>
                        <TableCell style={{width: 150}}>ITU Year</TableCell>
                        <TableCell style={{width: 150}}>ITU Rate</TableCell>
                        <TableCell style={{width: 150}}>CIA Year</TableCell>
                        <TableCell style={{width: 150}}>CIA Users</TableCell>
                        <TableCell style={{width: 150}}>Notes</TableCell>
                        <TableCell style={{width: 100}}>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{countryData.country_name}</TableCell>
                        <TableCell>{countryData.wb_year}</TableCell>
                        <TableCell>
                            <TextField
                                type="number"
								name="wb_rate"
                                value={editedData.wb_rate}
                                onChange={handleChange}
                            />
                        </TableCell>
                        <TableCell>{countryData.itu_year || "N/A"}</TableCell>
                        <TableCell>{countryData.itu_rate || "N/A"}</TableCell>
                        <TableCell>{countryData.cia_year || "N/A"}</TableCell>
                        <TableCell>{countryData.cia_users || "N/A"}</TableCell>
                        <TableCell>{countryData.notes || "No notes available"}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" onClick={handleUpdate}>
                                Update
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CountrySummaryTable;
