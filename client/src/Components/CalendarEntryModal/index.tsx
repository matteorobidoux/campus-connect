import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import CalendarEvent from "../../../../types/Calendar";
import styles from "./CalendarEntryModal.module.scss"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from "react-query";
import { useSections, useUser } from "../../custom-query-hooks";

export interface CalendarEntryModalProps {
  onClose: () => void;
}

export default function CalendarEntryModal({onClose}: CalendarEntryModalProps) {
  const user = useUser();
  const sectionsQuery = useSections({userClassSections: user.sections});

  const mutation = useMutation(async (arg: Omit<CalendarEvent, 'id'>) => {
    console.log(arg);
    await new Promise(r => setTimeout(r, 2000));
  })

  const initialValues: Omit<CalendarEvent, 'id' | 'associatedSection'> & {courseTitle: string} = {
    date: new Date(),
    title: '',
    description: '',
    courseTitle: '',
  }

  return (
    <div className={styles.wrapper}>
      <h1> Add new event </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          toast.loading("Adding event...", {toastId: 'addingEvent'});
          await mutation.mutateAsync({...values, associatedSection: {name: values.courseTitle}});
          toast.done('addingEvent');
          onClose();
        }}
        validate={values => {
          const errors: {[key: string]: string} = {};
          if (values.title == "") {
            errors.title = "Name can't be empty.";
          }

          if (values.description == "") {
            errors.description = "Please add a description.";
          }

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
              <p> {errors.description ? errors.description : null} </p>
            </div>

            <div className={styles.formEntry}>
              <label htmlFor="courseTitle"> Class </label>
              <Field as="select" id="courseTitle" name="courseTitle" value={'DEFAULT'}>
                <option value="DEFAULT" disabled>Pick a class</option>
                {sectionsQuery.data?.map(s => <option key={s.courseTitle}> {s.courseTitle} </option>)}
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
