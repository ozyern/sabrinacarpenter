import sys
import re

files = ["index.html", "gallery.html", "tours.html"]

header_clock_html = """          <div class="header-live-clock" aria-hidden="true">
            <div class="header-clock-hand header-clock-hour"></div>
            <div class="header-clock-hand header-clock-min"></div>
            <div class="header-clock-hand header-clock-sec"></div>
            <div class="header-clock-center"></div>
          </div>
"""

css_template = """
    .header-live-clock {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      border: 1.5px solid rgba(166, 25, 46, 0.45);
      background: rgba(255, 253, 249, 0.88);
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.08);
      position: relative;
      flex-shrink: 0;
      {HIDING_CSS}
    }
    .header-live-clock::before {
      content: '';
      position: absolute;
      inset: 2px;
      border-radius: 50%;
      background: url('images/logo.webp') center/cover no-repeat;
      opacity: 0.22;
      z-index: 0;
    }
    .header-clock-hand {
      position: absolute;
      left: 50%;
      bottom: 50%;
      transform-origin: bottom center;
      transform: translateX(-50%) rotate(0deg);
      border-radius: 4px;
      z-index: 1;
    }
    .header-clock-hour { width: 2.5px; height: 8px; background: rgba(42, 27, 20, 0.88); }
    .header-clock-min { width: 2px; height: 10px; background: rgba(42, 27, 20, 0.82); }
    .header-clock-sec { width: 1.5px; height: 11px; background: var(--cherry); }
    .header-clock-center {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--cherry);
      border: 1px solid var(--butter);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
    }"""

js_code_common = """
    function updateHeaderClock() {
      const now = new Date();
      const secDeg = now.getSeconds() * 6;
      const minDeg = now.getMinutes() * 6 + secDeg / 60;
      const hourDeg = (now.getHours() % 12) * 30 + now.getMinutes() * 0.5;
      const hourHand = document.querySelector('.header-clock-hour');
      const minHand = document.querySelector('.header-clock-min');
      const secHand = document.querySelector('.header-clock-sec');
      if (!hourHand || !minHand || !secHand) return;
      hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
      minHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
      secHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;
    }
    setInterval(updateHeaderClock, 1000);
    updateHeaderClock();"""

js_code_index = """
    window.addEventListener('scroll', () => {
      const clock = document.querySelector('.header-live-clock');
      if (clock) {
        if (window.scrollY > window.innerHeight * 0.8) {
          clock.style.opacity = '1';
          clock.style.pointerEvents = 'auto';
        } else {
          clock.style.opacity = '0';
          clock.style.pointerEvents = 'none';
        }
      }
    });"""

for fn in files:
    with open(fn, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if "header-live-clock" in content:
        print(f"Skipping {fn}, already modified")
        continue

    # 1. Modify CSS variables for index.html
    if fn == "index.html":
        content = re.sub(r'--glass-bg:\s*rgba\([^)]+\);', '--glass-bg: rgba(255, 253, 249, 0.4);', content)
        content = re.sub(r'--glass-blur:\s*blur\([^)]+\)\s*saturate\([^)]+\);|--glass-blur:\s*blur\([^)]+\);', '--glass-blur: blur(35px) saturate(220%);', content)
        
        hiding_css = "opacity: 0; pointer-events: none; transition: opacity 0.5s ease;"
        js_inject = js_code_common + "\n" + js_code_index + "\n"
    else:
        hiding_css = "pointer-events: none;"
        js_inject = js_code_common + "\n"

    css_inject = css_template.replace("{HIDING_CSS}", hiding_css)

    # 2. Add CSS before </style>
    if "</style>" in content:
        content = content.replace("</style>", css_inject + "\n  </style>")

    # 3. Add clock HTML inside .nav-actions
    html_target = '<button class="menu-toggle"'
    if html_target in content:
        content = content.replace(html_target, header_clock_html + html_target)

    # 4. Add JS before final </script> block ends
    last_script_pos = content.rfind('</script>')
    if last_script_pos != -1:
        content = content[:last_script_pos] + js_inject + "  " + content[last_script_pos:]
        
    # 5. Add `@media (max-width: 900px)` hiding rule
    media_target = "@media (max-width: 900px) {"
    if media_target in content:
        content = content.replace(media_target, media_target + "\n      .header-live-clock { display: none; }")

    with open(fn, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"Updated {fn}")
import re

with open('index.html', 'r', encoding='utf-8') as file:
    content = file.read()

content = re.sub(r'--glass-bg:\s*rgba\(255,\s*253,\s*249,\s*0\.85\);', '--glass-bg: rgba(255, 255, 255, 0.3);', content)
content = re.sub(r'--glass-blur:\s*blur\(12px\);', '--glass-blur: blur(35px) saturate(220%);', content)

with open('index.html', 'w', encoding='utf-8') as file:
    file.write(content)
