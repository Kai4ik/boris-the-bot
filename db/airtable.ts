import Airtable from "airtable";
import "dotenv/config";

const airtableAccessToken = process.env.AIRTABLE_ACCESS_TOKEN;
const baseId = process.env.BASE_ID;

if (!airtableAccessToken)
  throw new Error(
    "Cannot perform Airtable CRUD operations as access token is not provided"
  );
if (!baseId)
  throw new Error(
    "Cannot perform Airtable CRUD operations as base ID is not provided"
  );

Airtable.configure({
  endpointUrl: "https://api.airtable.com",
  apiKey: airtableAccessToken,
});

const base = Airtable.base(baseId);
export const financeCategoriesTable = base.table("Finance Categories");
export const financesTable = base.table("Finances");
export const tgMessagesTable = base.table("Telegram Messages");
