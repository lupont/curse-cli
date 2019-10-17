const fetch = require('node-fetch');

async function get(url) {
    const result = await fetch(url);
    return await result.json();
}

async function search(mod, pageSize = 9) {
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

module.exports = { search, getMod, getFile };