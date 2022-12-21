export default function capitalize(string) {
    const stringArray = string.split(' ');

    const capitalizedArr = stringArray.map(word => {
        const firstLetter = word[0].toUpperCase();

        const restOfWord = word.slice(1);

        return firstLetter + restOfWord;
    });

    return capitalizedArr.join(' ').trim();
}