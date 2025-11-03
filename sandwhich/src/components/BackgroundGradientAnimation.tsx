import React from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "138, 43, 226",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "multiply",
  children,
  interactive = true,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  interactive?: boolean;
}) => {
  const interactiveRef = React.useRef<HTMLDivElement>(null);
  const [curX, setCurX] = React.useState(0);
  const [curY, setCurY] = React.useState(0);
  const [tgX, setTgX] = React.useState(0);
  const [tgY, setTgY] = React.useState(0);

  React.useEffect(() => {
    document.documentElement.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    document.documentElement.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    document.documentElement.style.setProperty("--first-color", firstColor);
    document.documentElement.style.setProperty("--second-color", secondColor);
    document.documentElement.style.setProperty("--third-color", thirdColor);
    document.documentElement.style.setProperty("--fourth-color", fourthColor);
    document.documentElement.style.setProperty("--fifth-color", fifthColor);
    document.documentElement.style.setProperty("--pointer-color", pointerColor);
    document.documentElement.style.setProperty("--size", size);
    document.documentElement.style.setProperty("--blending-value", blendingValue);
  }, [gradientBackgroundStart, gradientBackgroundEnd, firstColor, secondColor, thirdColor, fourthColor, fifthColor, pointerColor, size, blendingValue]);

  React.useEffect(() => {
    function move() {
      if (!interactiveRef.current) return;
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
    move();
  }, [tgX, tgY, curX, curY]);

  const handleMouseMove = React.useCallback((event: React.MouseEvent) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  }, []);

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    width: "100%",
    maxWidth: "100vw",
    position: "relative",
    overflow: "hidden",
    background: `linear-gradient(40deg, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
  };

  const gradientsContainerStyle: React.CSSProperties = {
    height: "100%",
    width: "100%",
    filter: "blur(40px)",
    position: "absolute",
    top: 0,
    left: 0,
  };

  const gradientStyle = (color: string, animation: string, opacity = 1): React.CSSProperties => ({
    position: "absolute",
    background: `radial-gradient(circle at center, rgba(${color}, ${opacity}) 0%, rgba(${color}, 0) 50%)`,
    mixBlendMode: blendingValue as any,
    width: size,
    height: size,
    top: `calc(50% - ${size}/2)`,
    left: `calc(50% - ${size}/2)`,
    animation: `${animation} 20s ease-in-out infinite`,
  });

  const interactiveStyle: React.CSSProperties = {
    position: "absolute",
    background: `radial-gradient(circle at center, rgba(${pointerColor}, 0.8) 0%, rgba(${pointerColor}, 0) 50%)`,
    mixBlendMode: blendingValue as any,
    width: "100%",
    height: "100%",
    top: "-50%",
    left: "-50%",
    opacity: 0.7,
  };

  return (
    <div style={containerStyle}>
      <div style={gradientsContainerStyle}>
        <div style={gradientStyle(firstColor, "first")} />
        <div style={{ ...gradientStyle(secondColor, "second"), animationDelay: "-2s" }} />
        <div style={{ ...gradientStyle(thirdColor, "third"), animationDelay: "-4s" }} />
        <div style={{ ...gradientStyle(fourthColor, "fourth", 0.7), animationDelay: "-6s" }} />
        <div style={{ ...gradientStyle(fifthColor, "fifth"), animationDelay: "-8s" }} />
        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            style={interactiveStyle}
          />
        )}
      </div>
      <div style={{ 
        position: "relative", 
        zIndex: 10
      }}>
        {children}
      </div>
    </div>
  );
};