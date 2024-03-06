// This is the API end point 

import express from "express";
import bodyParser from "body-parser";
import { createClient } from '@supabase/supabase-js';
//import passport from "passport";
import  env  from "dotenv";
//import cors from "cors";

// server 

const app = express();
const port = 4000;
env.config();

// database 
const supabaseUrl = 'https://widcrloujwskdoubnaoi.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/*app.use(cors({
  origin:'file:///D:/SAJAL/WEB%20DEV/Practise%20Projects/Login%20Page/index.html',
  methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials:true,
}));*/


// GET route for login
app.get('/api', async(req, res) => {
  try {
    // Retrieve data from a table
    const { data, error } = await supabase
      .from('users')
      .select('*')

    if (error) {
      return res.status(500).json({ error: 'Error fetching data from Supabase.Gve proper Username and Password' });
    }
    console.log(data);
    res.json({ data });

  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
