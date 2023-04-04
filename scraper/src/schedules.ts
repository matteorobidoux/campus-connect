import Schedule from "../../types/Schedule";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].reverse();

const getSlot = (entry: string): Schedule[] => {
  let rightIndex = entry.length;
  const foundDays = new Map<string, string>();
  if (entry.includes("Intensive")) return [];
  days.forEach(day => {
    const leftIndex = entry.indexOf(day);
    if (leftIndex == -1) return;
    foundDays.set(day, entry.substring(leftIndex + day.length, rightIndex));
    rightIndex = leftIndex;
  })

  const map = new Map<string, Schedule[]>();
  foundDays.forEach((v, k) => {
    const rgx = new RegExp("((1[0-2]|0?[1-9]):([0-5][0-9]) ([AaPp][Mm]))", "g")
    const matches = [...v.matchAll(rgx)];

    const arr :
      {
        begin: string,
        end: string, 
        day: string,
        duration: {hours: number, minutes: number}
      }[] = [];

    for (let i = 0; i < matches.length; i++) {
      const el = {begin: matches[i][0], end: matches[++i][0]};
      if (arr.some(e => el.begin == e.begin && el.end == e.end)) continue;
      arr.push({
        day: k,
        begin: el.begin,
        end: el.end,
        duration: substractTime(el.begin, el.end),
      });
    }

    map.set(k, arr);
  })

  return [...map.values()].flatMap(m => m);
}

const to24Time = (s: string) => {
  const isPM = s.includes("PM");
  const numbers = s.split(" ")[0];
  let [hour, minute] = numbers.split(":").map(e => parseInt(e));
  if (isPM && hour != 12) { hour += 12 ; }

  return [hour, minute]
}

const substractTime = (earlier: string, later: string) => {
  const a = to24Time(earlier);
  const b = to24Time(later);


  let minutes = b[1] - a[1];
  let hours = b[0] - a[0];

  if (minutes < 0) {
    hours -= 1;
    minutes = 60 + minutes;
  }

  return {hours, minutes}
}

// function parser() {
//   list.forEach(entry => {
//     const timetable = getSlot(entry);
//     timetable?.forEach((day, key) => {
//       console.log(key);
//       console.log(day);
//     })
//   })
// }
//
// parser();
export default getSlot;
