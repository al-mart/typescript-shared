module Never{

    /*
    never is a subtype of and assignable to every type.
    No type is a subtype of or assignable to never (except never itself).
    In a function expression or arrow function with no return type annotation,
    if the function has no return statements, or only return statements with expressions of type never,
    and if the end point of the function is not reachable (as determined by control flow analysis),
    the inferred return type for the function is never.
    In a function with an explicit never return type annotation,
    all return statements (if any) must have expressions of type never
    and the end point of the function must not be reachable.*/

    /** Functions That Never Return
     * */
    // Type () => never
    const sing = function() {
        while (true) {
            console.log("Never gonna give you up");
            console.log("Never gonna let you down");
            console.log("Never gonna run around and desert you");
            console.log("Never gonna make you cry");
            console.log("Never gonna say goodbye");
            console.log("Never gonna tell a lie and hurt you");
        }
    };

    // Type (message: string) => never
    const failwith = (message: string) => {
        throw new Error(message);
    };

    /** Variables with impossible types */

    function impossibleTypeGuard(value: any) {
        if (typeof value === "string" && typeof value === "number"){
            console.log(typeof value);
        }
    }
    impossibleTypeGuard(8);


    function controlFlowAnalysisWithNever(value: string | number) {
        if (typeof value === "string") {
            value; // Type string
        } else if (typeof value === "number") {
            value; // Type number
        } else {
            //value.a; // Type never
        }
    }
    module NeverUsage{
        function timeout(ms: number): Promise<never> {
            return new Promise((_, reject) =>
                setTimeout(() => reject(new Error("Timeout elapsed")), ms)
            )
        }
        async function fetchPriceWithTimeout(tickerSymbol: string): Promise<number> {
            const stock = await Promise.race([
                fetchStock(tickerSymbol), // returns `Promise<{ price: number }>`
                timeout(3000)
            ]);
            return stock.price
        }
        function fetchStock(symbol: string) : Promise<any>{
            return new Promise<any>(()=>{});
        }
    }

    /** GOTCHA WITH NEVER*/

    // Return type: void
    function failwith1(message: string) {
        throw new Error(message);
    }

    // Return type: never
    const failwith2 = function(message: string) {
        throw new Error(message);
    };
    // Question why ???
}

module Unknown {
     //Unknown is just like any but safer ,,, we can do nothing to it directly but can make type narrowing
    function prettyPrint(x: unknown): string {
        if (Array.isArray(x)) {
            return "[" + x.map(prettyPrint).join(", ") + "]"
        }
        if (typeof x === "string") {
            return `"${x}"`
        }
        if (typeof x === "number") {
            return String(x)
        }
        return "etc."
    }
    // Change any to unknown
    function prettyPrint2(x: any): string {
        if (isArray(x)) { // whoops - this `isArray` is not a type guard!
            return "[" + x.mop(prettyPrint).join(", ") + "]"
        }
        /* snip */
        return "etc."
    }
    function isArray(x : any): boolean{
        return true;
    }
}