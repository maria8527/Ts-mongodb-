/**
 * @swagger
 * components:
 *   schemas:
 *       Photo:
 *            type: object
 *            properties:
 *                _id:  
 *                     type: string
 *                     description: objectId of photos
 *                albumId:
 *                     type: number 
 *                     description: albumId of photo
 *                id:
 *                     type: number
 *                     description: idphoto of photo
 *                title:
 *                     type: string
 *                     description: title of photo
 *                url:
 *                     type: string
 *                     description: url of photo
 *                thumbnailUrl:
 *                     type: string
 *                     description: thumbnailUrl of photo 
 *            required:
 *                - albumId
 *                - idphotos 
 *                - title
 *                - url
 *                - thumbnailUrl
 * 
 */
/**
 * @swagger
 * /photos:
 *  post: 
 *      summary: Creates a new photo
 *      tags: [Photos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Photo'
 *      responses:
 *          201:
 *              description: Successfully created a new photo
 *          500:
 *              description: Failed to create a new game    
 *               
 */
/**
 * @swagger
 * /photos:
 *  get:
 *      summary: Bring all photos
 *      tags: [Photo]
 *      responses:
 *          200:
 *              description: Brought all the photos
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Photo'
 *      
 */
/**
 * @swagger
 * /:id:
 *  put:
 *      summary: Edit the photos
 *      tags: [Photo]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: Identificador de la photo
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                 schema:
 *                   type: object
 *                   $ref: '#/components/schemas/Photo'
 *      responses:
 *          200:
 *              description: Successfully updated photos
 *              content:
 *                 application/json:
 *                  schema:
 *                     type: object
 *                     $ref: '#/components/schemas/Photo'
 *          304:
 *              description: Photos with id not updated
 * 
 */
/**
 * @swagger
 * /:id:
 *  delete:
 *      summary: Delete a photo
 *      tags: [Photo]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *              type: number
 *          required: true
 *          description: Identificador de la photo
 *      responses:
 *          202:
 *              description: Successfully removed photo
 *          400:
 *              description: Failed to remove photo
 *          404:
 *              description: Photo with id does not exist
 *              
 * 
 * 
 */