# रोजगार मञ्च — Next.js

Magazine front-end. Content lives in `src/data/home.ts` for now; components take props so a CMS can plug in later without redesign.

## Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

```text
src/
├── app/                 # routes
├── components/
│   ├── layout/          # chrome (nav, footer, menu…)
│   ├── home/            # homepage sections (props-driven)
│   ├── ui/
│   ├── motion/
│   └── providers/
├── data/home.ts         # current content + getters
├── types/content.ts     # Post / SiteInfo / HomePageData
└── styles/magazine.css  # design system
```
