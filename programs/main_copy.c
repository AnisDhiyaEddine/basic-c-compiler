// CASE 0: skip the pre-processors and comments
#include <math.h>
#include <stdio.h>

// ToDo: 
// 1- Add multi-line comments support.
// 2- Add a memory handler service.
// 3- Improve print to accept strings as well (can do c format of printf("blabla %d", 10)).
// 4- Add a continue node to loops.
// 5- Add declaration and initialization support.
// 6- Implement the not operator.

// Test Scenarios :
// 1 - Variable declarations (scope, nested blocks, multi - declarations, naming conventions, initialization, redefining variables, ...).

int variablesTests(){
    // Test 1: multiple declaration
    {
        int a, b, c;
        a = 5;
        b = 10;
        c = 15;
        assert(a == 5, 21);
        assert(b == 10, 22);
        assert(c == 15, 23);
    }

    // Test 2: Should trigger an error for variable redefinition
    {
        // int x, x;
    }

    // Test 3: Should trigger error for invalid variable name ()
    {
        // int 2Hex;
        // int !Hey;
        // int a, b, < c; // shouldn't work
        // int a, b, c2c; // should work
        // int a, 0b, xs; // shouldn't work
        // int a, b, x&;  // shouldn't work
        // int a, b, x==x;  // shouldn't work
    }


    // Test 4:
    {
        int a;
        a = 1 + 2;
        a = a;
        int b;
        int bu;
        int b2;
        b = bu = a;
        assert(b == 3, 53);
        // b2 = b = a + a = bu; // should throw invalid assignation
        int c;
        c = a < 0;
        assert(c == 0, 57);
        // printf(&&b > 2); // To be checked
    }
}


// 2 - Mathemathical expressions (precedence, associativity and commutativity, and set flags for comparaison, ...).
int mathemathicalTests(){
    // Test 1: Commutativity check for +, *
    assert(5 + 10 == 15, 66);
    assert(10 + 5 == 15, 67);
    assert(10 * 5 == 50, 68);
    assert(5 * 10 == 50, 69);

    // Test 2: Associativity check for +, *, /
    assert(10 + (5 + 1) == 16, 72);
    assert((10 + 5) + 1 == 16, 73);
    assert(10 * (5 * 1) == 50, 74);
    assert((10 * 5) * 1 == 50, 75);
    assert(10 / (5 / 1) == 2, 76);
    assert((10 / 5) / 1 == 2, 77);    

    // Test 2: Negative check
    assert(-7 < 0, 80);

    // Test 3: Priorities with parentheses
    int x;
    x = +10;
    assert(x == 10, 85);
    assert(--x == 10, 86);
    assert(-((10 - 2) / 8 - 1 * 10) == 9, 87);

    // Test 4:
    assert(-1 + -2 == -3, 90);
    assert(-1 --2 == 1, 91);
    assert(-1 * -2 == 2, 92);
    // assert(4 / 8 / 16); // case a / b ( a < b ) is not working... to be checked
    assert(-1 % -2 == -1, 94);
    assert(-1 + -2 + -3 == -6, 95);
    assert(-1 + -2 --3 == 0, 96);
    assert(-1 + -2 * -3 == 5, 97);
    // assert(-1 + -2 / -3); // won't work
    assert(-1 + -2 % -3 == -3, 99);
    assert(-1 --2 + -3 == -2, 100);
    assert(-1 --2 --3 == 4, 101);
    assert(-1 --2 * -3 == -7, 102);
    // assert(-1 --2 / -3); // won't work
    assert(-1 --2 % -3 == 1, 104);
    assert(-1 * -2 + -3 == -1, 105);
    assert(-1 * -2 --3 == 5, 106);
    assert(-1 * -2 * -3 == -6, 107);
    // assert(-1 * -2 / -3); // won't work
    assert(-1 * -2 % -3 == 2, 109);
    // assert( 2 * (5 / 2)); // won' t work
}

