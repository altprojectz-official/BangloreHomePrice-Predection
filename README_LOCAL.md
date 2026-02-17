# Running the Application Locally on Windows

## Prerequisites
1.  **Python 3.x** installed and added to your PATH.
2.  **Pip** installed.

## Setup
1.  Navigate to the project root directory.
2.  Install the required Python packages:
    ```bash
    cd server
    pip install -r requirements.txt
    ```

## Running the Backend
1.  Simply double-click the `c` file in the main project directory.
    *   This will start the Python Flask server on **http://127.0.0.1:5001**.
    *   Keep this terminal window open while using the application.

    **Alternatively (Manual Method):**
    Open a terminal/command prompt and run:
    ```bash
    cd server
    python server.py
    ```

## Running the Frontend
1.  Navigate to the `client` folder.
2.  Double-click `app.html` to open it in your default web browser.
    *   **Or**, copy the full path `c:\Users\ACER\Documents\BangloreHomePrices\client\app.html` and paste it into your browser's address bar.

## Troubleshooting
*   **Server not starting?**
    Check if Python is installed by running `python --version` in your terminal.
    Ensure you have installed the requirements using `pip install -r requirements.txt`.
*   **"Failed to load resource" or API errors?**
    Make sure the backend server (black terminal window) is running.
    Check the browser's developer console (F12) for specific error messages.
