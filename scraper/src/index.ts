import { parse } from 'node-html-parser';
import fs from "node:fs";
import { Logger, ILogObj } from "tslog";
import { prompt } from 'enquirer';

import Course from "../../types/Course";
import Section from "../../types/Section"
import getSlot from './schedules';

enum SectionDetail {
  TITLE,
  SECTION,
  TEACHER,
  DESCRIPTION,
  COMMENT,
  DROP_DATE,
  SCHEDULE,
}

const log: Logger<ILogObj> = new Logger({
  minLevel: 3
});

type Education = {
  id: string,
  name: string,
}

function getAllSections() {
  const k = fs.readFileSync('./src/pages/timetable.html');
  const root = parse(k.toString());

  return root.querySelectorAll("select").slice(0, 6).map(el => {
    const sectionName = el.attributes.id;
    const entries: Education[] = el.querySelectorAll("option").slice(1).map(v => {
      return {id: v.attributes.value, name: v.textContent}
    })

    return {sectionName, entries}
  })

} 

interface CourseFetchSearchParams {
  specific_ed?: string;
  discipline?: string;
  general_ed?: string;
  comp_ed?: string;
}

let cookie = "";
let nonce = "";

async function fetchCourseSpecificInformation(params: CourseFetchSearchParams): Promise<Course[]> {
  const name = Object.entries(params).find(s => s[1] != undefined);
  const fileName = 'html_artifact/' + `${name?.[0]}-${name?.[1]}` + ".html";
  let text: string;
  try {
    const buffer = fs.readFileSync(fileName);
    text= buffer.toString()
  } catch (e) {
    const timeTable = await fetch("https://timetable.dawsoncollege.qc.ca/wp-content/plugins/timetable/search.php", {
      "headers": {
        "accept": "*/*",
        "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,pt;q=0.7,es;q=0.6",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\"Chromium\";v=\"109\", \"Not_A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Linux\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        cookie,
        "Referer": "https://timetable.dawsoncollege.qc.ca/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": `action=timetable_search&nonce=${nonce}&specific_ed=${params.specific_ed ?? ''}&discipline=${params.discipline ?? ''}&general_ed=${params.general_ed ?? ''}${params.comp_ed ? '&comp_ed%5B%5D=' + params.comp_ed : ''}&special_ed=&certificates=&learning_comm=&course_title=&section=&teacher=&intensive=&seats=`,
      "method": "POST"
    });
    text = await timeTable.text()
    fs.writeFile(fileName, text, () => {})
  }

  const root = parse(text.toString());

  const courses = root.querySelectorAll(".course-wrap")!
  const classes = new Map<{title: string, number: string}, Section[]>()

  courses.forEach(c => {
    const cNumber = c.querySelector(".cnumber")!.text;
    const cTitle = c.querySelector(".ctitle")!.text

    const sections = c.querySelectorAll(".section-details");
    const courseData: Section[] = sections.map(sct => {
      const rows = sct.querySelectorAll(".row > .col-md-10");
      const hasTitle = !rows[SectionDetail.TITLE].text.startsWith("0");
      const offset = hasTitle ? 0 : -1;

      if (getSlot(rows[SectionDetail.SCHEDULE + offset]?.text ?? rows[5]?.text ?? rows[4]?.text).length == 0) {
        console.log(rows[SectionDetail.SCHEDULE + offset]?.text ?? rows[4].text);
        console.log(rows.map(r => r.text));
      }
      return {
        title: rows[SectionDetail.TITLE + offset]?.text,
        number: rows[SectionDetail.SECTION + offset].text,
        teacher: rows[SectionDetail.TEACHER + offset].text,
        schedule: getSlot(rows[SectionDetail.SCHEDULE + offset]?.text ?? rows[5]?.text ?? rows[4]?.text)
      }
    })

    const clas = classes.get({ title: cTitle, number: cNumber });
    if (!clas) {
      classes.set({ title: cTitle, number: cNumber}, courseData);
    } else  {
      clas.push(...courseData);
    }
  });

  // [...classes.keys()].reduce();

  const grouped = [...classes.keys()].map(entry => {
    return {
      title: entry.title,
      sections: classes.get(entry)!,
      number: entry.number,
    }
  });

  return groupBy(grouped);
}

function groupBy(list: Course[]): Course[] {
  const map = new Map<string, {title: string, sections: Section[]}>();
  list.forEach((item) => {
    const key = item.number;
    const collection = map.get(key);
    if (!collection) {
      map.set(key, {title: item.title, sections: item.sections});
    } else {
      // Remove duplicate sections
      item.sections = item.sections.filter(i => !collection.sections.some(v => v.number == i.number));
      collection.sections.push(...item.sections);
      map.set(key, {title: item.title, sections: collection.sections});
    }
  });

  return [...map.entries()].map(([k, v])=> ({
    title: v.title,
    number: k,
    sections: v.sections,
  }))
}


let things = getAllSections();
let specific_ed = things[0];
let general = things[2];
let complementary = things[3];

function querySpecifidEd()  {
  // Social science has an "all" option that we don't want to use. Let's skip that
  specific_ed.entries.slice(1).forEach(async education => {
    log.debug(education.name);
    const courses = await fetchCourseSpecificInformation({specific_ed: education.id});
    writeFile(education, courses);
  })
}

function queryGeneral() {
  general.entries.forEach(async education => {
    log.debug(education.name);
    const courses = await fetchCourseSpecificInformation({general_ed: education.id});
    writeFile(education, courses);
  })
}

function queryComplementary() {
  complementary.entries.forEach(async education => {
    log.debug(education.name);
    const courses = await fetchCourseSpecificInformation({comp_ed: education.id});
    writeFile(education, courses);

  })
}

function writeFile(education: Education, courses: Course[]) {
  if (courses.length == 0) {
    log.warn(`Skipping ${education.name} because it return 0 courses.`);
    return;
  };

  const toWriteName = education.name.replaceAll(" ", "_").toLowerCase();
  const path = `output/${toWriteName}_${education.id.toLowerCase()}.json`;
  fs.writeFile(path, JSON.stringify(courses, null, "\t"), () => log.info(`wrote ${toWriteName}_${education.id.toLowerCase()}.json`));
}

(async () => {
  if (process.argv[2] == "withFetch") {
    const response : {cookie: string, nonce: string} = await prompt([
      {
        type: 'input',
        name: 'cookie',
        message: 'Paste your cookie string',
        validate(value) {
          return value.startsWith("wordpress_sec");
        },
      },
      {
        type: 'input',
        name: 'nonce',
        message: 'Paste your nonce valuestring',
      }
    ]);

    cookie = response.cookie;
    nonce = response.nonce;
  }

  const nameToFunc = {
    'Specific Education' : querySpecifidEd,
    'General Education' : queryGeneral,
    'Complementary' : queryComplementary,
  }

  const what: {selected: (keyof typeof nameToFunc)[]} = await prompt({
    type: 'multiselect',
    name: 'selected',
    message: 'What do you want to scrape?',
    choices: Object.keys(nameToFunc).map(name => {return {name}})
  })

  what.selected.forEach(n => nameToFunc[n]())
})()
