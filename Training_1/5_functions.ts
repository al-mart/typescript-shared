// AS of in JS in TS there are named and anonimous functions
function simpleNamedFunction():void{};
let myAnon = function():void{};

// Function type ,,, functions also support inference
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };


let newMyAdd = myAdd;
/*
newMyAdd = function (x: string):boolean {
    return x === "Hello World";
};
*/

newMyAdd = function(x:number,y: number ):number{
    return  (x+y)**2;
};

//functions support default and optional params

function buildName1(firstName: string, lastName?: string) {
    if(!lastName){
        lastName = "Smith";
    }
    return `${firstName} + ${lastName}`;
}

function buildName2(firstName: string, lastName = "Smith") {
    return `${firstName} + ${lastName}`;
}



//function overloading

let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x:any): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

