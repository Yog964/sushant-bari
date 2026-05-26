import { useState, useEffect } from 'react';

export const useTypingEffect = (words, typingSpeed = 100, deletingSpeed = 50, pauseDelay = 2000) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timer;
    const i = loopNum % words.length;
    const fullText = words[i];

    if (isDeleting) {
      setText(fullText.substring(0, text.length - 1));
    } else {
      setText(fullText.substring(0, text.length + 1));
    }

    if (!isDeleting && text === fullText) {
      setTyping(false);
      timer = setTimeout(() => {
        setIsDeleting(true);
        setTyping(true);
      }, pauseDelay);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
    } else {
      timer = setTimeout(() => {}, isDeleting ? deletingSpeed : typingSpeed);
      timer = setTimeout(() => {
        // trigger effect again
      }, isDeleting ? deletingSpeed : typingSpeed);
    }
    
    const tick = () => {
      let delta = isDeleting ? deletingSpeed : typingSpeed;
      
      if (!isDeleting && text === fullText) {
        delta = pauseDelay;
        setIsDeleting(true);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        delta = 500;
      }
      
      timer = setTimeout(() => {
        const i = loopNum % words.length;
        const fullText = words[i];
        
        if (isDeleting) {
          setText(fullText.substring(0, text.length - 1));
        } else {
          setText(fullText.substring(0, text.length + 1));
        }
      }, delta);
    };
    
    tick();

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, pauseDelay]);

  return text;
};
