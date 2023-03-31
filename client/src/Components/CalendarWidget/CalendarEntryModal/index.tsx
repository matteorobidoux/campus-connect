import { Field, Form, Formik } from "formik";
import { toast } from "react-toastify";
import styles from "./CalendarEntryModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation, useQueryClient } from "react-query";
import { AddEventBody } from "../../../../../types//Queries//AddEvent";
import axios from "axios";
import { useSections, useUser } from "../../../custom-query-hooks";
import { useTranslation } from "react-i18next";

export interface CalendarEntryModalProps {
  onClose: () => void;
  date: Date;
}

export default function CalendarEntryModal({
  onClose,
  date,
}: CalendarEntryModalProps) {
  const { t } = useTranslation(["events"]);

  const user = useUser();
  const sectionsQuery = useSections({ userClassSections: user.sections });
  const qc = useQueryClient();

  const mutation = useMutation(
    async (arg: AddEventBody) => {
      await axios.post("/api/addEvent", arg);
    },
    { onSuccess: () => qc.invalidateQueries({ queryKey: ["getAllCourses"] }) }
  );

  const initialValues = {
    title: "",
    description: "",
    courseTitle: "",
    date: new Date(date),
  };

  return (
    <div className={styles.wrapper}>
      <h1> {t("addNewEvent")} </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          toast.loading(t("addingEvent"), { toastId: "addingEvent" });
          const course = sectionsQuery!.data!.find(
            (s) => s.courseTitle === values.courseTitle
          );
          await mutation.mutateAsync({
            ...values,
            section: {
              courseNumber: course!.courseNumber,
              sectionNumber: course!.number,
            },
            event: {
              courseTitle: course!.courseTitle,
              ownerId: user._id,
              date: values.date,
              title: values.title,
              desc: values.description,
            },
          });
          toast.done("addingEvent");
          onClose();
        }}
        validate={(values) => {
          const errors: { [key: string]: string } = {};
          // eslint-disable-next-line eqeqeq
          if (values.title == "") {
            errors.title = t("titleError");
          }

          // eslint-disable-next-line eqeqeq
          if (values.description == "") {
            errors.description = t("descriptionError");
          }
          // eslint-disable-next-line eqeqeq
          if (values.courseTitle == "") {
            errors.courseTitle = t("courseError");
          }

          return errors;
        }}
        validateOnBlur={true}
      >
        {({ errors, isValid, isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.formEntry}>
              <label className={styles["formTitle"]} htmlFor="title">
                {" "}
                {t("title")}{" "}
              </label>
              <Field maxLength="32" id="title" name="title" />
              <p> {errors.title ? errors.title : null} </p>
            </div>

            <div className={styles.formEntry}>
              <label htmlFor="description"> {t("description")} </label>
              <Field
                maxLength="400"
                as="textarea"
                className={styles["descTextBox"]}
                id="description"
                name="description"
              />
              <p> {errors.description ? errors.description : null} </p>
            </div>

            <div className={styles.formEntry}>
              <label htmlFor="courseTitle"> {t("class")} </label>
              <Field as="select" id="courseTitle" name="courseTitle">
                <option value="DEFAULT"> {t("pickAClass")} </option>
                {sectionsQuery.data?.map((s) => (
                  <option value={s.courseTitle} key={s.courseTitle}>
                    {" "}
                    {s.courseTitle}{" "}
                  </option>
                ))}
              </Field>
              <p> {errors.courseTitle ? errors.courseTitle : null} </p>
            </div>

            <button type="submit" disabled={!isValid}>
              {!isSubmitting ? (
                t("submit")
              ) : (
                <FontAwesomeIcon icon="circle-notch" className="fa-spin" />
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
