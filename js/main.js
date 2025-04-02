const slider = document.querySelector(".videos"),
  pauseIconUrl = "./assets/icons/pauseIcon.svg",
  playIconUrl = "./assets/icons/playIcon.svg";
let videos;

let videosArr = [
  {
    src: "./assets/video/253423_tiny.mp4",
    poster: "./assets/images/poster.webp",
    text: "About video",
  },
  {
    src: "./assets/video/253423_tiny.mp4",
    poster: "./assets/images/poster.webp",
    text: "About video",
  },
  {
    src: "./assets/video/253423_tiny.mp4",
    poster: "./assets/images/poster.webp",
    text: "About video",
  },
  {
    src: "./assets/video/253423_tiny.mp4",
    poster: "./assets/images/poster.webp",
    text: "About video",
  },
  {
    src: "./assets/video/253423_tiny.mp4",
    poster: "./assets/images/poster.webp",
    text: "About video",
  },
  {
    src: "./assets/video/253423_tiny.mp4",
    poster: "./assets/images/poster.webp",
    text: "About video",
  },
  {
    src: "./assets/video/253423_tiny.mp4",
    poster: "./assets/images/poster.webp",
    text: "About video",
  },
  {
    src: "./assets/video/253423_tiny.mp4",
    poster: "./assets/images/poster.webp",
    text: "About video",
  },
  {
    src: "./assets/video/253423_tiny.mp4",
    poster: "./assets/images/poster.webp",
    text: "About video",
  },
  {
    src: "./assets/video/253423_tiny.mp4",
    poster: "./assets/images/poster.webp",
    text: "About video",
  },
]; // video malumotlari (menimcha APIdan kelsa kerak)

function setVideo(src, poster, text) {
  return ` <li class="video pause">
          <video
            src=${src}
            poster=${poster}
          ></video>
          <div class="player">
            <div class="info">
              <div class="play">
                <img src="./assets/icons/playIcon.svg" alt="player" />
              </div>
              <p>${text}</p>
            </div>
          </div>
        </li>`;
} // video HTML strukturasi

function numberOfVideo() {
  if (window.innerWidth <= 440) {
    slider.innerHTML = videosArr
      .slice(0, 4)
      .map((e) => {
        return setVideo(e.src, e.poster, e.text);
      })
      .join("");
  } else {
    slider.innerHTML = videosArr
      .map((e) => {
        return setVideo(e.src, e.poster, e.text);
      })
      .join("");
  }
  // videolar quyilganda vidolarni olib playerlargaham eventlari quyiladi
  videos = document.querySelectorAll(".video");
  playerButtons();
} // mediasida videolar soni har xil bulgani uchun

numberOfVideo(); // videolarni chiqarish uchun

window.addEventListener("resize", numberOfVideo); //ekran uzgarsa videolar sonini nazorat qilish uchun

function playerButtons() {
  videos.forEach((e, i, a) => {
    e.querySelector(".play").addEventListener("click", () => {
      let video = e.querySelector("video");
      e.classList.toggle("pause");
      if (video.paused) {
        a.forEach((element) => {
          element.querySelector("video").pause();
          element.querySelector("img").src = playIconUrl;
        });
        video.play();
        e.querySelector("img").src = pauseIconUrl;
      } else {
        video.pause();
        e.querySelector("img").src = playIconUrl;
      }
    });
  });
} //video player tugmasiniki

//perv and next buttons slider
const backButton = document.querySelector(".backButton"),
  nextButton = document.querySelector(".nextButton"),
  calcSliders = document.querySelector(".calcSliders");
let sliderIndex = 1,
  slidersOfNum = videos.length;

calcSliders.lastChild.innerText = slidersOfNum;
calcSliders.firstChild.innerText = sliderIndex;

nextButton.addEventListener("click", onClickNext); // birinchi next tugma ishlagani uchun

function onClickNext(e) {
  if (sliderIndex === 1) {
    backButton.addEventListener("click", onClickBack);
    backButton.classList.add("active");
  }
  if (sliderIndex <= slidersOfNum) {
    sliderIndex += 1;
    calcSliders.firstChild.innerText = sliderIndex;
    if (sliderIndex === slidersOfNum) {
      e.target.removeEventListener("click", onClickNext);
      e.target.classList.remove("active");
    }
  }
  slider.scrollLeft = videos[sliderIndex - 1].offsetLeft;
} // next tugmasini funksiyasi

function onClickBack(e) {
  if (sliderIndex === slidersOfNum) {
    nextButton.addEventListener("click", onClickNext);
    nextButton.classList.add("active");
  }
  if (sliderIndex > 0) {
    sliderIndex -= 1;
    calcSliders.firstChild.innerText = sliderIndex;
    if (sliderIndex === 1) {
      e.target.removeEventListener("click", onClickBack);
      e.target.classList.remove("active");
    }
  }
  slider.scrollLeft = videos[sliderIndex - 1].offsetLeft;
} // back tugmasini funksiyasi

// see all button
const seeAllButton = document.querySelector(".pageNation");

seeAllButton.addEventListener("click", (e) => {
  e.target.style.display = "none";
  slider.innerHTML = videosArr
    .map((e) => {
      return setVideo(e.src, e.poster, e.text);
    })
    .join("");
});
