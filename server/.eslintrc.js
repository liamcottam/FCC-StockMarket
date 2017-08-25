module.exports = {
    "env": {
        "node": true,
        "es6": true
    },
    "extends": ["eslint:recommended", "airbnb-base"],
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-plusplus": 0
    }
};