interface Stack<type> {
    push: (obj: type) => void;
    pop: (obj: type) => void;
    peek: () => type;
    size: () => number;
}

class ArrayStack<type> implements Stack<type> {
    private arr: Array<type>;
    constructor() {
        this.arr = new Array<type>();
    }
    push = (obj:type) => {
        this.arr.push(obj);
    }
    pop = () => {
        this.arr.pop();
    }
    peek = () => {
        return this.arr[this.arr.length - 1];
    }
    size = () => {
        return this.arr.length;
    };
}

const stringStack:Stack<string> = new ArrayStack<string>();
stringStack.push("1");
stringStack.push("2");
stringStack.push("3");
stringStack.push("4");

console.log(stringStack.peek());