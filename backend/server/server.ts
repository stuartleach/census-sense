import express from 'express'
import {getZipCodeData} from "../clients/backendClient";
import {PrismaClient} from "@prisma/client";

const app = express();

const port = 8000

const prisma =  new PrismaClient();

// migrate prisma db
prisma.$connect().then(() => {
    console.log("connected to prisma db")
    prisma.$disconnect()
}).then((r) => {
    console.log("disconnected from prisma db", r)
})

// allow cors
app.use(function (req: any, res: { header: (arg0: string, arg1: string) => void; }, next: () => void) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    console.log("A new request received at " + Date.now());
    next()
})

app.get('/', (req: any, res: { send: (arg0: string) => void }) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.get('/api/zipcodes', (req: any, res: { send: any }) => {
    console.log("request received", req.query.zipcode)
    getZipCodeData(req.query.zipcode).then((data) => {
        console.log("data", data)
        res.send(data)
    })
})

app.get('/api/zipcodes/:zipcode', (req: any, res: { send: any }) => {
    console.log("request received", req.params.zipcode)
    getZipCodeData(req.params.zipcode).then((data) => {
        console.log("data", data)
        res.send(data)
    })
})