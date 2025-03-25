const express = require('express');
const client = require('./db');
const initdb = express.Router();
const format = require('pg-format');


initdb.get('/', async(req, res) => {

    let query = `
            DROP TABLE IF EXISTS parcels;
            CREATE TABLE parcels(id serial PRIMARY KEY, date DATE, platform VARCHAR(50), street VARCHAR(50), housenumber VARCHAR(5), plz VARCHAR(10), ort VARCHAR(50), firstname VARCHAR(50), lastname VARCHAR(50), parcelwidth FLOAT, parcellength FLOAT, parcelheight FLOAT, weightinkg FLOAT, parcelcontent VARCHAR(255));
            `;

    try {
        await client.query(query)
        console.log("Table created successfully ...")
    } catch (err) {
        console.log(err)
    }

    const values = [
    ["2025-03-21", "Vinted", "Elisabethstr.", "5", "38100", "Braunschweig", "Liam", "Brock", "35", "40", "20", "5.5", "Laptop, Maus"],
    ["2025-03-17", "Etsy", "Weichselstr.", "3", "12045", "Berlin", "Nora", "Ullmann", "20", "25", "10", "2.0", "Strickset, Häkelnadeln"],
    ["2025-03-11", "eBay", "Allee der Kosmonauten", "56", "99089", "Erfurt", "Mike", "Schuster", "47", "55", "35", "13.5", "Vintage-Kamera, Objektiv"],
    ["2025-03-11", "Facebook", "Friedrichstr.", "6", "54290", "Trier", "Julia", "Peters", "12", "22", "10", "0.8", "Bilderrahmen, Kunstdruck"],
    ["2025-03-07", "Kleinanzeigen", "Lindenallee", "34", "30989", "Gehrden", "Frank", "Jakob", "100", "70", "40", "15.0", "Bücherkiste"],
    ["2025-03-05", "Facebook", "Uhlandstr.", "9", "37073", "Göttingen", "Tina", "Winter", "45", "55", "33", "12.0", "Handgefertigte Seife, Armband"],
    ["2025-03-02", "eBay", "Eichenweg", "77", "18439", "Stralsund", "Olivia", "Ludwig", "22", "32", "18", "2.5", "Roman, Tagebuch"],
    ["2025-02-28", "Kleinanzeigen", "Goethestr.", "11", "30159", "Hannover", "Ralf", "Lehmann", "55", "40", "25", "7.5", "Jeans, T-Shirt"],
    ["2025-02-27", "Shopify", "Kantstr.", "21", "27568", "Bremerhaven", "Petra", "Keller", "10", "15", "5", "0.3", "Kerze, Schlüsselanhänger"],
    ["2025-02-25", "Kleinanzeigen", "Lindenstr.", "14", "99084", "Erfurt", "Chris", "Franke", "70", "100", "30", "20.0", "Küchenmesser"],
    ["2025-02-15", "Etsy", "Blumenallee", "7", "19053", "Schwerin", "Nina", "Seidel", "25", "35", "12", "1.2", "Handgemachte Ohrringe"],
    ["2025-02-03", "eBay", "Kaiserstr.", "18", "44135", "Dortmund", "Tim", "Bauer", "30", "45", "22", "2.0", "Sportschuhe, Socken"],
    ["2025-01-20", "Vinted", "Altstr.", "15", "60311", "Frankfurt", "Laura", "Sommer", "40", "50", "35", "8.5", "Acrylfarben, Pinsel"],
    ["2025-01-12", "Vinted", "Neue Str.", "30", "28195", "Bremen", "Erik", "Müller", "20", "30", "15", "1.0", "Elektrische Zahnbürste"],
    ["2025-01-05", "Kleinanzeigen", "Schulstr.", "8", "04109", "Leipzig", "Clara", "Weber", "35", "55", "25", "3.0", "Wandkalender, Stift"],
    ["2024-12-22", "Shopify", "Ringstr.", "22", "20095", "Hamburg", "Tom", "König", "60", "40", "20", "5.0", "Bluetooth-Lautsprecher, Ladekabel"],
    ["2024-12-10", "Kleinanzeigen", "Bahnhofstr.", "5", "01067", "Dresden", "Anna", "Schulz", "50", "30", "60", "10.0", "Bilderbuch"],
    ["2024-12-01", "Etsy", "Marktplatz", "12", "50667", "Köln", "Lukas", "Fischer", "15", "25", "10", "0.5", "Halskette, Ringe"],
    ["2024-11-20", "eBay", "Blumenweg", "15", "80331", "München", "Sophie", "Schneider", "25", "35", "15", "1.8", "Kleid, Schal"],
    ["2024-11-15", "Kleinanzeigen", "Hauptstr.", "10A", "10115", "Berlin", "Max", "Mustermann", "30", "20", "10", "2.5", "Zeitschriften, Kugelschreiber"]
];
    
    const paramquery = format('INSERT INTO parcels(date, platform, street, housenumber, plz, ort, firstname, lastname, parcelwidth, parcellength, parcelheight, weightinkg, parcelcontent) VALUES %L RETURNING *', values);


    try {
        const result = await client.query(paramquery)
        console.log("20 parcels inserted ...")
        res.status(200)
    } catch (err) {
        console.log(err)
    }

});


module.exports = initdb;
