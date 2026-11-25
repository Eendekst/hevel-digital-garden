import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/newsletter.inline"
import { classNames } from "../util/lang"

export default (() => {
  const Newsletter: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    return (
      <div class={classNames(displayClass, "quartz-newsletter-wrapper")}>
        <div class="quartz-newsletter-card">
          <div class="quartz-newsletter-badge">
            <span>Stay Updated</span>
          </div>
          <h3 class="quartz-newsletter-title">Subscribe To Hevel's Newsletter</h3>
          <p class="quartz-newsletter-desc">
            Get a direct overview with every new note published on the Digital Garden, along with Hevel's exclusive Augmented Intelligence strategies.
          </p>
          <div id="quartz-newsletter-status" style="display: none; margin-bottom: 12px;"></div>
          <form id="quartz-newsletter-form" class="quartz-newsletter-form">
            <input
              id="quartz-newsletter-email"
              type="email"
              placeholder="your-email@domain.com"
              required
              class="quartz-newsletter-input"
            />
            <button id="quartz-newsletter-btn" type="submit" class="quartz-newsletter-btn">
              Subscribe
            </button>
          </form>
          <div class="quartz-newsletter-footnote">
            Zero spam. One-click instant unsubscribe.
          </div>
        </div>
      </div>
    )
  }

  Newsletter.afterDOMLoaded = script
  Newsletter.css = `
    .quartz-newsletter-wrapper {
      margin: 2rem 0 2.5rem 0;
      width: 100%;
    }
    .quartz-newsletter-card {
      border: 1px solid var(--lightgray);
      background: var(--light);
      border-radius: 12px;
      padding: 1.75rem 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
      position: relative;
    }
    .quartz-newsletter-badge {
      display: inline-block;
      font-family: var(--codeFont);
      font-size: 0.7rem;
      font-weight: bold;
      color: var(--secondary);
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 3px 8px;
      border-radius: 4px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      margin-bottom: 0.75rem;
    }
    .quartz-newsletter-title {
      margin: 0 0 0.5rem 0;
      font-size: 1.4rem;
      font-weight: 700;
      color: var(--dark);
      letter-spacing: -0.02em;
    }
    .quartz-newsletter-desc {
      margin: 0 0 1.25rem 0;
      font-size: 0.9rem;
      line-height: 1.5;
      color: var(--darkgray);
    }
    .quartz-newsletter-form {
      display: flex;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .quartz-newsletter-input {
      flex: 1;
      padding: 0.65rem 1rem;
      border-radius: 8px;
      border: 1px solid var(--lightgray);
      background: var(--light);
      color: var(--dark);
      font-family: var(--bodyFont);
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s;
    }
    .quartz-newsletter-input:focus {
      border-color: var(--secondary);
    }
    .quartz-newsletter-btn {
      padding: 0.65rem 1.5rem;
      border-radius: 8px;
      border: none;
      background: var(--secondary);
      color: var(--light);
      font-family: var(--codeFont);
      font-size: 0.85rem;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .quartz-newsletter-btn:hover {
      opacity: 0.9;
    }
    .quartz-newsletter-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .quartz-newsletter-footnote {
      font-family: var(--codeFont);
      font-size: 0.75rem;
      color: var(--gray);
    }
    @media (max-width: 600px) {
      .quartz-newsletter-form {
        flex-direction: column;
      }
      .quartz-newsletter-card {
        padding: 1.25rem;
      }
    }
  `

  return Newsletter
}) satisfies QuartzComponentConstructor
