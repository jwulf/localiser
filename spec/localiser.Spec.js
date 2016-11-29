"use strict";

const strings_en_US = require('./test-strings-en_US.js');
const strings_da = require('./test-strings-da.js');
const Localiser = require('./../src/localiser.js'); 

const TEST_STRING_1_ID = "TEST_STRING_1";
const TEST_STRING_2_ID = "TEST_STRING_2";
const TEST_STRING_3_ID = "bogus";
const TEST_OBJECT_1    = "TEST_OBJECT_1";

describe("Localiser", () =>{
    it("exports a constructor", () => {
        expect(typeof Localiser).toBe("function");
    });

    const localiser = new Localiser(strings_en_US , {});
    it("creates a localiser", () => {
        expect(typeof localiser).toBe("object");
    });
    describe("Localiser", () => {
        it("has a localise method", () => {
            expect(typeof localiser.localise).toBe("function");
        });
        it("has a getLocalisedString method", () => {
            expect(typeof localiser.getLocalisedString).toBe("function");
        });
        it("defaults to en_US", () => {
            expect(localiser.defaultLocale).toBe("en_US");
        });
        const localise = localiser.localise.bind(localiser);
        it("returns the correct en_US string", () => {
            expect(localise(TEST_STRING_1_ID)).toBe("Mystery Message(1)");
        });
        it("returns the en_US string if Danish is not loaded", () => {
            expect(localise(TEST_STRING_1_ID, "da")).toBe("Mystery Message(1)");
        });
        it("falls back to the default locale if no localised string exists", () => {
            expect(localise(TEST_STRING_2_ID, "da")).toBe("Mystery Message(3)");
        });
        it("returns the correct 404 message for a non-existent string ID", () =>{
            expect(localise(TEST_STRING_3_ID)).toBe("Nothing here!");
        });
        it("returns the en_US 404 message for a non-existent string ID when Danish is not loaded", () => {
            expect(localise(TEST_STRING_3_ID, "da")).toBe("Nothing here!");
        });
        it("returns the correct default string if no ID is specified", () => {
            expect(localise()).toBe("Welcome!");
        });
        it("returns the en_US default string if no ID is specified when Danish is not loaded", () => {
            expect(localise("", "da")).toBe("Welcome!");
        });
        it("returns localised objects", () => {
            expect(localise(TEST_OBJECT_1).STRING_1).toBe("HELLO");
        });


        const localiser2 = new Localiser();
        localiser2.loadLocale(strings_en_US);
        const localise2 = localiser2.localise.bind(localiser2);
        it("returns the correct en_US string", () => {
            expect(localise2(TEST_STRING_1_ID)).toBe("Mystery Message(1)");
        });
        it("returns the en_US string if Danish is not loaded", () => {
            expect(localise2(TEST_STRING_1_ID, "da")).toBe("Mystery besked");
        });
        it("falls back to the default locale if no localised string exists", () => {
            expect(localise2(TEST_STRING_2_ID, "da")).toBe("Mystery Message(3)");
        });
        it("returns the correct 404 message for a non-existent string ID", () =>{
            expect(localise2(TEST_STRING_3_ID)).toBe("Nothing here!");
        });
        it("returns the en_US 404 message for a non-existent string ID when Danish is not loaded", () => {
            expect(localise2(TEST_STRING_3_ID, "da")).toBe("Ikke noget her!");
        });
        it("returns the correct default string if no ID is specified", () => {
            expect(localise2()).toBe("Welcome!");
        });
        it("returns the correct localised string if no ID is specified when Danish is loaded", () => {
            expect(localise2("", "da")).toBe("Velkomst!");
        });
        it("returns localised objects", () => {
            expect(localise2(TEST_OBJECT_1).STRING_1).toBe("HELLO");
        });
        localiser2.loadLocale(strings_da);
        it("returns the correct Danish string", () => {
            expect(localise2(TEST_STRING_1_ID, "da")).toBe("Mystery besked");
        });
        it("returns the correct localised default string if no ID is specified", () => {
            expect(localise2("", "da")).toBe("Velkomst!");
        });
        it("returns the correct localised 404 message for a non-existent string ID", () => {
            expect(localise2(TEST_STRING_3_ID, "da")).toBe("Ikke noget her!");
        });
    })
});