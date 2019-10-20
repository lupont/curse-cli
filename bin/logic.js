const { search } = require('./http');
const { getConfigObject } = require('./config');
const { convertToLocalMod } = require('./util');

async function getModsFromQuery(query, pageSize) {
    const json = await search(query, pageSize || 9);
    const mods = [];
    const configObject = getConfigObject();

    for (const obj of json) {
        const mod = convertToLocalMod(obj);
        if (!mod || (configObject.loader === 'fabric' && !mod.isFabric) || (configObject.loader === 'forge' && mod.isFabric)) {
            continue;
        }
        mods.push(mod);
    }

    return mods;
}

module.exports = { getModsFromQuery };