// Define courseMappings at a higher scope if it needs to be accessed by multiple functions
const courseMappings = {
    "252-0211-00L": { "full": "Information Security", "short": "InfoSec" },
    "252-0216-00L": { "full": "Rigourous Software Engineering", "short": "RSE" },
    "252-0061-00L": { "full": "Systems Programming and Computer Architecture", "short": "SPCA" },
    "252-0210-00L": { "full": "Compiler Design", "short": "CompDes" },
    "252-0206-00L": { "full": "Visual Computing", "short": "VisComp" },
    "401-0663-00L": { "full": "Numerical Methods for Computer Science", "short": "NumCS" },
    "252-0028-00L": { "full": "Design of Digital Circuits", "short": "Digitech" }
     
    // Add more mappings here
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
        replaceCourseCodes(node, nameStyle, addBrackets);
    }
    node = node.firstChild;
    while (node) {
        walkDOM(node, nameStyle, addBrackets);
        node = node.nextSibling;
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
    observer.observe(document.body, { childList: true, subtree: true });
});