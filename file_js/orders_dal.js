const sqlite3 = require('sqlite3').verbose();
const db_file_loc = 'db_books.db'

function open_db(file_name) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(file_name, (err) => {
            if (err) {
                console.log(`Failed to connect to ${file_name}`);
                reject(err)
            }
            else {
                console.log(`Successfully connected to ${file_name}`);
                resolve(db)
            }
        })
    })
}

function get_all(db) {
    return new Promise(function (resolve, reject) {
        db.all("SELECT * from ORDERS", function (err, rows) {
            if (err) { return reject(err); }
            resolve(rows);
        });
    });
}

function get_by_id(db  , id) {
    return new Promise(function (resolve, reject) {
        db.all(`SELECT * from ORDERS WHERE ID = ${id}`, function (err, rows) {
            if (err) { return reject(err); }
            resolve(rows);
        });
    });
}

function find_by_Lname(db  , title) {
    return new Promise(function (resolve, reject) {
        db.all(`SELECT * FROM ORDERS WHERE CUSTOMER_F_NAME LIKE '%${title}%' `, function (err, rows) {
            if (err) { return reject(err); }
            resolve(rows);            
        });
    });
}

function close_db(db) {
    return new Promise((resolve, reject) => {
        db.close(err => {
            if (err) {
                console.log(err.message);
                reject(err.message)
            }
            else {
                console.log('Database connection closed!');
                resolve()
            }
        })
    })
}

function delete_order_by_id(db, id) {
    return new Promise(function (resolve, reject) {
        const sql_update = `DELETE FROM ORDERS 
                        WHERE id = ?`
        db.run(sql_update, [id], err => {
            if (err) {
                console.log(`ERROR: ${err}`);
                reject(err)
            }
            else {
                console.log(`Deleted record id ${id}`);
                resolve()
            }
        })
    })
}

function insert(db, data ) {
    return new Promise(function (resolve, reject){
    const sql_insert = `INSERT INTO ORDERS (BOOK_ID, HOW_MANY, CUSTOMER_F_NAME, CUSTOMER_L_NAME, CREDIT_CARD)
                        VALUES (?,?,?,?,?);`
    db.run(sql_insert, data, err => {
        if (err) { return reject(err); }
        resolve(data);
    })
    })
}

function update_order_by_id(db, id, column, new_update) {
    return new Promise(function (resolve, reject) {
        const sql_update = `UPDATE ORDERS 
                        SET ${column} = ?
                        WHERE id = ?`
        db.run(sql_update, [new_update, id], err => {
            if (err) {
                console.log(`ERROR: ${err}`);
                reject(err)
            }
            else {
                console.log(`Order updated to ${new_update}`);
                resolve(new_update)
            }
        })
    })
}

async function main() {
    try {
        const db = await open_db(db_file_loc)
       await insert(db, ['2', '1', 'Jonny', 'Levi', '4580-5666-7854-5662'])
       // await delete_order_by_id(db, 'id')
       const result = await get_all(db);
       //const result = await find_by_Lname(db, 'l_name');
       // await update_order_by_id(db, 121, 'columb', 'new update')
       //await delete_order_by_id(db, 'id')
       //const result = await get_by_id(db, 'id');
       console.log(result);
        await close_db(db)
       
    }
    catch (err) {
        console.log(`ERROR: ${err}`);
    }
}

main()

