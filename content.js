// Define courseMappings at a higher scope if it needs to be accessed by multiple functions
const courseMappings = {
    "252-0211-00L": { "full": "Information Security", "short": "InfoSec" },
    "252-0216-00L": { "full": "Rigourous Software Engineering", "short": "RSE" },
    "252-0061-00L": { "full": "Systems Programming and Computer Architecture", "short": "SPCA" },
    "252-0210-00L": { "full": "Compiler Design", "short": "CompDes" },
    "252-0206-00L": { "full": "Visual Computing", "short": "VisComp" },
    "401-0663-00L": { "full": "Numerical Methods for Computer Science", "short": "NumCS" },
    "252-0028-00L": { "full": "Design of Digital Circuits", "short": "Digitech" },
    "252-0058-00L": { "full": "Formal Methods and Functional Programming", "short": "FMFP" },
    "401-0212-16L": { "full": "Analysis I" , "short": "Ana1" },
    "227-0003-10L": { "full": "Digital Design and Computer Architecture" , "short": "Digitech" },
    "252-0029-00L": { "full": "Parallele Programmierung", "short": "PProg" },
    "252-0030-00L": { "full": "Algorithmen und Wahrscheinlichkeit ", "short": "A&W" },
    "252-0063-00L": { "full": "Data Modelling and Databases", "short": "DMDB" },
    "252-0064-00L": { "full": "Computer Networks", "short": "CompNet" },
    "252-0220-00L": { "full": "Introduction to Machine Learning", "short": "IML" },
    "401-0614-00L": { "full": "Wahrscheinlichkeit und Statistik", "short": "W&S" },
    "261-5110-00L": { "full": "Optimization for Data Science", "short": "ODS" }, //dunno if the short is correct
    "263-3710-00L": { "full": "Machine Perception", "short": "MP" }, //dunno if the short is correct
    "263-4660-00L": { "full": "Applied Cryptography", "short": "AppCrypt" }, //dunno if the short is correct
    "252-0535-00L": { "full": "Advanced Machine Learning", "short": "AML" },

    // Add more mappings here
    // TODO: find a way to scrape this data from the course catalogue
    // TODO: put this db in different file
};

function replaceCourseCodes(textNode, nameStyle, addBrackets) {
    let text = textNode.nodeValue;
    Object.keys(courseMappings).forEach(code => {
        const courseName = courseMappings[code][nameStyle]; // Use chosen style
        const replacement = addBrackets ? `[${courseName}]` : courseName;
        const regex = new RegExp(code, 'g');
        text = text.replace(regex, replacement);
    });
    textNode.nodeValue = text;
}

function walkDOM(node, nameStyle, addBrackets) {
    if (node.nodeType === 3) { // Text node
        let parent = node.parentNode;
        // Ensure the parent node exists before accessing its properties
        if (!parent) {
            console.log('Skipping a detached or root-level text node:', node);
            return; // Exit if no parent is found
        }
        // Check if the parent node should be skipped
        if (parent.isContentEditable || parent.tagName === 'INPUT' || parent.tagName === 'TEXTAREA' || parent.classList.contains('ignore-class')) {
            return; // Skip modifying text nodes within editable contexts
        }
        replaceCourseCodes(node, nameStyle, addBrackets);
    }
    let child = node.firstChild;
    while (child) {
        walkDOM(child, nameStyle, addBrackets);
        child = child.nextSibling;
    }
}


chrome.storage.local.get(['nameStyle', 'addBrackets', 'isEnabled'], (data) => {
    const nameStyle = data.nameStyle || 'full'; // Default to 'full' if not set
    const addBrackets = data.addBrackets || false;

    if (!data.isEnabled) {
        console.log('Extension is disabled');
        return; // Exit early if the extension is disabled
    }

    // Modify the walkDOM call to pass these settings
    walkDOM(document.body, nameStyle, addBrackets);

    // Using MutationObserver to observe changes in the DOM
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                        walkDOM(node, nameStyle, addBrackets);
                });
            }
        });
    });    
    observer.observe(document.body, { childList: true, subtree: true, characterData: false });

});