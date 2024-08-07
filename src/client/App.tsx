import WorkingHoursForm from "./components/WorkingHoursForm";
import HolidayList from "./components/HolidayList";
import NewHolidayForm from "./components/NewHolidayForm";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.App}>
      <h1>Holiday management</h1>
      <h2>Working Hours</h2>
      <WorkingHoursForm />
      <h2>Holidays</h2>
      <HolidayList />
      <NewHolidayForm />
    </div>
  );
}

export default App;
