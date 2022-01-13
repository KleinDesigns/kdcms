///////////////////////////////////////////
// REQUIRES
///////////////////////////////////////////
const express = require('express');
const app = express();
const path = require('path');

const sequel = require('./utils/database');
const adminRoutes = require('./routes/admin');
const errorsController = require('./controllers/errors');

///////////////////////////////////////////
// APP SETTINGS
///////////////////////////////////////////
app.set('view engine', 'pug');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

///////////////////////////////////////////
// Routen laden
///////////////////////////////////////////
app.use(adminRoutes);
app.use(errorsController.getError404);

///////////////////////////////////////////
// Server starten und Sequilze das synchronisieren von Tabellen gestatten
///////////////////////////////////////////
sequel.sync({
    
 }).then(result => {
    app.listen(2222);
}).catch(error => {
    console.log(error);     
});