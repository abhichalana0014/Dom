// Q Write a function printNumbers(from, to) that outputs a number every second, starting from from and ending with to.

const { reject } = require("any-promise");
const resolve = require("resolve");

// Make two variants of the solution.

// Using setInterval.
// Using nested setTimeout.

// Ans1.1 =>
// const printNumbers=(from,to)=>{
//     let start = from;
//     let end = ++to
//     const interval = setInterval(function(){
//         console.log(start);
//         start++

//         if(start == end){
//             return clearInterval(interval)
//         }
//     }, 1000);

// }
// printNumbers(1,10);

// Ans1.2=>

// with nested timeout;

// const printNumbers2 = (from, to)=>{
//     let end = ++to;

//     let timeout = setTimeout(function print(){
//         console.log(from);
//         from++ ;
//         timeout = setTimeout(print, 1000)
//         if(from == end){
//             return clearTimeout(timeout);
//         }
//     },1000)
// }
// printNumbers2(1,10);

// Q Let's do some practice with a simple exercice. You must modify the code below based on the following rules:

// The function job must return a promise object (you are in a NodeJS environment, you can use new Promise)
// The promise must resolve itself 2 seconds after the call to job and must provide hello world in the data

const job = () => {
  let promise = new Promise((res) => {
    setTimeout(() => {
      res("hello world");
    }, 2000);
  });
  return promise.then((value) => {
    console.log(value);
  });
};
job();

// Q Let's do a harder exercise. In this code, your function receives a parameter data. You must modify the code below based on the following rules:

// Your function must always return a promise
// If data is not a number, return a promise rejected instantly and give the data "error" (in a string)
// If data is an odd number, return a promise resolved 1 second later and give the data "odd" (in a string)
// If data is an even number, return a promise rejected 2 seconds later and give the data "even" (in a string)

const checkEvenOddNan = (num) => {
  let newPromise = new Promise((resolve, reject) => {
    if (isNaN(num) || typeof num === "string") {
      setTimeout(() => {
        reject("not a number");
      }, 1000);
    }
    if (num % 2 === 0) {
      setTimeout(() => {
        resolve("even");
      }, 1000);
    }
    if (num % 2 !== 0) {
      setTimeout(() => {
        resolve("odd");
      }, 1000);
    }
  });

  return newPromise
    .then((res) => {
      console.log(res);
    })
    .catch((rej) => {
      console.log(rej);
    });
};
checkEvenOddNan(5);
checkEvenOddNan(6);
checkEvenOddNan("12");
