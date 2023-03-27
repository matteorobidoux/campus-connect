import styles from "./CoursePicker.module.scss";
import { motion } from "framer-motion";
import { StrippedCourse } from "../../../../../types/Course";
import { SelectedCourse } from "../CourseEntryWidget";
import {
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  FormEvent,
} from "react";

type CoursePickerProps = {
  pickedCourse?: SelectedCourse;
  courses: StrippedCourse[];
  disabled: boolean;
  onEditingChange: (state: boolean) => void;
  onAdd: (course: string, section: string) => void;
  onEditSave: (course: string, section: string) => void;
  onRemove: () => void;
};

type FormSubmitEvent = FormEvent<HTMLFormElement> & {
  target: {
    elements: {
      [key: `course-${string}`]: {
        value: any;
      };
      [key: `section-${string}`]: {
        value: any;
      };
    };
  };
};

export default function CoursePicker(props: CoursePickerProps) {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [currentlySelectedCourse, setCurrentlySelectedCourse] =
    useState<string>("");
  const sectionsInputEl: MutableRefObject<HTMLInputElement | null> =
    useRef(null);
  const coursesInputEl: MutableRefObject<HTMLInputElement | null> =
    useRef(null);
  const formEl: MutableRefObject<HTMLFormElement | null> = useRef(null);
  const coursePickerEl: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const handleSubmit = (e: FormSubmitEvent) => {
    const course = e.target.elements["course-choice"].value;
    const section = e.target.elements["section-choice"].value;
    // This nested loop can probably be changed
    if (!validate(course, section)) {
      if (props.pickedCourse !== undefined) {
        coursesInputEl.current!.value = props.pickedCourse!.number;
        sectionsInputEl.current!.value = props.pickedCourse!.sectionNumber;
      }
      return;
    }

    if (!props.pickedCourse) {
      props.onAdd(course, section);
    } else {
      props.onEditSave(course, section);
    }
    setIsAdding(false);
  };

  const validate = (course: string, section: string): boolean => {
    return (
      props.courses.find(
        (_course) =>
          _course.number === course &&
          _course.sections.find((_section) => _section.number === section) !==
            undefined
      ) !== undefined
    );
  };

  useEffect(() => {
    if (
      props.pickedCourse &&
      coursesInputEl.current &&
      sectionsInputEl.current
    ) {
      coursesInputEl.current.defaultValue = props.pickedCourse.number;
      sectionsInputEl.current.defaultValue = props.pickedCourse.sectionNumber;
    }
  }, [props.disabled, props.pickedCourse]);

  if (props.courses.length < 1) return <span>No courses to pick from </span>;

  const animation = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.25,
      },
    },
    show: {
      opacity: 1,
      transition: {
        duration: 0.15,
      },
    },
  };

  if (!props.pickedCourse) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        exit={{ opacity: 0 }}
        className={styles["course-picker"]}
        ref={coursePickerEl}
      >
        {
          // Show form if you are adding
          isAdding ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSubmit(e as FormSubmitEvent);
                e.target.dispatchEvent(
                  new Event("reset", { cancelable: true, bubbles: false })
                );
              }}
              ref={formEl}
            >
              <div className={styles.inputs}>
                <input
                  list="courses-main"
                  id="course-choice"
                  placeholder="Choose a course"
                  autoComplete="off"
                  onInput={(e) => {
                    e.preventDefault();
                    setCurrentlySelectedCourse(e.currentTarget.value);
                    sectionsInputEl!.current!.value = "";
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setCurrentlySelectedCourse(e.currentTarget.value);
                    sectionsInputEl!.current!.value = "";
                  }}
                />
                <datalist id="courses-main">
                  {props.courses.map((course, key) => (
                    <option key={key} value={course.number}>
                      {course.number} - {course.title}
                    </option>
                  ))}
                </datalist>
              </div>

              <div className={styles.inputs}>
                <input
                  list="sections-main"
                  id="section-choice"
                  placeholder="Choose a section"
                  ref={sectionsInputEl}
                  autoComplete="off"
                  onInput={(e) => {
                    e.preventDefault();
                    formEl.current!.dispatchEvent(
                      new Event("submit", { cancelable: true, bubbles: true })
                    );
                  }}
                  onChange={(e) => {
                    e.preventDefault();
                    setCurrentlySelectedCourse(e.currentTarget.value);
                    sectionsInputEl!.current!.value = "";
                  }}
                />
                <datalist id="sections-main">
                  {props.courses
                    .filter(
                      (course) => course.number === currentlySelectedCourse
                    )
                    .map((course) =>
                      course.sections.map((section, key) => (
                        <option key={key} value={section.number}>
                          {section.number} - {section.teacher}
                        </option>
                      ))
                    )}
                </datalist>
              </div>
            </form>
          ) : (
            // Show Add Course button before being able to add
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setIsAdding(true);
              }}
            >
              Add Course
            </button>
          )
        }
      </motion.div>
    );
  } else {
    return (
      <motion.div
        layout
        variants={animation}
        initial="hidden"
        animate="show"
        exit="hidden"
        transition={{ duration: 0.25 }}
        className={styles["course-picker"]}
        ref={coursePickerEl}
      >
        <form
          ref={formEl}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit(e as FormSubmitEvent);
            e.target.dispatchEvent(
              new Event("reset", { cancelable: true, bubbles: false })
            );
          }}
        >
          <div className={styles.inputs}>
            <input
              list={`courses-${props.pickedCourse!.uuid}`}
              id="course-choice"
              placeholder="Choose a course"
              autoComplete="off"
              ref={coursesInputEl}
              disabled={props.disabled}
              value={props.pickedCourse!.number}
              onInput={(e) => {
                e.preventDefault();
                setCurrentlySelectedCourse(e.currentTarget.value);
                sectionsInputEl!.current!.value = "";
              }}
              onFocus={(e) => {
                e.preventDefault();
                e.target.value = "";
                sectionsInputEl.current!.value = "";
              }}
            />
            <datalist id={`courses-${props.pickedCourse!.uuid}`}>
              {props.courses.map((course, key) => (
                <option key={key} value={course.number}>
                  {course.number} - {course.title}
                </option>
              ))}
            </datalist>
          </div>

          <div className={styles.inputs}>
            <input
              list={`sections-${props.pickedCourse!.uuid}`}
              id="section-choice"
              placeholder="Choose a section"
              ref={sectionsInputEl}
              disabled={props.disabled}
              value={props.pickedCourse!.sectionNumber}
              autoComplete="off"
              onInput={(e) => {
                e.preventDefault();
                formEl.current!.dispatchEvent(
                  new Event("submit", { cancelable: true, bubbles: true })
                );
              }}
              onFocus={(e) => {
                e.preventDefault();
                e.target.value = "";
              }}
            />
            <datalist id={`sections-${props.pickedCourse!.uuid}`}>
              {props.courses
                .filter((course) => course.number === currentlySelectedCourse)
                .map((course) =>
                  course.sections.map((section, key) => (
                    <option key={key} value={section.number}>
                      {section.number} - {section.teacher}
                    </option>
                  ))
                )}
            </datalist>
          </div>
        </form>
        {!props.disabled ? (
          <button
            className={styles["edit-button"]}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              props.onEditingChange(false);
            }}
          >
            Done
          </button>
        ) : (
          <button
            className={styles["edit-button"]}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              props.onEditingChange(true);
            }}
          >
            Edit
          </button>
        )}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            props.onRemove();
          }}
        >
          Remove
        </button>
      </motion.div>
    );
  }
}
