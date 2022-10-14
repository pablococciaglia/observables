const numArray = [1, 2, 3, 4, 3, 5, 6]


async function showNumber(numArray: number[]) {
    let i = 0
    const resolveAfter2Seconds = (number: number) => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(number);
            }, 2000);
        });
    }

    for (const number of numArray) {
        if (i % 3 !== 0) {
            console.log(number)
        } else {
            const contents = await resolveAfter2Seconds(number);
            console.log(contents);
        }
        i++
    }

}
showNumber(numArray)