
// void printf(int number){
//     if(number < 0){
//         __send__(45);
//         number = -number;
//     }
//     if(number < 10){
//         __send__(number + 48);
//         __send__(10);
//         return number;
//     }


//     int counter;
//     counter = 10;
//     while(counter <= number){
//         counter = counter * 10;
//     }

//     counter = counter / 10;
//     while(counter > 0){
//         __send__(number / counter + 48);
//         number = number % counter;
//         counter = counter / 10;
//     }
//     __send__(10);
// };

// void assert(int condition, int line){
//     if(condition == 0){
//         __send__(10);
//         __send__(65);
//         __send__(83);
//         __send__(83);
//         __send__(69);
//         __send__(82);
//         __send__(84);
//         __send__(32);
//         __send__(70);
//         __send__(65);
//         __send__(73);
//         __send__(76);
//         __send__(69);
//         __send__(68);
//         __send__(58);
//         __send__(32);

//         // send line: line number
//         __send__(76);
//         __send__(73);
//         __send__(78);
//         __send__(69);
//         __send__(32);
//         printf(line);
//         __send__(10);
//     }

// };

// int malloc(int size){
//     int p, r; 
//     p = 0;
//     r = *p;
//     *p = *p + size;
//     return r;
// };

// int free(int adr){};
