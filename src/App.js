/* eslint-disable no-unused-vars */
// import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import * as XLSX from 'xlsx';

// function App() {
//   const [excelData, setExcelData] = useState(null);

//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     readFile(file)
//       .then((data) => {
//         setExcelData(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileUpload} />
//       {excelData && <ReactExcel initialData={excelData} />}
//     </div>
//   );
// }

// export default App;

// export const ReactExcel = (props) => {
//   const {
//     initialData,
//     onSheetUpdate,
//     reactExcelClassName,
//     activeSheetClassName,
//   } = props;
//   const [parsedData, setParsedData] = useState([]);
//   const [currentSheet, setCurrentSheet] = useState(undefined);
//   const [sheetNames, setSheetNames] = useState([]);
//   const [activeSheet, setActiveSheet] = useState(0);

//   const createTableHeader = (firstRow) => {
//     return (
//       <thead>
//         <tr>
//           {Object.values(firstRow).map((cell, idx) => (
//             <th
//               key={idx}
//               contentEditable
//               suppressContentEditableWarning={true}
//               onBlur={(e) => {
//                 updateSheet(e.currentTarget.textContent, 0, idx);
//               }}
//             >
//               {cell}
//             </th>
//           ))}
//         </tr>
//       </thead>
//     );
//   };

//   const createTableBody = (rowArray) => {
//     const rows = rowArray.slice(1);
//     return (
//       <tbody>
//         {rows.map((row, id) => (
//           <tr key={id}>
//             {row.map((cell, idx) => (
//               <td
//                 key={idx}
//                 contentEditable
//                 suppressContentEditableWarning={true}
//                 onBlur={(e) => {
//                   updateSheet(e.currentTarget.textContent, id + 1, idx);
//                 }}
//               >
//                 {cell}
//               </td>
//             ))}
//           </tr>
//         ))}
//       </tbody>
//     );
//   };

//   const updateSheet = (newValue, row, col) => {
//     const sheetRow = Object.values(currentSheet)[0][row];
//     sheetRow.splice(col, 1, newValue);
//     Object.values(currentSheet)[0].splice(row, 1, sheetRow);
//     setCurrentSheet({
//       ...currentSheet,
//       [Object.keys(currentSheet)[0]]: Object.values(currentSheet)[0],
//     });
//     onSheetUpdate &&
//       onSheetUpdate({
//         [Object.keys(currentSheet)[0]]: Object.values(currentSheet)[0],
//       });
//   };

//   const handleClick = (e, id) => {
//     const sheet = parsedData.find((o) =>
//       Object.keys(o).includes(e.target.value)
//     );
//     setCurrentSheet(sheet);
//     onSheetUpdate && onSheetUpdate(sheet);
//     setActiveSheet(id);
//   };

//   useEffect(() => {
//     const setData = () => {
//       const sheetNames = initialData.SheetNames;
//       setSheetNames(sheetNames);
//       const result = sheetNames.map((name) => {
//         const ws = initialData.Sheets[name];
//         const dataParse = XLSX.utils.sheet_to_json(ws, {
//           header: 1,
//           defval: '',
//         });
//         return {
//           [name]: dataParse,
//         };
//       });
//       setParsedData(result);
//       setCurrentSheet(result[0]);
//       onSheetUpdate && onSheetUpdate(result[0]);
//     };

//     initialData && setData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [initialData]);

//   return (
//     <div className={reactExcelClassName}>
//       <div>
//         {sheetNames.map((name, idx) => (
//           <button
//             key={idx}
//             value={name}
//             onClick={(e) => handleClick(e, idx)}
//             className={`${activeSheet === idx ? `${activeSheetClassName}` : ''}`}
//           >
//             {name}
//           </button>
//         ))}
//       </div>
//       {currentSheet && (
//         <table>
//           {createTableHeader(Object.values(currentSheet)[0][0])}
//           {createTableBody(Object.values(currentSheet)[0])}
//         </table>
//       )}
//     </div>
//   );
// };

// ReactExcel.propTypes = {
//   initialData: PropTypes.object,
//   onSheetUpdate: PropTypes.func,
//   activeSheetClassName: PropTypes.string,
//   reactExcelClassName: PropTypes.string,
// };

// export const readFile = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onload = function (event) {
//       const data = new Uint8Array(event.target.result);
//       const readedData = XLSX.read(data, { type: 'array' });
//       if (readedData) {
//         resolve(readedData);
//       } else {
//         reject({ message: 'Error reading file' });
//       }
//     };
//     reader.readAsArrayBuffer(file);
//   });
// };

// readFile.propTypes = {
//   file: PropTypes.object.isRequired,
// };

// export const generateObjects = (currentSheet) => {
//   const rows = Object.values(currentSheet)[0];
//   const keys = rows[0];
//   let result = [];
//   for (let i = 1; i < rows.length; i++) {
//     let row = rows[i];
//     result.push(Object.fromEntries(keys.map((_, i) => [keys[i], row[i]])));
//   }
//   return result;
// };

// generateObjects.propTypes = {
//   currentSheet: PropTypes.object.isRequired,
// };

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import "./App.css";
import axios from 'axios';
// Signup component
const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // Perform signup logic
    // Example: create a new user in a database or API
    // If signup is successful, call the onSignup callback
    const newUser = {
      username,
      email,
      phoneNumber,
      // Other user data
    };
    onSignup(newUser);
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

