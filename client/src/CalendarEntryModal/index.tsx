import { Field, Form, Formik } from "formik";
import CalendarEvent from "../../../types/Calendar";
import styles from "./CalendarEntryModal.module.scss"

export interface CalendarEntryModalProps {
}

export default function CalendarEntryModal({}: CalendarEntryModalProps) {
  const initialValues: Omit<CalendarEvent, 'id'> = {
    date: new Date(),
    title: '',
    description: '',
    associatedSection: {
      name: ''
    }

  }

  return (
    <div className={styles.wrapper}>
      <h1> Add new event </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form className={styles.form}>
          <div className={styles.formEntry}>
            <label htmlFor="title"> Title </label>
            <Field id="title" name="title" />
          </div>

          <div className={styles.formEntry}>
            <label htmlFor="description"> Description </label>
            <Field id="description" name="description" />
          </div>

          <div className={styles.formEntry}>
            <label htmlFor="class"> Class </label>
            <Field as="select" id="class" name="class">
              <option> Class Placeholder </option>
            </Field>
          </div>

          <button type="submit"> Submit </button>
        </Form>
      </Formik>
    </div>
  );
}
