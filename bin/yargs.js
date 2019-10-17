const yargs = require('yargs');

const options = yargs
    .usage('Usage: $0 <command>')
    .option('d', {
        alias: 'directory',
        describe: 'The directory you want the downloads to go in.',
        type: 'string',
        demandOption: false,
        default: '.',
    })
    .option('g', {
        alias: 'game-version',
        describe: 'The minecraft version, e.g. 1.12.2. [1.12.2/1.14.4/etc]',
        type: 'string',
        demandOption: false,
        default: '1.12.2',
    })
    .option('m', { 
        alias: 'mod', 
        describe: 'The mod you want to search for.', 
        type: 'string', 
        demandOption: true,
    })
    .option('l', {
        alias: 'loader',
        describe: 'The mod loader to search mods for. [fabric/forge/both]',
        type: 'string',
        demandOption: false,
        default: 'both',
    })
    .option('a', {
        alias: 'amount',
        describe: 'The amount of results to give.',
        type: 'number',
        demandOption: false,
        default: 9,
    })
    .argv;

module.exports = { options };