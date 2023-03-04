import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
<<<<<<< HEAD:client/src/Components/CalendarEntryModal/index.tsx
import { useGetAllSections } from "../../custom-query-hooks";
import styles from "./CalendarEntryModal.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from "react-query";
import { AddEventBody } from "../../../../types/Queries/AddEvent";
import axios from "axios";
=======
import CalendarEvent from "../../../../../types/Calendar";
import styles from "./CalendarEntryModal.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from "react-query";
import { useSections, useUser } from "../../../custom-query-hooks";
>>>>>>> 3eacaab68efa39b86d4972754427482ff6b7d230:client/src/Components/CalendarWidget/CalendarEntryModal/index.tsx

export interface CalendarEntryModalProps {
  onClose: () => void;
}

<<<<<<< HEAD:client/src/Components/CalendarEntryModal/index.tsx
export default function CalendarEntryModal({onClose}: CalendarEntryModalProps) {  
  
  const sections = useGetAllSections({userClassSections: [
    {courseNumber: "tempCourseNumber", sectionNumber: "tempSectionNumber"},
  ]});
  
  const mutation = useMutation(async (arg: Omit<AddEventBody, 'id'>) => {
    axios.post('/api/addEvent', arg)
  });
=======
export default function CalendarEntryModal({onClose}: CalendarEntryModalProps) {
  const user = useUser();
  const sectionsQuery = useSections({userClassSections: user.sections});

  const mutation = useMutation(async (arg: Omit<CalendarEvent, 'id'>) => {
    console.log(arg);
    await new Promise(r => setTimeout(r, 2000));
  })
>>>>>>> 3eacaab68efa39b86d4972754427482ff6b7d230:client/src/Components/CalendarWidget/CalendarEntryModal/index.tsx


  const initialValues = {
    title: "",
    desc: "",
    courseTitle: "",
    date: new Date()
  }

  return (
    <div className={styles.wrapper}>
      <h1> Add new event </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          toast.loading("Adding event...", {toastId: 'addingEvent'});
          const course = sections!.data!.response!.find(s => s.courseTitle === values.courseTitle)
          await mutation.mutateAsync({
            ...values,
            section: {
              courseNumber: course!.courseNumber,
              sectionNumber: course!.number
            },
            event: {
              ownerId: "tempOwnerID",
              date: values.date,
              title: values.courseTitle,
              desc: values.desc
            }
          });
          toast.done('addingEvent');
          onClose();
        }}
        validate={values => {
          const errors: {[key: string]: string} = {};
          // eslint-disable-next-line eqeqeq
          if (values.title == "") {
            errors.title = "Name can't be empty.";
          }

          // eslint-disable-next-line eqeqeq
          if (values.desc == "") {
            errors.description = "Please add a description.";
          }
          // eslint-disable-next-line eqeqeq
          if (values.courseTitle == "") {
            errors.courseTitle = "Please pick a course.";
          }

          return errors;
        }}
        validateOnBlur={true}
      > 
        {({ errors, isValid, isSubmitting }) => (
          <Form className={styles.form}> 
            <div className={styles.formEntry}>
              <label htmlFor="title"> Title </label>
              <Field id="title" name="title" />
              <p> {errors.title ? errors.title : null} </p>
            </div>

            <div className={styles.formEntry}>
              <label htmlFor="description"> Description </label>
              <Field id="description" name="description" />
              <p> {errors.desc ? errors.desc : null} </p>
            </div>

            <div className={styles.formEntry}>
              <label htmlFor="courseTitle"> Class </label>
              <Field as="select" id="courseTitle" name="courseTitle" value={'DEFAULT'}>
                <option value="DEFAULT" disabled>Pick a class</option>
<<<<<<< HEAD:client/src/Components/CalendarEntryModal/index.tsx
                {sections.data?.response!.map(s => <option key={s.courseTitle}> {s.courseTitle} </option>)}
=======
                {sectionsQuery.data?.map(s => <option key={s.courseTitle}> {s.courseTitle} </option>)}
>>>>>>> 3eacaab68efa39b86d4972754427482ff6b7d230:client/src/Components/CalendarWidget/CalendarEntryModal/index.tsx
              </Field>
              <p> {errors.courseTitle ? errors.courseTitle : null} </p>
            </div>

            <button type="submit" disabled={!isValid}>
              {!isSubmitting ? "Submit" : <FontAwesomeIcon icon="circle-notch" className="fa-spin"/>}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
