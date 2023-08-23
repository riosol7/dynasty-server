import os
import time
import csv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up a headless Selenium WebDriver
options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--disable-gpu')

# Initialize the WebDriver
driver = webdriver.Chrome(options=options)

# URL of the webpage with the download link
url = "https://www.fantasycalc.com/dynasty-rankings"

# Navigate to the webpage
driver.get(url)

# Wait for the download icon to become clickable
wait = WebDriverWait(driver, 9)
download_icon = wait.until(EC.element_to_be_clickable((By.CLASS_NAME, "download-icon")))

if download_icon:
    # Click the download icon
    download_icon.click()

    # Wait for the download to complete
    while not any(fname.startswith("fantasycalc_dynasty_rankings") for fname in os.listdir()):
        time.sleep(1)

    # Find the downloaded file with the default name
    downloaded_file_name = [fname for fname in os.listdir() if fname.startswith("fantasycalc_dynasty_rankings")][0]

    # Ensure that the temporary directory exists
    temp_directory = os.path.join(os.path.dirname(__file__), "..", "temp")
    os.makedirs(temp_directory, exist_ok=True)

    # Move the downloaded file to the "temp" directory with the desired name
    downloaded_file_path = os.path.join(os.getcwd(), downloaded_file_name)
    temp_file_path = os.path.join(temp_directory, "fantasy_calc.csv")

    # Rename the file and change the delimiter to ','
    with open(downloaded_file_path, 'r', newline='') as input_csv:
        with open(temp_file_path, 'w', newline='') as output_csv:
            reader = csv.reader(input_csv, delimiter=';')
            writer = csv.writer(output_csv, delimiter=',')
            
            # Write the header row with the desired column names
            writer.writerow(["name", "team", "position", "age", "fantasycalcId", "sleeperId", "mflId", "value", "overallRank", "positionRank", "trend30day"])
            
            # Skip the header row in the input CSV
            next(reader)
            
            # Copy the data from the input CSV to the output CSV with ',' delimiter
            for row in reader:
                writer.writerow(row)

    # Remove the original downloaded file
    os.remove(downloaded_file_path)

    print(f"CSV file downloaded, converted, and saved to {temp_file_path}")
else:
    print("Download icon not found on the webpage.")

# Close the WebDriver
driver.quit()
