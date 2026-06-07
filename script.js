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
const categoryGrid = document.getElementById("categoryGrid");

const categoryIcons = {
  drilling: "⌁",
  threading: "⌘",
  turning: "▰",
  holding: "◉",
  measuring: "⌖",
  cutting: "◌",
  fluids: "◍",
  lifting: "▣"
};

async function loadHomepageCategories() {
  if (!categoryGrid) return;

  try {
    const response = await fetch("data/product_data.json");
    const data = await response.json();

    const categories = data.Categories
      .filter(category => category.IsActive === true)
      .sort((a, b) => Number(a.SortOrder) - Number(b.SortOrder));

    categoryGrid.innerHTML = categories.map(category => {
      const icon = categoryIcons[category.IconKey] || "▣";

      return `
        <a class="category-card" href="${category.CategoryPage}">
          <img
            src="${category.ImageFile}"
            alt="${category.CategoryName}"
            onerror="this.onerror=null; this.src='assets-new/families/familyplaceholder.jpg'"
          />

          <div class="category-content">
            <h3>${category.CategoryName}</h3>

            <span class="category-link">
              مشاهده محصولات ←
            </span>
          </div>
        </a>
      `;
    }).join("");

  } catch (error) {
    console.error("خطا در خواندن دسته‌بندی‌ها:", error);
  }
}
loadHomepageCategories();

const megaMenuSidebar = document.getElementById("megaMenuSidebar");
const megaMenuContent = document.getElementById("megaMenuContent");

async function loadMegaMenu() {
  if (!megaMenuSidebar || !megaMenuContent) return;

  try {
    const response = await fetch("data/product_data.json");
    const data = await response.json();

    const categories = data.Categories
      .filter(category => category.IsActive === true)
      .sort((a, b) => Number(a.SortOrder) - Number(b.SortOrder));

    const families = data.ProductFamilies
      .filter(family => family.IsActive === true)
      .sort((a, b) => Number(a.SortOrder) - Number(b.SortOrder));

    megaMenuSidebar.innerHTML = categories.map((category, index) => {
      const icon = categoryIcons[category.IconKey] || "▣";
      const activeClass = index === 0 ? "active" : "";

      return `
        <a href="${category.CategoryPage}" class="mega-category ${activeClass}" data-category="${category.CategoryID}">
          <span class="mega-icon">${icon}</span>
          ${category.CategoryName}
        </a>
      `;
    }).join("");

    megaMenuContent.innerHTML = categories.map((category, index) => {
      const activeClass = index === 0 ? "active" : "";

      const categoryFamilies = families
        .filter(family => family.CategoryID === category.CategoryID)
        .sort((a, b) => Number(a.SortOrder) - Number(b.SortOrder));

      return `
        <div class="mega-panel ${activeClass}" id="panel-${category.CategoryID}">
          <a href="${category.CategoryPage}" class="mega-all-link">
            ${category.CategoryName}
          </a>

          <div class="mega-family-list">
            ${categoryFamilies.map(family => `
              <a href="${category.CategoryPage}" class="mega-family">
                <h4>${family.FamilyName}</h4>
                ${family.ShortDescription ? `<p>${family.ShortDescription}</p>` : ""}
              </a>
            `).join("")}
          </div>
        </div>
      `;
    }).join("");

    const megaCategories = document.querySelectorAll(".mega-category");
    const megaPanels = document.querySelectorAll(".mega-panel");

    megaCategories.forEach(item => {
      item.addEventListener("mouseenter", () => {
        const categoryId = item.dataset.category;

        megaCategories.forEach(cat => cat.classList.remove("active"));
        megaPanels.forEach(panel => panel.classList.remove("active"));

        item.classList.add("active");
        const targetPanel = document.getElementById(`panel-${categoryId}`);
        if (targetPanel) {
          targetPanel.classList.add("active");
        }
      });
    });

  } catch (error) {
    console.error("خطا در ساخت مگا منو:", error);
  }
}

loadMegaMenu();
const siteHeader = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (!siteHeader) return;

  if (window.scrollY > 60) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
});
const brandsTrack = document.getElementById("brandsTrack");

async function loadBrands() {
  if (!brandsTrack) return;

  try {
    const response = await fetch("data/product_data.json");
    const data = await response.json();

    const brands = data.Brands
      .filter(brand => brand.IsActive === true)
      .sort((a, b) => Number(a.SortOrder) - Number(b.SortOrder));

    const brandItems = brands.map(brand => `
  <a class="brand-logo" href="${brand.BrandPage || "#"}" title="${brand.BrandName}">
    <span class="brand-logo-inner" style="--logo-scale: ${brand.LogoScale || 1};">
      <img src="${brand.LogoFile}" alt="${brand.BrandName}" />
      <span class="brand-underline"></span>
    </span>
  </a>
`).join("");

    brandsTrack.innerHTML = brandItems + brandItems;

  } catch (error) {
    console.error("خطا در خواندن برندها:", error);
  }
}

loadBrands();
const featuredTrack = document.getElementById("featuredFamiliesTrack");
const featuredPrev = document.querySelector(".featured-prev");
const featuredNext = document.querySelector(".featured-next");

let featuredItems = [];
let featuredStartIndex = 0;
let featuredIsAnimating = false;
const featuredVisibleCount = 5;

