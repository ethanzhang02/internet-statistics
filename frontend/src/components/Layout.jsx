import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Container, Button } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';

const Layout = ({ children }) => {
  const navigate = useNavigate(); 

  return (
    <div>
		<AppBar position="fixed" sx={{ backgroundColor: '#333' }}>
			<Container maxWidth="xl">
			<Toolbar>
				<Box sx={{ flexGrow: 1 }}>
					<Button color="inherit" onClick={() => navigate("/")}>
						Home
					</Button>
					<Button color="inherit" onClick={() => navigate("/summary")}>
						Country Summary
					</Button>
					<Button color="inherit" onClick={() => navigate("/league-table")}>
						League Table
					</Button>
				</Box>
			</Toolbar>
			</Container>
		</AppBar>

      {/* Main content area */}
      <div style = {{marginTop: 64}}>
        {children}  {/* Render dynamic content (pages) here */}
      </div>
    </div>
  );
};

export default Layout;