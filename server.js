import express from "express";
import bodyParser from "body-parser";
import md5 from "md5";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

// Sample user data (replace with a database query)

const API_URL = "https://login-page-api-xhwy.onrender.com";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database

const url = API_URL + "/api";
const response = await axios.get(`${url}`);
const users = response.data.data;

// Routes 

app.get("/", async(req, res) => {
  try {
     await res.render("form.ejs");
  } catch (error) {
    console.log("Cannot fetch login page !!", error);
  }
});

app.get("/again",(req,res) =>{
    try{
        res.redirect("/");
    } catch(error){
        console.log(error);
    }
});

app.post("/login", async (req, res) => {
  try {
    // Find the user in the database (replace this with a database query)
    const userid = String(req.body.username);
    const raw_password = String(req.body.password);

    // Hash the provided raw password using MD5
    const hashedPassword = md5(raw_password);
    const user = await users.find((u) => u.userid == userid);

    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    } else {
      const  pass = user.password_hash;
      if (hashedPassword == pass) {
        const resultData = user.role === "admin" ? users : [user];
        res.render("table.ejs", { data: resultData });
      } else {
        return res.status(401).json({ error: "Invalid username or password" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


