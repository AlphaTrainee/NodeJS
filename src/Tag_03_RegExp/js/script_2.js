"use strict";

// Array-Destructuring
{
    let heroes = ["Jesssica", "Luke", "Daredevil", "Elektra"];

    let hero1 = heroes[0];
    let hero2 = heroes[1];
    let hero3 = heroes[2];
    let hero4 = heroes[3];
    let hero5;

    console.log(hero1, hero2, hero3, hero4);

    let heroes2 = [hero1, hero2, hero3, hero4];
    console.log(heroes2);

    let [held1, held2, held3, held4, held5] = heroes;
    console.log(held1, held2, held3, held4, held5);

    // Nutzung in function
    function printHeroes([held1, held2, held3, held4]) {
        console.log(held1, held2, held3, held4);
    }
    printHeroes(heroes);


    // vorhandene Variablen -> ohne let
    [hero1, hero2, hero3, hero4, hero5 = "default_hero"] = heroes2;
    console.log(hero1, hero2, hero3, hero4, hero5);

    // nur bestimmt Werte
    const [firstHero, , , lastHero] = heroes;
    console.log(firstHero, lastHero);

    // mehrdimenionales array
    let matrix = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    let [[a], [, b], [, , c]] = matrix;
    console.log(a, b, c);

}

// Object Destructuring
{

    let hero = {
        name: "Jessica",
        age: 25,
        job: "Student",
        skills: ["JavaScript", "HTML", "CSS"]
    };

    // let {name, age, job, skills} = hero;
    // console.log(name, age, job, skills);

    let { name, age, job, progs } = hero;
    console.log(name, age, job, progs);

/* 
    let favHero = {
        name: "Jessica",
        age: 25,
        job: "Student",
        skills: ["JavaScript", "HTML", "CSS"],
        address: {
            street: "Hauptstrasse",
            no: 1,
            city: "Berlin",
            postCode: 10117
        }
    };

    let {heroName, address: { city, postCode: zip } } = favHero;
    console.log(heroName, city, zip);

    ([name, age] = favHero);
    console.log(name, age);
 */

}

{


    let favHero = {
        name: "Jessica",
        age: 25,
        job: "Student",
        skills: ["JavaScript", "HTML", "CSS"],
        address: {
            street: "Hauptstrasse",
            no: 1,
            city: "Berlin",
            postCode: 10117
        },
        phones: ["1111", "22222"]
    };

    let {name: favHeroName, skills: [skill1, skill2, skill3], address: {city}, phones: [phone1, phone2]} = favHero;
    console.log(name, skill1, skill2, skill3, city, phone1, phone2);


    
}