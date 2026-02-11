
# Community Issue Reporting Platform

A simple web application that allows community members to report local issues (roads, water, electricity, waste, etc.) and track their resolution status.

##  Features

* Report community issues with category and location
* View all reported issues on a dashboard
* Update issue status: **Reported → In Progress → Resolved**
* Persistent storage using **LocalStorage**
* Clean, responsive UI

##  Tech Stack

* HTML5
* CSS3
* Vanilla JavaScript
* Python (local development server)

##  Project Structure

```
Documents/
├── index.html
├── report.html
├── dashboard.html
├── script.js
├── style.css
```

##  How to Run Locally (macOS)

1. Open Terminal
2. Navigate to the project folder:

   ```bash
   cd ~/Documents
   ```
3. Start a local server:

   ```bash
   python3 -m http.server 5500
   ```
4. Open your browser and visit:

   ```
   http://127.0.0.1:5500/index.html
   ```

  Do not open files using `file://` — always use the server URL.

##  How to Test

1. Click **Report an Issue**
2. Fill in all fields and submit
3. Click **View Reported Issues**
4. Use **Update Status** to cycle through issue states

##  Social Impact

This platform empowers citizens to report and track issues affecting their communities, improving transparency and accountability.

##  Future Improvements

* User authentication
* Admin dashboard
* Backend API & database
* Map-based issue visualization

---

