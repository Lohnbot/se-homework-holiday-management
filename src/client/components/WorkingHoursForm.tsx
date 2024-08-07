import { useForm, SubmitHandler } from "react-hook-form";
import WorkingHours from "../../shared/types/WorkingHours";
import styles from "./WorkingHoursForm.module.css";
import { useEffect, useState } from "react";

const defaultValues: WorkingHours = {
  hoursSun: 0,
  hoursMon: 8,
  hoursTue: 8,
  hoursWed: 8,
  hoursThu: 8,
  hoursFri: 8,
  hoursSat: 0,
};

const dayLabels = {
  hoursSun: "Sunday",
  hoursMon: "Monday",
  hoursTue: "Tuesday",
  hoursWed: "Wednesday",
  hoursThu: "Thursday",
  hoursFri: "Friday",
  hoursSat: "Saturday",
};

export default function WorkingHoursForm() {
  const [workingHours, setWorkingHours] = useState<WorkingHours>(defaultValues);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkingHours>({ values: workingHours });

  const onSubmit: SubmitHandler<WorkingHours> = (data) => {
    fetch("/api/workingHours", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          alert("Failed to update working hours");
          throw new Error(
            "Failed to update working hours: " + response.statusText
          );
        }

        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWorkingHours(data);
      });
  };

  useEffect(() => {
    fetch("/api/workingHours")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setWorkingHours(data);
      });
  }, [setWorkingHours]);

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.daysContainer}>
          {Object.entries(defaultValues).map(([key, defaultValue]) => {
            const typedKey = key as keyof WorkingHours;
            return (
              <div key={key} className={styles.inputContainer}>
                <label>{dayLabels[typedKey]}</label>
                <input
                  type="number"
                  defaultValue={defaultValue}
                  {...register(typedKey, {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
                {errors[typedKey] && (
                  <span className={styles.error}>This field is required</span>
                )}
              </div>
            );
          })}
        </div>

        <input type="submit" value="Update" />
      </form>
    </div>
  );
}
