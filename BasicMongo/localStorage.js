import {isValidJSON , saveToStorage , loadFromStorage} from '../utils/utils.js';

// window.localStorage - stores data with no expiration date
// localStorage - to display the localStorage object
// localStorage.clear() - to remove everything in the local storage
// localStorage.setItem(key , value <- String) - to store data in the localStorage. It takes a key and a value parameters.
// localStorage.getItem(key) - to display data stored in the localStorage. It takes a key as a parameter.
// localStorage.removeItem() - to remove stored item form a localStorage. It takes key as a parameter.
// localStorage.key() - to display a data stored in a localStorage. It takes index as a parameter.

// localStorage.setItem()  -> nimmt immer einem String entgegen
// automatische Umwandlung funktioniert bei Objekten nicht und diese müssen durch JSON angepasst werden
localStorage.setItem('firstName' , 'Kevin');
localStorage.setItem('age' , 25);
let  skills = ['HTML' , 'CSS' , 'JS' , 'React'];
// bei Objekten oder Arrays : erst zu einem String umformen und dann abspeichern
localStorage.setItem('skills' , JSON.stringify(skills));
console.log(localStorage);

let techSkills = [
    {skill: 'HTML' , level: 10},
    {skill: 'CSS' , level: 6},
    {skill: 'Javascript' , level:10},
    {skill: 'Node.js' , level: 6}
    ]
// bevor wie Objekte in den Local Storage abspeichern können , müssen diese zu einem String umgeformt werden

localStorage.setItem('techSkills' ,JSON.stringify(techSkills));
console.log(localStorage);

// localStorage.setItem()  -> gibt immer einem String zurück
// JSON.parse gibt bei (Zahlen,Strings,Arrays und Objekten) immer zuverlässig den uhrsprünglichen Typen zurück
console.log(localStorage.getItem('firstName'));
// techArray ist wieder vom Typ Array wie vor dem abspeichern nicht nur Objekt 
// wichtig in Javascript -> type of Array -> gibt object aus
const techArray = (JSON.parse(localStorage.getItem('techSkills')));
console.log(techArray);












  
