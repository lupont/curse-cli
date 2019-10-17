const readline = require('readline');

function getNumberFromUser(question, min, max, callback) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question(question, answer => {
        const number = parseInt(answer);

        if (!number || (number < min || number >= max)) {
            console.log('Invalid response, sorry!');
            rl.close();
            return;
        }

        callback(number - 1);
        rl.close();
    });
}

module.exports = { getNumberFromUser };