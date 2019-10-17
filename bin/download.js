const fs = require('fs');
const path = require('path');
const download = require('download');

const { getFile, getMod } = require('./get');
const { convertToLocalMod } = require('./logic');

async function downloadMod(mod, directory) {
    if (!mod || !directory || !directory.length) {
        return;
    }

    const file = await getFile(mod.id, mod.fileId);
    const url = file.downloadUrl;
    const fileName = file.fileName;

    for (const d of file.dependencies) {
        const dependency = await getMod(d.addonId);
        const dependencyMod = convertToLocalMod(dependency, mod.gameVersion);

        downloadMod(dependencyMod, directory);
    }

    if (!fs.existsSync(path.join(directory, fileName))) {
        const options = {
            filename: file.fileName,
        };

        await download(url, directory, options);
        console.log(`Downloaded ${mod.name} successfully.`);
    }
    else {
        console.log(`${mod.name} is already downloaded.`);
    }
}

module.exports = { downloadMod };