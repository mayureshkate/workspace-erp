# Google ERP

## 🚀 Overview
Welcome to **Google ERP**. It is a lightweight, modern, and very useful Enterprise Resource Planning (ERP) application designed especially for small businesses and freelancers. 

Instead of asking users to learn a completely new software and do the heavy lifting of data migration, this ERP works seamlessly with the tools you are already using on a daily basis: **Google Workspace** (Gmail, Google Drive, Google Photos).

It is built using a very fast **Next.js** frontend and a robust **Node.js/Express** backend. It uses Google OAuth 2.0 so that your data is securely accessed directly from Google APIs without saving any passwords.

---

## 🎯 Use Cases & How It Helps Your Business

Today, many small business owners face the hassle of scattered data. Important client emails are lost in Gmail, contracts are misplaced in Google Drive, and inventory photos are mixed up in Google Photos.

This ERP acts as a **centralized dashboard** to bring all your Google services together into clear business modules:

### 1. Customer Relationship Management (CRM)
**The Problem:** Finding the last email sent to a client takes too much time.
**The Solution:** The in-built CRM module connects directly to your **Gmail account**. It automatically brings in the correct email threads and allows you to easily read and reply to clients from the ERP dashboard itself.

### 2. Document Management
**The Problem:** Organizing signed NDAs, bills, and reports in a messy local folder or Drive is confusing.
**The Solution:** The Documents module is linked with the **Google Drive API**. You can seamlessly search, view, and upload business documents directly into proper folders in your Google Drive without switching tabs.

### 3. Inventory & Assets
**The Problem:** Keeping a manual count of stock and matching it with product photos is tough.
**The Solution:** The Inventory module uses the **Google Photos Library API**. You can attach photos of your products or stock receipts directly to your inventory items for visual proof.

---

## ✨ Key Features & Benefits
*   **No Data Migration Required:** You do not need to upload your emails or files again. The ERP directly reads and writes to your existing Google Workspace.
*   **Simple & Beautiful UI:** Built with modern designs, it looks premium and is very easy to use on both laptops and mobile phones.
*   **Highly Secure:** It uses Google OAuth 2.0. Kindly note that we never store your Google password. It works entirely on secure tokens.
*   **Ready for Future Upgrades:** The backend code is modular, so we can easily add more features like Google Calendar later as per your requirements.

---

## 🛠️ Step-by-Step Guide to Run the Project

Please find below the instructions to get the project up and running on your local machine.

### Prerequisites
1.  **Node.js** (version 18 or above) installed on your system.
2.  A **Google Cloud Console** account to generate your API keys.

### 1. Setup in Google Cloud
Before running the code, kindly configure a project in Google Cloud:
1. Open the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a New Project.
3. Go to the API Library and enable the **Gmail API**, **Google Drive API**, and **Google Photos Library API**.
4. Set up the **OAuth Consent Screen** (add the required scopes for Gmail, Drive, and Photos).
5. Navigate to Credentials -> Create Credentials -> **OAuth client ID** (Choose Web application).
6. Under Authorized redirect URIs, add exactly this link: `http://localhost:3000/api/auth/callback/google`.
7. Click Create and safely copy your **Client ID** and **Client Secret**.

### 2. Environment Variables Configuration
You need to put your keys in both the `frontend` and `backend` folders for the system to work.

**For Frontend (Create a file named `.env.local` in the `frontend` folder):**
```env
GOOGLE_CLIENT_ID=paste_your_client_id_here
GOOGLE_CLIENT_SECRET=paste_your_client_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=write_any_random_secure_password_here
```

**For Backend (Create a file named `.env` in the `backend` folder):**
```env
GOOGLE_CLIENT_ID=paste_your_client_id_here
GOOGLE_CLIENT_SECRET=paste_your_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/callback/google
PORT=5000
```

### 3. Starting the Application
Kindly note that the project has two parts. You have to open two separate terminal windows and run them at the same time.

**To start the Backend server:**
```bash
cd backend
npm install
npm run dev
```

**To start the Frontend UI:**
```bash
cd frontend
npm install
npm run dev
```

Once both are running, open your web browser and go to `http://localhost:3000`. You will be asked to sign in securely with your Google account. After successful login, you can start using the CRM, Documents, and Inventory modules seamlessly!
