var amqp = require('amqplib/callback_api');
import { Rabbitmq_sendMail } from '../utils/mailer.js';

export const sender = (data) => {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'Rabbit_Queue';
            var msg = JSON.stringify(data);

            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));

            console.log(" [x] Sent %s", msg);
        });
    });
}

// export const sender = async (data) => {
//     try {
//         const strData = JSON.stringify(data);
//         const amqpServer = "amqp://localhost"
//         const connection = await amqp.connect(amqpServer)
//         const channel = await connection.createChannel();
//         await channel.assertQueue("register");
//         channel.sendToQueue("register", Buffer.from(strData));
//         console.log(`Job sent successfully ${strData}`);
//     }
//     catch (ex) {
//         console.error(ex)
//     }
// }


export const receiver = () => {
    amqp.connect('amqp://localhost', function (error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function (error1, channel) {
            if (error1) {
                throw error1;
            }

            var queue = 'Rabbit_Queue';

            channel.assertQueue(queue, {
                durable: false
            });

            console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

            channel.consume(queue, function(msg) {

                console.log(" [x] Received %s", msg.content.toString());

                const tonodmailer = JSON.parse(msg.content.toString());

                console.log(tonodmailer.email);
                
                Rabbitmq_sendMail(tonodmailer.email);

            }, {
                noAck: true
            });
        });
    });
}
receiver();

