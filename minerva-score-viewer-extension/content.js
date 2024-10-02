// Function to get stored viewed links from local storage
function getViewedLinks(callback) {
    chrome.storage.local.get("viewedLinks", (result) => {
      callback(result.viewedLinks || []);
    });
  }
  
  // Function to store viewed links in local storage
  function storeViewedLinks(links) {
    chrome.storage.local.set({ viewedLinks: links });
  }
  
  // Function to mark links as viewed
  function markLinksAsViewed() {
    const links = document.querySelectorAll("a.action-link");
  
    // Get previously viewed links from storage
    getViewedLinks((viewedLinks) => {
      links.forEach((link) => {
        const href = link.href;
  
        // If the link is already viewed, change its color to purple
        if (viewedLinks.includes(href)) {
          link.style.color = "purple";
        }
  
        // Add click event listener to mark the link as viewed
        link.addEventListener("click", () => {
          link.style.color = "purple";
  
          // Add the link to the viewed list if it's not already in there
          if (!viewedLinks.includes(href)) {
            viewedLinks.push(href);
            storeViewedLinks(viewedLinks);
          }
        });
      });
    });
  }
  
  // Observe changes in the DOM and apply the logic
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      markLinksAsViewed(); // Call the function to mark new links as they appear
    });
  });
  
  // Start observing the entire body of the document for any added nodes
  window.addEventListener("load", () => {
    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
  
    // Initial marking of links as soon as the page is loaded
    markLinksAsViewed();
  });
  