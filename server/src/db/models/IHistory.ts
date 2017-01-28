import * as mongoose from 'mongoose';
import Document = mongoose.Document;

export interface HistoryDocument extends Document {
    from: String;
    to: String;
    subject: String;
    sended: Date;
}
