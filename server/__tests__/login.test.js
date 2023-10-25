const request = require("supertest");
const app = require("../app");
const { hashPass } = require("../helpers/bcrypt");
const {sequelize} = require('../models')
const {queryInterface} = sequelize

beforeAll(async () => {
  try {
    let user = require("../data/user.json");
    user = user.map((el) => {
      delete el.id;
      el.password = hashPass(el.password);
      el.createdAt = new Date();
      el.updatedAt = new Date();
      return el;
    });

    await queryInterface.bulkInsert("Users", user, {});

    let category = require("../data/category.json")
    category = category.map((el) => {
     delete el.id
     el.createdAt = new Date()
     el.updatedAt = new Date()
     return el
    })
 
    await queryInterface.bulkInsert("Categories", category, {})

    let product = require("../data/product.json")
    product = product.map((el) => {
     delete el.id
     el.createdAt = new Date()
     el.updatedAt = new Date()
     return el
    })
 
    await queryInterface.bulkInsert("Products", product, {})
  } catch (err) {
    console.log(err);
  }
});

afterAll(async () => {
    try {
        await queryInterface.bulkDelete("Products", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true
        })
        await queryInterface.bulkDelete("Categories", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true
        })
        await queryInterface.bulkDelete("Users", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true
        })
    } catch (err) {
        console.log(err);
    }
});

describe('/pub/login', () => {
    test('Should be success and return user id and email', (done) => {
        const user = {email: 'jleander0@newyorker.com', password: '321321'}
        request(app)
            .post('/pub/login')
            .send(user)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('id', expect.any(Number))
                expect(response.body).toHaveProperty('email', expect.any(String))
                expect(response.body).not.toHaveProperty('password')
                done()
            })
            .catch((err) => {
                done()
            })
    })

    test('Should be fail and return message Email/Password is required', (done) => {
        const user = {password: '321321'}
        request(app)
            .post('/pub/login')
            .send(user)
            .expect(400)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('message', expect.any('Email/Password is required'))
                done()
            })
            .catch((err) => {
                done()
            })
    })
    
    test('Should be fail and return message Email/Password is required', (done) => {
        const user = {email: 'jleander0@newyorker.com'}
        request(app)
            .post('/pub/login')
            .send(user)
            .expect(400)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('message', expect.any('Email/Password is required'))
                done()
            })
            .catch((err) => {
                done()
            })
    })
    
    test('Should be fail and return message User not found', (done) => {
        const user = {email: 'jleander0@newyorker111.com', password: '321321'}
        request(app)
            .post('/pub/login')
            .send(user)
            .expect(400)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('message', expect.any('User not found'))
                done()
            })
            .catch((err) => {
                done()
            })
    })    
})