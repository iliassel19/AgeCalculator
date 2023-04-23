const tl = gsap.timeline();
const months = [
  { name: "January", days: 31 },
  { name: "February", days: 28 },
  { name: "March", days: 31 },
  { name: "April", days: 30 },
  { name: "May", days: 31 },
  { name: "June", days: 30 },
  { name: "July", days: 31 },
  { name: "August", days: 31 },
  { name: "September", days: 30 },
  { name: "October", days: 31 },
  { name: "November", days: 30 },
  { name: "December", days: 31 },
];
const form = document.querySelector(".form");
const day = document.querySelector("#day");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const dayErrorMsg = document.querySelector("#day__error-msg");
const monthErrorMsg = document.querySelector("#month__error-msg");
const yearErrorMsg = document.querySelector("#year__error-msg");
const now = new Date();
const currentYear = now.getFullYear();
const currentDay = now.getDate();
const currentMonth = now.getMonth() + 1;
const currentMonthName = months[now.getMonth()].name;
const resultDays = document.querySelector(".days");
const resultYears = document.querySelector(".years");
const resultMonths = document.querySelector(".months");

const startAnimation = () => {
  tl.from(".container", {
    scaleY: 0,
    opacity: 0,
    duration: 1,
  })
    .from(".form__grp", {
      opacity: 0,
      stagger: 0.2,
    })
    .from(".border-b", {
      scaleX: 0,
      duration: 0.5,
    })
    .from(".form button", {
      opacity: 0,
    })
    .from("h1", {
      y: 50,
      opacity: 0,
      stagger: 0.2,
    });
};

startAnimation();
// Function te check if the number is decimal
function numberIsDecimal(n) {
  var result = n - Math.floor(n) !== 0;
  if (result) return true;
  else return false;
}

const calculatAge = function (day, month, year) {
  const days = day - currentDay;
  const months = month - currentMonth;
  const years = year - currentYear;

  const age = years * 365 + months * 31 + days;

  const ageOnYears = age / 365;
  const finalAgeYears = Math.abs(Math.trunc(ageOnYears));
  const ageOnMonths = (ageOnYears + finalAgeYears) * 12;
  const finalAgeMonths = Math.abs(Math.trunc(ageOnMonths));
  const ageOnDays = (finalAgeMonths + ageOnMonths) * 31;
  const finalAgeDays = Math.abs(Math.trunc(ageOnDays));

  return { finalAgeYears, finalAgeMonths, finalAgeDays };
};

day.addEventListener("input", function (e) {
  const value = +e.target.value;
  // Remove Error for non-empty fields
  if (value && value > 0) {
    day.parentElement.classList.remove("error");
    dayErrorMsg.textContent = "";
  }
});
month.addEventListener("input", function (e) {
  const value = +e.target.value;
  // Remove Error for non-empty fields
  if (value && value > 0) {
    month.parentElement.classList.remove("error");
    monthErrorMsg.textContent = "";
  }
});
year.addEventListener("input", function (e) {
  const value = +e.target.value;
  // Remove Error for non-empty fields
  if (value && value > 0) {
    year.parentElement.classList.remove("error");
    yearErrorMsg.textContent = "";
  }
});

