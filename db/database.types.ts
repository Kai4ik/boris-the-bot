export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "Telegram Messages": {
        Row: {
          Caption: string | null
          "Chat ID": number | null
          "Chat Title": string | null
          "Chat Type": string | null
          "Is Bot": boolean | null
          "Is Premium User": boolean | null
          "Message Date": string
          "Message ID": number
          "Message Text": string | null
          "Message Type": string | null
          "My Message": boolean | null
          "Photo URL": string | null
          "Reply To Message (ID)": number | null
          "Sender First Name": string | null
          "Sender ID": number | null
          "Sender Language": string | null
          "Sender Last Name": string | null
          "Sender Username": string | null
        }
        Insert: {
          Caption?: string | null
          "Chat ID"?: number | null
          "Chat Title"?: string | null
          "Chat Type"?: string | null
          "Is Bot"?: boolean | null
          "Is Premium User"?: boolean | null
          "Message Date"?: string
          "Message ID"?: number
          "Message Text"?: string | null
          "Message Type"?: string | null
          "My Message"?: boolean | null
          "Photo URL"?: string | null
          "Reply To Message (ID)"?: number | null
          "Sender First Name"?: string | null
          "Sender ID"?: number | null
          "Sender Language"?: string | null
          "Sender Last Name"?: string | null
          "Sender Username"?: string | null
        }
        Update: {
          Caption?: string | null
          "Chat ID"?: number | null
          "Chat Title"?: string | null
          "Chat Type"?: string | null
          "Is Bot"?: boolean | null
          "Is Premium User"?: boolean | null
          "Message Date"?: string
          "Message ID"?: number
          "Message Text"?: string | null
          "Message Type"?: string | null
          "My Message"?: boolean | null
          "Photo URL"?: string | null
          "Reply To Message (ID)"?: number | null
          "Sender First Name"?: string | null
          "Sender ID"?: number | null
          "Sender Language"?: string | null
          "Sender Last Name"?: string | null
          "Sender Username"?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
