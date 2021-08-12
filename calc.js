
/**
 * Finds the start and end of the most deeply nested parentheses
 * @param {array} compArray 
 * @returns {object} object with start and end integers, endP is -1 if no parentheses are found
 */
function findParentheses(compArray) {
    // let compArrayLen = compArray.length;
    let endP = compArray.indexOf(")");
    let startP = endP;
    //find the corresponding parenthese that opened
    if(endP) {
        for(; startP >= 0; startP--) {
            if(compArray[startP] == "(") {
                // console.log(`Parenthese group found at ${startP} and ${endP}`)
                break;
            }
        }
        let slice = compArray.slice(startP + 1, endP);
        compArray.splice(startP+1, endP);
        let calc = calculate(slice);
        //insert into compArray
        compArray[startP] = calc;
        //getting a bug leaving empty array indicies where the parenthese are... No time to deep dive
        const index = compArray.indexOf("");
        if (index > -1) {
            compArray.splice(index, 1);
        }

    }
    return compArray;
}

/**
 * Parses an input string and turns it into a numeric and operator array
 * @param {string} s a mathematical string
 * @returns {array} an array of chars of the initial input string
 */
function parseCalculationString(s) {
    // --- Parse a calculation string into an array of numbers and operators
    var calculation = [],
        current = '';
    const search = "(^*/+-)";
    for (var i = 0, ch; ch = s.charAt(i); i++) {
        if(search.indexOf(ch) > -1) {
            if (current == '' && ch == '-') {
                current = '-';
            } else {
                calculation.push(current, ch);
                current = '';
            }
        } else {
            current += s.charAt(i);
        }
    }

    if (current != '') {
        calculation.push(parseFloat(current));
    }

    return calculate(calculation);
}

/**
 * 
 * @param {array} calc a character array of the calculation to be performed
 * @returns {float} result of the mathematical operation
 */
function calculate(calc) {
    // console.log(`Calculating: ${calc}`)
    // --- Perform a calculation expressed as an array of operators and numbers
    var ops = [{'^': (a, b) => Math.pow(a, b)},
               {'*': (a, b) => a * b, '/': (a, b) => a / b},
               {'+': (a, b) => a + b, '-': (a, b) => a - b}],
        newCalc = [],
        currentOp;
    //check for parentheses and replace that calculation into the compute array
    if(calc.indexOf(')') !== -1) {
        calc = findParentheses(calc);
    }

    for (var i = 0; i < ops.length; i++) {
        for (var j = 0; j < calc.length; j++) {

            if (ops[i][calc[j]]) {
                currentOp = ops[i][calc[j]];
            } else if (currentOp) {
                //slice return strings of values, we dont want to add strings
                newCalc[newCalc.length - 1] = currentOp(parseFloat(newCalc[newCalc.length - 1]), parseFloat(calc[j]));
                currentOp = null;
            } else {
                newCalc.push(calc[j]);
            }
        }
        calc = newCalc;
        newCalc = [];
    }

    if (calc.length > 1) {
        console.log(`Error: unable to resolve calculation`);
        return calc;
    } else {
        return calc[0];
    }
}

module.exports = {
    calc: parseCalculationString
}