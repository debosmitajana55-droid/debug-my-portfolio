# 🐞 Debug My Portfolio: Debosmita Jana

**A portfolio that ships broken, on purpose.** The visitor fixes it.

🔗 **Live:** https://debosmitajana55-droid.github.io/debug-my-portfolio/
🌐 **Classic portfolio:** https://debosmitajana55-droid.github.io/portfolio/

> 2nd year B.Tech CSE student at Shoolini University (lateral entry), with a Diploma in Computer Science & Technology.

---

## 💡 The idea

Every developer's real job is debugging, so this portfolio starts as a failing build:

1. A fake **build log** runs and fails with 6 errors.
2. The site loads **broken**:

| Section | Bug | What you see |
|---|---|---|
| Hero | `TypeError: name.render is not a function` | Name is scrambled glyphs, photo is upside-down |
| About | `CSSError: line-height: -1` | Paragraphs collapse on top of each other |
| Skills | `RangeError: skill level is NaN` | Skill cards piled up, every level reads `NaN%` |
| Journey | `LogicError: timeline is not sorted` | Timeline in the wrong order, dates are `undefined` |
| Projects | `LayoutError: z-index war` | Project cards thrown in a messy pile |
| Contact | `404: contact details not found` | `undefined@undefined`, dead links |

3. **Six animated bugs crawl around the page** (and run away from your cursor!). Click or tap a bug to squash it, and that section **fixes itself with an animation**: the name decodes, cards fly back into the grid, the timeline re-sorts.
4. Every fix is logged in a working **console** as a `git commit`.
5. When all 6 are fixed, the build turns green ✅, the site "deploys" 🚀 and confetti falls.

Busy? Press **⚡ Auto-fix** in the top bar and watch it fix itself.

### Console commands
`help` · `whoami` · `about` · `skills` · `journey` · `projects` · `contact` · `bugs` · `fix <name>` · `fix all` · `ls` · `date` · `echo` · `clear` · and try `sudo hire debosmita` 😉

## 🛠️ Built with

- **HTML5**: semantic sections, accessible buttons (`aria-label` on every bug)
- **CSS3**: custom properties, Grid/Flexbox, keyframe animations, a "broken" stylesheet layer per section, custom fly-swatter cursor
- **Vanilla JavaScript**: `requestAnimationFrame` bug movement with wander/flee behaviour, **FLIP animations** (Web Animations API) to move elements from their broken to fixed positions, a text-decode effect, a command parser, canvas confetti, and **Web Audio** sound effects (no audio files)
- No frameworks, no libraries, no build step. Hosted on **GitHub Pages**.

## 📁 Structure

```
debug-my-portfolio/
├── index.html      # all sections (content lives here)
├── css/style.css   # fixed styles + .broken styles for each section
├── js/main.js      # skills/projects data, bugs, fixes, console, effects
├── assets/         # profile photo + favicon
└── README.md
```

## ✏️ Editing

- **Text** (about, journey, contact): `index.html`
- **Skills and projects**: the `skills` and `projects` arrays at the top of `js/main.js`
- **Bug messages**: the `BUGS` object in `js/main.js`
- **Colours**: the variables at the top of `css/style.css`

## 📬 Contact

- Email: debosmitajana55@gmail.com
- LinkedIn: [debosmita-jana-bb4886383](https://www.linkedin.com/in/debosmita-jana-bb4886383)
- GitHub: [debosmitajana55-droid](https://github.com/debosmitajana55-droid)
