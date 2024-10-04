const {validationResult} = require("express-validator")
const productService  = require("../services/productServices")


class productController{
    constructor(){
        this.productService = new productService ()
    }

    async getproduct(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.getProductById(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getproductForcategory(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.getProductCategory(req.body);
            res.status(200).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getproductForcategoryAndFavorite(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.getProductCategoryAndFavorite(req.body);
            res.status(200).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }


    async getproductForDiscounts(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.getProductsDiscounts(req.body);
            res.status(200).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getProductsAll(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.getAllProduct();
            res.status(200).json(product);
        }catch(error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async createProduct(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.updateProduct(req.params.id, req.body);
            res.status(200).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.deleteProduct(req.params.id);
            res.status(204).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    async getProductsGroupedByArtesanoWithName(req, res) {  
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.getProductsGroupedByArtesanoWithNames(req.params.id);
            res.status(200).json(product);
        } catch (error) {
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }
    
}


module.exports = productController