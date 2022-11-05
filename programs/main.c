// CASE 0: skip the pre-processors and comments
#include <math.h>
#include <stdio.h>

// ToDo: 
// 1- Add multi-line comments support.
// 2- Add a memory handler service.
// 3- Improve print to accept strings as well (can do c format of printf("blabla %d", 10)).
// 4- Add a continue node to loops.
// 5- Add declaration and initialization support.

// Test Scenarios :
// 1 - Variable declarations (scope, nested blocks, multi - declarations, naming conventions, initialization, redefining variables, ...).

int variablesTests(){
    // Test 1: multiple declaration
    // int a, b, c;
    // a = 5;
    // b = 10;
    // c = 15;
    // printf(a);
    // printf(b);
    // printf(c);

    // Test 2: Should trigger an error for variable redefinition
    // int x, x;

    // Test 3: Should trigger error for invalid variable name ()
    // int 2Hex;
    // int !Hey;
    // int a, b, < c; // shouldn't work
    // int a, b, c2c; // should work
    // int a, 0b, xs; // shouldn't work
    // int a, b, x&;  // shouldn't work
    // int a, b, x==x;  // shouldn't work

    // Test 4:
    // int a;
    // a = 1 + 2;
    // a = a;
    // int b;
    // int bu;
    // int b2;
    // b = bu = a;
    // printf(b); // expect 3
    // // b2 = b = a + a = bu; // should throw invalid assignation
    // int c;
    // c = a < 0;
    // printf(c); // expect 0
    // printf(&&b > 2); // To be checked
}


// 2 - Mathemathical expressions (precedence, associativity and commutativity, and set flags for comparaison, ...).
int mathemathicalTests(){
    // Test 1: Commutativity check for +, *
    // printf(5 + 10);
    // printf(10 + 5);
    // printf(10 * 5);
    // printf(5 * 10);

    // Test 2: Associativity check for +, *, /
    // printf(10 + (5 + 1));
    // printf((10 + 5) + 1);
    // printf(10 * (5 * 1));
    // printf((10 * 5) * 1);
    // printf(10 / (5 / 1));
    // printf((10 / 5) / 1);    

    // Test 2: Negative check [failed to print else it's working properly]
    // printf(-7);

    // Test 3: Priorities with parentheses
    // int x;
    // x = +10;
    // printf(x); // 10
    // printf(--x); // 10
    // printf(-((10 - 2) / 8 - 1 * 10)); // expect 9

    // Test 4:
    // printf(-1 + -2); // -3
    // printf(-1 --2); // 1
    // printf(-1 * -2); // 2
    // // printf(4 / 8 / 16); // case a / b ( a < b ) is not working... to be checked
    // // printf(-1 % -2); // -1
    // printf(-1 + -2 + -3); // -6
    // printf(-1 + -2 --3); // 0
    // // printf(-1 + -2 * -3); // 5
    // // printf(-1 + -2 / -3); // won't work
    // printf(-1 + -2 % -3); // -3
    // printf(-1 --2 + -3); // -2
    // printf(-1 --2 --3); // 4
    // printf(-1 --2 * -3); // -7
    // // printf(-1 --2 / -3); // won't work
    // printf(-1 --2 % -3); // 1 
    // printf(-1 * -2 + -3); // - 1
    // printf(-1 * -2 --3); // 5
    // printf(-1 * -2 * -3); // -6
    // // printf(-1 * -2 / -3); // won't work
    // printf(-1 * -2 % -3); // 2

    printf( 2 * (5 / 2));
}

// 3 - Conditionals (if-else, nested if, nested if-elses, if-else with variable declarations, if-else with loops, ...).
// utils: 
int returnVal(int val){
    return val;
}
int conditionalsTests(){
    // Test 1: simple if test
    // if(10 <= 10){
    //     printf(10);
    // }

    // Test 2: deeply nested if
    // if(5 > 2){
    //     if(7 < 9){
    //         if (11 >= 10){
    //             if(10 >= 5){
    //                 if(1 || 0){
    //                     printf(1);
    //                 }
    //                 if(1 && 0){
    //                     printf(0);
    //                 }
    //             }
    //         }
    //     }

    //     if(-5 < -2){
    //         printf(11);
    //     }
    // }

    // Test 3: function call inside an if statement
    // if(returnVal(4) >= 4){
    //     printf(returnVal(4));
    // }

}


int main(){
    variablesTests();
    mathemathicalTests();
    conditionalsTests();
}

// 4 - Loops (simple and nested, nested mix of different loops, loops with variable declarations, breaks, loops with conditional breaks, ...)
// 5 - Functions (declaration, call, num_args, recursivity, redefining functions, ...).
// 6 - Dynamic memory (matrix, dynamic allocation and disallocation, address manipulation).

// Everything is inside a bloc for now, to be verified later
// case 01: declaration in the first block without initialization

