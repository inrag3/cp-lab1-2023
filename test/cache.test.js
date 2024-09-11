import {Cache} from "../src/cache.js";

describe("test: cache class", () => {
    let cache;
    let values;

    beforeEach(() => {
        //Начальные значения
        values = new Map([
            [1, [45, 1]],
            [66, [11, 2]],
            [33, [87, 33]],
            [100, [41, 3]],
        ]);
        cache = new Cache(values);
    });

    test("test: values are passed through constructor", () => {
        expect(cache.count).toBe(4);
    });

    test("test: right value from key via cache call", () => {
        const value = cache.call(1);
        expect(value).toBe(45);
    });

    test("test: changing hits after call", () => {
        const key = 66;
        cache.call(key);
        const hits = cache.hits(key);
        expect(hits).toBe(1);
    });

    test("test: pair must be cleared", () => {
        const key = 1;
        cache.call(key);
        expect(cache.count).toBe(3);
    });

    test("test: call with a key that isn\'t in the cache", () => {
        const key = -11;
        const value = cache.call(key);
        expect(value).toBe(null);
    });

    test("test: set new pair without hits", () => {
        const key = 8;
        const value = 10;
        cache.set(key, value);
        const hits = cache.hits(key)
        expect(cache.count).toBe(5);
        expect(hits).toBe(1);
    });

    test("test: set new pair with hits", () => {
        const key = 8;
        const value = 10;
        let hits = 2;
        cache.set(key, value, hits);
        hits = cache.hits(key)
        expect(cache.count).toBe(5);
        expect(hits).toBe(2);
    });
});