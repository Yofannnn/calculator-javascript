document.addEventListener("DOMContentLoaded", function () {
  const display = document.getElementById("display");
  const buttons = document.querySelectorAll(".buttons button");

  let currentInput = "";
  let needsClear = false;

  // Handle button clicks
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      // Clear error state if needed
      if (display.textContent === "Error") {
        currentInput = "";
        display.textContent = "";
      }

      // Handle the "need to clear after result" state
      if (needsClear && !button.classList.contains("operation")) {
        if (button.classList.contains("number") || button.classList.contains("decimal")) {
          currentInput = "";
          display.textContent = "";
          needsClear = false;
        }
      }

      // Clear button
      if (button.dataset.action === "clear") {
        currentInput = "";
        display.textContent = "";
        needsClear = false;
      }
      // Delete button
      else if (button.dataset.action === "delete") {
        currentInput = currentInput.slice(0, -1);
        display.textContent = currentInput;
      }
      // Equal button
      else if (button.dataset.action === "calculate") {
        try {
          // Validate input before evaluating
          if (currentInput === "" || currentInput.match(/[+\-*/%]$/) || currentInput.match(/\.$/)) {
            return; // Do nothing for invalid inputs
          }

          // Use function constructor instead of eval for better security
          const result = Function('"use strict"; return (' + currentInput + ")")();

          // Format the result
          const formattedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
          currentInput = formattedResult.toString();
          display.textContent = currentInput;
          needsClear = true;
        } catch (error) {
          display.textContent = "Error";
          currentInput = "";
        }
      }
      // Operation buttons
      else if (button.dataset.operation) {
        // Prevent operations from being the first character
        if (currentInput === "") {
          return;
        }

        // Prevent multiple operations in a row
        if (currentInput.match(/[+\-*/%]$/)) {
          return;
        }

        currentInput += button.dataset.operation;
        display.textContent = currentInput;
        needsClear = false;
      }
      // Decimal point
      else if (button.classList.contains("decimal")) {
        // Prevent multiple decimal points in a number
        const parts = currentInput.split(/[+\-*/%]/);
        const lastPart = parts[parts.length - 1];

        if (lastPart.includes(".")) {
          return;
        }

        currentInput += button.dataset.number;
        display.textContent = currentInput;
        needsClear = false;
      }
      // Numbers
      else {
        currentInput += button.dataset.number;
        display.textContent = currentInput;
        needsClear = false;
      }

      // Limit display length to prevent overflow
      if (display.textContent.length > 12) {
        display.style.fontSize = "28px";
      } else {
        display.style.fontSize = "40px";
      }
    });
  });

  // Add keyboard support
  document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Number keys
    if (/^[0-9]$/.test(key)) {
      document.querySelector(`button[data-number="${key}"]`).click();
    }
    // Operation keys
    else if (key === "+" || key === "-" || key === "*" || key === "/" || key === "%") {
      document.querySelector(`button[data-operation="${key}"]`).click();
    }
    // Decimal key
    else if (key === ".") {
      document.querySelector("button.decimal").click();
    }
    // Equal key
    else if (key === "=" || key === "Enter") {
      document.querySelector("button.equal").click();
    }
    // Backspace key
    else if (key === "Backspace") {
      document.querySelector("button.delete").click();
    }
    // Escape key for clear
    else if (key === "Escape") {
      document.querySelector("button.clear").click();
    }
  });
});
