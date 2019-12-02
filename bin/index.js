#!/usr/bin/env node

const fs = require('fs');

const { downloadMod } = require('./http');
const { getModsFromQuery } = require('./logic');
const { getNumberFromUser } = require('./util');
const { app_name, app_version } = require('./constants');
const { setupConfig, updateConfig, getConfigObject } = require('./config');

function logMods(mods) {
    console.log('The following mods were recognized. Curse free search can be a bit crummy at times, so if your expected result is not here; please try with another query.');

    mods.forEach((mod, index) => {
        console.log(`${mods.length >= 10 && index <= 9 ? ' ' : ''}${index + 1} ${mod.name} by ${mod.authors} for ${mod.gameVersion + (mod.isFabric ? ' [FABRIC]' : '')}`);
        console.log(`\t${mod.summary}`);
        console.log(`\t${mod.websiteUrl}`);
    });
}

function handleSetPath() {
    if (process.argv.length !== 4) {
        console.log('set-path requires exactly one parameter, namely the path.');
        return;
    }

    updateConfig({ downloadPath: process.argv[3] });
}

function handleSetVersion() {
    if (process.argv.length !== 4) {
        console.log('set-version requires exactly one parameter, namely the Minecraft version.');
        return;
    }

    updateConfig({ version: process.argv[3] });
}

function handleSetLoader() {
    if (process.argv.length !== 4) {
        console.log('set-version requires exactly one parameter, namely the mod loader to use [fabric/forge/both].');
        return;
    }

    const loader = process.argv[3];

    if (!['fabric', 'forge', 'both'].includes(loader)) {
        console.log('set-version requires one of either \'fabric\', \'forge\', or \'both\' as parameter.');
        return;
    }

    updateConfig({ loader });
}

function handleResetPreferences() {
    updateConfig({}, true);
}

function handleGetPreferences() {
    const config = getConfigObject();
    console.log('\tloader: ' + config.loader);
    console.log('\tversion: ' + config.version);
    console.log('\tdownloadPath: ' + config.downloadPath);
}

function handleInstall() {
    if (process.argv.length < 4) {
        console.log('No argument supplied for install, can\'t do anything.');
        return;
    }

    const pageSize = process.argv[4] && parseInt(process.argv[4]);
    getModsFromQuery(process.argv[3], pageSize)
        .then(mods => {
            if (mods && mods.length) {
                logMods(mods);

                getNumberFromUser(1, mods.length + 1, index => {
                    downloadMod(mods[index], getConfigObject().downloadPath);
                });
            }
            else {
                console.log('No mods matching your query was found.');
            }
        });
}

function handleSearch() {
    if (process.argv.length < 4) {
        console.log('No argument supplied for search, can\'t do anything.');
        return;
    }

    const pageSize = process.argv[4] && parseInt(process.argv[4]);

    getModsFromQuery(process.argv[3], pageSize)
        .then(mods => {
            if (mods && mods.length) {
                logMods(mods);
            }
            else {
                console.log('No mods matching your query was found.');
            }
        });
}

function handleList() {
    const args = process.argv;
    const argIndex = args.indexOf('-d');
    const dir = argIndex !== -1 && argIndex < args.length - 1 
        ? args[argIndex + 1] 
        : getConfigObject().downloadPath;

    fs.readdir(dir, (error, files) => {
        if (error) {
            console.log('Could not list files.');
            return;
        }

        files.forEach(file => {
            // const fullPath = require('path').resolve(file);
            // if (fs.statSync(fullPath).isFile() && file.endsWith('.jar')) {
            //     console.log(file);
            // }
            // if (file.endsWith('.jar')) {
            //     console.log(file);
            // }

            const fullPath = require('path').resolve(file);
            fs.stat(fullPath, (e, stats) => {
                if (e) {
                    console.log('Something went wrong.', e);
                    return;
                }

                console.log(stats.isDirectory());
            });
        });
    });
}

function handleInfo() {
    console.log(`${app_name} ${app_version}`);
}

function handleDefault() {
    console.log('Usage:');
    console.log('\tset-path          [path]\tUpdates the path the installed mods go to. [default: .]');
    console.log('\tset-version       [version]\tUpdates the Minecraft version that is used to search mods. [1.12.2/1.14.4/etc] [default: 1.12.2]');
    console.log('\tset-loader        [loader]\tUpdates the mod loader to search mods for. [fabric/forge/both] [default: both]');
    console.log('\treset-preferences    \t\tSets the preferences to the default.');
    console.log('\tget-preferences      \t\tRetrieves the path, version, and loader.');
    console.log('\tinstall           [query]\tSearches the API for mods best matching the query, and allows user to choose which to install. By default, dependencies will also be installed.');
    console.log('\tsearch            [query]\tPerforms a search through the API for the mods best matching the query. Will not install any mods.');
    console.log('\tinfo                 \t\tGives a brief summary of the application.');
}

function main() {
    setupConfig();

    switch (process.argv[2]) {
        case 'set-path':
        case 'p': 
            handleSetPath(); 
            break;

        case 'set-version':
        case 'v': 
            handleSetVersion(); 
            break;

        case 'set-loader':
        case 'l': 
            handleSetLoader(); 
            break;

        case 'reset-preferences': 
            handleResetPreferences(); 
            break;
        
        case 'get-preferences': 
            handleGetPreferences(); 
            break;

        case 'install':
        case 'i': 
            handleInstall(); 
            break;

        case 'search':
        case 's': 
            handleSearch(); 
            break;

        case 'list':
        case 'ls': 
            handleList(); 
            break;

        case 'info': 
            handleInfo(); 
            break;
        
        default: 
            handleDefault(); 
            return;
    }
}

main();