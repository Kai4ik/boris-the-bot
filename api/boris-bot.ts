import { Bot, Context, webhookCallback } from "grammy";
import "dotenv/config";

const telegramBotToken = process.env.BOT_TOKEN;

if (!telegramBotToken)
  throw new Error(
    "Telegram Bot Token needs to be set, otherwise app won't run"
  );

const bot = new Bot(telegramBotToken);

const handleMessage = async (ctx: Context) => {
  console.log(ctx);
};

bot.on("message", handleMessage);
bot.on("business_message", handleMessage);

export default webhookCallback(bot, "https");
