// dependencies
const express = require('express');
const app = express();
const { Pool } = require('pg');

// port 
const PORT = process.env.PORT || 4000;

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
app.get('/api/users', async (req, res) => {
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
app.get('/api/countries', async (req, res) => {
    try {
        const selectAllCountries = 'SELECT country_id, country_name FROM countries'
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
        const insertToUsers = 'INSERT INTO users (name, age) VALUES ($1, $2) RETURNING *'
        const values = [name, age]
        await pool.query(insertToUsers, values, (err, q_res) => {
            if (err) {
                console.log(err.stack)
            }
            res.status(201).send(q_res.rows[0])
        })
    } catch (error) {
        console.log('Server error')
        res.status(500).json(error) 
    }
})

// listen on port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})