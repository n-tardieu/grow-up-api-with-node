import express from 'express';
// import AuthMiddleware from "../middlewares/auth"

const indexRouter: express.Application = express();

indexRouter.get('/', (_req, _res) => {
    _res.send("TypeScript With Express !");
});

export default indexRouter;