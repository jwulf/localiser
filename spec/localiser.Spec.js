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

    const localiser = new Localiser();
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
        it("has a loadLocale method", () => {
            expect(typeof localiser.loadLocale).toBe("function");
        });
        it("has a listLocales method", () => {
            expect(typeof localiser.listLocales).toBe("function");
        });
        it("has no Locales loaded by default", () => {
            expect(localiser.listLocales().length).toBe(0);
        })
        it("defaults to en_US", () => {
            expect(localiser.defaultLocale).toBe("en_US");
        });
    });

    describe("Localiser with a single locale loaded" , () =>{

        const EN_localiser = new Localiser();
        EN_localiser.loadLocale(strings_en_US);
        it("reports the en_US locale when it is loaded", () => {
            expect(EN_localiser.listLocales().length).toBe(1);
            expect(EN_localiser.listLocales()[0]).toBe("en_US");
        });
        
        const localise = EN_localiser.localise.bind(EN_localiser);

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
    });

    describe("Localiser with two locales loaded", ()=> {
        const MULTI_localiser = new Localiser();
        MULTI_localiser.loadLocale(strings_en_US);
        MULTI_localiser.loadLocale(strings_da);
        const localise2 = MULTI_localiser.localise.bind(MULTI_localiser);
        it("lists multiple locales when they are loaded", () => {
            expect(MULTI_localiser.listLocales().length).toBe(2);
            expect(MULTI_localiser.listLocales().indexOf("en_US") !== -1).toBe(true);         
            expect(MULTI_localiser.listLocales().indexOf("da") !== -1).toBe(true);               
        })
        it("returns the correct en_US string", () => {
            expect(localise2(TEST_STRING_1_ID)).toBe("Mystery Message(1)");
        });
        it("returns the Danish string when requested", () => {
            expect(localise2(TEST_STRING_1_ID, "da")).toBe("Mystery besked");
        });
        it("falls back to the default locale if no localised string exists", () => {
            expect(localise2(TEST_STRING_2_ID, "da")).toBe("Mystery Message(3)");
        });
        it("returns the correct 404 message for a non-existent string ID", () =>{
            expect(localise2(TEST_STRING_3_ID)).toBe("Nothing here!");
        });
        it("returns the Danish 404 message for a non-existent string ID when Danish is loaded", () => {
            expect(localise2(TEST_STRING_3_ID, "da")).toBe("Ikke noget her!");
        });
        it("returns the correct default string if no ID is specified", () => {
            expect(localise2()).toBe("Welcome!");
        });
        it("returns localised objects", () => {
            expect(localise2(TEST_OBJECT_1).STRING_1).toBe("HELLO");
        });
        it("returns the correct Danish string", () => {
            expect(localise2(TEST_STRING_1_ID, "da")).toBe("Mystery besked");
        });
        it("returns the correct localised default string if no ID is specified", () => {
            expect(localise2("", "da")).toBe("Velkomst!");
        });
        it("returns the correct localised 404 message for a non-existent string ID", () => {
            expect(localise2(TEST_STRING_3_ID, "da")).toBe("Ikke noget her!");
        });
    });

    describe("Localiser with two locales and a non-en_US default", () => {
        const DA_localiser = new Localiser();
        DA_localiser.loadLocale(strings_en_US);
        DA_localiser.loadLocale(strings_da);
        const da_localise = DA_localiser.localise.bind(DA_localiser);
        it("lists multiple locales when they are loaded", () => {
            expect(DA_localiser.listLocales().length).toBe(2);
            expect(DA_localiser.listLocales().indexOf("en_US") !== -1).toBe(true);         
            expect(DA_localiser.listLocales().indexOf("da") !== -1).toBe(true);               
        });
        DA_localiser.setDefaultLocale("da");
        it("returns the correct dfault string", () => {
            expect(da_localise(TEST_STRING_1_ID)).toBe("Mystery besked");
        });
        it("returns the Danish string when requested", () => {
            expect(da_localise(TEST_STRING_1_ID, "da")).toBe("Mystery besked");
        });
        it("falls back to the default locale if no localised string exists", () => {
            expect(da_localise(TEST_STRING_2_ID, "da")).toBe("Mystery Message(3)");
        });
        it("returns the correct default locale 404 message for a non-existent string ID", () =>{
            expect(da_localise(TEST_STRING_3_ID)).toBe("Ikke noget her!");
        });
        it("returns the Danish 404 message for a non-existent string ID when Danish is loaded", () => {
            expect(da_localise(TEST_STRING_3_ID, "da")).toBe("Ikke noget her!");
        });
        it("returns the correct default locale string if no ID is specified", () => {
            expect(da_localise()).toBe("Velkomst!");
        });
        it("returns localised objects", () => {
            expect(da_localise(TEST_OBJECT_1).STRING_1).toBe("HELLO");
        });
        it("returns the correct Danish string", () => {
            expect(da_localise(TEST_STRING_1_ID, "da")).toBe("Mystery besked");
        });
        it("returns the correct localised default string if no ID is specified", () => {
            expect(da_localise("", "en_US")).toBe("Welcome!");
        });
        it("returns the correct localised 404 message for a non-existent string ID", () => {
            expect(da_localise(TEST_STRING_3_ID)).toBe("Ikke noget her!");
        });
    });
});