// 3 - Conditionals (if-else, nested if, nested if-elses, if-else with variable declarations, if-else with loops, ...).
// utils: 
int returnVal(int val){
    return val;
}
int conditionalsTests(){
    // Test 1: simple if test
    if(10 <= 10){
        assert(10 <= 10, 113);
    }

    // Test 2: deeply nested if
    if(5 > 2){
        if(7 < 9){
            if (11 >= 10){
                if(10 >= 5){
                    if(1 || 0){
                        assert(1 || 0, 122);
                    }
                    if(1 && 0){
                        assert(1 && 0, 125);
                    }
                }
            }
        }

        if(-5 < -2){
            assert(-5 < -2, 132);
        }
    }

    // Test 3: function call inside an if statement
    if(returnVal(4) >= 4){
        assert(returnVal(4) >= 4, 138);
    }

    // Test 4: if-else
    if(10 > 10){
        assert(10 > 10, 143);
    } else {
        assert(1, 145);
    }

    // // Test 5: if-else with variable declaration
    if(10 > 10){
        int a;
        a = 10;
        assert(a == 10, 160);
    } else {
        int a;
        a = 11;
        assert(a == 11, 166);        
    }

    // Test 7: if-else with variable declaration and initialization and redefinition
    if(10 > 10){
        int a;
        a = 10;
        assert(a == 10, 172);
    } else {
        int a;
        a = 11;
        assert(a == 11, 176);
        a = 12;
        assert(a == 12, 179);
    }

    // Test 8: if-else with lower then operator
    if(10 < 10){
        assert(10 < 10, 184);
    } else {
        assert(10 >= 10, 186);
    }

    // Test 9: if-else with lower then or equal operator
    if(10 <= 10){
        assert(10 <= 10, 191);
    } else {
        assert(10 > 10, 193);
    }

    // Test 10: if-else with greater then operator
    if(10 > 10){
        assert(10 > 10, 198);
    } else {
        assert(10 <= 10, 200);
    }

    // Test 11: if-else with greater then or equal operator
    if(10 >= 10){
        assert(10 >= 10, 205);
    } else {
        assert(10 < 10, 207);
    }

    // Test 12: if-else with equal operator
    if(10 == 10){
        assert(10 == 10, 212);
    } else {
        assert(10 != 10, 214);
    }

    // Test 13: if-else with not equal operator
    if(10 != 10){
        assert(10 != 10, 219);
    } else {
        assert(10 == 10, 221);
    }

    // Test 14: if-else with and operator
    if(10 && 10){
        assert(10 && 10, 226);
    } else {
        assert(!(10 && 10), 228);
    }

    // Test 15: if-else with or operator
    if(10 || 10){
        assert(10 || 10, 233);
    } else {
        assert(!(10 || 10), 235);
    }

    // Test 16: if-else with not operator
    if(!10){
        assert(!10, 241);
    } else {
        assert(1, 242);
    }


    // Test 17: 5 levels of nested if-else
    if(10 > 10){
        if(10 > 10){
            if(10 > 10){
                if(10 > 10){
                    if(10 > 10){
                        assert(10 > 10, 252);
                    } else {
                        assert(10 <= 10, 254);
                    }
                } else {
                    assert(10 <= 10, 257);
                }
            } else {
                assert(10 <= 10, 260);
            }
        } else {
            assert(10 <= 10, 263);
        }
    } else {
        assert(10 <= 10, 266);
    }


    // Test 18: 5 levels of mixed nested if-else
    if(10 > 10){
        if(10 > 10){
            if(10 > 10){
                if(10 > 10){
                    if(10 > 10){
                        assert(10 > 10, 276);
                    } else {
                        assert(10 <= 10, 278);
                    }
                } else {
                    assert(10 <= 10, 281);
                }
            } else {
                assert(10 <= 10, 284);
            }
        } else {
            assert(10 <= 10, 287);
        }
    } else {
        assert(10 <= 10, 290);
    }
}

