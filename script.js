const form = document.querySelector(".form");
const result = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.querySelector(".name").value;
  const warning = document.querySelector(".alert");
  const formInput = document.querySelectorAll(".form-control");
  let name2 = "";

  // Get Birhdate and today date
  const birthdate = new Date(document.querySelector(".birthdate").value);
  const today = new Date();

  // Get a different number between today and birthdate
  if (isNaN(birthdate)) {
    formInput[1].id = "form-alert-style";
    formInput[1].classList.add("form-alert");
    setTimeout(() => {
      formInput[1].classList.remove("form-alert");
    }, 500);
    return warning.classList.remove("d-none");
  }

  const yearDiff = today.getFullYear() - birthdate.getFullYear();
  const monthdiff = today.getMonth() - birthdate.getMonth();
  const dayDiff = today.getDate() - birthdate.getDate();

  const age = {
    year: yearDiff,
    month: monthdiff,
    date: dayDiff,
  };

  // function if user want to count leap birthday
  // This is broken, i'll fix later
  // function getLeapBirthday() {
  // const isLeapBirthYear = isLeapYear(birthdate.getFullYear());
  // const isLeapCurrYear = isLeapYear(today.getFullYear());

  // check is birth year or current year is a leap year or not
  //   function isLeapYear(year) {
  //     return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  //   }
  //
  //   // check the feburary in a leap year
  //   if (
  //     isLeapBirthYear &&
  //     birthdate.getMonth() === 1 &&
  //     birthdate.getDate() === 29
  //   ) {
  //     age.month = 0;
  //     age.date = today.getDate() - birthdate.getDate();
  //   }
  //
  //   if (isLeapCurrYear && today.getMonth() === 1 && today.getDate() === 29) {
  //     age.date = 29 - birthdate.getDate();
  //   }
  // }
  //
  // check if leap birtday checklist is on
  // if (leapCount) {
  //   getLeapBirthday();
  // }

  // function to capitalize each first word
  function capitalizeFirstWord(name) {
    name.toLowerCase();
    const arr = name.split(" ");

    for (i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }

    name2 = arr.join(" ");
  }

  // function for get date if the date < 0
  function getBirthdate() {
    age.month--;
    const lastMonth = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      birthdate.getDate()
    );
    age.date = Math.floor((today - lastMonth) / (1000 * 60 * 60 * 24));
  }

  // check if the month and the date is < 0
  if (age.month < 0 || (age.month === 0 && age.date < 0)) {
    age.year--;
    age.month = 12 - Math.abs(monthdiff);
    if (age.date < 0) {
      getBirthdate();
    }
  } else if (age.month > 0 && age.date < 0) {
    getBirthdate();
  }

  setTimeout(() => {
    result.innerHTML = `Hi <span class="name-result">${name2}</span>, Umur anda sekarang <br> ${age.year} <span class="age-result">Tahun</span> ${age.month} <span class="age-result">Bulan</span> ${age.date} <span class="age-result">Hari</span>`;
  }, 1500);

  capitalizeFirstWord(name);

  formInput[1].removeAttribute("id");
  warning.classList.add("d-none");
  result.innerHTML = `Matte Kudasai~ <br>
  <img src="./assets/matte.gif" class="mt-3" style="width: 150px">`;
});
