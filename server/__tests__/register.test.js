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

describe('/pub/register', () => {
    test('Should be success and return status 201 user id and email', (done) => {
        const user = {email: 'test1@mail.com', password: '321321'}
        request(app)
            .post('/pub/register')
            .send(user)
            .expect(201)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('id', expect.any(Number))
                expect(response.body).toHaveProperty('email', user.email)
                expect(response.body).not.toHaveProperty('password')
                done()
            })
            .catch((err) => {
                done(err)
            })
    })

    test('Should be fail and return status 400 with message email is required', (done) => {
        const user = {password: '321321'}
        request(app)
            .post('/pub/register')
            .send(user)
            .expect(400)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('msg', expect.any('Email is required'))
                done()
            })
            .catch((err) => {
                done()
            })
    })

    test('Should be fail and return status 400 with message password is required', (done) => {
        const user = {email: 'test1@mail.com'}
        request(app)
            .post('/pub/register')
            .send(user)
            .expect(400)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('msg', expect.any('Password is required'))
                done()
            })
            .catch((err) => {
                done()
            })
    })

    test('Should be fail and return status 400 with message email must be unique', (done) => {
        const user = {email: 'jleander0@newyorker.com', password: '321321'}
        request(app)
            .post('/pub/register')
            .send(user)
            .expect(400)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('msg', expect.any('email must be unique'))
                done()
            })
            .catch((err) => {
                done()
            })
    })

    test('Should be fail and return status 400 with message Password must be minimal 5 characters', (done) => {
        const user = {email: 'test1@mail.com', password: '1'}
        request(app)
            .post('/pub/register')
            .send(user)
            .expect(400)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('msg', expect.any('Password must be minimal 5 characters'))
                done()
            })
            .catch((err) => {
                done()
            })
    })

    test('Should be fail and return status 400 with message Must be email format', (done) => {
        const user = {email: 'test1', password: '321321'}
        request(app)
            .post('/pub/register')
            .send(user)
            .expect(400)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Object)
                expect(response.body).toHaveProperty('msg', expect.any('Must be email format'))
                done()
            })
            .catch((err) => {
                done()
            })
    })
})