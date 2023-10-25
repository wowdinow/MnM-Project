const { comparePass } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User, Category, Product, History, Wishlist } = require("../models");
const { Op } = require("sequelize");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();
const axios = require('axios')

class ControllerPublic {

    static async register(req, res, next) {
        try {
          let { userName, email, password, phoneNumber, address } = req.body;
          
          let user = await User.create({
            userName,
            email,
            password,
            phoneNumber,
            address,
            role: 'Customer'
          });
          res.status(201).json({ id: user.id, email });
        } catch (err) {
          console.log(err);
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
        
      static async readAllProducts(req, res, next) {
        let { page, search } = req.query

        let option = {}

        if(search){
          option.where = {name: {[Op.iLike]: `%${search}%`}}
        }

        let limit = 9

        if(page){
          option.limit = limit,
          option.offset = (page*limit - limit)
        } else {
          option.limit = limit
        }

        try {
          let {rows, count} = await Product.findAndCountAll(option);
          res.status(200).json({data: rows, totalPage: Math.ceil(count/limit)});
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

      static async qrDetail(req, res, next){
        try {
          // let url = 'https://mnm-hck62.web.app/products/'
          let url = 'http:/localhost:3000/pub/products/'
          let {data} = await axios({
            url: "https://api.qr-code-generator.com/v1/create?access-token=OMc9ZxKwQ_ORuRgXWhRIvEx2-v7-ikj5HYBh0xCs1bfk5g41t9nX1nbGNxnuUl0u",
            method: 'POST',
            data: {
              frame_name: "no-frame",
              qr_code_text: url + req.params.id,
              image_format: "SVG",
              qr_code_logo: "scan-me-square"
          }
          })

          // console.log(data);
          res.status(200).json(data)
        } catch (err) {
          console.log(err);
          next(err)
        }
      }

      static async readWishlist(req, res, next){
        try {
          let data = await Wishlist.findAll({include: Product},{where: {UserId: req.user.id}})
          res.status(200).json(data)
        } catch (err) {
          next(err)
        }
      }

      static async addWishlist(req, res, next){
        try {
          let wishlist = await Wishlist.findOne({where: {ProductId: req.params.id}})

          if(wishlist){
            throw {name: 'Duplicated'}
          }

          await Wishlist.create({
            UserId: req.user.id,
            ProductId: req.params.id
          })

          res.status(200).json({message: "Added to wishlist"})
        } catch (err) {
          next(err)
        }
      }

      static async deleteWishlist(req, res, next){
        try {
          let wishlist = await Wishlist.findOne({where: {id: req.params.id}})

          if(!wishlist){
            throw {name: 'NotFound'}
          }

          await Wishlist.destroy({
            where: {id: req.params.id}
          })

          res.status(200).json({message: "Successfully deleted"})
        } catch (err) {
          next(err)
        }
      }
}

module.exports = ControllerPublic