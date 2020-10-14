// With ES6
let obj = {
    f1() {
        console.log("F1");
    }
}

//obj.f1();


// Without ES6
let obj2 = {
    f1: function () {
        console.log("F1 BIS");
    }
}

//obj2.f1();


// Object Matching
function listCreator() {
    return {
        one: "Name",
        two() {
            console.log("two");
        },
        three(value) {
            return () => {
                console.log(`Another Function : ${value}`);
            }
        }
    }
}

let { one, two, three } = listCreator();
two();
three("Vincent")();

// Destructuring Assignment
function test({ name, pres }) {
    return () => {
        console.log(`${pres()} ${name}`);
    }
}

test({
    name: "Vincent", pres() {
        return "Hello";
    }
})();
