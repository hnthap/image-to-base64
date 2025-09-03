function main() {
  // Get elements
  const fileInput = document.getElementById("fileInput");
  const uploadArea = document.getElementById("uploadArea");
  const previewImg = document.getElementById("previewImg");
  const base64Output = document.getElementById("base64Output");
  const copyButton = document.getElementById("copyButton");
  const clearButton = document.getElementById("clearButton");

  // File input change handler
  fileInput.addEventListener("change", function () {
    handleFileSelect(this.files[0]);
  });

  // Click upload area to trigger file input
  uploadArea.addEventListener("click", function (e) {
    if (e.target !== fileInput) {
      fileInput.click();
    }
  });

  // Copy button
  copyButton.addEventListener("click", copyToClipboard);

  // Clear button
  clearButton.addEventListener("click", function () {
    previewImg.style.display = "none";
    previewImg.src = "";
    base64Output.value = "";
    fileInput.value = "";
  });

  // Drag and drop
  uploadArea.addEventListener("dragover", function (e) {
    e.preventDefault();
    this.classList.add("dragover");
  });

  uploadArea.addEventListener("dragleave", function (e) {
    e.preventDefault();
    this.classList.remove("dragover");
  });

  uploadArea.addEventListener("drop", function (e) {
    e.preventDefault();
    this.classList.remove("dragover");
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  });
}

function handleFileSelect(file) {
  if (!file) return;

  const previewImg = document.getElementById("previewImg");
  const base64Output = document.getElementById("base64Output");

  const reader = new FileReader();
  reader.onload = function (e) {
    const base64 = e.target.result;
    previewImg.src = base64;
    base64Output.value = base64;
    previewImg.style.display = "block";
  };

  reader.readAsDataURL(file);
}

async function copyToClipboard() {
  const base64Output = document.getElementById("base64Output");
  const base64Text = base64Output.value;

  if (!base64Text) {
    return;
  }

  try {
    await navigator.clipboard.writeText(base64Text);
    showSuccessMessage("Copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
    alert("Failed to copy to clipboard.");
  }
}

function showSuccessMessage(message) {
  const successDiv = document.createElement("div");
  successDiv.className = "success-feedback";
  successDiv.textContent = message;
  successDiv.style.display = "block";

  document
    .getElementById("root")
    .insertBefore(successDiv, document.getElementById("root").firstChild);

  setTimeout(() => {
    successDiv.style.opacity = "0";
    setTimeout(() => {
      if (successDiv.parentNode) {
        successDiv.parentNode.removeChild(successDiv);
      }
    }, 300);
  }, 2000);
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}
