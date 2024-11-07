import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { name: null, weight: null, typeNames: [], abilityNames: [], error: null, weightR: null, typeNamesR: [], abilityNamesR: [], nameR: null, });
});
app.post("/random", async (req, res) => {
    const randInt = Math.floor(Math.random() * 1302)
    console.log(randInt)
    try {
        const response = await axios.get(API_URL + randInt);
        const nameR = response.data.name;
        const weightR = response.data.weight;
        const typeNamesR = response.data.types.map(typeObj => typeObj.type.name);
        const abilityNamesR = response.data.abilities.map(abilityObj => abilityObj.ability.name);
        
        res.render("index.ejs", { nameR, weightR, typeNamesR, abilityNamesR, error: null, name: null, weight: null, typeNames: [], abilityNames: [], });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            error: null, name: null, weight: null, typeNames: [], abilityNames: [],
            error: "Failed to fetch data: " + error.message,

        });
    }
})
app.post("/submit", async (req, res) => {
    let pokemon = req.body["pName"];
    try {
        const response = await axios.get(API_URL + pokemon);
        const name = response.data.name;
        const weight = response.data.weight;
        const typeNames = response.data.types.map(typeObj => typeObj.type.name);
        const abilityNames = response.data.abilities.map(abilityObj => abilityObj.ability.name);
        
        res.render("index.ejs", { name, weight, typeNames, abilityNames, error: null, weightR: null, typeNamesR: [], abilityNamesR: [], nameR: null, });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            nameR, weightR, typeNamesR, abilityNamesR, error: null, name: null, weight: null, typeNames: [], abilityNames: [],
            error: "Failed to fetch data: " + error.message,

        });
    }
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
