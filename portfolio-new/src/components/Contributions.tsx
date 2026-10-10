import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import "react-github-calendar/tooltips.css";

function tooltipText({ date, count }: { date: string; count: number }) {
  const day = new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
  if (count === 0) return `no contributions on ${day}`;
  return `${count} contribution${count === 1 ? "" : "s"} on ${day}`;
}

export default function Contributions({ username }: { username: string }) {
  const [dark, setDark] = useState(true);
  const [yearTotal, setYearTotal] = useState<number | null>(null);
  const year = new Date().getFullYear();

  useEffect(() => {
    const update = () =>
      setDark(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=${year}`,
    )
      .then((r) => r.json())
      .then((d) => {
        const total = d?.total?.[year];
        if (typeof total === "number") setYearTotal(total);
      })
      .catch(() => {});
  }, [username, year]);

  return (
    <>
      <div className="flex items-baseline justify-between gap-2 mb-3">
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="lbl !mb-0 hover:text-fg transition-colors"
        >
          contributions ↗
        </a>
        {yearTotal !== null && (
          <span className="text-xs font-mono text-fg2">
            {yearTotal.toLocaleString()} contributions in {year}
          </span>
        )}
      </div>
      <div className="overflow-x-auto">
        <GitHubCalendar
          username={username}
          colorScheme={dark ? "dark" : "light"}
          blockSize={10}
          blockMargin={3}
          fontSize={11}
          showTotalCount={false}
          showColorLegend={false}
          tooltips={{ activity: { text: tooltipText, withArrow: true } }}
          theme={{
            light: ["#e8e8e8", "#a8a8a8", "#787878", "#484848", "#181818"],
            dark: ["#202020", "#484848", "#686868", "#909090", "#c0c0c0"],
          }}
        />
      </div>
    </>
  );
}