function getLoopItem(index) {
  const length = featuredItems.length;
  return featuredItems[((index % length) + length) % length];
}

function createFeaturedCard(family) {
  const badgeName = family.FeaturedBadge || "";
  const badgeText = family.FeaturedBadgeText || "";

  const badgePath = badgeName
    ? `assets-new/feature-badge/${badgeName}.svg`
    : "";

  return `
    <a class="featured-card" href="#">

      ${
        badgeName
          ? `
            <div class="featured-badge">
              <img src="${badgePath}" alt="${badgeText}">
              ${badgeText ? `<span>${badgeText}</span>` : ""}
            </div>
          `
          : ""
      }

      <div class="featured-image">
        <img
          src="${family.ImageFile}"
          alt="${family.FamilyName}"
          onerror="this.onerror=null; this.src='assets-new/families/familyplaceholder.jpg'"
        />
      </div>

      <div class="featured-info">
        <h3>${family.FamilyName}</h3>
        <p class="featured-desc">${family.Description || ""}</p>
      </div>
    </a>
  `;
}

function renderFeaturedWindow(extraBefore = false, extraAfter = false) {
  if (!featuredTrack || featuredItems.length === 0) return;

  const cards = [];

  if (extraBefore) {
    cards.push(createFeaturedCard(getLoopItem(featuredStartIndex - 1)));
  }

  for (let i = 0; i < featuredVisibleCount; i++) {
    cards.push(createFeaturedCard(getLoopItem(featuredStartIndex + i)));
  }

  if (extraAfter) {
    cards.push(createFeaturedCard(getLoopItem(featuredStartIndex + featuredVisibleCount)));
  }

  featuredTrack.innerHTML = cards.join("");
}

async function loadFeaturedFamilies() {
  if (!featuredTrack) return;

  try {
    const response = await fetch("data/product_data.json");
    const data = await response.json();

    featuredItems = data.ProductFamilies
      .filter(family =>
        (family.IsActive === true || family.IsActive === "TRUE") &&
        (family.ShowOnHome === true || family.ShowOnHome === "TRUE")
      )
      .sort((a, b) => Number(a.HomeOrder || 999) - Number(b.HomeOrder || 999));

    renderFeaturedWindow();

  } catch (error) {
    console.error("خطا در خواندن محصولات منتخب:", error);
  }
}

function getFeaturedStep() {
  const card = featuredTrack.querySelector(".featured-card");
  if (!card) return 225;

  const style = window.getComputedStyle(featuredTrack);
  const gap = parseFloat(style.gap || 0);

  return card.offsetWidth + gap;
}

function moveFeaturedNext() {
  if (featuredIsAnimating || featuredItems.length <= featuredVisibleCount) return;

  featuredIsAnimating = true;
  const step = getFeaturedStep();

  renderFeaturedWindow(false, true);

  featuredTrack.style.transition = "transform 0.45s ease";
  featuredTrack.style.transform = `translateX(-${step}px)`;

  setTimeout(() => {
    featuredStartIndex++;

    featuredTrack.style.transition = "none";
    featuredTrack.style.transform = "translateX(0)";

    renderFeaturedWindow();

    featuredIsAnimating = false;
  }, 460);
}

function moveFeaturedPrev() {
  if (featuredIsAnimating || featuredItems.length <= featuredVisibleCount) return;

  featuredIsAnimating = true;
  const step = getFeaturedStep();

  renderFeaturedWindow(true, false);

  featuredTrack.style.transition = "none";
  featuredTrack.style.transform = `translateX(-${step}px)`;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      featuredTrack.style.transition = "transform 0.45s ease";
      featuredTrack.style.transform = "translateX(0)";
    });
  });

  setTimeout(() => {
    featuredStartIndex--;

    featuredTrack.style.transition = "none";
    featuredTrack.style.transform = "translateX(0)";

    renderFeaturedWindow();

    featuredIsAnimating = false;
  }, 460);
}

featuredNext?.addEventListener("click", moveFeaturedNext);
featuredPrev?.addEventListener("click", moveFeaturedPrev);

loadFeaturedFamilies();

const contactOverlay = document.getElementById("contactOverlay");

/* FLOATING CONTACT WIDGET */

(() => {
  const floatingContact = document.getElementById("floatingContact");
  const contactBtn = document.getElementById("contactBtn");

  if (!floatingContact || !contactBtn) return;

  let isOpen = false;

  function openContact() {
    isOpen = true;
    contactOverlay?.classList.add("active");
    floatingContact.classList.remove("closing");
    floatingContact.classList.add("active");
  }

  function closeContact() {
    isOpen = false;
    contactOverlay?.classList.remove("active");
    floatingContact.classList.add("closing");
    floatingContact.classList.remove("active");

    setTimeout(() => {
      floatingContact.classList.remove("closing");
    }, 520);
  }

  contactBtn.addEventListener("click", function (event) {
    event.stopPropagation();

    if (isOpen) {
      closeContact();
    } else {
      openContact();
    }
  });

  document.addEventListener("click", function (event) {
    if (isOpen && !floatingContact.contains(event.target)) {
      closeContact();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen) {
      closeContact();
    }
  });
})();