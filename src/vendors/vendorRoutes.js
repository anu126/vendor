const router = require('express').Router();
const {getVendor, getOneVendor, addVendor, updateVendor, deleteVendor, addProduct, removeProduct} = require('./vendorController')

/**
 * @swagger
 *  /vendor:
 *    get:
 *      tags:
 *          - "vendors"
 *      summary: get all vendors
 *      produces:
 *          - application/json
 *      responses:
 *          '200':
 *              content:
 *                  application/json:
 *                      schema:
 *                         type: array
 *                         items:
 *                            $ref: '#/components/schemas/vendor'
 */
router.get('/', getVendor)


/**
 * @swagger
 *  /vendor/{ID}:
 *    get:
 *      tags:
 *          - "vendors"
 *      summary: get one vendor
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: ID
 *            description: _id of the vendor
 *            in: path
 *            required: true
 *      responses:
 *          '200':
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/vendor'
 */
router.get('/:id',getOneVendor)

/**
 * @swagger
 *  /vendor:
 *    post:
 *      tags:
 *          - "vendors"
 *      summary: create new vendor
 *      produces:
 *          - application/json
 *      requestBody:
 *          description: A JSON object for creating vendor
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: 'object'
 *                      required:
 *                          - email
 *                          - name
 *                          - age
 *                      properties:
 *                          email:
 *                              type: 'string'
 *                          name:
 *                              type: 'string'
 *                          age:
 *                              type: 'number'
 *      responses:
 *          '200':
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/vendor'
 */
router.post('/', addVendor)

/**
 * @swagger
 *  /vendor/{ID}:
 *    put:
 *      tags:
 *          - "vendors"
 *      summary: update one vendor
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: ID
 *            description: _id of the vendor
 *            in: path
 *            required: true
 *      requestBody:
 *          description: A JSON object for updating vendor
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/vendor'
 *      responses:
 *          '200':
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/vendor'
 */
router.put('/:id', updateVendor)

/**
 * @swagger
 *  /vendor/{ID}:
 *    delete:
 *      tags:
 *          - "vendors"
 *      summary: delete one vendor
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: ID
 *            description: _id of the vendor
 *            in: path
 *            required: true
 *      responses:
 *          '200':
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: 'string'
 */
router.delete('/:id', deleteVendor)

/**
 * @swagger
 *  /vendor/{ID}/product:
 *    post:
 *      tags:
 *          - "vendors"
 *      summary: add product for vendor
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: ID
 *            description: _id of the vendor
 *            in: path
 *            required: true
 *      requestBody:
 *          description: A JSON object for adding product
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: 'object'
 *                      required:
 *                          - product_id
 *                      properties:
 *                          product_id:
 *                              type: 'string'
 *      responses:
 *          '200':
 *              description: Category
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/vendor'
 */
router.post('/:id/product', addProduct)

/**
 * @swagger
 *  /vendor/{ID}/product/{PRODUCT_ID}:
 *    delete:
 *      tags:
 *          - "vendors"
 *      summary: delete one vendor
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: ID
 *            description: _id of the vendor
 *            in: path
 *            required: true
 *          - name: PRODUCT_ID
 *            description: _id of the product
 *            in: path
 *            required: true
 *      responses:
 *          '200':
 *              description: Category
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/vendor'
 */
router.delete('/:id/product/:product_id', removeProduct)

module.exports = router;