import { useEffect, useState } from "react";

const NewLogic = () => {
  const [date, setDate] = useState({ month: 1, year: 2022 });
  const [dummyItemsStart, setDummyStart] = useState("");
  const [dummyItemsEnd, setDummyEnd] = useState("");
  const [items, setItems] = useState("");

  function createCalendar(year, month) {
    let mon = month; // months in JS are 0..11, not 1..12
    let d = new Date(year, mon);

    let start = 0;
    let mid = 0;
    let end = 0;

    // spaces for the first row
    for (let i = 0; i < getDay(d); i++) {
      start++;
    }

    // actual dates
    while (d.getMonth() == mon) {
      mid++;
      d.setDate(d.getDate() + 1);
    }

    // add spaces after last days of month for the last row
    if (getDay(d) != 0) {
      for (let i = getDay(d); i < 7; i++) {
        end++;
      }
    }

    setDummyStart(Array.from(Array(start).keys()));
    setDummyEnd(Array.from(Array(end).keys()));
    setItems(Array.from(Array(mid).keys()));
  }

  function getDay(date) {
    // get day number from 0 (monday) to 6 (sunday)
    let day = date.getDay();
    if (day == 0) day = 7; // make Sunday (0) the last day
    return day - 1;
  }

  useEffect(() => {
    createCalendar(date.year, date.month);
    console.log("@@@@@@@");
    console.log(date);
    console.log(dummyItemsStart.length);
    console.log(items.length);
    console.log(dummyItemsEnd.length);
  }, [date.year, date.month]);

  const changeMonth = (add = true) => {
    let mon = date.month; // months in JS are 0..11, not 1..12
    let d = new Date(date.year, mon);
    let newDate = new Date(
      d.setMonth(add ? d.getMonth() + 1 : d.getMonth() - 1)
    );

    setDate({ month: newDate.getMonth(), year: newDate.getFullYear() });
  };

  return (
    <div style={{ paddingTop: "15rem" }}>
      <div>start is {dummyItemsStart}</div>
      <div>end is {dummyItemsEnd}</div>
      <div>items is {items}</div>
      <div>total is {dummyItemsStart + dummyItemsEnd + items}</div>
      <div style={{ display: "flex", gap: "1rem", paddingTop: "1rem" }}>
        <button
          onClick={() => {
            changeMonth(false);
          }}
        >
          Back
        </button>
        <button
          onClick={() => {
            changeMonth();
          }}
        >
          Forward
        </button>
      </div>
    </div>
  );
};

export default NewLogic;