// Should declare variables and not print anything
// {
//     const int p, p1, p2;
//     int x,y,z;
//     x = 10;
//     y = 10 * 2 - 3 / 4;
//     p = x;
// }

// Should throw a variable dec error
// {
//     const int p, p1, p;
// }

// Multiple declaration and mathematical operations in the same block
// {
//     int p, p1, p2, p3, p4;
//     {
//         const int x, y, z, p;
//         p = 10 + (3 - 2 * (5 - 1)/4);
//     }
//     p = 5;
//     p = p4;
// }

// Mathemathical expressions are calculated successfully.
// 10 + (3 - 2 * (5 * 2 / ( 11 + 1))/4);

// Conditionnel if else
// if(5 == 10){
//     ((10 - 2) * 4) / 5;
// }else{
//     const int p;
//     p = 10;
// }

// Conditional if;
// {
//     if(5 <= 10){
//         ((10 - 2) * 4) / 5;
//     }
//     const int p;
//     p = 5;

//     if(5 > 10){
//     }
// }

// Deeply nested conditional if;
// {
//     if(5 <= 10){
//         int n;
//         if(2 == 3){
//             int n;
//             if(1 == 2){
//                 int n;
//             }
//         }
//     }

//     if(1 > 1){
//         int x;
//     }

//     if(1 > 1){
//         if(1 < 1){
//             int x;
//             x = 777;
//         }
//     } else {
//         int z;
//         z = 2;
//     }
// }

// {
//     int p;
//     p = 10.9687; // Testing different types tolerance
// }

// {
//     while(4 > 1){
//         int x;
//         while( 3 == 2 ) x = 5;
//         x = 10;
//     }

//     while(10 == 10){
//         int x;
//         x = 5;
//     }
// }

// do {
//     int x;
//     x = 5;
// } while( 10 == 10);

// do {
//     int x;
//     x = 5;
//     while(22 < 10){
//         int x;
//         x = 5;
//     }
// } while( 10 == 10);

// {
//     int i;
//     for(i = 99, i < 10, i = i + 1){
//         int x;
//         x = 5;
//     }
// }

// int main() {
//     int x;
//     x = 10;
//     return 5;
// }

// int x() {
//     int y,z,v;
//     v = 10;
//     if(1 > 1){
//         int x;
//         x = 2;
//     }

//     main(4, 1 + 9, 5);
// }

// int main(int a, int b) {
//     a = 10;
// }

// int x(){
//     int x, y, z;
//     main(10, 11);
//     return 2;
// }

// int x(int a, int b){
//     int z;
//     z = 10;
//     return 4;
// }

// int v(double z){
//     int k;
// }

// int main(){
//     int Mitra, Bashen;
//     int a_a;
//     Mitra = 2;
//     Bashen = Mitra;
//     int amour;
//     amour = Bashen + Mitra + x(2, 3);
//     return amour;
// }

// handle drop after I();
// Elyas: Après une affectations un dup

// int main(){
//     int *p;
//     int *v;
//     *p = 5;
//     &p = 2;
//     *p = &p;
// }

// int x(){
//     int v;
//     v = 1;
//     while(v < 1000){
//         v = v * 10;
//     } // exit with 1000
//     v = v + 99;
//     return v;
// }

// int main(){
//     int z;
//     z = x();
// }

// int main(){
//     int v, z, x;
//     // ---
//     // v = 10;
//     // z = &v;
//     // *z = 55; // this should modify the value of v [should work on this].
//     // ---

//     // v = 78;
//     // z = 65533;
//     // x = *z; // should put the value of v in x [working].

//     // v = 78;
//     // z = &v;
//     // *z = 100; // should put 100 on v
//     // x = *z; // should put 100 on x [worknig]
// }

// problem of DECL in functions params
// int ok(int value){
//     return value / 10;
// }

// int fib(int val){
//     if(val < 2) return val;
//     return fib(val - 1) + fib(val - 2);
// }

// int main(){
//     printf(fib(10));
// }

// int main(){
//     int x, y, counter;
//     x = 0;
//     y = 0;
//     while(x < 10){
//         while(y < 10){
//             printf(counter);
//             counter = counter + 1;
//             y = y + 1;
//         }
//         y = 0;
//         x = x + 1;
//     }
// }

// int main(){
//     int T;
//     int index;
//     index = 3;
//     T = malloc(5);
//     T[3] = 2;
//     T[2] = malloc(4);
//     T[2][1] = 11;

//     printf(T[index]);
//     printf(T[2][1]);
// }

// int fib(int val){
//     if(val < 2) return val;
//     return fib(val - 1) + fib(val - 2);
// }

// int main(){
//    printf(fib(10));
// }

// int printer(int a, int b)
// {
//     printf(a + b);
// }

// int main(){
//     printer(10, 555, 4);
// }