export interface Message {
    id: string
    body: string
    contact: string
    is_reply_to?: string
    direction: "INBOUND" | "OUTBOUND"
    sent_time: Date
    message_state: string
    ServicechainId: string | null | undefined,
    BlastId: string | null | undefined,

    //    icon?: string
}