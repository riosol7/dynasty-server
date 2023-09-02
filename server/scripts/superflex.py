import os
import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up a headless Selenium WebDriver
options = webdriver.ChromeOptions()
options.add_argument('--headless')  # Run the browser in headless mode
options.add_argument('--disable-gpu')  # Disable GPU acceleration to prevent issues

driver = webdriver.Chrome(options=options)
url = "https://www.dynastysuperflex.com/sf_values"
driver.get(url)

# Wait for the CSV button to become clickable
wait = WebDriverWait(driver, 3)
csv_button = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "a.dt-button.buttons-csv.buttons-html5")))

if csv_button:
    # Get the href attribute of the CSV button
    csv_link = csv_button.get_attribute("href")

    # Close the headless browser
    driver.quit()

    # Scrape the data from the webpage
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, "html.parser")
        table = soup.find("table", {"id": "player-values-table"})

        # Initialize data as a list of strings
        data = []
        rank = 0

        rows = table.find_all("tr")
        for row in rows:
            cols = row.find_all("td")
            if len(cols) >= 5 and cols[-1].text.strip() == "superflex_sf_value":
                rank += 1  # Increment the rank
                player_data = cols[0].text.strip()
                player_data = player_data.split(" (")[0]  # Remove content within parentheses

                player = player_data
                position = cols[5].text.strip()
                positionRank = cols[1].text.strip()
                team = cols[2].text.strip()

                age = cols[3].text.strip()
                value = cols[4].text.strip()

                data_string = f"{rank},{player},{position},{positionRank},{team},{age},{value}"
                data.append(data_string)

        # Save the list to a CSV file
        temp_directory = os.path.join(os.path.dirname(__file__), "..", "temp")
        os.makedirs(temp_directory, exist_ok=True)
        csv_file_path = os.path.join(temp_directory, "superflex.csv")

        with open(csv_file_path, "w") as csv_file:
            csv_file.write("rank,player,position,positionRank,team,age,value\n" + "\n".join(data))

        print("Superflex CSV file downloaded and created successfully.")
    else:
        print("Failed to download the webpage.")
else:
    print("CSV button not found on the webpage.")
