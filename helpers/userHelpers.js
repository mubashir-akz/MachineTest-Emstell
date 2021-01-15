const db = require("../config/connection");
const collections = require("../config/collections");
const ObjectID = require("mongodb").ObjectID;
const bcrypt = require('bcrypt')



// eslint-disable-next-line no-undef
module.exports = {
    RegistrationValidation: (data) => {
        return new Promise((resolve) => {
            db.get().collection(collections.USERS).find({ Username: data.Username }).toArray().then((datas) => {
                if (datas.length > 0) {
                    resolve({ status: false })
                } else {
                    db.get().collection(collections.USERS).insertOne({ Username: data.Username, password: data.password, email: data.email }).then(() => {
                        resolve({ status: true })
                    })
                }
            })
        })
    },
    loginValidation: (data) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collections.USERS).find({ Username: data.Username }).toArray().then((datas) => {
                if (datas[0]) {
                    bcrypt.compare(data.password, datas[0].password).then((status) => {
                        if (status) {
                            resolve({ status: true, data: datas });
                        } else {
                            resolve({ status: false });
                        }
                    })
                } else {
                    resolve({ status: false });
                }
            })
        })
    },
    addTodo: (data, id) => {
        return new Promise((resolve, reject) => {
            data.ownerId = id
            db.get().collection(collections.TODOS).insertOne(data).then(() => {
                resolve()
            })
        })
    },
    getTodo: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collections.TODOS).find({ ownerId: id }).toArray().then((data) => {
                resolve(data)
            })
        })
    },
    removeTodo: (id) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collections.TODOS).deleteOne({ _id: ObjectID(id) }).then(() => {
                resolve()
            })
        })
    },
    editTodo: (id,text) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collections.TODOS).updateOne({ _id: ObjectID(id) },{$set:{todo:text}}).then(() => {
                resolve()
            })
        })
    },
    deleteAllTodo:(id)=>{
        return new Promise((resolve, reject) => {
            db.get().collection(collections.TODOS).remove({ ownerId: id }).then(() => {
                resolve()
            })
        })
    }
}