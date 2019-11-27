interface IMessagesInConversation {
    id: string;
    senderId: string;
    senderName: string;
    recipientId: string;
    recipientName: string;
    createdDate: Date;
    messageContent: string;
}
