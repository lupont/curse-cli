#!/usr/bin/env node

const fs = require('fs');

const { downloadMod } = require('./download');
const { getModsFromQuery } = require('./logic');
const { getNumberFromUser } = require('./util');
const { options } = require('./yargs');

function logMods(mods) {
    console.log('The following mods were recognized. Curse free search can be a bit crummy at times, so if your expected result is not here; please try with another query.');

    mods.forEach((mod, index) => {
        console.log(`| ${index + 1} | ${mod.name} by ${mod.authors} for ${mod.gameVersion + (mod.isFabric ? ' [FABRIC]' : '')}`);
        console.log(`|   |     ${mod.summary}`);
        console.log(`|   |     ${mod.websiteUrl}`);
    });

    console.log('+---+---------------------');
    console.log('==> Mod to install, e.g. 1');
}

(async function main() {
    if (!fs.existsSync(options['directory'])) {
        fs.mkdirSync(options['directory']);
    }

    const mods = await getModsFromQuery(
        options['mod'], 
        options['game-version'], 
        options['loader'], 
        options['amount']
    );        

    if (mods && mods.length) {
        logMods(mods);

        getNumberFromUser('==> ', 1, mods.length + 1, index => {
            downloadMod(mods[index], options['directory']);
        });    
    }
    else {
        console.log('Sorry, no matches were found. Curse free search can be a little wonky sometimes, please try again with an altered query.');
    }
})();