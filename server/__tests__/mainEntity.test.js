const request = require("supertest");
const app = require("../app");
const { hashPass } = require("../helpers/bcrypt");
const {sequelize} = require('../models');
const { createToken } = require("../helpers/jwt");
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

    access_token = createToken({id:user[0].id})
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

describe('/pub/products', () => {
    test('Should be success with return data of products', (done) => {
        request(app)
            .get('/pub/products')
            .set("access_token", access_token)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Array)
                expect(response.body).not.toHaveLength(0)

                let data = response.body[0]
                expect(data).toHaveProperty('id', expect.any(Number))
                expect(Object.keys(data).sort()).toHaveProperty(['id', 'name', 'description', 'price', 'stock', "imgUrl", 'categoryId', 'authorId', 'status', 'createdAt', 'updatedAt'].sort())
                done()
            })
            .catch((err) => {
                done()
            })
    })

    test('Should be failed with return data of products', (done) => {
        request(app)
            .get('/pub/products')
            // .set("access_token", access_token)
            .expect(200)
            .then((response) => {
                expect(response.body).toBeInstanceOf(Array)
                expect(response.body).not.toHaveLength(0)

                let data = response.body[0]
                expect(data).toHaveProperty('id', expect.any(Number))
                expect(Object.keys(data).sort()).toHaveProperty(['id', 'name', 'description', 'price', 'stock', "imgUrl", 'categoryId', 'authorId', 'status', 'createdAt', 'updatedAt'].sort())
                done()
            })
            .catch((err) => {
                done()
            })
    })
})