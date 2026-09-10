import { useEffect, useRef, useState } from 'react';

const tagline = 'cat /etc/motd';
const firstLine = "Hi, I'm";
const names = ['Bagas', 'Katon Bagaskoro'];

export default function HeroTyping() {
  const [taglineText, setTaglineText] = useState('');
  const [firstLineText, setFirstLineText] = useState('');
  const [nameText, setNameText] = useState('');
  const [reducedMotion, setReducedMotion] = useState(false);
  const nameRef = useRef('');

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(motionQuery.matches);

    const revealBody = () => {
      document.dispatchEvent(new CustomEvent('hero-typing-complete'));
    };

    if (motionQuery.matches) {
      setTaglineText(tagline);
      setFirstLineText(firstLine);
      setNameText(names[0]);
      revealBody();
      return;
    }

    const timers: number[] = [];
    const updateName = (value: string) => {
      nameRef.current = value;
      setNameText(value);
    };

    const later = (callback: () => void, delay: number) => {
      const timer = window.setTimeout(callback, delay);
      timers.push(timer);
      return timer;
    };

    const typeText = (
      text: string,
      update: (value: string) => void,
      speed: number,
      onDone?: () => void,
    ) => {
      let index = 0;
      let output = '';
      const tick = () => {
        if (index < text.length) {
          output += text.charAt(index);
          update(output);
          index += 1;
          later(tick, speed);
        } else {
          onDone?.();
        }
      };
      tick();
    };

    const deleteText = (speed: number, onDone: () => void) => {
      let remaining = nameRef.current;
      const tick = () => {
        if (remaining.length > 0) {
          remaining = remaining.slice(0, -1);
          updateName(remaining);
          later(tick, speed);
        } else {
          onDone();
        }
      };
      tick();
    };

    const cycleNames = () => {
      let nameIndex = 0;
      const next = () => {
        nameIndex = (nameIndex + 1) % names.length;
        later(() => {
          deleteText(50, () => {
            typeText(names[nameIndex], updateName, 90, () => later(next, 2200));
          });
        }, 2200);
      };
      next();
    };

    later(() => {
      typeText(tagline, setTaglineText, 38, () => {
        later(() => {
          typeText(firstLine, setFirstLineText, 75, () => {
            later(() => {
              typeText(names[0], updateName, 110, () => {
                later(revealBody, 200);
                cycleNames();
              });
            }, 150);
          });
        }, 150);
      });
    }, 700);

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, []);

  return (
    <>
      <p className="mb-8 flex items-center gap-2 font-mono text-sm text-(--eva-green)">
        <span className="text-(--eva-orange)">❯</span>
        <span>{reducedMotion ? tagline : taglineText}</span>
        {!reducedMotion && <span className="cursor inline-block h-4 w-2 bg-(--eva-green)" />}
      </p>

      <h1 className="mb-6 text-6xl font-bold leading-tight tracking-tight text-white sm:text-7xl">
        <span>{reducedMotion ? firstLine : firstLineText}</span>
        <br />
        <span className="name-wrap">
          <span className="gradient-name">{reducedMotion ? names[0] : nameText}</span>
        </span>
      </h1>
    </>
  );
}