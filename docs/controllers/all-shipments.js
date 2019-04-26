/**
  * @swagger
  * /api/v1/shipments/all-shipments:
  *   get:
  *     tags:
  *       - Get all shipments
  *     summary: This endpoint is used to returns all shipments om the system
  *     parameters:
  *       - name: name
  *         description: Name of the user
  *         in: query
  *         required: false
  *         type: string
  *     responses:
  *       200:
  *         description: Send hello message
  *         example:
  *           message: Hello Guess
  */