/**
  * @swagger
  * /api/v1/shipments/store:
  *   post:
  *     tags:
  *       - Create new shipment
  *     summary: This endpoint is used to create a new shipment for a package
  *     parameters:
  *       - name: name
  *         description: Name of the sender
  *         in: formData
  *         required: true
  *         type: string
  *       - name: sender_city
  *         description: The sender's city
  *         in: formData
  *         required: true
  *         type: string
  *       - name: sender_country
  *         description: Country of the sender
  *         in: formData
  *         required: false
  *         type: string
  *       - name: sender_email
  *         description: Email address of the sender
  *         in: formData
  *         required: false
  *         type: string
  *       - name: sender_mobile
  *         description: Country of the sender
  *         in: formData
  *         required: false
  *         type: string
  *     responses:
  *       200:
  *         description: Send hello message
  *         example:
  *           message: Hello Guess
  */