// Login component
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Perform login authentication logic
    // Example: check credentials against a database or API
    // If login is successful, call the onLogin callback
    const loggedInUser = {
      username,
      // Other user data
    };
    onLogin(loggedInUser);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

// App component
function App() {
  const [excelData, setExcelData] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    readFile(file)
      .then((data) => {
        setExcelData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSignup = (user) => {
    // Handle signup logic, e.g., create user in database
    setLoggedInUser(user);
  };

  const handleLogin = (user) => {
    // Handle login logic, e.g., set user in state
    setLoggedInUser(user);
  };

  return (
    <div>
      {loggedInUser ? (
        <div className="myComponent">
          <h2>Welcome Page {loggedInUser.username}!</h2>
          {/* Your existing code for Excel component */}
          <input type="file" onChange={handleFileUpload} />
          {excelData && <ReactExcel initialData={excelData} />}
        </div>
      ) : (
        <div>
          <Signup onSignup={handleSignup} />
          <Login onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
}

// Rest of your existing code for ReactExcel component

export default App;
export const ReactExcel = (props) => {
  const {
    initialData,
    onSheetUpdate,
    reactExcelClassName,
    activeSheetClassName,
  } = props;
  const [parsedData, setParsedData] = useState([]);
  const [currentSheet, setCurrentSheet] = useState(undefined);
  const [sheetNames, setSheetNames] = useState([]);
  const [activeSheet, setActiveSheet] = useState(0);

  const createTableHeader = (firstRow) => {
    return (
      <thead>
        <tr>
          {Object.values(firstRow).map((cell, idx) => (
            <th
              key={idx}
              contentEditable
              suppressContentEditableWarning={true}
              onBlur={(e) => {
                updateSheet(e.currentTarget.textContent, 0, idx);
              }}
            >
              {cell}
            </th>
          ))}
        </tr>
      </thead>
    );
  };

  const createTableBody = (rowArray) => {
    const rows = rowArray.slice(1);
    return (
      <tbody>
        {rows.map((row, id) => (
          <tr key={id}>
            {row.map((cell, idx) => (
              <td
                key={idx}
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) => {
                  updateSheet(e.currentTarget.textContent, id + 1, idx);
                }}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  };

  const updateSheet = (newValue, row, col) => {
    const sheetRow = Object.values(currentSheet)[0][row];
    sheetRow.splice(col, 1, newValue);
    Object.values(currentSheet)[0].splice(row, 1, sheetRow);
    setCurrentSheet({
      ...currentSheet,
      [Object.keys(currentSheet)[0]]: Object.values(currentSheet)[0],
    });
    onSheetUpdate &&
      onSheetUpdate({
        [Object.keys(currentSheet)[0]]: Object.values(currentSheet)[0],
      });
  };

  const handleClick = (e, id) => {
    const sheet = parsedData.find((o) =>
      Object.keys(o).includes(e.target.value)
    );
    setCurrentSheet(sheet);
    onSheetUpdate && onSheetUpdate(sheet);
    setActiveSheet(id);
  };

  useEffect(() => {
    const setData = () => {
      const sheetNames = initialData.SheetNames;
      setSheetNames(sheetNames);
      const result = sheetNames.map((name) => {
        const ws = initialData.Sheets[name];
        const dataParse = XLSX.utils.sheet_to_json(ws, {
          header: 1,
          defval: "",
        });
        return {
          [name]: dataParse,
        };
      });
      setParsedData(result);
      setCurrentSheet(result[0]);
      onSheetUpdate && onSheetUpdate(result[0]);
    };

    initialData && setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialData]);

  return (
    <div className={reactExcelClassName}>
      <div>
        {sheetNames.map((name, idx) => (
          <button
            key={idx}
            value={name}
            onClick={(e) => handleClick(e, idx)}
            className={`${
              activeSheet === idx ? `${activeSheetClassName}` : ""
            }`}
          >
            {name}
          </button>
        ))}
      </div>
      {currentSheet && (
        <table>
          {createTableHeader(Object.values(currentSheet)[0][0])}
          {createTableBody(Object.values(currentSheet)[0])}
        </table>
      )}
    </div>
  );
};

ReactExcel.propTypes = {
  initialData: PropTypes.object,
  onSheetUpdate: PropTypes.func,
  activeSheetClassName: PropTypes.string,
  reactExcelClassName: PropTypes.string,
};

export const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const data = new Uint8Array(event.target.result);
      const readedData = XLSX.read(data, { type: "array" });
      if (readedData) {
        resolve(readedData);
      } else {
        reject({ message: "Error reading file" });
      }
    };
    reader.readAsArrayBuffer(file);
  });
};

readFile.propTypes = {
  file: PropTypes.object.isRequired,
};

export const generateObjects = (currentSheet) => {
  const rows = Object.values(currentSheet)[0];
  const keys = rows[0];
  let result = [];
  for (let i = 1; i < rows.length; i++) {
    let row = rows[i];
    result.push(Object.fromEntries(keys.map((_, i) => [keys[i], row[i]])));
  }
  return result;
};

generateObjects.propTypes = {
  currentSheet: PropTypes.object.isRequired,
};
