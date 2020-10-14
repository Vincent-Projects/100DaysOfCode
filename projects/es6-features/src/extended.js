// Rest Operator
function sum(x, y, ...z) {
    return x + y + z.length;
}

//console.log(sum(2, 3, 4, 5, 6));

// Spread operator
let a = [1, 2, 3, 4];
let b = [0, ...a, 5, 6];

//console.log(b);