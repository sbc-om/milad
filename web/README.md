# milad.sbc.om source

React + Vite + Tailwind CSS v4 + [Animate UI](https://animate-ui.com) (Motion).

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # writes index.html + assets/ to the repo root and regenerates Milad-Raeisi-CV.pdf
npm run pdf      # only re-render ../print.html → ../Milad-Raeisi-CV.pdf (needs Google Chrome)
```

Content lives in `src/data.ts`. The printable resume (`../print.html`) mirrors it by hand. Update both.