// 4 - Loops (simple and nested, nested mix of different loops, loops with variable declarations, breaks, loops with conditional breaks, ...)
int loopsTests(){
    // Test 1: simple while loop
    {
        int i;
        i = 0;
        while(i < 10){
            i = i + 1;
        }
        assert(i == 10, 301);
    }

    // Test 2: simple for loop
    {
        int i;
        for(i = 0; i < 10; i = i + 1){
            i = i + 1;
        }
        assert(i == 10, 310);
    }

    // Test 3: simple do-while loop
    {
        int k;
        k = 0;
        do {
            k = k + 1;
        } while(k < 10);
        assert(k == 10, 313);
    }

    // Test 4: nested while loop
    {
        int i;
        i = 0;
        while(i < 10){
            int j;
            j = 0;
            while(j < 10){
                j = j + 1;
            }
            i = i + 1;
        }
        assert(i == 10, 324);
    }

    // Test 5: nested for loop
    {
        int n, o;
        o = n = 0;
        for(n = 0; n < 10; n = n + 1){
            for(o = 0; o < 10; o = o + 1){}
        }
        assert(n == 10, 334);
        assert(o == 10, 335);
    }

    // Test 6: nested do-while loop
    {    
        int p,q;
        p = q = 0;
        do{
            do{
                q = q + 1;
            } while(q < 10);
            p = p + 1;
        } while(p < 10);
        assert(p == 10, 344);
        assert(q == 19, 345);
    }

    // Test 7: nested while loop with break
    {
        int i;
        i = 0;
        while(i < 10){
            int j;
            j = 0;
            while(j < 10){
                j = j + 1;
                if(j == 5){
                    break;
                }
            }
            assert(j == 5, 380);
            i = i + 1;
        }
        assert(i == 10, 356);
    }

    //Test 8: nested for loop with break
    {
        int n, o;
        o = n = 0;
        for(n = 0; n < 10; n = n + 1){
            for(o = 0; o < 10; o = o + 1){
                if(o == 5){
                    break;
                }
            }
        }
        assert(n == 10, 365);
        assert(o == 5, 366);
    }

    // Test 9: nested do-while loop with break
    {    
        int p,q;
        p = q = 0;
        do{
            do{
                q = q + 1;
                if(q == 5){
                    break;
                }
            } while(q < 10);
            p = p + 1;
        } while(p < 10);
        assert(p == 10, 375);
        assert(q == 18, 375);
        
        }

    // Test 10: nested while loop with conditional break
    {
        int i;
        i = 0;
        while(i < 10){
            int j;
            j = 0;
            while(j < 10){
                j = j + 1;
                if(j == 5){
                    break;
                }
            }
            i = i + 1;
            if(i == 5){
                break;
            }
        }
        assert(i == 5, 391);
    }

    // Test 11: nested for loop with conditional break
    {
        int n, o;
        o = n = 0;
        for(n = 0; n < 10; n = n + 1){
            for(o = 0; o < 10; o = o + 1){
                if(o == 5){
                    break;
                }
            }
            if(n == 5){
                break;
            }
        }
        assert(n == 5, 398);
        assert(o == 5, 399);
    }

    // Test 12: nested do-while loop with conditional break
    {    
        int p,q;
        p = q = 0;
        do{
            do{
                q = q + 1;
                if(q == 5){
                    break;
                }
            } while(q < 10);
            p = p + 1;
            if(p == 5){
                break;
            }
        } while(p < 10);
        assert(p == 5, 410);
        assert(q == 13, 411);
    }

    // continue is not implemented yet

    // Test 13: deeply nested while loop
    {
        int i, sum;
        i = sum = 0;
        while(i < 10){
            int j;
            j = 0;
            while(j < 10){
                int k;
                k = 0;
                while(k < 10){
                    int l;
                    l = 0;
                    while(l < 10){
                        sum = sum + 1;
                        l = l + 1;
                    }
                    k = k + 1;
                }
                j = j + 1;
            }
            i = i + 1;
        }
        assert(i == 10, 438);
        assert(sum == 10000, 439);
    }

    // Test 14: deeply nested for loop
    {
        int i, sum;
        i = sum = 0;
        for(i = 0; i < 10; i = i + 1){
            int j;
            for(j = 0; j < 10; j = j + 1){
                int k;
                for(k = 0; k < 10; k = k + 1){
                    int l;
                    for(l = 0; l < 10; l = l + 1){
                        sum = sum + 1;
                    }
                }
            }
        }
        assert(i == 10, 454);
        assert(sum == 10000, 455);
    }

    // Test 15: deeply nested do-while loop
    {
        int i, sum;
        i = sum = 0;
        do{
            int j;
            j = 0;
            do{
                int k;
                k = 0;
                do{
                    int l;
                    l = 0;
                    do{
                        sum = sum + 1;
                        l = l + 1;
                    } while(l < 10);
                    k = k + 1;
                } while(k < 10);
                j = j + 1;
            } while(j < 10);
            i = i + 1;
        } while(i < 10);
        assert(i == 10, 471);
        assert(sum == 10000, 472);
    }

    // Test 16: deeply nested while loop with break
    {
        int i, sum;
        i = sum = 0;
        while(i < 10){
            int j;
            j = 0;
            while(j < 10){
                int k;
                k = 0;
                while(k < 10){
                    int l;
                    l = 0;
                    while(l < 10){
                        int m;
                        m = 0;
                        while(m < 10){
                            sum = sum + 1;
                            m = m + 1;
                            if(m == 5){
                                break;
                            }
                        }
                        l = l + 1;
                        if(l == 5){
                            break;
                        }
                    }
                    k = k + 1;
                    if(k == 5){
                        break;
                    }
                }
                j = j + 1;
                if(j == 5){
                    break;
                }
            }
            i = i + 1;
            if(i == 5){
                break;
            }
        }
        assert(i == 5, 508);
        assert(sum == 3125, 509);
    }

    // Test 17: deeply nested for loop with break
    {
        int i, sum;
        i = sum = 0;
        for(i = 0; i < 10; i = i + 1){
            int j;
            for(j = 0; j < 10; j = j + 1){
                int k;
                for(k = 0; k < 10; k = k + 1){
                    int l;
                    for(l = 0; l < 10; l = l + 1){
                        int m;
                        for(m = 0; m < 10; m = m + 1){
                            sum = sum + 1;
                            if(m == 5){
                                break;
                            }
                        }
                        if(l == 5){
                            break;
                        }
                    }
                    if(k == 5){
                        break;
                    }
                }
                if(j == 5){
                    break;
                }
            }
            if(i == 5){
                break;
            }
        }
        assert(i == 5, 532);
        assert(sum == 3125, 533);
    }

    // Test 18: deeply nested do-while loop with break
    {
        int i, sum;
        i = sum = 0;
        do{
            int j;
            j = 0;
            do{
                int k;
                k = 0;
                do{
                    int l;
                    l = 0;
                    do{
                        int m;
                        m = 0;
                        do{
                            sum = sum + 1;
                            m = m + 1;
                            if(m == 5){
                                break;
                            }
                        } while(m < 10);
                        l = l + 1;
                        if(l == 5){
                            break;
                        }
                    } while(l < 10);
                    k = k + 1;
                    if(k == 5){
                        break;
                    }
                } while(k < 10);
                j = j + 1;
                if(j == 5){
                    break;
                }
            } while(j < 10);
            i = i + 1;
            if(i == 5){
                break;
            }
        } while(i < 10);
        assert(i == 5, 556);
        assert(sum == 3125, 557);
    }

    // Test 19: mixed loop [To be checked]
    {
        int i, sum, j, k, l, m;
        i = sum = 0;
        while(i < 5){
            j = 0;
            for(j = 0; j < 5; j = j + 1){
                k = 0;
                do{
                    l = 0;
                    while(l < 5){
                        sum = sum + 1;
                        l = l + 1;
                        if(l == 3){
                            break;
                        }
                    }
                    k = k + 1;
                    if(k == 3){
                        break;
                    }
                } while(k < 5);
            }
            i = i + 1;
        }
        

        assert(i == 5, 587);
        assert(j == 5, 588);
        assert(k == 3, 589);
        assert(l == 3, 590);
        assert(sum == 225, 592);
        
    }

    // Test 20: nested while and for loop
    {
        int i, sum;
        i = sum = 0;
        while(i < 10){
            int j;
            for(j = 0; j < 10; j = j + 1){
                int k;
                k = 0;
                while(k < 10){
                    int l;
                    for(l = 0; l < 10; l = l + 1){
                        sum = sum + 1;
                    }
                    k = k + 1;
                }
            }
            i = i + 1;
        }
        assert(i == 10, 608);
        assert(sum == 10000, 609);
    }

    // Test 21: nested for and while loop
    {
        int i, sum;
        i = sum = 0;
        for(i = 0; i < 10; i = i + 1){
            int j;
            j = 0;
            while(j < 10){
                int k;
                for(k = 0; k < 10; k = k + 1){
                    int l;
                    l = 0;
                    while(l < 10){
                        sum = sum + 1;
                        l = l + 1;
                    }
                }
                j = j + 1;
            }
        }
        assert(i == 10, 625);
        assert(sum == 10000, 626);
    }
}

