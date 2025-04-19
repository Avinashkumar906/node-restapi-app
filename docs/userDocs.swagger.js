/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints related to user portfolio and profile
 */

/**
 * @swagger
 * /userdata:
 *   get:
 *     summary: Get default user portfolio
 *     tags: [Users]
 *     deprecated: true
 *     description: |
 *       - 🚨 This route is deprecated and will be removed in future versions. 
 *       - Use /portfolio in future
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User data retrieved
 */

/**
 * @swagger
 * /portfolio:
 *   get:
 *     summary: Get user's portfolio
 *     tags: [Users]
 *     description: |
 *       - With token: returns logged-in user's portfolio.  
 *       - Without token: returns default portfolio data.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Portfolio retrieved
 */

/**
 * @swagger
 * /nameandbio:
 *   post:
 *     summary: Update user's name and bio
 *     tags: [Users]
 *     security:
 *       - {}
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 default: John Doe
 *                 example: John Doe
 *               bio:
 *                 type: string
 *                 default: This user prefers to remain mysterious.
 *                 example: Passionate about learning new skills.
 *     responses:
 *       201:
 *         description: Name and bio updated
 *       403:
 *         description: Token not found
 */

/**
 * @swagger
 * /userabout:
 *   post:
 *     summary: Update about section
 *     tags: [Users]
 *     security:
 *       - {}
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Avinash Aggarwal
 *               designation:
 *                 type: string
 *                 example: PROGRAMMER
 *               position:
 *                 type: string
 *                 example: Freelancer
 *               age:
 *                 type: string
 *                 format: date
 *                 example: 1993-12-14
 *               city:
 *                 type: string
 *                 example: Delhi
 *               country:
 *                 type: string
 *                 example: India
 *               description:
 *                 type: string
 *                 example: >
 *                   I am a web designer and front-end web developer based in Delhi...
 *               services:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     image:
 *                       type: string
 *                       example: fas fa-rocket
 *                       description: FontAwesome icon class name (e.g., `fas fa-rocket`). Must be in the format `prefix fa-iconname`.
 *                       pattern: '^(fas|far|fab) fa-[a-z0-9-]+$'
 *                     title:
 *                       type: string
 *                       example: Responsive
 *                     description:
 *                       type: string
 *                       example: My layouts will work on any device...
 *               skills:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: ANGULAR
 *                     progress:
 *                       type: integer
 *                       example: 70
 *               pricing:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                       example: BASIC
 *                     price:
 *                       type: number
 *                       example: 19
 *                     services:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - App Designing
 *                         - App Development
 *                         - App Hosting
 *     responses:
 *       201:
 *         description: About section updated successfully
 *       403:
 *         description: Token not found
 */


/**
 * @swagger
 * /userportfolio:
 *   post:
 *     summary: Update user portfolio section
 *     tags: [Users]
 *     security:
 *       - {}
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               project:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     group:
 *                       type: array
 *                       items:
 *                         type: string
 *                     technology:
 *                       type: array
 *                       items:
 *                         type: string
 *                     day:
 *                       type: integer
 *                       example: 4
 *                     month:
 *                       type: string
 *                       example: "July"
 *                     year:
 *                       type: integer
 *                       example: 2020
 *                     name:
 *                       type: string
 *                       example: "MEAN NG5X PROJECT"
 *                     title:
 *                       type: string
 *                       example: "MEAN NG5X PROJECT"
 *                     link:
 *                       type: string
 *                       example: "http://asquare.gq/"
 *                     git:
 *                       type: string
 *                       example: "https://bitbucket.org/avinashkumar906/ngx5profile.git"
 *                     youtube:
 *                       type: string
 *                       example: "NA"
 *                     description:
 *                       type: string
 *                     image:
 *                       type: string
 *                       example: "https://res.cloudinary.com/sandyrocx/image/upload/v1593345966/k43ebtkvxvz5uqulmofb.jpg"
 *                     public_id:
 *                       type: string
 *                       example: "kfmeio8wz7dadfieuew0"
 *     responses:
 *       201:
 *         description: Portfolio updated successfully
 *       403:
 *         description: Token not found
 */



/**
 * @swagger
 * /userresume:
 *   post:
 *     summary: Upload or update resume
 *     tags: [Users]
 *     security:
 *       - {}
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               education:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     college:
 *                       type: string
 *                     date:
 *                       type: string
 *                     description:
 *                       type: string
 *               experience:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *                     college:
 *                       type: string
 *                     date:
 *                       type: string
 *                     description:
 *                       type: string
 *               testimonial:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     clientName:
 *                       type: string
 *                     position:
 *                       type: string
 *                     company:
 *                       type: string
 *                     saying:
 *                       type: string
 *     responses:
 *       201:
 *         description: Resume updated successfully
 *       403:
 *         description: Token not found
 */


/**
 * @swagger
 * /usercontact:
 *   post:
 *     summary: Update user contact info
 *     tags: [Users]
 *     security:
 *       - {}
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: object
 *                 properties:
 *                   line1:
 *                     type: string
 *                   line2:
 *                     type: string
 *               contact:
 *                 type: object
 *                 properties:
 *                   mob:
 *                     type: integer
 *                   email:
 *                     type: string
 *               web:
 *                 type: object
 *                 properties:
 *                   url:
 *                     type: string
 *                   url2:
 *                     type: string
 *     responses:
 *       201:
 *         description: Contact information updated
 *       403:
 *         description: Token not found
 */


/**
 * @swagger
 * /resume:
 *   get:
 *     summary: Download the resume PDF of Admin
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Resume downloaded
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 */

