import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { getAllTrainings } from "../trainingapi";
import dayjs from "dayjs";

function CalendarPage() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    getAllTrainings()
      .then((data) => setTrainings(data))
      .catch((error) => console.error("Error fetching trainings:", error));
  };

  // Convert trainings data into events compatible with FullCalendar
  const events = trainings.map((training) => ({
    id: training.id,
    title: `${training.activity} (${training.duration} mins)`,
    start: dayjs(training.date).format("YYYY-MM-DD"),
  }));

  return (
    <div style={{ margin: "20px" }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        events={events}
      />
    </div>
  );
}

export default CalendarPage;