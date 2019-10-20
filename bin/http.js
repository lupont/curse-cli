const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const download = require('download');

const { convertToLocalMod } = require('./util');

async function get(url) {
    const result = await fetch(url);
    return await result.json();
}

async function search(mod, pageSize) {
    const url = `https://addons-ecs.forgesvc.net/api/v2/addon/search?gameId=432&sectionId=6&categoryId=0&pageSize=${pageSize}&sort=Popularity&isSortDescending=true&index=0&searchFilter=${mod}`;
    return await get(url);
}

async function getMod(id) {
    const url = `https://addons-ecs.forgesvc.net/api/v2/addon/${id}`;
    return await get(url);
}

async function getFile(modId, fileId) {
    const url = `https://addons-ecs.forgesvc.net/api/v2/addon/${modId}/file/${fileId}`;
    return await get(url);
}

async function downloadMod(mod, directory) {
    if (!mod || !directory || !directory.length) {
        return;
    }

    const file = await getFile(mod.id, mod.fileId);
    const url = file.downloadUrl;
    const fileName = file.fileName;

    for (const d of file.dependencies.filter(dep => dep.type === 3)) {
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

module.exports = { search, getMod, getFile, downloadMod };