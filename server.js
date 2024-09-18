require('dotenv').config()
const axios = require('axios')
const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


async function sendTemplateMessage({ date, amount, plan, reciepient, status, receiptId, workerName }) {
    try {

        const response = await axios({
            url: 'https://graph.facebook.com/v20.0/421183664408566/messages',
            method: 'post',
            headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                messaging_product: 'whatsapp',
                to: reciepient,
                type: 'template',
                template: {
                    name: 'deposit_template',
                    language: {
                        code: 'en_US'
                    },
                    components: [
                        {
                            type: 'body',
                            parameters: [
                                {
                                    type: 'text',
                                    text: date
                                },
                                {
                                    type: 'text',
                                    text: amount
                                },
                                {
                                    type: 'text',
                                    text: plan
                                },
                                {
                                    type: 'text',
                                    text: status,
                                },
                                {
                                    type: 'text',
                                    text: receiptId,
                                },
                                {
                                    type: 'text',
                                    text: workerName
                                },
                            ]
                        }
                    ]
                }
            })
        })

        return response.data
    } catch (error) {
        throw error
    }
}


app.post('/sendReciept', async (req, res) => {
    try {
        const { date, amount, plan, reciepient, status, receiptId, workerName } = req.body;
        console.log(date, amount, plan, reciepient, status, receiptId, workerName);

        sendTemplateMessage({ date, amount, plan, reciepient, status, receiptId, workerName })
        return res.json({ status: "ok" })
    } catch (error) {
        return res.json({ status: "error", error: error.message })
    }
})


app.listen(8080, () => console.log('Server running on port 8080'))
