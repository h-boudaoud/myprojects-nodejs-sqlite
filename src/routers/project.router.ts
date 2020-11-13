const express = require('express');
export const Router = express.Router();

Router.route('/')
    .all((req: any, res: { statusCode: number; setHeader: (arg0: string, arg1: string) => void; }, next: () => void) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req: any, res: { end: (arg0: string) => void; }, next: any) => {
        res.end('When a GET request is made, then this '
            + 'is the response sent to the client!');
    })
    .post((req: any, res: { end: (arg0: string) => void; }, next: any) => {
        res.end('When a POST request is made, then this '
            + 'is the response sent to the client!');
    })
    .put((req: any, res: { end: (arg0: string) => void; }, next: any) => {
        res.end('When a PUT request is made, then this '
            + 'is the response sent to the client!');
    })
    .delete((req: any, res: { end: (arg0: string) => void; }, next: any) => {
        res.end('When a DELETE request is made, then this '
            + 'is the response sent to the client!');
    });


