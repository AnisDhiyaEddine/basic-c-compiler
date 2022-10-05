
void printf(int number){
    if(number < 10){
        __send__(number + 48);
        __send__(10); // to break the line
        return number; // Add return; support
    }
    int counter;
    counter = 10;
    while(counter <= number){
        counter = counter * 10;
    }
    counter = counter / 10;
    __send__(number / counter + 48);
    return printf(number % counter);
};

int malloc(int size){ // The idea is clear still have to functionnaly test it
    int p, r; 
    p = 0;
    r = *p;
    *p = *p + size;
    return r;
};

int free(int adr){};
