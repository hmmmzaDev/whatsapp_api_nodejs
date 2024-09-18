require('dotenv').config()
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')

async function sendTemplateMessage() {
    const response = await axios({
        url: 'https://graph.facebook.com/v20.0/421183664408566/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: '+923080931832',
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
                                text: "date"
                            },
                            {
                                type: 'text',
                                text: "amount"
                            },
                            {
                                type: 'text',
                                text: "plan"
                            },
                            {
                                type: 'text',
                                text: "ignored"
                            },
                            {
                                type: 'text',
                                text: "jnfkjnsfdkwer"
                            },
                            {
                                type: 'text',
                                text: "Developer"
                            },
                        ]
                    }
                ]
            }
        })
    })

    console.log(response.data)
}

async function sendTextMessage() {
    const response = await axios({
        url: 'https://graph.facebook.com/v20.0/421183664408566/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: '+923030031487',
            type: 'text',
            text: {
                body: 'Kya haal hain beta??'
            }
        })
    })

    console.log(response.data)
}

async function sendMediaMessage() {
    const response = await axios({
        url: 'https://graph.facebook.com/v20.0/435886059601181/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: '+923030031487',
            type: 'image',
            image: {
                //link: 'https://dummyimage.com/600x400/000/fff.png&text=manfra.io',
                id: '512126264622813',
                caption: 'This is a media message'
            }
        })
    })

    console.log(response.data)
}

async function uploadImage() {
    const data = new FormData()
    data.append('messaging_product', 'whatsapp')
    data.append('file', fs.createReadStream(process.cwd() + '/logo.png'), { contentType: 'image/png' })
    data.append('type', 'image/png')

    const response = await axios({
        url: 'https://graph.facebook.com/v20.0/phone_number_id/media',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`
        },
        data: data
    })

    console.log(response.data)
}

sendTemplateMessage()

// sendTextMessage()

// sendMediaMessage()

// uploadImage()
