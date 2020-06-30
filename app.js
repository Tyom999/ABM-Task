const express = require('express');
const app = express();
const http = require("http").createServer(app);

const cors = require('cors');
const morgan = require('morgan');
const socketService = require('./ChatSocket/socketService');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const authRouter = require('./routes/auth');
const carEventRouter = require('./routes/cars');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());
app.use(morgan('dev'));
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/uploads', express.static('uploads'));

app.use('/auth', authRouter);
app.use('/api', carEventRouter);

app.use((req, res, next) => {
    const error = new Error("not found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


socketService.init(http);

module.exports = http;
