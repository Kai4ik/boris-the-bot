import { Bot, Context, webhookCallback } from "grammy";
import "dotenv/config";

const telegramBotToken = process.env.BOT_TOKEN;

if (!telegramBotToken)
  throw new Error(
    "Telegram Bot Token needs to be set, otherwise app wont' run"
  );

const bot = new Bot(telegramBotToken);

const handleMessage = async (ctx: Context) => {
  console.log(ctx.message);
};

bot.on("message", handleMessage);

export default webhookCallback(bot, "https");
