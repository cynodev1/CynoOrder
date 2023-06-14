/* eslint-disable no-unused-vars */
// const express = require("express");
// const { MongoClient } = require("mongodb");

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// app.use(express.json());

// app.post("/api/users", (req, res) => {
//   const newUser = req.body;

//   // Insert the new user into the database
//   const insertUser = async () => {
//     try {
//       await client.connect();
//       const database = client.db("ExcelProjectReact");
//       const collection = database.collection("ExcelProjectReact");

//       const result = await collection.insertOne(newUser);
//       console.log("User inserted successfully:", result.insertedId);

//       res.status(201).json(newUser);
//     } catch (error) {
//       console.error("Error inserting user:", error);
//       res.status(500).json({ error: "Failed to create user" });
//     } finally {
//       await client.close();
//     }
//   };

//   insertUser();
// });

// app.post("/api/auth", (req, res) => {
//   const { username } = req.body;

//   // Find the user in the database based on username
//   const findUser = async () => {
//     try {
//       await client.connect();
//       const database = client.db("ExcelProjectReact");
//       const collection = database.collection("ExcelProjectReact");

//       const user = await collection.findOne({ username });

//       if (user) {
//         console.log("User logged in successfully:", user);
//         res.json(user);
//       } else {
//         console.log("User not found");
//         res.status(401).json({ error: "Invalid credentials" });
//       }
//     } catch (error) {
//       console.error("Error finding user:", error);
//       res.status(500).json({ error: "Failed to authenticate user" });
//     } finally {
//       await client.close();
//     }
//   };

//   findUser();
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require("express");
const { MongoClient } = require("mongodb");
const xlsx = require("xlsx");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
const uri = "mongodb://localhost:27017";
// eslint-disable-next-line no-unused-vars
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.post("/api/upload", (req, res) => {
  const file = req.files.file;

  try {
    // Read the Excel file
    const workbook = xlsx.readFile(file.path);

    // Get the first sheet of the Excel file
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert Excel data to JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });

    res.json(jsonData);
  } catch (error) {
    console.error("Error reading Excel file:", error);
    res.status(500).json({ error: "Failed to read Excel file" });
  }
});

app.post("/api/users", (req, res) => {
  // Rest of your code for inserting new users into MongoDB
  // ...
  // eslint-disable-next-line no-unused-vars
  const user = req.body;
  const excelData = req.body.excelData;
    
});

app.post("/api/auth", (req, res) => {
  // Rest of your code for authenticating users from MongoDB
  // ...
  const credentials = req.body;
  const excelData = req.body.excelData;
  

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

