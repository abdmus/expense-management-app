// // const person = {
// //     name: 'Abdullah',
// //     age: 22,
// //     location: {
// //         city: 'Lahore',
// //         temp: 26
// //     }
// // };

// // const { name: firstname = 'Anonymus', age } = person;

// // console.log(`${firstname} is ${age}.`);

// // const {city, temp} = person.location;

// // if (city && temp) {
// //     console.log(`It's ${temp} in ${city}`);
// // }

// // const book = {
// //     title: 'Ego is the enamy',
// //     auther: 'Ryan Holiday',
// //     publisher: {
// //         name: 'Penguin'
// //     }
// // };

// // const {name: publisherName = 'Self-Published'} = book.publisher;

// // console.log(publisherName);

// //
// // Array Destructur
// //

// // const address = ['1299 S Juniper Street', 'Lahore', 'Punjab', '54920'];

// // const [, city = "NoshoPak", state] = address;

// // console.log(`Your are in ${city} ${state}.`);

// const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

// const [bevarege, , mediumPrice] = item;

// console.log(`A medium ${bevarege} costs ${mediumPrice}`);