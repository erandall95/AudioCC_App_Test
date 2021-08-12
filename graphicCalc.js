const asciichart = require('asciichart');
const calc = require("./calc")
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

const CONSOLE_HEIGHT = 24;
const CONSOLE_WIDTH = 80;

/**
 * Prompt for an input function. X is optional
 */
rl.question("Enter a mathematical function of 'x', ie: ('x*2')  ", (func)=> {
    let graph = [];
    let x = (func.indexOf('x') != -1)
    for(let i = 0; i < CONSOLE_WIDTH; i++) {
        if(x) {
            graph[i] = calc.calc(func.replace('x', i))
        } else {
            graph[i] = func
        }
    }
    console.log(asciichart.plot(graph, {height: CONSOLE_HEIGHT}))
    rl.close();
})