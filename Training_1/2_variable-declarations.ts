module VariableDeclarations{
    /** Let Var and Const
     * */

    const a = [];

    //a = [];

    a.push(10);
    console.log(a);

    /** Block scope declared variable capturing example*/
    function theCityThatAlwaysSleeps() {
        let getCity;

        if (true) {
            let city = "Seattle";
            getCity = function() {
                return city;
            }
        }

        return getCity();
    }

    /**Array Destructuring*/
    // IIFE USED JUST FOR MODULE
    // Simple dextructuring
    // Can be used for variable value swap
    (function(){
        let input = [1, 2];
        let [first, second] = input;
        console.log(first); // outputs 1
        console.log(second); // outputs 2

        // swap variables
        [first, second] = [second, first];
    })();

    //Can be used as function arguments
    function f([first, second]: [number, number]) {
        console.log(first);
        console.log(second);
    }
    f([1, 2]);

    // ... syntax isnt spread operator its used to store other values in a NEW ARRAY  ( ITS called rest operator)
    (function(){
        let [first, ...rest] = [1, 2, 3, 4];
        console.log(first); // outputs 1
        console.log(rest); // outputs [ 2, 3, 4 ]
    })();

    // REST can be ommited
    let [first] = [1, 2, 3, 4];
    console.log(first); // outputs 1


    // Some values can be omitted
    let [, second, , fourth] = [1, 2, 3, 4];
    console.log(second); // outputs 2
    console.log(fourth); // outputs 4



    /**Tuple Destructuring*/

    let tuple: [number, string, boolean] = [7, "hello", true];

    let [aa, bb, cc] = tuple; // a: number, b: string, c: boolean

    let [aaa, ...bc] = tuple; // bc: [string, boolean]

    let [aaaa] = tuple; // a: number
    let [, b] = tuple; // b: string

    // GOTCHA

    // using a destructuring with a tuple beyond its elements result an error but with rest its ok
    //let [g, h, j, k] = tuple; // Error, no element at index 3
    let [gg, hh, jj, ...kk] = tuple; // k is [] empty tuple

    /**Object Destructuring*/

    let o = {
        one: "foo",
        two: 12,
        three: "bar"
    };
    // thw sequence isn't taken ,,, it takes the names  ,,, three is omited
    let { two, one } = o;
    console.log(`${two} --- ${one}`);

    // let { x, ...passthrough } = o; error here X isn't defined
    //let total = passthrough.two + passthrough.three.length;
    // property renaming ,,,
    let { one: newName1, two: newName2 } = o;
    // : isn;t used for type declaration if we want to declare types we must use
    let { one: newName3, two : newName4 }: { one: string, two: number } = o;

    // Default values
    function keepWholeObject(wholeObject: { a: string, b?: number }) {
        let { a, b = 1001 } = wholeObject;
    }
    keepWholeObject({ a : "Hello"});

    /** Function declarations */
    type twoTypeDeafult = { a: string, b?: number }
    function keepWholeObject2({ a, b }: twoTypeDeafult): void {

    }
    keepWholeObject2({a: "Hello"});

    // EXAMPLE 1
    function f2({ a="", b=0 } = {}): void {
        // ...
    }
    f2();
    // EXAMPLE 2
    function f3({ a, b = 0 } = { a: "" }): void {
        // ...
    }
    // Answers
    //                                                                                                                                                  f3({ a: "yes" }); // ok, default b = 0
    //                                                                                                                                                  f3(); // ok, default to { a: "" }, which then defaults b = 0
    //                                                                                                                                                  f3({}); // error, 'a' is required if you supply an argument
    /**Spread operator*/
        // Creates one array dont mutate spreaded ones.
    let first2 = [1, 2];
    let second2 = [3, 4];
    let bothPlus = [0, ...first2, ...second2, 5];

    // Object Spread has some Gotchas , its later params overwrite those that came first first.
    let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
    let search = { ...defaults, food: "rich" };

    //includes an objects’ own, enumerable properties.
    // Basically, that means you lose methods when you spread instances of an object

    class C {
        p = 12;
        m() {
            console.log(this.p);
        }
    }

    let c = new C();
    let clone = { ...c };
    clone.p = 15; // ok
    console.log(clone.p);
    //clone.m(); // error!

    // Question how can we pass this  constraint ???  SIMPLE


                                                                                                                                                          /*class D {
                                                                                                                                                                p = 15;
                                                                                                                                                               func = (a: number) => {
                                                                                                                                                                    console.log(this.p+a);
                                                                                                                                                               }
    }*/
    /*let dExample = new D();
    let dClone = {...dExample};
    dClone.func(15);*/

}