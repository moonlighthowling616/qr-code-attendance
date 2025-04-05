import React from "react";
import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { personCircle } from "ionicons/icons";
import "./StudentCard.css";

function StudentCard({ student, time, lateTime, status }) {
  const formatTimeTo12Hour = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    let period = "AM";
    let formattedHours = hours;

    if (formattedHours >= 12) {
      period = "PM";
      if (formattedHours > 12) {
        formattedHours -= 12;
      }
    } else if (formattedHours === 0) {
      formattedHours = 12;
    }

    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const convertTo24Hour = (time) => {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes] = timePart.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    } else if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:00`;
  };

  const indicator = (time, lateTime) => {
    const timeInObj = new Date(`1970-01-01T${time}Z`);
    const lateTimeObj = new Date(`1970-01-01T${convertTo24Hour(lateTime)}Z`);
    const twelvePM = new Date("1970-01-01T12:00:00Z");

    let remarks = "ontime";
    if (timeInObj >= lateTimeObj && timeInObj < twelvePM) {
      remarks = "late";
    } else if (timeInObj >= twelvePM) {
      remarks = "halfday";
    }

    if (remarks === "late") {
      return (
        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "#1976D2",
            borderRadius: "4px",
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 12px",
          }}
        >
          <h2
            style={{ fontSize: "14px", fontWeight: "bolder", color: "white" }}
          >
            L
          </h2>
        </div>
      );
    } else if (remarks === "halfday") {
      return (
        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "#FFD54F",
            borderRadius: "4px",
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 12px",
          }}
        >
          <h2
            style={{ fontSize: "14px", fontWeight: "bolder", color: "white" }}
          >
            H
          </h2>
        </div>
      );
    } else if (remarks === "ontime") {
      return (
        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            borderRadius: "4px",
            boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 12px",
          }}
        >
          <h2
            style={{ fontSize: "14px", fontWeight: "bolder", color: "white" }}
          >
            P
          </h2>
          {/* <small>Present (on time) </small> */}
        </div>
      );
    }
    return null;
  };

  return (
    <IonItem
      lines="none"
      className="ion-no-padding"
      style={{ borderBottom: "1px solid #e0e0e0" }}
    >
      <IonLabel
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1em",
          padding: "12px 16px",
          flexWrap: "wrap", // Allows wrapping for smaller screens
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1em",
            flex: "1 1 auto",
          }}
        >
          <IonIcon
            color="secondary"
            icon={personCircle}
            style={{ fontSize: "1em" }}
          ></IonIcon>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2 style={{ margin: 0, fontSize: ".8em", fontWeight: "500" }}>
              {student}
            </h2>
            {time && (
              <p style={{ margin: 0, color: "gray", fontSize: ".6em" }}>
                Entered at {formatTimeTo12Hour(time)}
              </p>
            )}
          </div>
        </div>

        {time ? (
          indicator(time, lateTime)
        ) : (
          <div
            style={{
              padding: "10px 20px",
              backgroundColor: "#E0554A",
              borderRadius: "4px",
              boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 12px",
            }}
          >
            <h2
              style={{ fontSize: "14px", fontWeight: "bolder", color: "white" }}
            >
              A
            </h2>
          </div>
        )}
      </IonLabel>
    </IonItem>
  );
}

export default StudentCard;
