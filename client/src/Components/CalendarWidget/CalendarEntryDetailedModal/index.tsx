import styles from "./CalendarEntryDetailedModal.module.scss";
import { ReactComponent as Background } from "./background.svg";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { getRandomColor } from "../../../cssUtils";
import { useTranslation } from "react-i18next";
import { Events } from "../../../../../types/Event";
import {
  useSections,
  useUpdateUser,
  useUser,
} from "../../../custom-query-hooks";
import axios from "axios";
import RemoveEventBodyParams from "../../../../../types/Queries/RemoveEvent";
import CompletedEventBodyParams from "../../../../../types/Queries/CompletedEvent";
export interface CalendarEntryDetailedModalProps {
  event: Events;
  close: () => void;
}

export function CalendarEntryDetailedModal({
  event,
  close,
}: CalendarEntryDetailedModalProps) {
  const [color] = useState(getRandomColor());

  //Check for User and creation of button if User
  const user = useUser();
  const updateUser = useUpdateUser(user.gid);
  const sectionsQuery = useSections({ userClassSections: user.sections });

  const queryClient = useQueryClient();

  const { t } = useTranslation(["events"]);

  const addCompletedEvent = useMutation(
    async (arg: CompletedEventBodyParams) => {
      await axios.post("/api/addCompletedEvent", arg);
    },
    {
      onSuccess: () =>
        queryClient.invalidateQueries({ queryKey: ["userUpdate"] }),
    }
  );

  useEffect(() => {
    const toastId = "updatingEvent";
    if (addCompletedEvent.isLoading) {
      toast.loading(t("updatingEvent"), { toastId });
    } else {
      toast.done(toastId);
    }
  }, [addCompletedEvent, addCompletedEvent.isLoading]);

  const isOwner = user._id === event.ownerId;
  const qc = useQueryClient();
  const removeEvent = useMutation(
    async (arg: RemoveEventBodyParams) => {
      await axios.post("/api/removeEvent", arg);
    },
    {
      onSuccess: () => qc.invalidateQueries({ queryKey: ["getAllCourses"] }),
    }
  );

  return (
    <div className={styles.wrapper}>
      <Background className={styles.svg} color={color} />
      <div className={styles.innerWrapper}>
        <div className={styles.top}>
          <h1> {event.title} </h1>
          <h2> {event.courseTitle} </h2>
        </div>
        <div className={styles.center}>
          <h3> {t("eventDescription")}</h3>
          <p> {event.desc} </p>
        </div>
        <div className={styles.botton}>
          <button
            onClick={async () =>
              addCompletedEvent.mutate({
                userId: user._id,
                completedEvent: { id: event._id, date: new Date() },
              })
            }
          >
            {" "}
            {t("markAsDone")}{" "}
          </button>
          {isOwner ? (
            <button
              onClick={async () => {
                toast.loading("Removing event...", {
                  toastId: "removingEvent",
                });
                const course = sectionsQuery!.data!.find(
                  (s) => s.courseTitle === event.courseTitle
                );
                console.log(sectionsQuery.data);
                await removeEvent.mutateAsync({
                  eventId: event.mongoId!,
                  courseNumber: course!.courseNumber,
                  courseSection: course!.number,
                });
                toast.done("removingEvent");
              }}
            >
              {" "}
              {t("delete")}{" "}
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
