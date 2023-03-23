//call extra functions to be tested here
function sun(a, b) {
    return a + b;
}

test('test the sum of 3 and 4', () => {
    expect(sun(3, 4)).toBe(7);
});

test('random number digit generation', () => {
    function generateChar(length) {
        //populate and store ascii codes
        let charArray = [];
        let code = [];
        for (let i = 33; i <= 126; i++) charArray.push(String.fromCharCode(i));
        //do range random here
        for(let i=0;i<=length; i++){
            code.push(charArray[Math.floor(Math.random() * charArray.length - 1)]);
        }
        return code.join("");
    }

    console.log(generateChar(10));
})