const path = require('path');
module.exports = {
    entry: './index.js',
    output: {
        filename: 'cowsay.bundle.js',
        path: path.resolve(__dirname, './'),
    },
    node: {
        fs: "empty"
    }
};