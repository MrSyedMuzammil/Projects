// DATA
const slides = [
  {
    title: "🔎 Checking & Tracking",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">See what’s changed, staged, or untracked.</p>
        `,
    code: "git status",
    codeLabel: "Check Status",
    extraCodes: [
      { label: "History Graph", cmd: "git log --oneline --graph --decorate" },
      { label: "Show Unstaged Changes", cmd: "git diff" },
      { label: "Show Staged Changes", cmd: "git diff --staged" },
    ],
  },
  {
    title: "📦 Adding & Committing",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Stage files and save version history.</p>
        `,
    code: "git add .",
    codeLabel: "Stage Everything",
    extraCodes: [
      { label: "Stage Specific File", cmd: "git add <file>" },
      { label: "Commit with Message", cmd: 'git commit -m "message"' },
      { label: "Add & Commit (Tracked)", cmd: 'git commit -am "message"' },
    ],
  },
  {
    title: "🌐 Working with Remote",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Sync your local code with GitHub.</p>
        `,
    code: "git pull origin main",
    codeLabel: "Fetch & Merge",
    extraCodes: [
      { label: "Push to GitHub", cmd: "git push origin main" },
      { label: "Clone Repository", cmd: "git clone <url>" },
    ],
  },
  {
    title: "🔀 Branching",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Manage separate lines of development.</p>
        `,
    code: "git branch",
    codeLabel: "List Branches",
    extraCodes: [
      { label: "Create New Branch", cmd: "git branch <name>" },
      { label: "Switch Branch", cmd: "git checkout <name>" },
      { label: "Create & Switch", cmd: "git checkout -b <name>" },
      { label: "Merge Branch", cmd: "git merge <name>" },
    ],
  },
  {
    title: "🛠️ Fixing & Undoing",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Revert or stash changes safely.</p>
        `,
    code: "git restore <file>",
    codeLabel: "Discard Changes",
    extraCodes: [
      { label: "Unstage File", cmd: "git reset HEAD <file>" },
      { label: "Reset (Destructive)", cmd: "git reset --hard" },
      { label: "Save Temp Changes", cmd: "git stash" },
      { label: "Apply Temp Changes", cmd: "git stash pop" },
    ],
  },
  {
    title: "⚡ Condensed Daily Flow",
    content: `
            <p class="mb-2 text-xs md:text-sm text-slate-300">Routine for saving and syncing work.</p>
        `,
    code: "git status",
    codeLabel: "1. Check",
    extraCodes: [
      { label: "2. Stage All", cmd: "git add ." },
      { label: "3. Commit", cmd: 'git commit -m "update"' },
      { label: "4. Pull Latest", cmd: "git pull origin main" },
      { label: "5. Push Changes", cmd: "git push origin main" },
    ],
  },
];

// STATE
let currentIndex = 0;

// ELEMENTS
const contentContainer = document.getElementById("slide-content");
const paginationContainer = document.getElementById("pagination");
const slideCounterDesktop = document.getElementById("slide-counter-desktop");
const slideCounterMobile = document.getElementById("slide-counter-mobile");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");

function init() {
  renderPagination();
  loadSlide(currentIndex);

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextSlide();
    if (e.key === "ArrowLeft") prevSlide();
  });

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);
}

function loadSlide(index) {
  const slide = slides[index];

  // Fade out
  contentContainer.classList.remove("fade-enter-active");
  contentContainer.classList.add("fade-enter");

  setTimeout(() => {
    // Generate HTML with COMPACT DENSITY
    let html = `
            <div class="flex flex-col gap-2 w-full text-left">
                <div class="border-l-2 border-emerald-500 pl-3">
                    <h2 class="text-xl md:text-2xl font-bold text-white tracking-tight leading-none mb-1">${slide.title}</h2>
                    <div class="text-slate-400 font-light leading-tight">
                        ${slide.content}
                    </div>
                </div>
        `;

    if (slide.code) {
      // Main Code Block (Compact)
      html += `
                <div class="mt-2 w-full text-left">
                    <p class="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        ${slide.codeLabel || "Command"}
                    </p>
                    
                    <div class="bg-slate-900 border border-slate-700 rounded-md p-2.5 shadow-md font-mono text-xs md:text-sm text-white w-full overflow-x-auto whitespace-nowrap text-left scrollbar-hide">
                        ${escapeHtml(slide.code)}
                    </div>
            `;

      // Extra Codes (Very Compact Loop)
      if (slide.extraCodes) {
        slide.extraCodes.forEach((item) => {
          html += `
                        <div class="mt-1.5 w-full text-left">
                            <div class="flex items-center justify-between mb-0.5">
                                <p class="text-[9px] font-bold text-slate-500 uppercase tracking-wider text-left">${
                                  item.label
                                }</p>
                            </div>
                            <div class="bg-slate-900 border border-slate-700 rounded-md p-2 shadow-sm font-mono text-xs md:text-sm text-white w-full overflow-x-auto whitespace-nowrap text-left scrollbar-hide">
                                ${escapeHtml(item.cmd)}
                            </div>
                        </div>
                    `;
        });
      }

      html += `</div>`;
    }

    html += `</div>`;

    contentContainer.innerHTML = html;

    // Fade in
    requestAnimationFrame(() => {
      contentContainer.classList.remove("fade-enter");
      contentContainer.classList.add("fade-enter-active");
    });

    // Update counters
    const countText = `${index + 1} / ${slides.length}`;
    if (slideCounterDesktop) slideCounterDesktop.textContent = countText;
    if (slideCounterMobile) slideCounterMobile.textContent = countText;

    updateControls();
    updatePaginationUI(index);
  }, 200);
}

function nextSlide() {
  if (currentIndex < slides.length - 1) {
    currentIndex++;
    loadSlide(currentIndex);
  }
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    loadSlide(currentIndex);
  }
}

function updateControls() {
  prevBtn.disabled = currentIndex === 0;

  if (currentIndex === slides.length - 1) {
    nextBtn.innerHTML = `Finish`;
    nextBtn.classList.add("bg-emerald-600", "border-emerald-500");
  } else {
    nextBtn.innerHTML = `
            Next
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        `;
    nextBtn.classList.remove("bg-emerald-600", "border-emerald-500");
  }
}

function renderPagination() {
  let dots = "";
  slides.forEach((_, idx) => {
    dots += `<div class="shrink-0 h-1 rounded-full transition-all duration-300 ${
      idx === 0 ? "w-4 bg-emerald-500" : "w-1 bg-slate-600"
    }" data-index="${idx}"></div>`;
  });
  paginationContainer.innerHTML = dots;
}

function updatePaginationUI(activeIdx) {
  const dots = paginationContainer.children;

  if (slides.length > 5) {
    const dotWidth = 8;
    const center =
      activeIdx * dotWidth - paginationContainer.clientWidth / 2 + dotWidth / 2;
    paginationContainer.scrollTo({ left: center, behavior: "smooth" });
  }

  Array.from(dots).forEach((dot, idx) => {
    if (idx === activeIdx) {
      dot.className =
        "shrink-0 h-1 rounded-full transition-all duration-300 w-4 bg-emerald-500";
    } else {
      dot.className =
        "shrink-0 h-1 rounded-full transition-all duration-300 w-1 bg-slate-600";
    }
  });
}

function escapeHtml(text) {
  if (!text) return "";
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

init();
