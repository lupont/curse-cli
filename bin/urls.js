function getSearchUrl(mod, pageSize, sort, isDescending) {
    return `https://addons-ecs.forgesvc.net/api/v2/addon/search?gameId=432&sectionId=6&categoryId=0&pageSize=${pageSize}&sort=${sort}&isSortDescending=${isDescending}&index=0&searchFilter=${mod}`;
}

function getSingleModUrl(mod) {
    return `https://addons-ecs.forgesvc.net/api/v2/addon/${mod}`;
}

function getSingleModFileUrl(modId, fileId) {
    return `https://addons-ecs.forgesvc.net/api/v2/addon/${modId}/file/${fileId}`;
}

module.exports = {
    getSearchUrl,
    getSingleModUrl,
    getSingleModFileUrl,
};