// 5 - Functions (declaration, call, num_args, recursivity, redefining functions, ...).
    //Test 1: function declaration
    int test1(int a, int b){
        return a + b;
    }

    // Test 6: function declaration with unappropriate name
    // int 1test(int a, int b){
    //     return a + b;
    // }

    // Test 7: function declaration with unappropriate name
    // int test 1(int a, int b){
    //     return a + b;
    // }

    // Test 8: function declaration with unappropriate name
    // int test-1(int a, int b){
    //     return a + b;
    // }

    // Test 9: function declaration with appropriate name
    // int test_1(int aa, int bb){ // problem spotted can't use the same argument name for different functions in the same scope
    //     return aa + bb;
    // }

    // // Test 10: function declaration with appropriate name
    // int test1_(int a, int b){
    //     return a + b;
    // }

    // // Test 11: function declaration with appropriate name
    // int _test1(int a, int b){
    //     return a + b;
    // }

    // // Test 12: function declaration with appropriate name
    // int _test_1(int a, int b){
    //     return a + b;
    // }

    // // Test 14: recursive function
    // int test2(int a){
    //     if(a == 0){
    //         return 0;
    //     }
    //     return a + test2(a - 1);
    // }

    // // Test 15: recursive function
    // int test3(int a){
    //     if(a == 0){
    //         return 0;
    //     }
    //     return test3(a - 1) + a;
    // }

