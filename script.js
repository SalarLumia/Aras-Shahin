const slides = [
  {
    image: "assets-new/hero/hero-1.jpg",
    tag: "تأمین ابزار صنعتی",
    title: "قیمت به‌روز ابزارآلات صنعتی<br>سریع، دقیق و منظم",
    description: "دسترسی آسان به دسته‌بندی محصولات، مشخصات فنی و قیمت‌های به‌روز برای مشتریان صنعتی."
  },
  {
    image: "assets-new/hero/hero-2.jpg",
    tag: "ابزار برش و سوراخکاری",
    title: "ابزار دقیق برای ماشینکاری<br>انتخاب حرفه‌ای صنعتگران",
    description: "انواع مته، قلاویز، حدیده و ابزارهای برش با دسته‌بندی منظم و اطلاعات قابل دسترسی."
  },
  {
    image: "assets-new/hero/hero-3.jpg",
    tag: "صفحات برش و سایش",
    title: "برش تمیز و سایش مطمئن<br>برای کارگاه‌های صنعتی",
    description: "دسترسی به صفحات برش، فلاپ دیسک، سایش و ابزارهای مصرفی مناسب کاربردهای صنعتی."
  },
  {
    image: "assets-new/hero/hero-4.jpg",
    tag: "روانکارها و سیالات صنعتی",
    title: "عملکرد بهتر ابزار<br>با سیالات صنعتی مناسب",
    description: "محلول آب‌صابون، روغن برش و روانکارهای صنعتی برای افزایش عمر ابزار و کیفیت ماشینکاری."
  },
  {
    image: "assets-new/hero/hero-5.jpg",
    tag: "تجهیزات کارگاهی",
    title: "تأمین تجهیزات صنعتی<br>برای کارگاه‌های حرفه‌ای",
    description: "از تجهیزات جابجایی و جرثقیل تا ابزارهای اندازه‌گیری، همه در یک ساختار منظم و قابل جستجو."
  }
];

let currentSlide = 0;
const intervalTime = 7000;

const heroImage = document.getElementById("heroImage");
const heroTag = document.getElementById("heroTag");
const heroTitle = document.getElementById("heroTitle");
const heroDescription = document.getElementById("heroDescription");
const heroContent = document.querySelector(".hero-content");

function showSlide(index) {
  currentSlide = index;

  heroContent.classList.add("text-changing");
  heroImage.classList.add("changing");

  setTimeout(() => {
    const slide = slides[index];

    heroImage.src = slide.image;
    heroTag.textContent = slide.tag;
    heroTitle.innerHTML = slide.title;
    heroDescription.textContent = slide.description;

    heroImage.classList.remove("active-zoom");
    void heroImage.offsetWidth;
    heroImage.classList.add("active-zoom");

    heroImage.classList.remove("changing");
    heroContent.classList.remove("text-changing");
  }, 450);
}

setInterval(() => {
  const nextSlide = (currentSlide + 1) % slides.length;
  showSlide(nextSlide);
}, intervalTime);

showSlide(0);

const userFirstName = "علی";
const maxNameLength = 12;

const displayName =
  userFirstName.length <= maxNameLength ? userFirstName : "کاربر";

const userGreeting = document.getElementById("userGreeting");

if (userGreeting) {
  userGreeting.textContent = `${displayName} عزیز! خوش آمدید.`;
}
const productsMenu = document.getElementById("productsMenu");
const productsToggle = document.getElementById("productsToggle");

if (productsMenu && productsToggle) {
  const openMegaMenu = () => {
    productsMenu.classList.add("open");
    document.body.classList.add("mega-open");
  };

  const closeMegaMenu = () => {
    productsMenu.classList.remove("open");
    document.body.classList.remove("mega-open");
  };

  productsMenu.addEventListener("mouseenter", openMegaMenu);

  productsMenu.addEventListener("mouseleave", () => {
    if (!productsMenu.classList.contains("locked")) {
      closeMegaMenu();
    }
  });

  productsToggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();

    productsMenu.classList.toggle("locked");

    if (productsMenu.classList.contains("locked")) {
      openMegaMenu();
    } else {
      closeMegaMenu();
    }
  });

  productsMenu.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  document.addEventListener("click", () => {
    productsMenu.classList.remove("locked");
    closeMegaMenu();
  });
}