day.addEventListener("blur", function (e) {
  const value = +e.target.value;
  const isEmpty = e.target.value.length === 0;
  const dayDateIsValid = value > 0 && value <= 31;
  // In case user enters a decimal value, function returns if thats the case or not to check further more validity of inputs
  const valueIsDecimal = numberIsDecimal(value);
  // Render error if input is blured while its empty
  if (isEmpty) {
    day.parentElement.classList.add("error");
    dayErrorMsg.textContent = "This field is required";
    return;
  }
  // Day entered is not between 1 and 31
  if (dayDateIsValid && !valueIsDecimal) return;
  day.parentElement.classList.add("error");
  dayErrorMsg.textContent = "Must be a valid day";
});
month.addEventListener("blur", function (e) {
  const value = +e.target.value;
  const isEmpty = e.target.value.length === 0;
  const monthDateIsValid = value > 0 && value <= 12;
  // In case user enters a decimal value, function returns if thats the case or not to check further more validity of inputs
  const valueIsDecimal = numberIsDecimal(value);
  // Render error if input is blured while its empty
  if (isEmpty) {
    month.parentElement.classList.add("error");
    monthErrorMsg.textContent = "This field is required";
    return;
  }
  // Month entered is not between 1 and 12
  if (monthDateIsValid && !valueIsDecimal) return;
  month.parentElement.classList.add("error");
  monthErrorMsg.textContent = "Must be a valid month";
});
year.addEventListener("blur", function (e) {
  const isEmpty = e.target.value.length === 0;
  const value = +e.target.value;
  const yearDateIsValid = value <= currentYear;
  // In case user enters a decimal value, function returns if thats the case or not to check further more validity of inputs
  const valueIsDecimal = numberIsDecimal(value);
  // Render error if input is blured while its empty
  if (isEmpty) {
    year.parentElement.classList.add("error");
    yearErrorMsg.textContent = "This field is required";
    return;
  }
  // Year entered is not in the past
  if (yearDateIsValid && !valueIsDecimal) return;
  year.parentElement.classList.add("error");
  yearErrorMsg.textContent = "Must be in the past";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const dayValue = +day.value;
  const monthValue = +month.value;
  const yearValue = +year.value;

  const yearDateIsValid = yearValue <= currentYear;
  const dayDateIsValid = dayValue > 0 && dayValue <= 31;
  const monthDateIsValid = monthValue > 0 && monthValue <= 12;
  // ERROR STATE: Error for empty fields
  if (dayValue === 0) {
    day.parentElement.classList.add("error");
    dayErrorMsg.textContent = "This field is required";
  }
  if (monthValue === 0) {
    month.parentElement.classList.add("error");
    monthErrorMsg.textContent = "This field is required";
  }
  if (yearValue === 0) {
    year.parentElement.classList.add("error");
    yearErrorMsg.textContent = "This field is required";
    return;
  }

  if (!yearDateIsValid || !dayDateIsValid || !monthDateIsValid) return;

  // ERROR STATE: Error for wrong day in month (ex. 31/04)
  const validNumberOfDays = dayValue <= months[monthValue - 1].days;
  if (!validNumberOfDays) {
    day.parentElement.classList.add("error");
    dayErrorMsg.textContent = "Must be a valid date";
    month.parentElement.classList.add("error");
    year.parentElement.classList.add("error");
    return;
  } else {
    day.parentElement.classList.remove("error");
    dayErrorMsg.textContent = "";
    month.parentElement.classList.remove("error");
    year.parentElement.classList.remove("error");
  }

  // ERROR STATE: Error for giving date in futur
  const isCurrentYear = yearValue === currentYear;
  const isCurrentMonth = monthValue === currentMonth;
  const isCurrentDay = dayValue === currentDay;
  // Cannot calculate Age if date is in the present
  if (isCurrentDay && isCurrentMonth && isCurrentYear) {
    day.parentElement.classList.add("error");
    dayErrorMsg.textContent = "Must be in the past";
    month.parentElement.classList.add("error");
    year.parentElement.classList.add("error");
    return;
  } else {
    day.parentElement.classList.remove("error");
    dayErrorMsg.textContent = "";
    month.parentElement.classList.remove("error");
    year.parentElement.classList.remove("error");
    const { finalAgeDays, finalAgeMonths, finalAgeYears } = calculatAge(
      dayValue,
      monthValue,
      yearValue
    );

    // RESET UI
    day.blur();
    month.blur();
    year.blur();
    day.value = "";
    month.value = "";
    year.value = "";

    tl.to(".years", {
      y: -50,
      opacity: 0,
      duration: 0.2,
    })
      .to(".months", {
        y: -50,
        opacity: 0,
        duration: 0.2,
      })
      .to(".days", {
        y: -50,
        opacity: 0,
        duration: 0.2,
      })

      .to(".years", { delay: 1.25, y: 0, opacity: 1, duration: 0.2 })
      .to(".months", {
        y: 0,
        opacity: 1,
        duration: 0.2,
      })
      .to(".days", { y: 0, opacity: 1, duration: 0.2 });

    // 600ms is time to perfome hiding animation and the 25ms plus is added so that changing text content is done off-sight
    setTimeout(() => {
      resultDays.textContent = `${finalAgeDays}`;
      resultYears.textContent = `${finalAgeYears}`;
      resultMonths.textContent = `${finalAgeMonths}`;
    }, 625);
  }
});