void functionsTests(){

    // Test 2: function call
    {
        int a, b, c;
        a = 10;
        b = 20;
        c = test1(a, b);
        assert(c == 30, 638);
    }

    // // Test 3: function call with wrong number of arguments
    // {
    //     int a, b, c;
    //     a = 10;
    //     b = 20;
    //     c = test1(a);
    //     assert(c == 30, 646);
    // }

    // // Test 4: function call with wrong number of arguments
    // {
    //     int a, b, c;
    //     a = 10;
    //     b = 20;
    //     c = test1(a, b, c);
    //     assert(c == 30, 654);
    // }
    
    // // Test 5: function call with wrong number of arguments
    // {
    //     int a, b, c;
    //     a = 10;
    //     b = 20;
    //     c = test1();
    //     assert(c == 30, 662);
    // }

    // // Test 15: recursive function call
    // {
    //     int a, b;
    //     a = 10;
    //     b = test2(a);
    //     assert(b == 55, 708);
    // }

    // // Test 16: recursive function call
    // {
    //     int a, b;
    //     a = 0;
    //     b = test2(a);
    //     assert(b == 0, 716);
    // }

    // // Test 18: passing function as argument
    // {
    //     int a, b;
    //     a = 10;
    //     b = test3(test2);
    //     assert(b == 55, 724);
    // }

}

int main(){
    variablesTests();
    mathemathicalTests();
    conditionalsTests();
    loopsTests();

}

// 6 - Dynamic memory (matrix, dynamic allocation and disallocation, address manipulation).

// Everything is inside a bloc for now, to be verified later
// case 01: declaration in the first block without initialization


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

