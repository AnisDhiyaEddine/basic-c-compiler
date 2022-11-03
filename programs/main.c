// CASE 0: skip the pre-processors
#include <math.h>
#include <stdio.h>



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


int printer(int a, int b){
    printf(a + b);
}

int main(){
    printer(10, 555, 4);
}