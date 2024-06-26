import { Bot, webhookCallback } from "grammy";
import { hydrateFiles } from "@grammyjs/files";
import { handleMessage, handleEditedMessage } from "../tgTasks";
import { MyTgContext } from "../types";
import "dotenv/config";

const telegramBotToken = process.env.BOT_TOKEN;

if (!telegramBotToken)
  throw new Error(
    "Telegram Bot Token needs to be set, otherwise app won't run"
  );

const bot = new Bot<MyTgContext>(telegramBotToken);
bot.api.config.use(hydrateFiles(bot.token));

const handleAllMessages = async (ctx: MyTgContext) => {
  const message_type = ctx.message ? "regularMessage" : "businessMessage";
  await handleMessage(ctx, message_type);
};

const handleAllEditedMessages = async (ctx: MyTgContext) => {
  const message_type = ctx.editedMessage ? "regularMessage" : "businessMessage";
  await handleEditedMessage(ctx, message_type);
};

bot.on("business_message", handleAllMessages);
bot.on("message", handleAllMessages);
bot.on("edited_business_message", handleAllEditedMessages);
bot.on("edited_message", handleAllEditedMessages);

// bot.start();

export default webhookCallback(bot, "https");
