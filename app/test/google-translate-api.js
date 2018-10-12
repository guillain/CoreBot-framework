//# npm install google-translate-api

translate = require('google-translate-api');
translate('What is the shortest way to the Eiffel Tower, please ?', {to: 'fr'}).then(res => {
    console.log(res.text);
    //=> Quel est le plus court chemin vers la tour eiffel, s'il vous plait
    console.log(res.from.language.iso);
    //=> fr
}).catch(err => {
    console.error(err);
});

