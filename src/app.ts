import express from 'express'

const PORT = 1646

const app = express();
app.get('/', (req, res) => res.send('Hello from Westminster'))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))