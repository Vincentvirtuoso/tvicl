import React from "react";

export const Loader = ({
  variant = "spinner",
  size = 40,
  color = "#25aff3",
  label = "",
  fullScreen = false,
  className = "",
}) => {
  const commonStyle = {
    width: size,
    height: size,
    borderColor: color,
  };

  const renderLoader = () => {
    switch (variant) {
      case "dots":
        return (
          <div className="flex space-x-1">
            <span
              style={{ backgroundColor: color }}
              className="w-2 h-2 rounded-full animate-bounce"
            ></span>
            <span
              style={{ backgroundColor: color }}
              className="w-2 h-2 rounded-full animate-bounce [animation-delay:-.15s]"
            ></span>
            <span
              style={{ backgroundColor: color }}
              className="w-2 h-2 rounded-full animate-bounce"
            ></span>
          </div>
        );

      case "bars":
        return (
          <div className="flex space-x-1 items-end">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                style={{ backgroundColor: color }}
                className={`w-1 h-2 animate-[grow_1s_ease-in-out_${
                  i * 0.15
                }s_infinite]`}
              ></span>
            ))}
          </div>
        );

      case "pulse":
        return (
          <div
            className="rounded-full animate-ping"
            style={{
              ...commonStyle,
              backgroundColor: color,
            }}
          ></div>
        );

      case "spinner":
      default:
        return (
          <div
            className="animate-spin rounded-full border-4 border-t-transparent"
            style={commonStyle}
          ></div>
        );
    }
  };

  const Container = ({ children }) =>
    fullScreen ? (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-50">
        {children}
      </div>
    ) : (
      <div className={`flex flex-col items-center ${className}`}>
        {children}
      </div>
    );

  return (
    <Container>
      {renderLoader()}
      {label && <p className="mt-2 text-sm text-gray-600">{label}</p>}
    </Container>
  );
};
