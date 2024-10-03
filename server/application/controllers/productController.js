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

    async getProducts(req, res) {
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

    async getProductGroupedController(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
    
            const product = await this.productService.getProductGropedService(req.params.artesanoId);
            return res.status(200).json(product);
        } catch (error) {
            console.error('Error details:', error);
    
            let errorResponse;
            try {
                errorResponse = JSON.parse(error.message);
            } catch {
                errorResponse = {
                    status: 500,
                    message: "An unexpected error occurred."
                };
            }
    
            return res.status(errorResponse.status || 500).json({ message: errorResponse.message || "An unexpected error occurred." });
        }
    }

    async getProductsGroupedByArtesanoWithNameCOntroller(req, res) {
        console.log('Received Params:', req.params);
        console.log('Received Query:', req.query);
    
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log('Validation Errors:', errors.array());
                return res.status(400).json({ errors: errors.array() });
            }
    
            const { artesanoId } = req.params;
            const searchTerm = req.query.searchTerm || '';
    
            console.log('Artensano ID:', artesanoId);
            console.log('Search Term:', searchTerm);
    
            const product = await this.productService.getProductsGroupedByArtesanoWithNamesService(artesanoId, searchTerm);
            res.status(200).json(product);
        } catch (error) {
            let errorObj;
            try {
                errorObj = JSON.parse(error.message);
            } catch {
                errorObj = { status: 500, message: 'Internal server error' };
            }
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }


    async getAllProductsWithDescuentoController(req, res){
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
            const product = await this.productService.getAllProductsWithDescuentoService();
            res.status(200).json(product);
        }catch(error){
            const errorObj = JSON.parse(error.message);
            res.status(errorObj.status).json({ message: errorObj.message });
        }
    }

    
}


module.exports = productController