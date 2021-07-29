// dependencies
const express = require('express');
const app = express();
const { Pool } = require('pg');

// port 
const PORT = process.env.PORT || 4000;

// link to frontend
app.use(express.static('public'))

// replacing body parser
app.use(express.json())

const pool = new Pool ({
    user: 'thuandang',
    host: 'localhost',
    database: 'travel',
    password: '',
    port: 5432,
})

// GET ALL users
app.get('/api/users', async (req, res, next) => {
    try {
        const selectAllUsers = 'SELECT * FROM users'
        let {rows} = await pool.query(selectAllUsers);
        if (rows.length === 0) {
            res.status(404).end('NOT FOUND')
        } else {
            res.status(200).json(rows)
        }
    } catch (error) {
        console.log('Server error')
        res.status(500).json(error)
    }
})

// GET ALL countries
app.get('/api/countries', async (req, res, next) => {
    try {
        const selectAllCountries = 'SELECT DISTINCT ON (country_name) country_id, country_name FROM countries' // removes duplicate countries;
        let {rows} = await pool.query(selectAllCountries);
        if (rows.length === 0) {
            res.status(404).end('NOT FOUND')
        } else {
            res.status(200).json(rows)
        }
    } catch (error) {
        console.log('Server error')
        res.status(500).json(error)
    }
})

// POST users
app.post('/api/users', async (req, res) => {
    try {
        const {name, age} = req.body
        // data validation
        if ( typeof name !== 'string' || typeof age !== 'number' ) {
            res.status(400).send("Bad Request")
        } else {
            const insertToUsers = 'INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *'
            const values = [name, age]
            await pool.query(insertToUsers, values, (err, q_res) => {
                if (err) {
                    console.log(err.stack)
                }
                res.status(201).send(q_res.rows[0])
            })
        }
    } catch (error) {
        console.log('Server error')
        res.status(500).json(error) 
    }
})

// POST countries
app.post('/api/countries', async (req, res) => {
    try {
        const {country_name, user_id} = req.body
        // data validation
        if ( typeof country_name !== 'string' || typeof user_id !== 'number') {
            res.status(400).send("Bad Request")
        } else {
            const insertToCountries = 'INSERT INTO countries (country_name, user_id) VALUES ($1, $2) RETURNING *'
            const values = [country_name, user_id]
            await pool.query(insertToCountries, values, (err, q_res) => {
                if (err) {
                    console.log(err.stack)
                }
                res.status(201).send(q_res.rows[0])
            })
        }
    } catch (error) {
        console.log('Server error')
        res.status(500).json(error) 
    }
})


// PATCH users
app.patch('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {name, age} = req.body;
        // data validation
        if ( typeof name !== 'string' || typeof age !== 'number' ) {
            res.status(400).send("Bad Request")
        } else {
            const updateUser = 'UPDATE users SET name = $1, age = $2 WHERE user_id = $3 RETURNING *'
            const values = [name, age, id]
            await pool.query(updateUser, values, (err, q_res) => {
                if (err) {
                    console.log(err.stack)
                }
                res.status(201).send(q_res.rows[0])
            })
        } 
    } catch (error) {
        console.log('Server error')
        res.status(500).json(error)
    }
})

// PATCH countries
app.patch('/api/countries/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {country_name, user_id} = req.body;
        // data validation
        if ( typeof country_name !== 'string' || typeof user_id !== 'number') {
            res.status(400).send("Bad Request")
        } else {
            const updateCountry = 'UPDATE countries SET country_name = $1, user_id = $2 WHERE country_id = $3 RETURNING *'
            const values = [country_name, user_id, id]
            await pool.query(updateCountry, values, (err, q_res) => {
                if (err) {
                    console.log(err.stack)
                }
                res.status(201).send(q_res.rows[0])
            })
        } 
    } catch (error) {
        console.log('Server error')
        res.status(500).json(error)
    }
})

// DELETE users
app.delete('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deleteUser = 'DELETE FROM users WHERE user_id = $1 RETURNING *'
        let {rows} = await pool.query(deleteUser, [id]);
        res.status(200).json(rows[0])
    } catch (error) {
        console.log('Server error')
        res.status(500).json(error)
    }
})

// DELETE countries
app.delete('/api/countries/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const deleteCountry = 'DELETE FROM countries WHERE country_id = $1 RETURNING *'
        let {rows} = await pool.query(deleteCountry, [id]);
        res.status(200).json(rows[0])
    } catch (error) {
        console.log('Server error')
        res.status(500).json(error)
    }
})

// Handle all unknown http GET requests
app.use( (req, res, next) => {
    res.status(404).end("Not Found")
})


// listen on port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})