const calc = require("./calc")
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

/**
 * Prompts use for input and logs result of lon function to the console.
 * Will stack overflow if use inptus A LOT of numbers...
 */
 function prompt() {
    rl.question("Input the desired calculation: ", (func)=>{
        console.log(calc.calc(func));
        //sticking to recursion until stack overflow
        prompt();
        //we never get here, but ¯\_(ツ)_/¯
        rl.close();
    })
}

//Reminder of how to quit and then run it
console.log("CTRL + C to quit")
prompt();