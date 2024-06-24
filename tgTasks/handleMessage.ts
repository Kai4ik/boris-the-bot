import { MyTgContext } from "../types";
import { tgMessagesTable } from "../db";
import { FieldSet, Record } from "airtable";

import moment from "moment-timezone";

const getTgMessageByID = async (
  id: number
): Promise<Record<FieldSet> | null> => {
  let recordForUpdate: Record<FieldSet> | null = null;
  await tgMessagesTable
    .select({
      maxRecords: 1,
      filterByFormula: `{Message ID} = "${id}"`,
    })
    .eachPage((results, fetchNextPage) => {
      recordForUpdate = results[0];
      fetchNextPage();
    })
    .catch((error) => {
      console.error(error);
      return null;
    });
  return recordForUpdate;
};

export const handleMessage = async (ctx: MyTgContext, message_type: string) => {
  const message =
    message_type === "regularMessage" ? ctx.message : ctx.businessMessage;

  const messageId = message?.message_id;
  let isMessageReply = false;

  // handling message date
  let messageDate = message?.date;
  let formattedDate = undefined;
  if (messageDate) {
    const torontoTimezone = "America/Toronto";
    const dateFormat = "YYYY-MM-DD hh:mm:ss a z";
    formattedDate = moment(messageDate * 1000)
      .tz(torontoTimezone)
      .format(dateFormat);
  }
  const messateText = message?.text;

  let replyToMessageID = undefined;
  let linkToParentMessage = undefined;

  if (message?.reply_to_message) {
    isMessageReply = true;
    replyToMessageID = message.reply_to_message.message_id;
    const ifMessageExistsInDb = await getTgMessageByID(replyToMessageID);
    if (ifMessageExistsInDb) linkToParentMessage = ifMessageExistsInDb.id;
  }

  const sender = ctx.from;
  const senderFname = sender?.first_name;
  const senderLname = sender?.last_name;
  const senderUsername = sender?.username;
  const senderId = sender?.id;
  const senderIsPremium = sender?.is_premium;
  const senderIsBot = sender?.is_bot;
  const senderLanguage = sender?.language_code;

  const chat = ctx.chat;
  const chatID = chat?.id;
  const chatType = chat?.type;
  const chatTitle = chat?.title;
  const isMyMessage = senderId?.toString() === process.env.MY_TG_ID;

  // handling media
  let photoUrl: string | undefined = undefined;
  let caption: string | undefined = undefined;

  if (ctx.message?.photo) {
    caption = ctx.message?.caption;
    const file = await ctx.getFile();
    photoUrl = file.getUrl();
  }

  try {
    await tgMessagesTable.create({
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
      "Parent Message": linkToParentMessage ? [linkToParentMessage] : [],
      "Photo URL": photoUrl,
      Caption: caption,
    });
  } catch (err) {
    console.error(err);
  }
};
