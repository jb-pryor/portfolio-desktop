import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from "react";

/* =========================
   Types
   ========================= */

// Only these three names can be used to open a window.
type Section = "projects" | "about" | "contact";

type FolderData = {
  id: Section;
  label: string;
  previews: string[];
};

type FolderProps = {
  label: string;
  previews: string[];
  onOpen: () => void;
};

type DesktopWindowProps = {
  id: Section;
  title: string;
  children: ReactNode;
  dialogRef: RefObject<HTMLDialogElement | null>;
};

/* =========================
   Folder data
   ========================= */

const folders: FolderData[] = [
  {
    id: "projects",
    label: "Projects",
    previews: [
      "Job Tracker",
      "Spotify Rewind",
      "KPI Dashboard",
    ],
  },
  {
    id: "about",
    label: "About",
    previews: [
      "AboutMe.txt",
      "PLNU · 2026",
      "San Diego",
    ],
  },
  {
    id: "contact",
    label: "Contact",
    previews: [
      "GitHub",
      "Email",
      "Say hello",
    ],
  },
];

/* =========================
   Project data
   ========================= */

const projects = [
  {
    title: "Job Tracker API",
    stack: "Python / FastAPI / PostgreSQL",
    description:
      "A REST API for managing job applications, with JWT authentication, registration, and per-user access control.",
    url: "https://github.com/jb-pryor/job-tracker-api",
  },
  {
    title: "Spotify Rewind",
    stack: "Next.js / React / TypeScript",
    description:
      "Personalized listening insights using the Spotify Web API, OAuth, and reusable React components.",
    url: "https://github.com/jb-pryor",
  },
  {
    title: "KPI Dashboard",
    stack: "Angular / Tailwind / Google Sheets API",
    description:
      "A dashboard built for PLNU’s Director of Institutional Research to explore departmental metrics and multi-year trends.",
    url: "https://github.com/jb-pryor",
  },
];

/* =========================
   Contact data
   ========================= */

const contactLinks = [
  {
    label: "GitHub",
    url: "https://github.com/jb-pryor",
  },
  {
    label: "Email",
    url: "mailto:jpryor35@icloud.com",
  },
  {
    label: "Current portfolio",
    url: "https://jbpryor.com",
  },
];

/* =========================
   Folder component
   ========================= */

function Folder({
  label,
  previews,
  onOpen,
}: FolderProps) {
  return (
    <button
      className="folder"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`Open ${label}`}
    >
      {/* Preview cards animate through CSS on hover or focus. */}
      {previews.map((text) => (
        <span
          key={text}
          className="preview"
          aria-hidden="true"
        >
          {text}
        </span>
      ))}

      {/* Blue folder shape drawn with CSS. */}
      <span
        className="folder-art"
        aria-hidden="true"
      />

      <span className="folder-label">
        {label}
      </span>
    </button>
  );
}

/* =========================
   Desktop window component
   ========================= */

