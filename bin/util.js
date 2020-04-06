const readline = require('readline');
const { getConfigObject } = require('./config');

function getNumberFromUser(min, max, callback, error) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    console.log('==> Select mod index (e.g. 1).');
    rl.question('==> ', answer => {
        const number = parseInt(answer);

        if (!number || (number < min || number >= max)) {
            error(number);
            rl.close();
            return;
        }

        callback(number - 1);
        rl.close();
    });
}

function convertToLocalMod(json) {
    const { name, id, summary, websiteUrl } = json;
    const authors = json.authors.map(a => a.name).join(', ');
    const isFabric = json.categories.some(c => c.name === 'Fabric');
    const file = json.gameVersionLatestFiles.find(f => f.gameVersion === getConfigObject().version);

    if (!file) {
        return null;
    }

    const fileId = file.projectFileId;
    const fileName = file.projectFileName;
    const gameVersion = file.gameVersion;

    return {
        name,
        id,
        summary,
        websiteUrl,
        authors,
        fileId,
        fileName,
        gameVersion,
        isFabric,
    };
}

module.exports = { getNumberFromUser, convertToLocalMod };