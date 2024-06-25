import { MyTgContext } from "../types";
import { supabaseClient } from "../db";
import moment from "moment-timezone";

export const handleMessage = async (ctx: MyTgContext, message_type: string) => {
  const message =
    message_type === "regularMessage" ? ctx.message : ctx.businessMessage;

  const messageId = message?.message_id;
  if (!messageId) throw new Error("Message should have an ID");
  let isMessageReply = false;

  // handling message date
  let messageDate = message?.date;
  let formattedDate = "";
  if (messageDate) {
    const torontoTimezone = "America/Toronto";
    const dateFormat = "YYYY-MM-DD hh:mm:ss a z";
    formattedDate = moment(messageDate * 1000)
      .tz(torontoTimezone)
      .format(dateFormat);
  }
  const messateText = message?.text ?? null;

  let replyToMessageID = undefined;

  if (message?.reply_to_message) {
    isMessageReply = true;
    replyToMessageID = message.reply_to_message.message_id;
  }

  const sender = ctx.from;
  const senderFname = sender?.first_name ?? null;
  const senderLname = sender?.last_name ?? null;
  const senderUsername = sender?.username ?? null;
  const senderId = sender?.id ?? null;
  const senderIsPremium = sender?.is_premium;
  const senderIsBot = sender?.is_bot;
  const senderLanguage = sender?.language_code ?? null;

  const chat = ctx.chat;
  const chatID = chat?.id;
  const chatType = chat?.type ?? null;
  const chatTitle = chat?.title ?? null;
  const isMyMessage = senderId?.toString() === process.env.MY_TG_ID;

  // handling media
  let photoUrl: string | undefined = undefined;
  let caption: string | undefined = undefined;

  if (ctx.message?.photo) {
    caption = ctx.message?.caption;
    const file = await ctx.getFile();
    photoUrl = file.getUrl();
  }

  const { error } = await supabaseClient.from("Telegram Messages").insert({
    "Message ID": messageId,
    "Message Text": messateText,
    "Message Date": formattedDate,
    "Chat ID": chatID,
    "Chat Type": chatType,
    "Chat Title": chatTitle,
    "Sender First Name": senderFname,
    "Sender Last Name": senderLname,
    "Sender ID": senderId,
    "Sender Username": senderUsername,
    "Is Premium User": senderIsPremium,
    "Is Bot": senderIsBot,
    "Sender Language": senderLanguage,
    "My Message": isMyMessage,
    "Message Type": isMessageReply ? "Reply" : "Original",
    "Reply To Message (ID)": replyToMessageID,
    "Photo URL": photoUrl,
    Caption: caption,
  });
  if (error !== null) console.error(error);
};