function DesktopWindow({
  id,
  title,
  children,
  dialogRef,
}: DesktopWindowProps) {
  // Close the window when a click lands outside its bounds.
  function handleOutsideClick(
    event: MouseEvent<HTMLDialogElement>,
  ) {
    const dialog = event.currentTarget;
    const bounds = dialog.getBoundingClientRect();

    const clickedOutside =
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom;

    if (
      event.target === dialog &&
      clickedOutside
    ) {
      dialog.close();
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={`${id}-title`}
      onClick={handleOutsideClick}
    >
      {/* Window title bar and close button. */}
      <header className="window-bar">
        <button
          className="close"
          aria-label={`Close ${title}`}
          onClick={() => dialogRef.current?.close()}
        >
          ×
        </button>

        <h2 id={`${id}-title`}>
          {title}
        </h2>
      </header>

      {/* Content passed between the component's opening and closing tags. */}
      <div className="window-body">
        {children}
      </div>
    </dialog>
  );
}
   
/* =========================
   Desktop status bar
   ========================= */

   function DesktopStatus() {
    const [now, setNow] = useState(() => new Date());
  
    // Update the clock, and clean up when the component unmounts.
    useEffect(() => {
      const timer = window.setInterval(() => {
        setNow(new Date());
      }, 1000);
  
      return () => window.clearInterval(timer);
    }, []);
  
    // Uses the visitor's local time zone.
    const date = now.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  
    const time = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  
    return (
      <div className="desktop-status">
        {/* Decorative battery icon — not the visitor's actual battery. */}
        <span
          className="status-icon"
          title="Decorative battery indicator"
        >
          <svg
            width="29"
            height="18"
            viewBox="0 0 29 18"
            fill="none"
            aria-hidden="true"
          >
            <rect
              x="1"
              y="3"
              width="23"
              height="12"
              rx="3"
              stroke="currentColor"
              strokeWidth="1.5"
            />
  
            <rect
              x="3.5"
              y="5.5"
              width="16"
              height="7"
              rx="1"
              fill="currentColor"
            />
  
            <path
              d="M26 7V11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
  
        {/* Decorative Wi-Fi icon. */}
        <span
          className="status-icon"
          title="Decorative Wi-Fi indicator"
        >
          <svg
            width="22"
            height="18"
            viewBox="0 0 24 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M2 5C7.5 0.5 16.5 0.5 22 5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
  
            <path
              d="M5.5 9C9 6 15 6 18.5 9"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
  
            <path
              d="M9 13C10.8 11.5 13.2 11.5 15 13"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
  
            <circle
              cx="12"
              cy="17"
              r="1.5"
              fill="currentColor"
            />
          </svg>
        </span>
  
        {/* Actual date and time. */}
        <time
          className="desktop-clock"
          dateTime={now.toISOString()}
        >
          <span className="desktop-date">{date}</span>
          <span>{time}</span>
        </time>
      </div>
    );
  }

  /* =========================
   Main application
   ========================= */

export default function App() {
  // Each ref gives us access to a dialog element.
  const projectsRef = useRef<HTMLDialogElement>(null);
  const aboutRef = useRef<HTMLDialogElement>(null);
  const contactRef = useRef<HTMLDialogElement>(null);

  // Match each section name with its dialog ref.
  const windows = {
    projects: projectsRef,
    about: aboutRef,
    contact: contactRef,
  };

  function openWindow(id: Section) {
    windows[id].current?.showModal();
  }

  return (
    <>
      {/* =========================
          Top menu bar
          ========================= */}

      <header className="menu-bar">
        <strong>JB / Portfolio</strong>

        <DesktopStatus />
      </header>

      {/* =========================
          Desktop
          ========================= */}

      <main className="desktop">
        <section className="intro">
          <h1>Hi, I’m James Pryor.</h1>

          <p>Software developer</p>

          {/* Contact folder centered underneath the introduction. */}
          <div className="intro-contact">
            <Folder
              label="Contact"
              previews={["GitHub", "Email", "Say hello"]}
              onOpen={() => openWindow("contact")}
            />
          </div>
        </section>

        {/* Only Projects and About remain on the right. */}
        <nav
          className="folders"
          aria-label="Projects and about folders"
        >
          {folders
            .filter((folder) => folder.id !== "contact")
            .map((folder) => (
              <Folder
                key={folder.id}
                label={folder.label}
                previews={folder.previews}
                onOpen={() => openWindow(folder.id)}
              />
            ))}
        </nav>
      </main>

      {/* =========================
          Bottom dock
          ========================= */}

      <nav
        className="dock"
        aria-label="Quick navigation"
      >
        {folders.map((folder) => (
          <button
            key={folder.id}
            onClick={() => openWindow(folder.id)}
          >
            {folder.label}
          </button>
        ))}
      </nav>

      {/* =========================
          Projects window
          ========================= */}

      <DesktopWindow
        id="projects"
        title="Projects"
        dialogRef={projectsRef}
      >
        {projects.map((project) => (
          <article
            className="project"
            key={project.title}
          >
            <div className="thumbnail">
              {project.title}
            </div>

            <div>
              <h3>{project.title}</h3>

              <span className="stack">
                {project.stack}
              </span>

              <p>{project.description}</p>

              <a
                className="link"
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.url.endsWith("jb-pryor")
                  ? "Browse GitHub"
                  : "View source"}
                {" "}↗
              </a>
            </div>
          </article>
        ))}
      </DesktopWindow>

      {/* =========================
          About window
          ========================= */}

      <DesktopWindow
        id="about"
        title="AboutMe.txt"
        dialogRef={aboutRef}
      >
        <h3 className="about-title">
          A bit about me.
        </h3>

        <p>
          I’m James (JB), a software developer based in
          San Diego. I graduated from Point Loma Nazarene
          University in May 2026 with a B.S. in Computer
          Science: Software Engineering.
        </p>

        <p>
          I build web applications and developer tools
          using React, TypeScript, Python, and C++. My
          recent work includes a job-tracking API,
          personalized Spotify analytics, and a client
          dashboard for PLNU.
        </p>

        <p>
          I’m looking for a software engineering role
          where I can contribute, keep learning, and
          work with a good team.
        </p>
      </DesktopWindow>

      {/* =========================
          Contact window
          ========================= */}

      <DesktopWindow
        id="contact"
        title="Contact"
        dialogRef={contactRef}
      >
        <h3>Let’s connect.</h3>

        <p>
          Have an opportunity or want to talk about a project?
        </p>

        <div className="grid gap-3">
          {contactLinks.map(({ label, url }) => (
            <a
              key={label}
              href={url}
              target={
                url.startsWith("https")
                  ? "_blank"
                  : undefined
              }
              rel="noopener noreferrer"
              className="
                rounded-lg
                border
                border-white/20
                p-4
                text-white
                no-underline
                transition-colors
                hover:bg-white/10
              "
            >
              {label} ↗
            </a>
          ))}
        </div>

        <p className="note">
          Add your LinkedIn URL and resume PDF links here.
        </p>
      </DesktopWindow>
    </>
  );
}