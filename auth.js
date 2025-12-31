// Criminal Investigation Database - Authentication Module
// This file will be obfuscated before deployment

// Base64 encoded case data with SECURE RANDOM folder names
// UNIFIED DATABASE: Contains BOTH English and Arabic cases
// Both portals can access ANY case with correct credentials
const encodedCaseData = "eyJjYXNlcyI6IFt7ImNhc2VOdW1iZXIiOiAiQ0ktMjg0NyIsICJhdXRoQ29kZSI6ICJLN005LVBYNFEiLCAiZm9sZGVyIjogImNhc2UtN2s5bXhwNHFoM244dyJ9LCB7ImNhc2VOdW1iZXIiOiAiQ0ktNTAzOSIsICJhdXRoQ29kZSI6ICJIM044LVdSNkwiLCAiZm9sZGVyIjogImNhc2UtMmJjOXRqNXlyNmxtNCJ9LCB7ImNhc2VOdW1iZXIiOiAiQ0ktNjI4MSIsICJhdXRoQ29kZSI6ICJUNVlKLTlCQzIiLCAiZm9sZGVyIjogImNhc2UtOHhmM3ZxN25oMms5cCJ9LCB7ImNhc2VOdW1iZXIiOiAiQ0ktMTg2NyIsICJhdXRoQ29kZSI6ICJVNjlLLUxCRzkiLCAiZm9sZGVyIjogImNhc2UtaXJoYjRxc29rZTEwNiJ9LCB7ImNhc2VOdW1iZXIiOiAiQ0ktMjUwNCIsICJhdXRoQ29kZSI6ICI1M0NTLUhYMzAiLCAiZm9sZGVyIjogImNhc2Uta3lwbHpsa3VpZjE3NSJ9LCB7ImNhc2VOdW1iZXIiOiAiQ0ktNDcxNCIsICJhdXRoQ29kZSI6ICJOUjFRLTU5RzciLCAiZm9sZGVyIjogImNhc2UtOGl1empoYTcyYzNiMiJ9XX0=";

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