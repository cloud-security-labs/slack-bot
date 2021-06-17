require('dotenv').config();
var nodemailer = require('nodemailer');
const { App } = require('@slack/bolt');
var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({

});

var messages = '';



const bot = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
});


(async () => {
    // Start the app
    await bot.start(process.env.PORT || 3000);

    getAllMessagesFromChannel(true);

    // sendChatEmail();

    console.log('⚡ Bot app is running!');
})();


bot.event("app_mention", async ({ context, event }) => {

    console.log(event.channel);
    console.log(messages);


    try{
        await bot.client.chat.postMessage({
            token: context.botToken,
            channel: event.channel,
            // text: `Hey yoo <@${event.user}> you mentioned me?`
            text: messages
        });
    }
    catch (e) {
        console.log(`error responding ${e}`);
    }

});


const getAllMessagesFromChannel = (channel) => {

    var config = {
        method: 'get',
        url: 'https://slack.com/api/conversations.history?channel=C022YGTD403&pretty=1',
        headers: {
            'Authorization': 'Bearer xoxb-2112974963105-2098423279941-1rCvIMbysn06Z0CqExTCO46R'
        },
        data : data
    };

    axios(config)
        .then(function (response) {


            messages = JSON.stringify(response.data);


            // console.log(response.data);

            // console.log(JSON.stringify(response.data));

        })
        .catch(function (error) {
            console.log(error);
        });

}

const sendChatEmail = () => {

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'user ',
            pass: 'pass'
        }
    });


    var mailOptions = {
        from: 'from@gmail.com',
        to: 'to@gmail.com',
        subject: 'Sending',
        text: 'Easy!'
    };


    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}
