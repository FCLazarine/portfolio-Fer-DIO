// ====== Mobile menu
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle?.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// Close menu when clicking a link (mobile)
navLinks?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

// ====== Year
document.getElementById("year").textContent = new Date().getFullYear();

// ====== Cursor glow
const glow = document.getElementById("cursorGlow");
window.addEventListener("mousemove", (e) => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

// ====== Reveal on scroll
const revealEls = Array.from(document.querySelectorAll(".reveal"));

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// ====== Skills progress animate
const pctEls = Array.from(document.querySelectorAll(".pct"));
const fillEls = Array.from(document.querySelectorAll(".fill"));

const skillsSection = document.getElementById("skills");
let skillsAnimated = false;

const animateSkills = () => {
  if (skillsAnimated) return;
  skillsAnimated = true;

  fillEls.forEach((fill) => {
    const target = Number(fill.dataset.fill || 0);
    fill.style.width = `${target}%`;
  });

  pctEls.forEach((pct) => {
    const target = Number(pct.dataset.pct || 0);
    let current = 0;
    const step = Math.max(1, Math.round(target / 35));

    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      pct.textContent = `${current}%`;
    }, 22);
  });
};

const skillsIO = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) animateSkills();
  });
}, { threshold: 0.2 });

skillsSection && skillsIO.observe(skillsSection);

// ====== Typewriter (terminal)
const typed = document.getElementById("typed");
const commands = [
  "npm run build_portfolio",
  "git push origin main",
  "deploy --github-pages",
  "status: ONLINE ✅"
];

let cmdIndex = 0;
let charIndex = 0;
let deleting = false;

function tick() {
  const current = commands[cmdIndex];

  if (!deleting) {
    typed.textContent = current.slice(0, charIndex++);
    if (charIndex > current.length + 12) deleting = true;
  } else {
    typed.textContent = current.slice(0, charIndex--);
    if (charIndex <= 0) {
      deleting = false;
      cmdIndex = (cmdIndex + 1) % commands.length;
    }
  }

  const speed = deleting ? 22 : 36;
  setTimeout(tick, speed);
}
tick();

// ====== Copy email
const btnCopy = document.getElementById("copyEmail");
const emailText = document.getElementById("emailText");
const toast = document.getElementById("toast");

btnCopy?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(emailText.textContent.trim());
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 900);
  } catch {
    // fallback
    const text = emailText.textContent.trim();
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 900);
  }
});
