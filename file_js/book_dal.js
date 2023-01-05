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
        db.all("SELECT * from BOOKS", function (err, rows) {
            if (err) { return reject(err); }
            resolve(rows);
        });
    });
}


function get_by_id(db  , id) {
    return new Promise(function (resolve, reject) {
        db.all(`SELECT * from BOOKS WHERE ID = ${id}`, function (err, rows) {
            if (err) { return reject(err); }
            resolve(rows);
        });
    });
}

function find_by_title(db  , title) {
    return new Promise(function (resolve, reject) {
        db.all(`SELECT * FROM BOOKS WHERE title LIKE '%${title}%' `, function (err, rows) {
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

function update_image_by_id(db, id, image) {
    const sql_update = `UPDATE BOOKS 
                        SET BOOK_IMAGE_SRC = ?
                        WHERE id = ?`
    db.run(sql_update, [image, id], err => {
        if (err) {
            console.log(`ERROR: ${err}`);
        }
        else {
            console.log(`image updated to ${image}`);
        }
    })
}

function delete_book_by_id(db, id) {
    return new Promise(function (resolve, reject) {
        const sql_update = `DELETE FROM BOOKS 
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
    const sql_insert = `INSERT INTO BOOKS (TITLE, AUTHOR, PUbLISH_YEAR, PRICE, LEFT_IN_STOCK, BOOK_IMAGE_SRC)
                        VALUES (?,?,?,?,?,?);`
    db.run(sql_insert, data, err => {
        if (err) { return reject(err); }
        resolve(data);
    })
    })
}

function update_book_by_id(db, id, column, new_update) {
    return new Promise(function (resolve, reject) {
        const sql_update = `UPDATE BOOKS 
                        SET ${column} = ?
                        WHERE id = ?`
        db.run(sql_update, [new_update, id], err => {
            if (err) {
                console.log(`ERROR: ${err}`);
                reject(err)
            }
            else {
                console.log(`Book updated to ${new_update}`);
                resolve(new_update)
            }
        })
    })
}

function book_amazon(){
    fetch("https://api.airtable.com/v0/appybL1OJaEEIvAdS/Books?api_key=keymAugpaEvXsyGBr")
    .then(result => result.json())
        .then(result => {         
            for (let i = 0 ; i <= 49 ; i++ ){
                    insert( db, [ result.records[i].fields.Title , result.records[i].fields.Author , result.records[i].createdTime , Math.floor(Math.random() * 50 + 30) , Math.floor(Math.random() * 20 + 10) ,  result.records[i].fields.Amazon_Link]  ) ;
            }    
        })
}

function apply_fk(db) {
    db.get("PRAGMA foreign_keys = ON", (err, res) => {
        if (err) { console.log(`error ${JSON.stringify(err)}`);  }// if there is an error
        if (res) { console.log(`res ${JSON.stringify(res)}`); }// just a result
    })
}

async function main() {
    try {
        const db = await open_db(db_file_loc)
       // console.log(db);
       //const result = await insert(db, ["My Na" , "Isabel Allende" , 2019 , 68 , 15 , "https://www.amazon.com/Great-Indian-Novel-Shashi-Tharoor/dp/0140120491?tag=pueblocolab-20"])
       // await book_amazon()
       //await update_image_by_id(db, 70, a_image[3])
       const result = await get_all(db);
       
       //const result = await find_by_title(db, 'of the');
       // await update_book_by_id(db, 121, 'TITLE', 'Hey Boys')
       
       
       //await delete_book_by_id(db, 118)
       //const result = await get_by_id(db, 119);
       console.log(result);
        await close_db(db)
       
    }
    catch (err) {
        console.log(`ERROR: ${err}`);
    }
}

main()


const a_image = [
    'https://m.media-amazon.com/images/I/31RQXUz0n8L._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
    'https://m.media-amazon.com/images/I/31yey2Aj6YL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
    'https://m.media-amazon.com/images/I/412FIVFgqnL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg',
    'https://m.media-amazon.com/images/I/41NrvHGS3lL._SX331_BO1,204,203,200_.jpg',
]
// UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='BOOKS';
//לאפס את הטבלה שיתחיל מ 1