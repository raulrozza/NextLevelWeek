import express from 'express';

import { PORT } from '../config';

const app = express();

app.get('/', (req, res) => {
  return res.send('Hello');
});

app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
