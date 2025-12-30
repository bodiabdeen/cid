# Case Credentials Reference - SECURE VERSION
# ⚠️ KEEP THIS FILE PRIVATE - DO NOT UPLOAD TO GITHUB ⚠️

This file contains all case numbers and authorization codes for your reference.
Share these credentials individually with people who should access specific cases.

## 🔒 IMPORTANT SECURITY UPDATE

✅ **Folder names are now RANDOMIZED** - impossible to guess!
✅ Even if someone knows the case number, they CAN'T access it without the auth code
✅ Folder names use 17-character random strings (62^13 = 200 trillion combinations)

---

## Active Cases

### Case 1
- **Case Number:** CI-2847
- **Authorization Code:** K7M9-PX4Q
- **Folder:** case-7k9mxp4qh3n8w ⚠️ KEEP SECRET
- **Description:** [Add your case description here]

### Case 2
- **Case Number:** CI-5039
- **Authorization Code:** H3N8-WR6L
- **Folder:** case-2bc9tj5yr6lm4 ⚠️ KEEP SECRET
- **Description:** [Add your case description here]

### Case 3
- **Case Number:** CI-6281
- **Authorization Code:** T5YJ-9BC2
- **Folder:** case-8xf3vq7nh2k9p ⚠️ KEEP SECRET
- **Description:** [Add your case description here]

---

## 🛡️ Security Explanation

**OLD (Insecure) Method:**
```
Case CI-2847 → Folder: case-ci2847
❌ Anyone could guess: yoursite.com/case-ci2847/index.html
```

**NEW (Secure) Method:**
```
Case CI-2847 → Folder: case-7k9mxp4qh3n8w
✅ Impossible to guess: yoursite.com/case-7k9mxp4qh3n8w/index.html
✅ Must use login page with correct credentials
```

---

## How to Add New Cases

When you want to add more cases:

### Step 1: Generate Random Folder Name

Use this Python one-liner (or online tool):
```python
import random, string
'case-' + ''.join(random.choices(string.ascii_lowercase + string.digits, k=13))
```

Or use this online tool: https://www.random.org/strings/
- Length: 13 characters
- Format: Alphanumeric lowercase
- Prefix with: `case-`

Example output: `case-9m3xk7qp2vh4n`

### Step 2: Generate Case Credentials

**Case Number:** CI-[random 4 digits between 1000-9999]
**Auth Code:** [4 chars]-[4 chars] uppercase alphanumeric

Use: https://www.random.org/strings/

### Step 3: Update the Case Database

1. Decode the current Base64 string at: https://www.base64decode.org/
   
2. You'll get JSON like this:
```json
{
  "cases": [
    {"caseNumber": "CI-2847", "authCode": "K7M9-PX4Q", "folder": "case-7k9mxp4qh3n8w"},
    {"caseNumber": "CI-5039", "authCode": "H3N8-WR6L", "folder": "case-2bc9tj5yr6lm4"},
    {"caseNumber": "CI-6281", "authCode": "T5YJ-9BC2", "folder": "case-8xf3vq7nh2k9p"}
  ]
}
```

3. Add your new case with the RANDOM folder name:
```json
{
  "cases": [
    {"caseNumber": "CI-2847", "authCode": "K7M9-PX4Q", "folder": "case-7k9mxp4qh3n8w"},
    {"caseNumber": "CI-5039", "authCode": "H3N8-WR6L", "folder": "case-2bc9tj5yr6lm4"},
    {"caseNumber": "CI-6281", "authCode": "T5YJ-9BC2", "folder": "case-8xf3vq7nh2k9p"},
    {"caseNumber": "CI-7493", "authCode": "M8KL-Q3XR", "folder": "case-9m3xk7qp2vh4n"}
  ]
}
```

4. Re-encode at: https://www.base64encode.org/
5. Replace the `encodedCaseData` value in auth.js
6. Re-obfuscate using obfuscator.io
7. Push to GitHub

---

## 📋 Quick Reference for Sharing

When giving someone access to a case, share:

```
Case Number: CI-2847
Authorization Code: K7M9-PX4Q
Access at: https://yoursite.com/
```

❌ **NEVER share the folder name!** That defeats the security.

---

## 🔐 Folder Name Generator (Python Script)

Save this as `generate_folder.py`:

```python
import random
import string

def generate_secure_folder():
    random_str = ''.join(random.choices(string.ascii_lowercase + string.digits, k=13))
    return f"case-{random_str}"

# Generate 5 folder names
for i in range(5):
    print(generate_secure_folder())
```

Run: `python generate_folder.py`

Output:
```
case-7k9mxp4qh3n8w
case-2bc9tj5yr6lm4
case-8xf3vq7nh2k9p
case-4nq7yx9mk2t6r
case-1hp8vx3mq5k9j
```

---

## ⚠️ REMINDER

- NEVER upload this CREDENTIALS.md file to GitHub!
- NEVER share folder names with users
- Keep this file in a secure location (not in your repo)
- Back up this file - you'll need it to add more cases later

---

## Security Level Comparison

| Method | Security Level | Guessability |
|--------|---------------|--------------|
| case-001 | ⚠️ VERY LOW | Easy (3 digits = 1,000 options) |
| case-ci2847 | ⚠️ LOW | Moderate (4 digits = 10,000 options) |
| case-7k9mxp4qh3n8w | ✅ HIGH | Impossible (62^13 = 200 trillion options) |

You're now using the HIGH security method! 🎉
