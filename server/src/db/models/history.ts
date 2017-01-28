// メール送信履歴を管理するデータモデル
/*
aaa
必要なカラム
from
to
subject
send date
*/
import * as mongoose from 'mongoose';
import Schema = mongoose.Schema;
import Document = mongoose.Document;
import Model = mongoose.Model;
import { HistoryDocument } from './IHistory';

var historySchema: Schema = new Schema({
    from: { type: String, required: true },
    to: { type: String, required: true },
    subject: { type: String, required: true },
    sended: { type: Date, required: true, default: Date.now() + 32400000 }
});
// var historyModel: Model<HistoryDocument> = <Model<HistoryDocument>>mongoose.model("History", historySchema);
// export default <Model<HistoryDocument>>mongoose.model("History", historySchema);
// var HistoryModel = mongoose.model<HistoryDocument>("History", historySchema);
// export default HistoryModel;
export default mongoose.model<HistoryDocument>("History", historySchema);
