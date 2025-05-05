import { useState, useEffect } from "react";

export let sFillPath;
const FooterSvg = () => {
  const [fillPath, setFillPath] = useState("")
  let theme = localStorage.getItem("theme")
  useEffect(() => {
    if(theme == "light") setFillPath("#f5f5f5")
    else setFillPath("#0f172a")
    sFillPath = setFillPath
  }, [])
  
  return (
    <svg
      className="w-[110%] relative -z-10 -left-[3%] max-[1279px]:hidden"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 2175.721 256.959"
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="-0.212"
          y1="-0.873"
          x2="1.092"
          y2="1.056"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#c262d7" />
          <stop offset="1" stopColor="#67008f" />
        </linearGradient>
        <linearGradient
          id="linear-gradient-2"
          x1="1.261"
          y1="-0.195"
          x2="0"
          y2="0.903"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#f093fb" />
          <stop offset="1" stopColor="#67008f" />
        </linearGradient>
      </defs>
      <path
        id="Path_9"
        data-name="Path 9"
        d="M17.017,77.537c87.111-6.844,232.645-98.556,398.245-73.079C545.328,21.22,809.081,161.6,1124.593,161.343s734.809-281.587,964.1-71.067c-10.5,17.739-755.321,118.02-755.321,118.02L334.89,136.826H266.5S-70.094,84.381,17.017,77.537Z"
        transform="translate(36.783 0)"
        fill="url(#linear-gradient)"
      />
      <path
        id="Path_9-2"
        data-name="Path 9"
        d="M24.2,61.022c87.111-6.844,232.645-71.067,388.859-59.67,162.918,16.761,436.057,135.688,751.57,135.43S1822.564-110.976,2071.74,86.5c-10.5,17.739-14.75,69.726-14.75,69.726l-840.3,57.351-998.483-71.47H149.824S-62.912,67.865,24.2,61.022Z"
        transform="translate(-3.251 24.561)"
        fill="url(#linear-gradient-2)"
      />
      <path
        id="Path_9-3"
        data-name="Path 9"
        d="M27.827,53.3C114.938,46.456,212.87-10.393,387.186,1.675c248.065,19.443,425.063,113.305,758.945,113.305,322.485,5.364,666.423-192.418,919.852-24.136s-19.04,57.4-19.04,57.4l-864.875,56.988-998.483-71.47H115.2S-59.283,60.143,27.827,53.3Z"
        transform="translate(1.837 51.726)"
        fill={fillPath}
      />
    </svg>
  );
};

export default FooterSvg;
