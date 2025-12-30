// Criminal Investigation Database - Authentication Module
// This file will be obfuscated before deployment

// Base64 encoded case data with SECURE RANDOM folder names
// New format: Folders are now 17-character random strings (impossible to guess)
const encodedCaseData = "eyJjYXNlcyI6W3siY2FzZU51bWJlciI6IkNJLTI4NDciLCJhdXRoQ29kZSI6Iks3TTktUFg0USIsImZvbGRlciI6ImNhc2UtN2s5bXhwNHFoM244dyJ9LHsiY2FzZU51bWJlciI6IkNJLTUwMzkiLCJhdXRoQ29kZSI6IkgzTjgtV1I2TCIsImZvbGRlciI6ImNhc2UtMmJjOXRqNXlyNmxtNCJ9LHsiY2FzZU51bWJlciI6IkNJLTYyODEiLCJhdXRoQ29kZSI6IlQ1WUotOUJDMiIsImZvbGRlciI6ImNhc2UtOHhmM3ZxN25oMms5cCJ9XX0=";

// Decode case data
function getCaseDatabase() {
    try {
        const decoded = atob(encodedCaseData);
        return JSON.parse(decoded);
    } catch (e) {
        console.error('Database access error');
        return { cases: [] };
    }
}

// Normalize input (remove spaces, convert to uppercase)
function normalizeInput(str) {
    return str.replace(/\s+/g, '').toUpperCase();
}

// Authenticate user
function authenticateCase(caseNumber, authCode) {
    const database = getCaseDatabase();
    const normalizedCaseNum = normalizeInput(caseNumber);
    const normalizedAuthCode = normalizeInput(authCode);
    
    // Find matching case
    const matchedCase = database.cases.find(caseData => {
        return normalizeInput(caseData.caseNumber) === normalizedCaseNum &&
               normalizeInput(caseData.authCode) === normalizedAuthCode;
    });
    
    return matchedCase ? matchedCase.folder : null;
}

// Handle form submission
function handleAuthentication(event) {
    event.preventDefault();
    
    const button = document.getElementById('accessBtn');
    const errorMessage = document.getElementById('errorMessage');
    const caseNumber = document.getElementById('caseNumber').value;
    const authCode = document.getElementById('authCode').value;
    
    // Hide previous error
    errorMessage.classList.remove('show');
    
    // Processing state
    button.classList.add('processing');
    button.innerHTML = '<div class="button-corner tl"></div><div class="button-corner br"></div>Verifying';
    
    // Log attempt (for security monitoring)
    console.log('Access attempt:', {
        timestamp: new Date().toISOString(),
        terminal: document.getElementById('terminalId').textContent
    });
    
    // Simulate authentication delay (makes it feel more secure)
    setTimeout(() => {
        const caseFolder = authenticateCase(caseNumber, authCode);
        
        if (caseFolder) {
            // Access granted
            button.classList.remove('processing');
            button.classList.add('authorized');
            button.innerHTML = '<div class="button-corner tl"></div><div class="button-corner br"></div>Access Granted';
            
            // Redirect to case folder after brief delay
            setTimeout(() => {
                window.location.href = caseFolder + '/index.html';
            }, 1500);
        } else {
            // Access denied
            button.classList.remove('processing');
            button.classList.add('denied');
            button.innerHTML = '<div class="button-corner tl"></div><div class="button-corner br"></div>Access Denied';
            errorMessage.classList.add('show');
            
            // Reset button after delay
            setTimeout(() => {
                button.classList.remove('denied');
                button.innerHTML = '<div class="button-corner tl"></div><div class="button-corner br"></div>Access Records';
            }, 2000);
        }
    }, 1800);
}

// Optional: Add brute force protection
let failedAttempts = 0;
const MAX_ATTEMPTS = 5;

function checkBruteForce() {
    if (failedAttempts >= MAX_ATTEMPTS) {
        alert('Too many failed attempts. System locked for security.');
        document.getElementById('accessBtn').disabled = true;
        return false;
    }
    return true;
}
