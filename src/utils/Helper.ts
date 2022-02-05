export class Helper {
    
    public static search (data: Array<Record<string, object>>, value: object): Array<Record<string, object>> {
        let res:Array<Record<string, object>> = [];
        
        data.forEach(element => {
            for (const key in element) {
                const item: unknown = element[key];
                if (Array.isArray(item)) {
                    item.forEach(each => {
                        if (typeof each === "string") {
                            if (each.toString().toLowerCase().includes((value as unknown as string).toLowerCase())) {
                                if (!res.includes(element)) {
                                    res.push(element);
                                }
                            }
                        } else {
                            //It's an object
                            if (Array.isArray(each)) {
                                //It is array
                                each.forEach(item => {
                                    if (item.toString().toLowerCase().includes((value as unknown as string).toLowerCase())) {
                                        if (!res.includes(element)) {
                                            res.push(element);
                                        }
                                    }
                                });
                            } else {
                                //It is an object
                                for (const key in each) {
                                    if (each[key].toString().toLowerCase().includes((value as unknown as string).toLowerCase())) {
                                        if (!res.includes(element)) {
                                            res.push(element);
                                        }
                                    }
                                }
                            }
                        }
                    });
                } else {
                    if (element[key] && element[key].toString().toLowerCase().includes((value as unknown as string).toLowerCase())) {
                        if (!res.includes(element)) {
                            res.push(element);
                        }
                    }
                }
            }
        });
        return res;
    }

    private static charsIncluded(data: string, chars: string[]): number {
        let counter: number = 0;
        for (let i = 0; i < chars.length; i++) {
            if(data.includes(chars[i])) {
                counter++;
            }
        }
        return counter;
    }
    
    public static searchV2 (data: Array<Record<string, object>>, value: string): Array<Record<string, object>> {
        let res:Array<Record<string, object>> = [];
        const searchChars: string[] = value.split("");
        let elementMatchCounter: number = 0;
        data.forEach(element => {
            let objMatchCounter: number = 0;
            for (const key in element) {
                const num: number = this.charsIncluded(element[key]+"" , searchChars)
                if (num > objMatchCounter) {
                    objMatchCounter = num;
                }
            }
            //To make sure perfect match comes first
            if (objMatchCounter > elementMatchCounter) {
                elementMatchCounter = objMatchCounter;
                res.unshift(element);
            }
            else if(objMatchCounter !== 0) {
                res.push(element);
            }
        });
        return res;
    }

    public static extractString(arg: string, sIndex: number, eIndex: number): string {
        let res = "";
        for (let i = sIndex; i <= eIndex; i++) {
            res += arg[i];
        }
        return res;
    }

    public static getFileExtension(fileName: string, step : number): string {
        let res: string = ".", counter = 0;
        const arr = fileName.split(".");
        for (let i = arr.length-1; i > 0; i--) {
            if(counter === step) break;
            res += arr[i];
            if(arr[i] === ".") counter++;
            
        }
        return res;
    }

}