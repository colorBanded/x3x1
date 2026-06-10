require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/x3-ping", async ({ ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;

  await respond({
    text: `meow meow meow sahur!\nLatency: ${latency}ms`
  });
});

app.command("/x3-help", async ({ ack, respond }) => {
  await ack();

  await respond({
    text: `Available Commands:

/x3-append - Appends previous message with "sahur"
/x3-ping - Check bot latency
/x3-help - Show this help message`
  });
});
ssdsdssdd
app.command("/x3-append", async ({ command, ack, client }) => {
  await ack();

  const history = await client.conversations.history({
    channel: command.channel_id,
    limit: 20
  });


  const target = history.messages.find(
    msg =>
      msg.text &&
      msg.text.trim().length > 0 &&
      !msg.subtype
  );

  await client.chat.postMessage({
    channel: command.channel_id,
    text: `${target.text} sahur`
  });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();