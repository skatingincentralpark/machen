const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MonthHabitsSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  // [Exercise, Eat Healthy, Meditate]
  habitNames: {
    type: Array,
    required: true,
  },
  // [[true, false, false], [true, true, false]]
  habitsComplated: [
    {
      DayHabits: {
        type: Array,
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

module.exports = Habits = mongoose.model("MonthHabits", MonthHabitsSchema);
