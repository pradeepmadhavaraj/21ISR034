const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Base URLs
const BASE_URL = "http://20.244.56.144/evaluation-service";

// Route: Register your company (only once!)
app.post('/api/register', async (req, res) => {
    try {
        const response = await axios.post(`${BASE_URL}/register`, {
            email: process.env.EMAIL,
            name: process.env.NAME,
            rollNo: process.env.ROLL_NO,
            accessCode: process.env.ACCESS_CODE,
            githubUsername: "github", // Replace with actual if needed
            mobileNo: "9999999999",
            collegeName: "ABC University"
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data || error.message
        });
    }
});

// Route: Get Authorization Token
app.post('/api/get-token', async (req, res) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth`, {
            email: process.env.EMAIL,
            name: process.env.NAME.toLowerCase(),
            rollNo: process.env.ROLL_NO,
            accessCode: process.env.ACCESS_CODE,
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET
        });
        res.status(200).json(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({
            error: error.response?.data || error.message
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
