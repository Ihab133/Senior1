import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mysql from "mysql";

const saltRounds = 10;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Ihabahmad123-",
    database: "goldtiger",
});

export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const checkUserSql = "SELECT * FROM user WHERE username = ? OR email = ?";
        db.query(checkUserSql, [username, email], async (err, result) => {
            if (err) return res.json({ Error: "Error checking for existing user in the server" });
            if (result.length > 0) return res.json({ Error: "User already exists" });

            // If user doesn't exist, hash the password and insert the new user
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const insertUserSql = "INSERT INTO user (`username`, `email`, `password`) VALUES (?)";
            const values = [username, email, hashedPassword];

            db.query(insertUserSql, [values], (err, result) => {
                if (err) return res.json({ Error: "Inserting data Error in the server" });
                return res.json({ Status: "Success" });
            });
        });
    } catch (err) {
        return res.json({ Error: "Hashing password failed" });
    }
};

export const login = (req, res) => {
    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Login Error in the server" });
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if (err) return res.json({ Error: "Password compare error" });
                if (response) {
                    const username = data[0].username;
                    const token = jwt.sign({ username }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: "Success" });
                } else {
                    return res.json({ Error: "Password not matched" });
                }
            });
        } else {
            return res.json({ Error: "Email does not exist" });
        }
    });
};

export const logout = (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success", Message: "Logged out successfully" });
};


export const userInfo = async (req, res) => {
    const userId = req.params.id;
    try {
      // Connect to the database
      db.connect();
  
      // Use db.query to execute the query
      db.query('SELECT username, email , address , userRole FROM user WHERE id = ?', [userId], (error, results) => {
        if (error) {
          console.error('Error fetching user info:', error);
          res.status(500).send('Server error');
        } else {
          if (results.length === 0) {
            res.status(404).json({ message: 'User not found' });
          } else {
            res.json(results[0]);
          }
        }
      });
  
      // Close the database connection
      db.end();
    } catch (error) {
      console.error('Error fetching user info:', error);
      res.status(500).send('Server error');
    }
  };
