import React from "react";
import {
  IonIcon,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { personCircle, checkmarkCircle } from "ionicons/icons";
import "./StudentCard.css";

function StudentCard({ student, time, status }) {
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

  const indicator = (status) => {
    if (status === "late") {
      return (
        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "#1976D2 ",
            borderRadius: "4px",
          }}
        >
          <h2
            style={{ fontSize: "14px", fontWeight: "bolder", color: "white" }}
          >
            L
          </h2>
        </div>
      );
    } else if (status === "halfday") {
      return (
        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "#FFD54F",
            borderRadius: "4px",
          }}
        >
          <h2
            style={{ fontSize: "14px", fontWeight: "bolder", color: "white" }}
          >
            H
          </h2>
        </div>
      );
    } else if (status === "present") {
      return (
        <div
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            borderRadius: "4px",
          }}
        >
          <h2
            style={{ fontSize: "14px", fontWeight: "bolder", color: "white" }}
          >
            P
          </h2>
        </div>
      );
    }
    return null;
  };

  return (
    <IonItem lines="none" className="ion-no-padding">
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
            style={{ fontSize: "2em" }}
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
      
          {time ? indicator(status) : <div
          style={{
            padding: "10px 20px",
            backgroundColor: "#D32F2F",
            borderRadius: "4px",
          }}
        >
          <h2
            style={{ fontSize: "14px", fontWeight: "bolder", color: "white" }}
          >
            A
          </h2>
        </div>}

      </IonLabel>
    </IonItem>
  );
}

export default StudentCard;
