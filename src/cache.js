class Cache {
    //[Key [Value, Hits]]
    constructor(values) {
        this.values = values;
        this.successfullHits = [];
    }

    get count() {
        return this.values.size;
    }

    call(key) {
        const array = this.values.get(key);

        if (array === undefined)
            return null;

        array[1] -= 1;
        //...используется для клонирования массива
        this.successfullHits.push([key, [...array]])

        if (array[1] === 0)
            this.values.delete(key);

        return array[0];
    }

    hits(key) {
        return this.values.get(key)[1];
    }

    set(key, value, hits= 1) {
        this.values.set(key, [value, hits]);
    }

    get statistics() {
        return this.successfullHits;
    }
}

export {Cache}