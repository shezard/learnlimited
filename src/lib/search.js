const REGEX = /[^a-zа-яё0-9\-']+/i;

const COLOR_MAP = {
    'u': 'blue',
    'r': 'red',
    'w': 'white',
    'g': 'green',
    'b': 'black',
};

// Do not put uppercase here !
const SET_MAP = {
    'tsp': 'time spiral',
    'isd': 'innistrad',
    'iko': 'ikoria',
    'inv': 'invasion',
    'thb': 'theros beyond death',
    'lrw': 'lorwyn',
    'zen': 'zendikar',
    'eld': 'throne of eldraine',
    'm20': 'core set 2020',
    'war': 'war of the spark',
    'm19': 'core set 2019',
    'chk': 'champion of kamigawa',
};

function tokenize(text) {

    const isShortColor = !!text.match(/^[rgbwu]+$/i);

    if (isShortColor) {
        return [
            text,
            ...text.split(''),
            ...text.split('').map(function (color) {
                return COLOR_MAP[color];
            })
        ];
    }

    const isSet = !!SET_MAP[text];

    if (isSet) {
        return [
            text,
            ...SET_MAP[text].split(REGEX),
        ];
    }

    return text
        .split(REGEX)
        .filter(
            (text) => text // Filter empty tokens
        );
}

export default tokenize;
