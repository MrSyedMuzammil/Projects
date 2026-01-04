// Data
const slides = [
  {
    title: "Terminal Command Essentials",
    content: `
            <p class="mb-3 text-sm md:text-lg">Hi! I'm <strong class="text-white">Syed Muzammil</strong>, a front-end developer.</p>
            <p class="mb-3 text-xs md:text-base">I'm learning new things to achieve my long-term goals and help others along the way.</p>
            <p class="text-slate-400 text-xs md:text-sm border-t border-slate-700 pt-3 mt-2">Source: "Practical Introduction to Command Line" by Stanimira Vlaeva.</p>
        `,
    code: null,
  },
  {
    title: "Command Control",
    content: `
            <p class="text-sm md:text-lg">Use <span class="text-emerald-400 font-bold">Ctrl + C</span> to abort a running command immediately.</p>
            <p class="mt-2 text-slate-400 text-xs md:text-base">Unlike clear, this keeps your previous output visible.</p>
        `,
    code: "Ctrl + C",
  },
  {
    title: "Shell Identification",
    content: `
            <p class="text-sm md:text-lg">Type <span class="text-white font-mono bg-slate-700 px-1 rounded">echo $0</span> to verify which shell language (e.g., bash, zsh) is currently active.</p>
        `,
    code: "echo $0",
  },
  {
    title: "Workspace Hygiene",
    content: `
            <p class="text-sm md:text-lg">Clear your terminal view using the clear command or the shortcut.</p>
        `,
    code: "clear",
    footerCode: "Shortcut: Ctrl + L",
  },
  {
    title: "Efficiency / History",
    content: `
            <p class="text-sm md:text-lg">Don't retype! Press the <strong class="text-white">Up Arrow</strong> key to cycle through and execute previous commands.</p>
        `,
    code: "↑ Arrow Key",
  },
  {
    title: "Handling Special Characters",
    content: `
            <p class="text-sm md:text-lg">Spaces in filenames confuse the terminal. You must "escape" them.</p>
            <p class="mt-2 text-slate-400 text-xs md:text-base">Use a backslash <span class="text-white font-mono">\\</span> or wrap the name in quotes.</p>
        `,
    code: "mkdir My\\ Folder",
    codeLabel: "Option 1: Backslash Escape",
    extraCodes: [
      { label: "Option 2: Double Quotes", cmd: 'mkdir "My Folder"' },
      { label: "Option 3: Single Quotes", cmd: "mkdir 'My Folder'" },
    ],
  },
  {
    title: "Orientation",
    content: `
            <p class="text-sm md:text-lg">Run <span class="text-white font-mono">pwd</span> (Print Working Directory) to see exactly where you are in the file system.</p>
        `,
    code: "pwd",
  },
  {
    title: "Listing Content",
    content: `
            <p class="text-sm md:text-lg">Use <span class="text-white font-mono">ls</span> to view all files and folders in your current location.</p>
        `,
    code: "ls",
  },
  {
    title: "Navigation",
    content: `
            <p class="text-sm md:text-lg">Use <span class="text-white font-mono">cd &lt;Folder Name&gt;</span> to enter a directory.</p>
        `,
    code: "cd <Folder Name>",
  },
  {
    title: "Reverse Navigation",
    content: `
            <p class="text-sm md:text-lg">Use <span class="text-white font-mono">cd .</span> to go back one folder.</p>
        `,
    code: "cd ..",
    footerCode: "cd ../..  (Jump back two levels)",
  },
  {
    title: "Remote Listing",
    content: `
            <p class="text-sm md:text-lg">View a folder's contents without entering it by adding the path.</p>
        `,
    code: "ls <path/to/folder>",
  },
  {
    title: "Auto-Completion",
    content: `
            <p class="text-sm md:text-lg">Type the first few letters of a file or folder and hit <strong class="text-white">Tab</strong>.</p>
            <p class="mt-2 text-slate-400 text-xs md:text-base">Bash will auto-complete the name for you.</p>
        `,
    code: "Tab Key",
  },
  {
    title: "Root Navigation",
    content: `
            <p class="text-sm md:text-lg">Run <span class="text-white font-mono">cd /</span> to jump straight to the root directory (base of the system).</p>
        `,
    code: "cd /",
  },
  {
    title: "Return Home",
    content: `
            <p class="text-sm md:text-lg">Typing <span class="text-white font-mono">cd</span> (with no arguments) instantly transports you to your user Home directory.</p>
        `,
    code: "cd",
  },
  {
    title: "Creating Directories",
    content: `
            <p class="text-sm md:text-lg">Use <span class="text-white font-mono">mkdir</span> to create folders.</p>
        `,
    code: "mkdir <name>",
    footerCode: "mkdir folder1 folder2  (Create multiple)",
  },
  {
    title: "Naming Conventions",
    content: `
            <p class="text-sm md:text-lg">To create a folder with spaces, don't forget the quotes!</p>
        `,
    code: 'mkdir "My Photos"',
  },
  {
    title: "Creating Files",
    content: `
            <p class="text-sm md:text-lg">Use <span class="text-white font-mono">touch</span> to create empty files instantly.</p>
        `,
    code: "touch <filename>",
  },
  {
    title: "Writing Content",
    content: `
            <p class="text-sm md:text-lg">Use <span class="text-white font-mono">echo</span> to write text into a file.</p>
            <p class="mt-2 text-xs md:text-sm text-slate-400"><span class="text-emerald-400">></span> overwrites. <span class="text-emerald-400">>></span> appends.</p>
        `,
    code: 'echo "Message" > file.txt',
    footerCode: 'echo "More text" >> file.txt',
  },
  {
    title: "Viewing Content",
    content: `
            <p class="text-sm md:text-lg">Use <span class="text-white font-mono">cat</span> to display a file's contents directly.</p>
        `,
    code: "cat <filename>",
  },
  {
    title: "Concatenation",
    content: `
            <p class="text-sm md:text-lg">Merge multiple files into one using the redirect symbol.</p>
        `,
    code: "cat file1 file2 > combined_file",
  },
  {
    title: "Detailed View",
    content: `
            <p class="text-sm md:text-lg">Use <span class="text-white font-mono">ls -l</span> for a "long listing" (permissions, size, date).</p>
        `,
    code: "ls -l",
  },
  {
    title: "Filtering",
    content: `
            <p class="text-sm md:text-lg">Use wildcards (<span class="text-emerald-400">*</span>) to list specific file types.</p>
        `,
    code: "ls *.jpg",
  },
  {
    title: "Moving/Renaming",
    content: `
            <p class="text-sm md:text-lg">Use <span class="text-white font-mono">mv</span> to move files or rename them.</p>
        `,
    code: "mv <source> <destination>",
  },
  {
    title: "Deleting Files",
    content: `
            <p class="text-sm md:text-lg">Use <span class="text-white font-mono">rm</span> to delete a file.</p>
            <p class="mt-2 text-red-400 font-bold uppercase text-[10px] md:text-xs tracking-wide">⚠️ Warning: Permanent</p>
        `,
    code: "rm <filename>",
  },
  {
    title: "Batch Deletion",
    content: `
            <p class="text-sm md:text-lg">Use curly braces to delete a specific set of files at once.</p>
        `,
    code: "rm {file1,file2}.txt",
  },
  {
    title: "Deleting Directories",
    content: `
            <p class="text-sm md:text-lg">Use <span class="text-white font-mono">rmdir</span> to remove an <strong>empty</strong> folder.</p>
        `,
    code: "rmdir <directory>",
  },
  {
    title: "Recursive Deletion",
    content: `
            <p class="text-sm md:text-lg">Use <span class="text-white font-mono">rm -r</span> to remove a folder and all its contents.</p>
        `,
    code: "rm -r <directory>",
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
const scrollWrapper = document.getElementById("scroll-wrapper");

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
    // Reset scroll position
    scrollWrapper.scrollTop = 0;

    // Generate HTML
    let html = `
            <div class="flex flex-col gap-3 md:gap-5 w-full text-left">
                <div class="border-l-4 border-emerald-500 pl-4 md:pl-5">
                    <h2 class="text-2xl md:text-3xl font-bold text-white tracking-tight mb-2 leading-snug">${slide.title}</h2>
                    <div class="text-slate-300 font-light leading-relaxed">
                        ${slide.content}
                    </div>
                </div>
        `;

    if (slide.code) {
      // Code Block Container
      html += `
                <div class="mt-2 md:mt-4 w-full text-left">
                    <p class="text-[10px] md:text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <span class="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-400"></span>
                        ${slide.codeLabel || "Command"}
                    </p>
                    
                    <div class="bg-slate-900 border border-slate-700 rounded-lg p-4 shadow-lg font-mono text-sm md:text-lg text-white w-full overflow-x-auto whitespace-nowrap text-left scrollbar-hide">
                        ${escapeHtml(slide.code)}
                    </div>
            `;

      // Footer Code
      if (slide.footerCode) {
        html += `
                    <div class="bg-slate-800/50 mt-2 md:mt-3 rounded-lg p-3 border border-slate-700/50 font-mono text-xs md:text-sm text-slate-300 w-full overflow-x-auto whitespace-nowrap text-left scrollbar-hide">
                        ${escapeHtml(slide.footerCode)}
                    </div>
                `;
      }

      // Compacted vertical margin
      if (slide.extraCodes) {
        slide.extraCodes.forEach((item) => {
          html += `
                        <div class="mt-2 md:mt-3 w-full text-left">
                            <p class="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 text-left">${
                              item.label
                            }</p>
                            <div class="bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-sm md:text-lg text-white w-full overflow-x-auto whitespace-nowrap text-left scrollbar-hide">
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
    nextBtn.innerHTML = `<span class="hidden xs:inline">Finish</span><span class="xs:hidden">Done</span>`;
    nextBtn.classList.add("bg-emerald-600", "border-emerald-500");
  } else {
    nextBtn.innerHTML = `
            <span class="hidden xs:inline">Next</span>
            <span class="xs:hidden">Next</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
        `;
    nextBtn.classList.remove("bg-emerald-600", "border-emerald-500");
  }
}

function renderPagination() {
  let dots = "";
  slides.forEach((_, idx) => {
    dots += `<div class="shrink-0 h-1 md:h-1.5 rounded-full transition-all duration-300 ${
      idx === 0 ? "w-6 bg-emerald-500" : "w-1.5 bg-slate-600"
    }" data-index="${idx}"></div>`;
  });
  paginationContainer.innerHTML = dots;
}

function updatePaginationUI(activeIdx) {
  const dots = paginationContainer.children;

  if (slides.length > 5) {
    const dotWidth = 12;
    const center =
      activeIdx * dotWidth - paginationContainer.clientWidth / 2 + dotWidth / 2;
    paginationContainer.scrollTo({ left: center, behavior: "smooth" });
  }

  Array.from(dots).forEach((dot, idx) => {
    if (idx === activeIdx) {
      dot.className =
        "shrink-0 h-1 md:h-1.5 rounded-full transition-all duration-300 w-6 bg-emerald-500";
    } else {
      dot.className =
        "shrink-0 h-1 md:h-1.5 rounded-full transition-all duration-300 w-1.5 bg-slate-600";
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
