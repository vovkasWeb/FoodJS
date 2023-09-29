window.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tabheader__item");
  const tabsContent = document.querySelectorAll(".tabcontent");
  const tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.style.display = "none";
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].style.display = "block";
    tabs[i].classList.add("tabheader__item_active");
  }

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (e) => {
    const target = e.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  const deadline = "2023-09-29";

  function getTimeRemaining(endtime) {
    let days = 0;
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    const t = Date.parse(endtime) - Date.parse(new Date());
    if (t > 0) {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      minutes = Math.floor((t / 1000 / 60) % 60);
      seconds = Math.floor((t / 1000) % 60);
    }
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  function getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector);
    const days = timer.querySelector("#days");
    const hours = timer.querySelector("#hours");
    const minutes = timer.querySelector("#minutes");
    const seconds = timer.querySelector("#seconds");
    const timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }
  setClock(".timer", deadline);

  //Modal

  const modalTrigger = document.querySelectorAll("[data-modal]");
  const modal = document.querySelector(".modal");
  const modalCloseBtn = document.querySelector("[data-close]");

  function openModal() {
    modal.classList.toggle("show");
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => {
      // console.log('kkk');
      // modal.classList.add("show");
      // modal.classList.remove("hide");
      openModal();
    });
  });

  function closeModal() {
    modal.classList.toggle("show");
    document.body.style.overflow = "";
  }

  modalCloseBtn.addEventListener(
    "click",
    closeModal
    // modal.classList.add("hide");
    // modal.classList.remove("show");
  );

  modal.addEventListener("click", (e) => {
    if (e.target == modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", () => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 10000);

  function showModalByScroll(){
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scroll - 1) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }

  window.addEventListener("scroll", showModalByScroll);
});
