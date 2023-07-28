import React from "react";

const Star = ({ color }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={color}
    width="24px"
    height="24px"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M12 2l3.09 6.47 7.03.63-5.36 4.94 1.25 6.85-6.53-3.47-6.53 3.47 1.25-6.85L1.88 9.1l7.03-.63L12 2zm0 16l-4.9 2.6 1.18-6.45L2 9.13l6.45-1.04L12 2l3.55 6.09 6.45 1.04-6.27 5.02 1.18 6.45L12 18z" />
  </svg>
);

export const Stars = ({ difficulty }) => {
  let numStars = 1;
  let starColor = "black";
  if (difficulty === "medium") {
    numStars = 2;
  } else if (difficulty === "hard") {
    numStars = 3;
  }

  return (
    <div>
      {[...Array(numStars)].map((_, index) => (
        <Star key={index} color={starColor} />
      ))}
      {[...Array(5 - numStars)].map((_, index) => (
        <Star key={numStars + index} color="grey" />
      ))}
    </div>
  );
};
