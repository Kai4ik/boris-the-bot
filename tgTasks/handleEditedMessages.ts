import { MyTgContext } from "../types";
import { supabaseClient } from "../db";

export const handleEditedMessage = async (
  ctx: MyTgContext,
  message_type: string
) => {
  const message =
    message_type === "regularMessage"
      ? ctx.editedMessage
      : ctx.editedBusinessMessage;

  const messageId = message?.message_id;
  if (!messageId) throw new Error("Message should have an ID");
  const messateText = message?.text ?? null;
  // handling media
  let photoUrl: string | undefined = undefined;
  let caption: string | undefined = undefined;

  if (ctx.message?.photo) {
    caption = ctx.message?.caption;
    const file = await ctx.getFile();
    photoUrl = file.getUrl();
  }

  const { error } = await supabaseClient.from("Telegram Messages").upsert(
    {
      "Message ID": messageId,
      "Message Text": messateText,
      "Photo URL": photoUrl,
      Caption: caption,
    },
    { onConflict: "Message ID", ignoreDuplicates: false }
  );

  if (error) console.log(error);
};
