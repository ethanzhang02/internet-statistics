const request = require('supertest');
const app = require('./server'); // Import your Express app
const db = require('./db'); // Import the database module

// Mock the database module
jest.mock('./db', () => ({
  query: jest.fn(),
}));

// Mock the authMiddleware module
jest.mock('./authMiddleware', () => jest.fn((req, res, next) => next()));

describe('GET /api/countries', () => {
  it('should return a list of countries with status 200', async () => {
    // Mock the database query
    db.query.mockImplementation((query, callback) => {
      callback(null, [{ country_code: 'US', country_name: 'United States' }]);
    });

    // Make the request
    const response = (await request(app).get('/api/countries'));

    // Test the response status
    expect(response.statusCode).toBe(200);

    // Test the response data
    expect(response.body).toEqual([{ country_code: 'US', country_name: 'United States' }]);
  });

  it('should return 500 if the database query fails', async () => {
    // Mock a database error
    db.query.mockImplementation((query, callback) => {
      callback(new Error('Database error'), null);
    });

    // Make the request
    const response = (await request(app).get('/api/countries'));

    // Test the response status
    expect(response.statusCode).toBe(500);

    // Test the error message
    expect(response.body).toEqual({ error: 'Failed to fetch countries' });
  });
});

describe('GET /api/statistics/:country_code', () => {
  it('should return statistics for a valid country code with status 200', async () => {
    // Mock the database query
    db.query.mockImplementation((query, params, callback) => {
      callback(null, [{
        country_code: 'US',
        country_name: 'United States',
        wb_year: 2022,
        wb_rate: 85.5,
        itu_year: 2022,
        itu_rate: 90.0,
        cia_year: 2022,
        cia_users: 300000000,
        notes: 'Sample notes',
      }]);
    });

    // Make the request
    const response = await request(app).get('/api/statistics/US');

    // Test the response status
    expect(response.statusCode).toBe(200);

    // Test the response data
    expect(response.body).toEqual({
      country_code: 'US',
      country_name: 'United States',
      wb_year: 2022,
      wb_rate: 85.5,
      itu_year: 2022,
      itu_rate: 90.0,
      cia_year: 2022,
      cia_users: 300000000,
      notes: 'Sample notes',
    });
  });

  it('should return 400 for an invalid country code', async () => {
    // Make the request with an invalid country code
    const response = await request(app).get('/api/statistics/INVALID');

    // Test the response status
    expect(response.statusCode).toBe(400);

    // Test the error message
    expect(response.body).toEqual({ error: 'Invalid country code' });
  });

  it('should return 404 if the country is not found', async () => {
    // Mock the database query to return no results
    db.query.mockImplementation((query, params, callback) => {
      callback(null, []);
    });

    // Make the request
    const response = await request(app).get('/api/statistics/XX');

    // Test the response status
    expect(response.statusCode).toBe(404);

    // Test the error message
    expect(response.body).toEqual({ error: 'Country not found' });
  });

  it('should return 500 if the database query fails', async () => {
    // Mock a database error
    db.query.mockImplementation((query, params, callback) => {
      callback(new Error('Database error'), null);
    });

    // Make the request
    const response = await request(app).get('/api/statistics/US');

    // Test the response status
    expect(response.statusCode).toBe(500);

    // Test the error message
    expect(response.body).toEqual({ error: 'Failed to fetch country' });
  });
});

describe('GET /api/countries/wb-rates', () => {
  it('should return all wb rates for all countries in order with status 200', async () => {
    // Mock the database query
    db.query.mockImplementation((query, callback) => {
      callback(null, [{ 
        country_code: 'US', 
        country_name: 'United States',
        wb_year: 2022,
        wb_rate: 85.5, 
      }]);
    });

    // Make the request
    const response = (await request(app).get('/api/countries/wb-rates'));

    // Test the response status
    expect(response.statusCode).toBe(200);

    // Test the response data
    expect(response.body).toEqual([{ 
      country_code: 'US', 
      country_name: 'United States',
      wb_year: 2022,
      wb_rate: 85.5, 
    }]);
  });

  it('should return 500 if the database query fails', async () => {
    // Mock a database error
    db.query.mockImplementation((query, callback) => {
      callback(new Error('Database error'), null);
    });

    // Make the request
    const response = (await request(app).get('/api/countries/wb-rates'));

    // Test the response status
    expect(response.statusCode).toBe(500);

    // Test the error message
    expect(response.body).toEqual({ error: 'Failed to fetch WB rates' });
  });
});

describe('PUT /api/update/:country_code', () => {
  it('should update rate successfully', async () => {
    db.query.mockImplementationOnce((query, values, callback) => {
      callback(null, { affectedRows: 1 });
    });

    const response = await request(app)
      .put('/api/update/US')
      .send({ wb_rate: 50, wb_year: 2023 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Rate updated');
  });

  it('should return 400 for invalid country code', async () => {
    const response = await request(app)
      .put('/api/update/USA') // Invalid code
      .send({ wb_rate: 50, wb_year: 2023 });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Invalid country code');
  });

  it('should return 400 for invalid wb_rate', async () => {
    const response = await request(app)
      .put('/api/update/US')
      .send({ wb_rate: -5, wb_year: 2023 }); // Invalid rate

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Invalid WB Rate. It must be a number between 0 and 100.');
  });

  it('should handle database error', async () => {
    db.query.mockImplementationOnce((query, values, callback) => {
      callback(new Error('Database error'), null);
    });

    const response = await request(app)
      .put('/api/update/US')
      .send({ wb_rate: 50, wb_year: 2023 });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Failed to update rate');
  });
});