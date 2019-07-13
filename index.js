#!/usr/bin/env node
"use strict";

const mcrypt = require('mcrypt').MCrypt;
const mc = new mcrypt('blowfish', 'ecb');
const argv = require('yargs').argv

const decryptText = (text, encrypt_key) => {
    mc.validateKeySize(false);
    mc.open(encrypt_key);
    const cipherText = new Buffer.from(text, 'base64');
    let decrypted_text = mc.decrypt(cipherText).toString().replace(/(\n|\r|\t|\0)+$/, '').trim();
    decrypted_text = decrypted_text.replace("'", "'\"'\"'"); // escape single quote characters
    return decrypted_text;
};

const main = () => {
    const params = argv._;
    const key = argv.key;
    if (argv.help || !params || !key) {
        console.log('> mcrypt-cli ENCRYPTED_TEXT --key=KEY');
        process.exit(1);
        return;
    }
    const encrypted_text = params[0];
    try {
        const decryptedText = decryptText(encrypted_text, key);
        console.log(decryptedText);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

main();


