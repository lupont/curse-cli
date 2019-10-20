const fs = require('fs');
const path = require('path');
const home = require('os').homedir();

const filePath = path.join(home, 'curse.json');

const defaults = {
    loader: 'both',
    version: '1.12.2',
    downloadPath: '.',
};

function createConfigFile() {
    fs.writeFile(filePath, JSON.stringify(defaults, null, 4), error => {
        if (error) {
            console.error('Something went wrong when creating config file.', error);
        }
        else {
            console.log(`Config file created at ${filePath}!`);
        }
    });
}

function setupConfig() {
    if (!fs.existsSync(filePath)) {
        createConfigFile();
    }
}

function updateConfig({ loader, version, downloadPath }, useDefaults = false) {
    fs.exists(filePath, exists => {
        if (!exists) {
            console.log('Config file not found, can\'t do anything.');
            return;
        }

        fs.readFile(filePath, (error, data) => {
            if (error) {
                console.error('Something went wrong when reading config file.', error);
                return;
            }
            
            const config = JSON.parse(data.toString());

            const l = loader || config['loader'];
            const v = version || config['version'];
            const d = downloadPath || config['downloadPath'];

            const obj = useDefaults ? defaults : {
                loader: l,
                version: v,
                downloadPath: d,
            };

            const text = JSON.stringify(obj, null, 2);

            fs.writeFile(filePath, text, e => {
                if (e) {
                    console.error('Something went wrong when writing to config file.', e);
                    return;
                }

                console.log('Config file updated successfully.');
            });
        });
    });
}

function getConfigObject() {
    try {
        const json = fs.readFileSync(filePath);

        const string = json.toString();

        const jsonObj = JSON.parse(string);

        return jsonObj;
    }
    catch (ex) {
        console.log('Config file could not be read.');
        return null;
    }
}

module.exports = { setupConfig, updateConfig, getConfigObject };