const { search } = require('./get');

function convertToLocalMod(json, version) {
    const { name, id, summary } = json;
    const authors = json.authors.map(a => a.name).join(', ');
    const isFabric = json.categories.some(c => c.name === 'Fabric');
    const file = json.gameVersionLatestFiles.find(f => f.gameVersion === version);

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
        authors,
        fileId,
        fileName,
        gameVersion,
        isFabric,
    };
}


 async function getModsFromQuery(query, version, loader, pageSize = 9) {
    const json = await search(query, pageSize);
    const mods = [];

    for (const obj of json) {
        const mod = convertToLocalMod(obj, version);
        if (!mod || (loader === 'fabric' && !mod.isFabric) || (loader === 'forge' && mod.isFabric)) {
            continue;
        }
        mods.push(mod);
    }

    return mods;
}

module.exports = { convertToLocalMod, getModsFromQuery };