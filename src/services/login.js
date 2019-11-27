import firebase from 'firebase';
import db from './db';

export function isLogin() {
    return new Promise((resolve, reject) => {
        db.find({}, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
}