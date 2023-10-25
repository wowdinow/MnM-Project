const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Category, Product, History } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class Controller {
  static async register(req, res, next) {
    try {
      let { userName, email, password, phoneNumber, address } = req.body;

      let user = await User.create({
        userName,
        email,
        password,
        phoneNumber,
        address,
        role: 'Admin'
      });
      res.status(201).json({ id: user.id, email });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      let { email, password } = req.body;

      if (!email || !password) {
        throw { name: "EmailPasswordRequired" };
      }

      let user = await User.findOne({ where: { email } });

      if (!user || !comparePass(password, user.password)) {
        throw { name: "InvalidEmailPassword" };
      }

      let access_token = createToken({ id: user.id });

      res.status(200).json({ access_token, userName: user.userName });
    } catch (err) {
      next(err);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      let token = req.headers.access_token;
      const tiket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.G_Oauth_ID,
      });
      const { email, name } = tiket.getPayload();
      let user = await User.findOne({ where: { email } });

      if (!user) {
        user = await User.create(
          {
            userName: name,
            email,
            password: "google user",
            role: "Staff",
          },
          { hooks: false }
        );
      }
      
      let access_token = createToken({ id: user.id });
      console.log(access_token);
      res.status(200).json({ access_token, userName: user.userName });
    } catch (err) {
      console.log(err, "ini di server");
      next(err);
    }
  }

  static async addProduct(req, res, next) {
    const { name, description, price, stock, imgUrl, categoryId } = req.body;
    const { id } = req.user;

    // console.log(req.user.id);

    try {
      let data = await Product.create({
        name,
        description,
        price,
        stock,
        imgUrl,
        categoryId,
        authorId: id,
      });

      let user = await User.findByPk(req.user.id);

      await History.create({
        name: `${data.name}`,
        description: `new entity with id #${data.id} created`,
        updatedBy: user.email,
      });

      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async readAllProducts(req, res, next) {
    try {
      let data = await Product.findAll({ include: User });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async readProductById(req, res, next) {
    let { id } = req.params;

    try {
      let data = await Product.findByPk(id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      if (!req.params.id) {
        throw { name: "NotFound" };
      } else {
        let { name, categoryId, description, stock, price, imgUrl } = req.body;
        categoryId = +categoryId;
        stock = +stock;
        price = +price;
        let data = await Product.findByPk(req.params.id);

        if (
          !name ||
          !categoryId ||
          !description ||
          !stock ||
          !price ||
          !imgUrl
        ) {
          throw { name: "BadRequest" };
        }

        await Product.update(
          {
            name,
            categoryId,
            description,
            stock,
            price,
            imgUrl,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );

        let user = await User.findByPk(req.user.id);

        await History.create({
          name: `${req.body.name}`,
          description: `new entity with id #${req.params.id} updated`,
          updatedBy: user.email,
        });

        res.status(200).json(data);
      }
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async updateStatusProduct(req, res, next) {
    try {
      if (!req.params.id) {
        throw { name: "NotFound" };
      } else {
        let data = await Product.findByPk(req.params.id);

        await Product.update(
          {
            status: req.body.status,
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );

        let user = await User.findByPk(req.user.id);

        await History.create({
          name: `${data.name}`,
          description: `entity status with id #${req.params.id} has been updated from ${data.status} to ${req.body.status}`,
          updatedBy: user.email,
        });

        res
          .status(200)
          .json({
            message: `Success update status product id #${req.params.id}`,
          });
      }
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async deleteProduct(req, res, next) {
    let { id } = req.params;
    try {
      if (!id) {
        throw { name: "NotFound" };
      } else {
        let data = await Product.findByPk(id);
        await Product.destroy({ where: { id } });
        res.status(200).json({ message: `${data.name} success to delete` });
      }
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async readAllByCategory(req, res, next) {
    try {
      let data = await Category.findAll({ include: Product });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async addCategory(req, res, next) {
    try {
      let { name } = req.body;
      let data = await Category.create({ name });

      let user = await User.findByPk(req.user.id);

      await History.create({
        name: `${data.name}`,
        description: `new entity with id #${user.id} created`,
        updatedBy: user.email,
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async readCategoryById(req, res, next) {
    try {
      let { id } = req.params;
      let data = await Category.findByPk(id);
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      if (!req.params.id) {
        throw { name: "NotFound" };
      } else {
        let { name } = req.body;

        let data = await Category.findByPk(req.params.id);

        if (!name) {
          throw { name: "BadRequest" };
        }

        let newData = await Category.update(
          {
            name
          },
          {
            where: {
              id: req.params.id,
            },
          }
        );

        let user = await User.findByPk(req.user.id);

        await History.create({
          name: `${req.body.name}`,
          description: `new entity with id #${req.params.id} updated`,
          updatedBy: user.email,
        });

        res.status(200).json(data);
      }
    } catch (err) {
      // console.log(err);
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      let { id } = req.params;
      console.log(req.params);
      let category = await Category.findByPk(id);
      console.log(category);
      await Product.destroy({ where: { categoryId: category.id } });
      let data = await Category.destroy({ where: { id } });
      res
        .status(200)
        .json({
          message: `Category with id ${req.params.id} successfully deleted`,
        });
    } catch (err) {
      next(err);
    }
  }

  static async readHistory(req, res, next) {
    try {
      let data = await History.findAll({ order: [["id", "DESC"]] });

      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
