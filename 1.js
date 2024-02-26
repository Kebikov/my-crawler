const str = 'тут любые символы<img class="anime" src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP>тут любые символы';
console.log(str.match(/<[^<]*?base64.*?>/gi));
//> <img class="anime" src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP>