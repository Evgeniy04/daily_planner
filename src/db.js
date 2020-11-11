import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('database22.db');

export class DB {
    static addDb(date) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`CREATE TABLE IF NOT EXISTS '${date}' (id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, [check] INTEGER DEFAULT (0))`, [], resolve, (_, error)=>reject(error)
            )})
        })
    }
    static addElement(date, value) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`INSERT INTO ${date} VALUES(NULL, '${value}', NULL)`,
                [], 
                resolve, 
                (_, error)=>reject(error)
            )})
        })
    }
    static removeElements(date, id) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`DELETE FROM ${date} WHERE id = '${id}'`, 
                    [], 
                    resolve, 
                    (_, error)=>reject(error)
            )})
        })
    }
    static updateElement(date, id, value) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`UPDATE ${date} SET title = '${value}' WHERE id = ${id}`, 
                    [], 
                    resolve, 
                    (_, error)=>reject(error)
            )})
        })
    }
    static updateCheck(date, id, value) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`UPDATE ${date} SET 'check' = '${value}' WHERE id = ${id}`, 
                    [], 
                    resolve, 
                    (_, error)=>reject(error)
            )})
        })
    }
    static getElements(date) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`SELECT * FROM ${date}`, 
                    [], 
                    (_, result) => resolve(result.rows._array), 
                    (_, error)=>reject(error)
            )})
        })
    }
    static getTables() {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`SELECT name FROM sqlite_master WHERE type='table'`, 
                    [], 
                    (_, result) => resolve(result.rows._array), 
                    (_, error)=>reject(error)
            )})
        })
    }
    static deleteTable(date) {
        return new Promise((resolve, reject) => {
            db.transaction((tx) => {
                tx.executeSql(`DROP TABLE '${date}'`, 
                    [], 
                    (_, result) => resolve(result.rows._array), 
                    (_, error)=>reject(error)
            )})
        })
    }
}