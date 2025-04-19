/**
 * Swagger documentation for Auth routes
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication routes
 */

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 default: "John Doe"  # Default value for name
 *               email:
 *                 type: string
 *                 format: email
 *                 default: "john.doe@example.com"  # Default value for email
 *               password:
 *                 type: string
 *                 default: "password123"  # Default value for password
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: User already exists or bad request
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Sign in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: "john.doe@example.com"  # Default value for email
 *               password:
 *                 type: string
 *                 default: "password123"  # Default value for password
 *     responses:
 *       201:
 *         description: Logged in with token
 *       401:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /validate:
 *   get:
 *     summary: Validate a token and return user info
 *     tags: [Auth]
 *     security:
 *       - {}
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User validated
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: No token provided
 */

/**
 * @swagger
 * /resettoken:
 *   post:
 *     summary: Generate a reset token and send email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 default: "john.doe@example.com"  # Default value for email
 *               from:
 *                 type: string
 *                 default: "no-reply@example.com"  # Default value for from
 *               subject:
 *                 type: string
 *                 default: "Password Reset"  # Default value for subject
 *     responses:
 *       200:
 *         description: Reset token sent
 *       400:
 *         description: User not found
 */

/**
 * @swagger
 * /reset:
 *   post:
 *     summary: Reset password using token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - token
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 default: "john.doe@example.com"  # Default value for email
 *               token:
 *                 type: string
 *                 default: "sample-reset-token"  # Default value for token
 *               password:
 *                 type: string
 *                 default: "newpassword123"  # Default value for password
 *     responses:
 *       201:
 *         description: Password reset successful
 *       400:
 *         description: Invalid token or user not found
 */
