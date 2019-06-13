import express from 'express'

const PORT = 1646

const app = express();
app.get('/', (req, res) => res.send('Howdy from Westminster'))

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

declare const module: any;

if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => server.close());
}