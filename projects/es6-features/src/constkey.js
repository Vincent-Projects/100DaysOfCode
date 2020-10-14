// With ES6
const value1 = 3;

// Without ES6
Object.defineProperty(typeof global === "object" ? global : window, "PI", {
    value: 3.141593,
    enumerable: true,
    writable: false,
    configurable: false
});

module.exports = {
    value1,
    value2: PI
};