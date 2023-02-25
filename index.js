const express = require("express")
const app = express();
//let cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb');
//const bodyParser = require("body-parser")

app.set('view engine', 'ejs');
//app.use(cors())
app.use(express.static('./views'))
app.use(express.json())
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const collection = client.db('basketball').collection('players');


async function connection() {
    await client.connect()
}
app.get(('/player/mostpoints'), async (req, res) => {
    connection();
    //Query for the player with the most points
    const cursor = collection.find().sort({ points: -1 }).limit(1);
    let mostpoints = []
    await cursor.forEach((data) => {
        mostpoints.push(data)

    })
    console.log(mostpoints[0].name);
    res.render('homepage', {
        name: mostpoints[0].name,
        point: mostpoints[0].points,
        rebound: mostpoints[0].rebounds,
        assist: mostpoints[0].assists,
        block: mostpoints[0].blocks
    })
})
app.get(('/player/mostrebounds'), async (req, res) => {
    connection();
    //Query for the player with the most rebounds
    const cursor = collection.find().sort({ rebounds: -1 }).limit(1);
    let mostrebounds = []
    await cursor.forEach((data) => {
        mostrebounds.push(data)

    })
    res.render('homepage', {
        name: mostrebounds[0].name,
        point: mostrebounds[0].points,
        rebound: mostrebounds[0].rebounds,
        assist: mostrebounds[0].assists,
        block: mostrebounds[0].blocks
    })
})
app.get(('/player/mostassists'), async (req, res) => {
    connection();
    //Query for the player with the most rebounds
    const cursor = collection.find().sort({ assists: -1 }).limit(1)
    let mostassists = []
    await cursor.forEach((data) => {
        mostassists.push(data)

    })
    res.render('homepage', {
        name: mostassists[0].name,
        point: mostassists[0].points,
        rebound: mostassists[0].rebounds,
        assist: mostassists[0].assists,
        block: mostassists[0].blocks
    })
})

app.get(('/player/mostblocks'), async (req, res) => {
    connection();
    //Query for the player with the most rebounds
    const cursor = collection.find().sort({ blocks : -1 }).limit(1)
    let mostblocks = []
    await cursor.forEach((data) => {
        mostblocks.push(data)

    })
    res.render('homepage', {
        name: mostblocks[0].name,
        point: mostblocks[0].points,
        rebound: mostblocks[0].rebounds,
        assist: mostblocks[0].assists,
        block: mostblocks[0].blocks
    })
})
app.get(('/player/allplayers'), async (req, res) => {
    connection();
    //Query for the player with the most rebounds
    const cursor = collection.find().sort({ points: -1 })
    let allplayers = []
    await cursor.forEach((data) => {
        allplayers.push(data)

    })

    console.log(allplayers);

    res.render('allplayers', {alldata : allplayers , item : ""})
})

app.listen(8080, () => {
    console.log("http://127.0.0.1:8080");
})
