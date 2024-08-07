/**
 * Returns true if the passed object is a valid working hours object, false otherwise.
 * @param workingHours the object to validate
 */
export const isValidWorkingHoursObject = (workingHours: any) => {
  // Check if the passed object is null or undefined
  if (workingHours === null || workingHours === undefined) {
    return false;
  }

  // Check if the passed object is not an object
  if (typeof workingHours !== "object") {
    return false;
  }

  // Validate that no unexpected keys are present
  if (
    Object.keys(workingHours).length !== 7 ||
    !Object.keys(workingHours).every((key) =>
      [
        "hoursSun",
        "hoursMon",
        "hoursTue",
        "hoursWed",
        "hoursThu",
        "hoursFri",
        "hoursSat",
      ].includes(key)
    )
  ) {
    return false;
  }

  // Validate that the passed object has the correct entry types
  if (
    typeof workingHours.hoursSun !== "number" ||
    typeof workingHours.hoursMon !== "number" ||
    typeof workingHours.hoursTue !== "number" ||
    typeof workingHours.hoursWed !== "number" ||
    typeof workingHours.hoursThu !== "number" ||
    typeof workingHours.hoursFri !== "number" ||
    typeof workingHours.hoursSat !== "number"
  ) {
    return false;
  }

  // Validate that all values are non-negative
  if (
    workingHours.hoursSun < 0 ||
    workingHours.hoursMon < 0 ||
    workingHours.hoursTue < 0 ||
    workingHours.hoursWed < 0 ||
    workingHours.hoursThu < 0 ||
    workingHours.hoursFri < 0 ||
    workingHours.hoursSat < 0
  ) {
    return false;
  }

  return true;
};
