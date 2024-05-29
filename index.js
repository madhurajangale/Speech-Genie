import express from "express";
import say from 'say';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Serve static files (e.g., HTML)
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/convertm', async (req, res) => {
    const text = req.body.text;
    try {
        await say.export(text, null, 1, 'output.wav', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error converting text to speech');
            } else {
                res.sendFile(path.join(__dirname, 'output.wav'));
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error converting text to speech');
    }
});

app.post('/convertf', async (req, res) => {
    const text = req.body.text;
    try {
        await say.export(text, 'Microsoft Zira Desktop', 1, 'output.wav', (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error converting text to speech');
            } else {
                res.sendFile(path.join(__dirname, 'output.wav'));
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error converting text to speech');
    }
});


app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
