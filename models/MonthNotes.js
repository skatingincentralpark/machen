const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// MonthNotes: { user, notes: [ { title, text, date } ], date }
const MonthNotesSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  notes: [
    {
      title: {
        type: String,
        maxlength: [60, "Title cannot be more than 60 characters."],
      },
      text: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports =
  mongoose.models.MonthNotes || mongoose.model("MonthNotes", MonthNotesSchema);
