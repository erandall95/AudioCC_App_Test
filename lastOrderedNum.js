const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

/**
 * lonfinds the last numerically increasing value below the given value.
 * I.E.: an input of 33245 returns 29999
 * @param {string} number any number between 1 and 10^18
 * @param {int} index always 0 for unser input
 * @param {int} lastBaseDecimal always 0 for user input
 * @param {int} attemptValue always 0 for user input
 * @returns {int} the next lowest numerically increasing value. Incase Peter forgets what he just wrote...
 */
function lon(number, index, lastBaseDecimal, attemptValue) {
    let len = number.length;

    if (index === len) {

        if (attemptValue <= number) {
            return attemptValue;
        } 
        return 0;

    } else {

        let baseDecimal = 9;
        while (baseDecimal >= lastBaseDecimal) {
            let newTry = attemptValue * 10 + baseDecimal;
            let res = lon(number, index + 1, baseDecimal, newTry);
            if (res > 0) {
                return res;
            }
            baseDecimal--;
        }  

    }
}

/**
 * Prompts use for input and logs result of lon function to the console.
 * Will stack overflow if use inptus A LOT of numbers...
 */
function prompt() {
    rl.question("Input a number between 1 and 10^18: ", (number)=>{
        console.log(lon(number, 0, 0 ,0));
        //sticking to recursion until stack overflow
        prompt();
        //we never get here, but ¯\_(ツ)_/¯
        rl.close();
    })
}

//Reminder of how to quit and then run it
console.log("CTRL + C to quit")
prompt();