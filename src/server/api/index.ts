import express = require("express");

export * from "./events";

export function apiRouter(): express.Router {
    const router = express.Router();

    router.get("*", (_req, res) => res.sendStatus(404));

    return router;
}
