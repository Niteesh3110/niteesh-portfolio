import React from "react";
import RotatingText from "./RotatingText";
import BlurText from "./BlurText";
import TextType from "./TextType";
import AnimatedContent from "./AnimatedContent";
export default function IntroText() {
  return (
    <div className="flex w-full min-w-0 flex-col items-center justify-center gap-6 px-4 py-10 text-center sm:px-6">
      <div className="w-full min-w-0">
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-text-dark text-balance break-words [&_*]:whitespace-pre-wrap">
          <TextType
            text={["Hi, I'm Niteesh's virtual assistant."]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="|"
            deletingSpeed={50}
            variableSpeedEnabled={false}
            variableSpeedMin={60}
            variableSpeedMax={120}
            cursorBlinkDuration={0.5}
            loop={false}
            className="text-text-dark font-main-heading"
          />
        </h1>
      </div>

      <AnimatedContent
        distance={100}
        direction="verticle"
        reverse={false}
        duration={1}
        ease="power3.out"
        initialOpacity={0}
        animateOpacity
        scale={1}
        threshold={0.1}
        delay={3}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
      >
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-accent-dark font-main-heading">
          Ask me anything about his
        </h1>

        <RotatingText
          texts={["Projects", "Experiences", "Education"]}
          mainClassName="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-cyan-300 text-black text-lg sm:text-xl font-semibold bg-focus-dark font-sub-heading"
          staggerFrom={"last"}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-120%" }}
          staggerDuration={0.025}
          splitLevelClassName="overflow-hidden"
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          rotationInterval={2000}
        />
      </AnimatedContent>
    </div>
  );
}
