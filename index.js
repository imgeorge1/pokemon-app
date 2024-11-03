import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://pokeapi.co/api/v2/pokemon/";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { content: "waiting for input", error: null });
});

app.post("/submit", async (req, res) => {
    const pokemon = req.body["pName"]; // Keep the original input
    try {
        const response = await axios.get(API_URL + pokemon);
        const { name, weight, abilities, types } = response.data;

        const abilityNames = abilities.map(abilityObj => abilityObj.ability.name);
        const typeNames = types.map(typeObj => typeObj.type.name); // Extract types

        res.render("index.ejs", { 
            name, 
            weight, 
            abilityNames, 
            typeNames, 
            error: null 
        });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
            name: null,
            weight: null,
            abilityNames: [],
            typeNames: [],
            error: "Failed to fetch data: " + error.message,
        });
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
