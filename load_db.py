import mysql.connector
import csv
import os
from dotenv import load_dotenv

load_dotenv()

# Database connection
conn = mysql.connector.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),  
    password=os.getenv("DB_PASSWORD"),
    database=os.getenv("DB_NAME")
)
cursor = conn.cursor()

# Create tables
cursor.execute('''
    CREATE TABLE IF NOT EXISTS countries (
        country_code VARCHAR(2) PRIMARY KEY,
        country_name VARCHAR(100) NOT NULL
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS wb_rates (
        country_code VARCHAR(2) PRIMARY KEY,
        year INT,  -- Allow NULL values
        rate FLOAT,
        FOREIGN KEY (country_code) REFERENCES countries(country_code)
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS itu_rates (
        country_code VARCHAR(2) PRIMARY KEY,
        year INT,  -- Allow NULL values
        rate FLOAT,
        FOREIGN KEY (country_code) REFERENCES countries(country_code)
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS cia_users (
        country_code VARCHAR(2) PRIMARY KEY,
        year INT,  -- Allow NULL values
        users BIGINT,
        FOREIGN KEY (country_code) REFERENCES countries(country_code)
    )
''')

cursor.execute('''
    CREATE TABLE IF NOT EXISTS notes (
        country_code VARCHAR(2) PRIMARY KEY,
        notes TEXT,
        FOREIGN KEY (country_code) REFERENCES countries(country_code)
    )
''')

# Load countries.csv
with open('countries.csv', 'r') as file:
    reader = csv.reader(file)
    next(reader)  # Skip header
    for row in reader:
        cursor.execute(
            "INSERT INTO countries (country_code, country_name) VALUES (%s, %s)",
            (row[1], row[0])  # country_code is in column 1, country_name in column 0
        )

# Load country_internet_statistics.csv
with open('country_internet_statistics.csv', 'r') as file:
    reader = csv.reader(file)
    next(reader)  # Skip header
    for row in reader:
        country_code = row[0]  # Location (country_code)

        # Insert WB rates (if data exists)
        if row[1]:  # Rate (WB)
            rate_wb = float(row[1]) if row[1] else None
            year_wb = int(row[2]) if row[2] else None  # Allow NULL for year
            cursor.execute(
                "INSERT INTO wb_rates (country_code, year, rate) VALUES (%s, %s, %s)",
                (country_code, year_wb, rate_wb)
            )

        # Insert ITU rates (if data exists)
        if row[3]:  # Rate (ITU)
            rate_itu = float(row[3]) if row[3] else None
            year_itu = int(row[4]) if row[4] else None  # Allow NULL for year
            cursor.execute(
                "INSERT INTO itu_rates (country_code, year, rate) VALUES (%s, %s, %s)",
                (country_code, year_itu, rate_itu)
            )

        # Insert CIA users (if data exists)
        if row[5]:  # Users (CIA)
            users_cia = int(row[5]) if row[5] else None
            year_users = int(row[6]) if row[6] else None  # Allow NULL for year
            cursor.execute(
                "INSERT INTO cia_users (country_code, year, users) VALUES (%s, %s, %s)",
                (country_code, year_users, users_cia)
            )

        # Insert notes (if data exists)
        if row[7]:  # Notes
            notes = row[7]
            cursor.execute(
                "INSERT INTO notes (country_code, notes) VALUES (%s, %s)",
                (country_code, notes)
            )

# Commit and close
conn.commit()
cursor.close()
conn.close()