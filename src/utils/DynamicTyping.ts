import { useEffect, useState } from "react";

export default function useTypingPlaceholder(words = [], speed = 80, delay = 2000) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words.length) return;

    let timeout: any;

    if (index >= words.length) {
      setIndex(0);
      return;
    }

    const currentWord = words[index] as string;

    if (!deleting && subIndex === currentWord.length) {
      timeout = setTimeout(() => setDeleting(true), delay);
      return () => clearTimeout(timeout);
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    timeout = setTimeout(() => {
      const nextSubIndex = subIndex + (deleting ? -1 : 1);
      setSubIndex(nextSubIndex);
      setText(currentWord.substring(0, nextSubIndex));
    }, deleting ? speed / 2 : speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words, speed, delay]);

  return text;
}