// CASE 0: skip the pre-processors
#include <math.h>
#include <stdio.h>



// Everything is inside a bloc for now, to be verified later
// case 01: working properly [declaration in the first block without initialization]

// Should declare variables and not print anything
// {
//     const int p, p1, p2;
//     int x,y,z;
//     x = 10;
// }

// Should throw a variable dec error
// {
//     const int p, p1, p;
// }


// case 02: working properly [multiple declaration and mathematical operations in the same block]
// {
//     int p, p1, p2, p3, p4;
//     {
//         const int x, y, z, p;
//         p = 10 + (3 - 2 * (5 - 1)/4);
//     }
//     p = 5;
//     p = p4;
// }


// case 03: Mathemathical expressions are calculated successfully.
// 10 + (3 - 2 * (5 * 2 / ( 11 + 1))/4);

// case 04: conditionnel if else

// if(5 == 10){
//     ((10 - 2) * 4) / 5;
// }else{
//     const int p;
//     p = 10;
// }


// case 05: conditional if; 
// {
//     if(5 <= 10){
//         ((10 - 2) * 4) / 5;
//     }
//     const int p;
//     p = 5;

//     if(5 > 10){
//     }
// }

// case 06: deeply nested conditional if; 
{
    if(5 <= 10){
        int n;
        if(2 == 3){
            int n;
            if(1 == 2){
                int n;
            }
        }
    }

    if(1 > 1){
        int x;
    }

    if(1 > 1){
        if(1 < 1){
            int x;
            x = 777;
        }
    } else {
        int z;
        z = 2;
    }
}


// {
//     int p;
//     p = 10.9687; // Testing different types tolerance
// }

