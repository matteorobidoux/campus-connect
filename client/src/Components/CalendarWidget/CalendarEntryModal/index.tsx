import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import styles from "./CalendarEntryModal.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from "react-query";
import {AddEventBody} from "../../../../../types//Queries//AddEvent"
import axios from "axios";
import { useSections, useUser } from "../../../custom-query-hooks";

export interface CalendarEntryModalProps {
  onClose: () => void;
  date: Date
}

export default function CalendarEntryModal({onClose, date}: CalendarEntryModalProps) {  
  
  const user = useUser();
  const sectionsQuery = useSections({userClassSections: user.sections})
  
  const mutation = useMutation(async (arg: AddEventBody) => {
    axios.post('/api/addEvent', arg)
  });

  console.log(date.getTime + "dATE")
  const initialValues = {
    title: "",
    description: "",
    courseTitle: "",
    date: new Date(date)
  }

  return (
    <div className={styles.wrapper}>
      <h1> Add new event </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          toast.loading("Adding event...", {toastId: 'addingEvent'});
          const course = sectionsQuery!.data!.find(s => s.courseTitle === values.courseTitle)
          await mutation.mutateAsync({
            ...values,
            section: {
              courseNumber: course!.courseNumber,
              sectionNumber: course!.number
            },
            event: {
              courseTitle: course!.courseTitle,
              ownerId: user._id,
              date: values.date,
              title: values.title,
              desc: values.description
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
          if (values.description == "") {
            errors.description = "Please add a description.";
          }
          // eslint-disable-next-line eqeqeq
          if (values.courseTitle == "") {
            errors.courseTitle = "Please pick a course.";
          }
          console.log(values.courseTitle)

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
              <p> {errors.description ? errors.description : null} </p>
            </div>

            <div className={styles.formEntry}>
              <label htmlFor="courseTitle"> Class </label>
              <Field as="select" id="courseTitle" name="courseTitle">
                <option value="DEFAULT">Pick a class</option>
                {sectionsQuery.data?.map(s => <option value={s.courseTitle} key={s.courseTitle}> {s.courseTitle} </option>)}
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
