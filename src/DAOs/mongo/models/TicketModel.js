import { Schema, model } from "mongoose";

const TicketSchema = new Schema({
  code: {
    type: String,
    unique: true,
    default: () => uuidv4(),
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

export default model("Ticket", TicketSchema);
