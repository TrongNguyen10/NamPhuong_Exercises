// 1. Variables (Biến)
// Biến được sử dụng để lưu trữ dữ liệu.

let name = "John"; // Sử dụng let
const age = 30; // Sử dụng const
var city = "New York"; // Sử dụng var

// 2. Data Types (Kiểu dữ liệu) có nhiều kiểu dữ liệu khác nhau như số, chuỗi, boolean, đối tượng, mảng, v.v.

let number = 42; // Number
let text = "Hello, world!"; // String
let isTrue = true; // Boolean
let person = { name: "Alice", age: 25 }; // Object
let colors = ["red", "green", "blue"]; // Array

// 3. Type Conversions (Chuyển đổi kiểu dữ liệu)
// Chuyển đổi giữa các kiểu dữ liệu khác nhau.

let num = "123";
let convertedNum = Number(num); // Chuyển từ chuỗi sang số
let str = String(456); // Chuyển từ số sang chuỗi

// 4. Basic Operators, Math (Toán tử cơ bản, Toán học)
// Các toán tử cơ bản như cộng, trừ, nhân, chia.

let a = 10;
let b = 5;
let sum = a + b; // Cộng
let difference = a - b; // Trừ
let product = a * b; // Nhân
let quotient = a / b; // Chia

// 5. Comparisons (So sánh)
// So sánh các giá trị.

let x = 10;
let y = 20;
console.log(x > y); // false
console.log(x < y); // true
console.log(x == 10); // true
console.log(x === "10"); // false (so sánh cả kiểu dữ liệu)

// 6. Conditional Branching (Rẽ nhánh điều kiện)
// Sử dụng câu lệnh if…else để thực hiện các hành động khác nhau dựa trên điều kiện.

let score = 85;
if (score >= 90) {
    console.log("A");
} else if (score >= 80) {
    console.log("B");
} else {
    console.log("C");
}

// 7. Logical Operators (Toán tử logic)
// Các toán tử logic như AND, OR, NOT.

let isAdult = true;
let hasID = false;
console.log(isAdult && hasID); // false (AND)
console.log(isAdult || hasID); // true (OR)
console.log(!isAdult); // false (NOT)

// 8. Nullish Coalescing Operator (Toán tử hợp nhất null)
// Toán tử này trả về toán hạng bên phải nếu toán hạng bên trái là null hoặc undefined.

let user;
let defaultUser = "Guest";
let currentUser = user ?? defaultUser; // "Guest"

// 9. Loops (Vòng lặp)
// Các vòng lặp như for, while, do…while.

for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}

let j = 0;
while (j < 5) {
    console.log(j); // 0, 1, 2, 3, 4
    j++;
}

// 10. Switch
// Câu lệnh switch để thực hiện các hành động khác nhau dựa trên giá trị của một biến.

let day = 3;
switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    default:
        console.log("Another day");
}

// 11. Function (Hàm)
// Hàm là một khối mã có thể tái sử dụng.

function greet(name) {
    return `Hello, ${name}!`;
}
console.log(greet("Alice")); // "Hello, Alice!"

// 12. Promise
// Promise được sử dụng để xử lý các hoạt động bất đồng bộ.

let promise = new Promise((resolve, reject) => {
    let success = true;
    if (success) {
        resolve("Operation was successful!");
    } else {
        reject("Operation failed.");
    }
});

promise.then((message) => {
    console.log(message); // "Operation was successful!"
}).catch((error) => {
    console.log(error);
});

// 13. Error Handling (Xử lý lỗi)
// Sử dụng try…catch để xử lý lỗi.

try {
    let result = riskyOperation();
    console.log(result);
} catch (error) {
    console.log("An error occurred:", error.message);
}