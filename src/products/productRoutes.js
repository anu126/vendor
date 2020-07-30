const router = require('express').Router();
const {
    getProduct, 
    getOneProduct, 
    createProduct, 
    updateProduct, 
    deleteProduct
} = require('./productController')


/**
 * @swagger
 *  /product:
 *    get:
 *      tags:
 *          - "products"
 *      summary: get all products
 *      produces:
 *          - application/json
 *      responses:
 *          '200':
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: array
 *                         items:
 *                            $ref: '#/components/schemas/product'
 */
router.get('/', getProduct)


/**
 * @swagger
 *  /product/{ID}:
 *    get:
 *      tags:
 *          - "products"
 *      summary: get one product
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: ID
 *            description: _id of the product
 *            in: path
 *            required: true
 *      responses:
 *          '200':
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/product'
 */
router.get('/:id', getOneProduct)


/**
 * @swagger
 *  /product:
 *    post:
 *      tags:
 *          - "products"
 *      summary: create new product
 *      produces:
 *          - application/json
 *      requestBody:
 *          description: A JSON object for creating product
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: 'object'
 *                      required:
 *                          - product_name
 *                          - product_price
 *                          - product_description
 *                      properties:
 *                          product_name:
 *                              type: 'string'
 *                          product_price:
 *                              type: 'number'
 *                          product_description:
 *                              type: 'string'
 *      responses:
 *          '200':
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/product'
 */
router.post('/', createProduct)


/**
 * @swagger
 *  /product/{ID}:
 *    put:
 *      tags:
 *          - "products"
 *      summary: update one product
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: ID
 *            description: _id of the product
 *            in: path
 *            required: true
 *      requestBody:
 *          description: A JSON object for updating product
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/product'
 *      responses:
 *          '200':
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/product'
 */
router.put('/:id', updateProduct)


/**
 * @swagger
 *  /product/{ID}:
 *    delete:
 *      tags:
 *          - "products"
 *      summary: delete one product
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: ID
 *            description: _id of the product
 *            in: path
 *            required: true
 *      responses:
 *          '200':
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: 'object'
 *                          properties:
 *                              id:
 *                                  type: 'string'
 */
router.delete('/:id', deleteProduct)

module.exports = router;
